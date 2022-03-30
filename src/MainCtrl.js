import {httpGetAsync} from './utils';

export const MainController = function($scope, ImageService, UtilService){

	/*******************/
	/* Local variables */
	/*******************/
	const view = this;
	const isSmallScreen = getComputedStyle(document.getElementById("js-mobile-detection")).display !== "none";
	const isReallySmallScreen = window.innerWidth < 500;
	let config = "";

	/*******************/
	/* Scope variables */
	/*******************/
	view.$onInit = onInit;
	view.coolImage = "";
	view.coolImageSrc = "";
	view.currentState = "";
	view.darkMode = false;
	view.shouldHideForms = false;
	view.sideMenuOpened = false;
	view.titles = {};
	view.transitioning = false;
	view.windowHeight = "";

	/*******************/
	/* Scope functions */
	/*******************/
	view.$onInit = onInit;
	view.getArticleBackground = getArticleBackground;
	view.goToArticle = goToArticle;
	view.scrollBackTop = scrollBackTop;
	view.shouldShowSideMenu = shouldShowSideMenu;
	view.switchDarkMode = switchDarkMode;

	/*******************/
	/* Key  listeners  */
	/*******************/
	UtilService.$transitions.onStart({}, function(){
		view.transitioning = true;
	})
	UtilService.$transitions.onSuccess({}, function(){
		window.scrollTo(0, 0);
		view.sideMenuOpened = false;
		view.currentState = UtilService.$state.current.name;
		UtilService.$timeout(function(){
			const prism = require('./prism');
			prism(document);
			Prism.highlightAll();
			view.transitioning = false;
			}, 50)
	})

	/*******************/
	/*     Events      */
	/*******************/

	window.addEventListener("resize", getWindowHeight);
	/*******************/
	/* Local functions */
	/*******************/

	function getArticleBackground(id) {
		let fileName = "header";
		if (isReallySmallScreen) fileName += "_portrait";
		else if (isSmallScreen) fileName += "_small";

		return 'articles/'+ id +'/' + fileName + '.webp';
	}

	async function getRandomWallpaper(){
		if(!config || !config.wallpapers) {
			return;
		}
		const targetSub = randArray(config.wallpapers);
		const response = await UtilService.$http.get(`https://www.reddit.com/r/${targetSub}/hot.json?sort=top&t=week`)
		const images = response.data.data.children.filter((post) => {return !post.data.selftext && post.data.thumbnail});
		if(!images || !images.length) {
			return;
		}
		const img = randArray(images).data;
		const loader = new Image();
		loader.onload = () => {

			// Console log update
			const title = img.title;
			let titleString = "";

			if (title.toUpperCase().indexOf(" BY ") > -1){
				const index = title.toUpperCase().indexOf(" BY ");
				const art = title.slice(0, index);
				const artist = title.slice(index + 4, title.length);

				titleString = `%c${art}%c by %c${artist}`
			}
			else {
				titleString = `%c%c%c${title}`;
			}

			let backgroundStyle = "margin-top: 15px;"
								+ "padding-right:150px;"
								+ "padding-left: 150px;"
								+ "padding-top:90px;"
								+ "padding-bottom:90px;"
								+ "background:url(" + img.url + ") no-repeat;"
								+ "background-size: cover;"
								+ "background-position:50%;";

			if(navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
				backgroundStyle += "line-height: 225px";
			}

			console.log(`%c %c\nHeader image is ${titleString}%c.\n%cYou can find more at:\n\n%chttps://www.reddit.com${img.permalink}\n\n`, 
				backgroundStyle,
				"font-size: 14px; line-height: 25px; padding-top: 05px;",
				"font-size: 14px; line-height: 25px; color: #45D3DD",
				"font-size: 14px; line-height: 25px;",
				"font-size: 14px; line-height: 25px; color: #45D3DD;",
				"font-size: 14px; line-height: 25px;",
				"font-size: 14px; line-height: 25px;",
				"font-size: 12px; line-height: 25px; color: #FF5C92;");
				$scope.$apply(view.coolImage = img);
				setTimeout(() => {
					view.shouldHideForms = true;
				}, 2000)
		};
		loader.src = img.url;
	}

	function getWindowHeight(){
		UtilService.$timeout(function(){
			view.windowHeight = window.innerHeight + "px";
		}, 1);
	}

	function goToArticle(id){
		const targetBlock = document.getElementById("header-" + id);
		const duration = 200;
		view.transitioning = true;
		view.transitionTarget = id;

		scrollToX(document.documentElement, document.documentElement.scrollTop, targetBlock.offsetTop, 0, 1/duration, 20, easeOutCuaic)
			.then(function(){
				UtilService.$state.go(id);
			})
	}

	async function onInit(){
		const rawConfig = await httpGetAsync('./config.json');
		config = await JSON.parse(rawConfig);

		view.articles = config.articles.sort((a, b) => {return b.date - a.date});
		view.titles["header"] = config.title;
		getWindowHeight();
		getRandomWallpaper();

		addKeyListeners();

		UtilService.$timeout(function(){
			view.hasFinishedLoading = true;
		}, 1000);

		if(document.cookie.indexOf("cgmDarkMode=true") > -1) view.darkMode = true;
	}

	function randArray(array) {
		const index = Math.floor(Math.random()*array.length);
		return array[index];
	}

	function scrollBackTop(duration) {
		if(duration == null) duration = 400;

		scrollToX(document.documentElement, document.documentElement.scrollTop, document.documentElement.offsetTop, 0, 1/duration, 20, easeOutCuaic);
	}

	function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
		const promise = new Promise(function(resolve,reject){
			if (t01 < 0 || t01 > 1 || speed<= 0) {
				element.scrollTop = xTo;
				resolve();
				return;
			}
			element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
			t01 += speed * step;

			setTimeout(function() {
				scrollToX(element, xFrom, xTo, t01, speed, step, motion)
					.then(function(){resolve()})
			}, step);
			})

		return promise;
	}

	function easeOutCuaic(t){
		t--;
		return t*t*t+1;
	}

	function shouldShowSideMenu(){
		return !ImageService.shouldShowFullscreen();
	}

	function addKeyListeners() {
		document.addEventListener('keyup', (e) => {
			if (e.code === "ArrowLeft") {
				ImageService.selectPreviousImage();
			}
			else if (e.code === "ArrowRight") {
				ImageService.selectNextImage();
			}
			else if (e.code === "Escape") {
				ImageService.hideFullScreen();
			}
			$scope.$apply();
		});
	}

	function switchDarkMode() {
		view.darkMode = !view.darkMode;
		view.sideMenuOpened = false;

		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 365);

		document.cookie = "cgmDarkMode=" + view.darkMode + "; expires=" + expiryDate.toUTCString();
	}

}