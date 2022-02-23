const varData = {
	title: ["Cristol GDM", "Tokyo based JavaScript/Angular developer with a UX background"],
	articles: [
		{
			title: "Learning how to learn",
			id: "learning-how-to-learn",
			date: "July 2019"
		},
		{
			title: "Self-loading controllers in AngularJS",
			blurb: "In this article, we are going to talk about controllers, their parent app, and freedom. Should controllers be able to load themselves? And if so, how?",
			id: "self-loading-controller-angularjs",
			date: "March 2017"
		},
		{
			title: "Joining the Dark Side of Internet - UX and SEO of an adult website",
			blurb: "This one is quite special. I was hired to redesign a website, whose main activity is media galleries, and that gets its profit through ads and partnerships. I was given full control of the site’s servers, statistics, and full power to change and modify anything I wanted. This was my first project with so much responsibilities, and it was amazing. It was also for an adult website.",
			id: "dark-side-internet-adult-seo",
			date: "August 2015"
		},
		{
			title: "Red Sox companion app (prototype)",
			blurb: "The objective for this project was to create a working high-def prototype for a Fenway companion app. The app would accompany supporters, help them buy food and drinks, and give them incentive to come back for later games.",
			id: "red-sox-companion-app",
			date: "January 2012"
		},
		{
			title: "iMensana, social-fitness app (prototype)",
			blurb: "The objective for this project was to create a high-fidelity mockup design of a fitness app intended for tablet supports. The app would try to find a new niche to occupy in the already busy fitness apps market.",
			id: "imensana-social-fitness-app",
			date: "December 2011"
		},
		{
			title: "Red Cross donor app (prototype)",
			blurb: "Another project done for a teaching course by Wiklund & Kendler. The assignment was to design a tablet app for Red Cross’ Blood Drives.",
			id: "red-cross-donor-app",
			date: "November 2011"
		},
		{
			title: "Robohat, an interface to make hats (prototype)",
			blurb: "This first project comes from a training course by Wiklund & Kendler. The task was to create an interface for an automatic hat-making machine. The user had to be able to design a hat, preview it, and buy it.",
			id: "robohat-an-interface-to-make-hats",
			date: "October 2011"
		}
	]
};
define("data", function(){});

const MainController = function($scope, ImageService, UtilService){

	/*******************/
	/* Local variables */
	/*******************/
	const view = this;
	const data = varData;
	const isSmallScreen = getComputedStyle(document.getElementById("js-mobile-detection")).display !== "none";
	const isReallySmallScreen = window.innerWidth < 500;

	/*******************/
	/* Scope variables */
	/*******************/
	view.articles = data.articles;
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

		return 'articles/'+ id +'/' + fileName + '.jpg';
	}

	function getRandomWallpaper(){
		UtilService.$http.get('https://www.reddit.com/r/ImaginaryWorlds/hot.json?sort=top&t=week')
			.then(function(response){
				const img = randArray(response.data.data.children).data;
				view.coolImage = img;

				const title = img.title;
				let titleString = "";

				if (title.toUpperCase().indexOf(" BY ") > -1){
					const index = title.toUpperCase().indexOf(" BY ");
					const art = title.slice(0, index);
					const artist = title.slice(index + 4, title.length);

					titleString = "%c" + art + "%c by %c" + artist
				}
				else {
					titleString = "%c%c%c" + title;
				}

				const backgroundStyle = "margin-top: 15px;"
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

				console.log("%c %c\nHeader image is " + titleString + "%c.\n%cYou can find more at:\n\n%chttps://www.reddit.com" + img.permalink +"\n\n", 
					backgroundStyle,
					"font-size: 14px; line-height: 25px; padding-top: 05px;",
					"font-size: 14px; line-height: 25px; color: #45D3DD",
					"font-size: 14px; line-height: 25px;",
					"font-size: 14px; line-height: 25px; color: #45D3DD;",
					"font-size: 14px; line-height: 25px;",
					"font-size: 14px; line-height: 25px;",
					"font-size: 12px; line-height: 25px; color: #FF5C92;");

				setTimeout(function(){
					view.shouldHideForms = true;
				}, 2000)

			}

			);
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

		scrollToX(document.body, document.body.scrollTop, targetBlock.offsetTop, 0, 1/duration, 20, easeOutCuaic)
			.then(function(){
				UtilService.$state.go(id);
			})
	}

	function onInit(){
		view.titles["header"] = data.title;
		getWindowHeight();
		getRandomWallpaper();

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

		scrollToX(document.body, document.body.scrollTop, document.body.offsetTop, 0, 1/duration, 20, easeOutCuaic);
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

	function switchDarkMode() {
		view.darkMode = !view.darkMode;
		view.sideMenuOpened = false;

		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 365);

		document.cookie = "cgmDarkMode=" + view.darkMode + "; expires=" + expiryDate.toUTCString();
	}

};
define("MainCtrl", function(){});


const ImageServiceProvider = angular.module('ImageServiceProvider', [])
	.factory('ImageService', ['$transitions', function ($transitions) {

		/************** CONSTANTS **************/
		let allImages = [];
		const allImagesDictionary = {};
		let currentImage = {};
		let fullScreenShown = false;

		/************ START PROCESS ************/
		$transitions.onSuccess({}, function(){
			const images = document.getElementsByTagName('cg-figure');
			allImages = [];

			for (let i = 0; i < images.length; i++) {
				allImages.push({
					src: images[i].getAttribute("src"),
					caption: images[i].getAttribute("caption")
				})

				allImagesDictionary[images[i].getAttribute("src")] = images[i].getAttribute("caption");
			}
		})

		$transitions.onStart({}, function(){
			hideFullScreen();
		})

		return {
			getAllImages: getAllImages,
			getCurrentImage: getCurrentImage,
			hideFullScreen: hideFullScreen,
			selectNextImage: selectNextImage,
			selectPreviousImage: selectPreviousImage,
			setCurrentImage: setCurrentImage,
			shouldShowFullscreen: shouldShowFullscreen,
			showFullScreen: showFullScreen
		};

		/******** FUNCTION DECLARATIONS ********/
		function getAllImages() {
			return allImages;
		}

		function getCurrentImage() {
			return currentImage;
		}

		function hideFullScreen(){
			currentImage = {};
			fullScreenShown = false;
		}

		function selectNextImage(){
			let nextImage;

			for (let i = 0; i < allImages.length; i++) {
				if(allImages[i].src === currentImage.src) {
					if (i === allImages.length -1) {
						nextImage = allImages[0];
						break;
					}
					else {
						nextImage = allImages[i+1];
						break;
					}
				}
			}

			if(nextImage != null) {
				setCurrentImage(nextImage.src, nextImage.caption);
			}
		}

		function selectPreviousImage(){
			let previousImage;

			for (let i = 0; i < allImages.length; i++) {
				if(allImages[i].src === currentImage.src) {
					if (i === 0) {
						previousImage = allImages[allImages.length -1];
						break;
					}
					else {
						previousImage = allImages[i-1];
						break;
					}
				}
			}

			if(previousImage != null) {
				setCurrentImage(previousImage.src, previousImage.caption);
			}
		}

		function setCurrentImage(src, caption) {
			caption = caption == null? "" : caption;
			currentImage = {
				src: src,
				caption: caption
			};

		}

		function shouldShowFullscreen(){
			return fullScreenShown;
		}

		function showFullScreen(){
			fullScreenShown = true;
		}
	}]);
define("ImageService", function(){});


const UtilServiceProvider = angular.module('UtilServiceProvider', [])
	.factory('UtilService', ['$transitions', '$state', '$timeout', '$http', function ($transitions, $state, $timeout, $http) {

		return {
			$transitions: $transitions,
			$state: $state,
			$timeout: $timeout,
			$http: $http
		};
	}]);
define("UtilService", function(){});



const diapoComponent = {
	controller: ['ImageService', '$timeout', diapoComponentController],
	controllerAs: "diaporama",
	bindings: {
	},
	templateUrl: "./js/cg-diapo.template.html"
}

function diapoComponentController(ImageService, $timeout){
	/************** LOCAL VARIABLES **************/
	const view = this;

	/************** SCOPE VARIABLES **************/
	view.imageService = ImageService;
	view.isLoading = false;

	/************** SCOPE FUNCTIONS **************/
	view.selectNextImage = selectNextImage;
	view.selectPreviousImage = selectPreviousImage;
	view.setCurrentImage = setCurrentImage;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function selectNextImage(){
		view.isLoading = true;
		$timeout(function(){
			ImageService.selectNextImage();
			view.isLoading = false;
		},200)
	}

	function selectPreviousImage(){
		view.isLoading = true;
		$timeout(function(){
			ImageService.selectPreviousImage();
			view.isLoading = false;
		},200)
	}

	function setCurrentImage(src, caption){
		if(src === ImageService.getCurrentImage().src) return;
		view.isLoading = true;
		$timeout(function(){
			ImageService.setCurrentImage(src, caption);
			view.isLoading = false;
		},200)
	}
};
define("cg-diapo.component", function(){});



const figureComponent = {
	controller: ['ImageService', figureComponentController],
	controllerAs: "figure",
	bindings: {
		src: '@',
		caption: '@'
	},
	templateUrl: "./js/cg-figure.template.html"
}

function figureComponentController(ImageService){
	/************** LOCAL VARIABLES **************/
	const view = this;

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/
	view.maximizePicture = maximizePicture;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function maximizePicture() {
		ImageService.setCurrentImage(view.src, view.caption);
		ImageService.showFullScreen();
	}
};
define("cg-figure.component", function(){});



const headerComponent = {
	controller: headerComponentController,
	controllerAs: "header",
	bindings: {
		id: "@"
	},
	templateUrl: "./js/cg-header.template.html"
}

function headerComponentController(){
	/************** LOCAL VARIABLES **************/
	const view = this;
	const isSmallScreen = getComputedStyle(document.getElementById("js-mobile-detection")).display !== "none";
	const isReallySmallScreen = window.innerWidth < 500;

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/
	view.$onInit = onInit;
	view.getArticleBackground = getArticleBackground;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function getArticleBackground(){
		if(!view.id) {
			return;
		}
		let fileName = "header";
		if (isReallySmallScreen) fileName += "_portrait";
		else if (isSmallScreen) fileName += "_small";

		return 'articles/'+ view.id +'/' + fileName + '.jpg';
	}

	function onInit(){
		const articles = varData.articles;

		if(view.id != null && view.id.length > 1) {
			const {title, date} = articles.find((article) => {return article.id === view.id});

			view.title = title;
			view.date = date;
		}
	}
};
define("cg-header.component", function(){});



const resumeComponent = {
	bindings: {
	},
	templateUrl: "./js/cg-resume.template.html"
}

function resumeController(){
	/************** LOCAL VARIABLES **************/

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
};
define("cg-resume.component", function(){});

function codeDirective() {
	let fileName = "";

	return {
		scope: {
			name: "@"
		},
		link: parseCode
	}

	function createHtmlCode(rawCode) {
		let returnCode = '<div class="code-component">';
		if(fileName != null) returnCode += '<div class="code-filename">' + fileName + '</div>';

		for (let i = 0; i < rawCode.length; i++) {
			returnCode += processLine(rawCode[i], i);
		}

		returnCode += '</div>';

		return returnCode;
	}

	function isComment(line){
		line = line.replace(" ", "");
		line = line.replace("	", "");

		return line.indexOf("//") > -1 || line.indexOf("/*") > -1 || line.indexOf("*/") > -1 || line[0] === "*";
	}

	function parseCode(scope, element){
		const innerHTML = element[0].innerHTML;
		const textParsed = innerHTML.split("\n");
		fileName = scope.name;

		let textWithoutEmptyLines = [];

		for (let i = 0; i < textParsed.length; i++) {
			if(textParsed[i].replace(" ","").replace(/\t/g, "").length > 0) {
				textWithoutEmptyLines.push(textParsed[i]);
			}
		}

		const lengthOfIndent = textWithoutEmptyLines[textWithoutEmptyLines.length - 1].match(/\t/g).length;

		let textWithoutIndent = [];

		for (let i = 0; i < textWithoutEmptyLines.length; i++) {
			textWithoutIndent.push(textWithoutEmptyLines[i].substring(lengthOfIndent));
		}

		const createdCode = createHtmlCode(textWithoutIndent);

		element[0].innerHTML = createdCode;
	}

	function processFunction(rawLine) {
		const functionPosition = rawLine.indexOf("function");
		let parenthesisPosition = functionPosition + 8;
		let endPosition = functionPosition + 9;

		for (let i = parenthesisPosition; i < rawLine.length; i++) {
			if (rawLine[i] == ("(")) {
				parenthesisPosition = i;
			}
			else if (rawLine[i] == (")")) {
				endPosition = i;
				break;
			}
		}

		if (endPosition - parenthesisPosition > 1) {
			const argsString = rawLine.substring(parenthesisPosition+1, endPosition);
			let args = argsString.replace(" ", "").split(",");

			for (let i = 0; i < args.length; i++) {
				args[i] = '<span class="function-arg">' + args[i] + "</span>";
			}

			rawLine = rawLine.replace(argsString, args.join(", "));
		}
		if (parenthesisPosition - functionPosition > 9) {
			const functionName = rawLine.substring(functionPosition + 9, parenthesisPosition).replace(" ", "");
			rawLine = rawLine.replace("function", '<span class="function-dec">function</span>')
			rawLine = rawLine.replace(functionName, '<span class="function-name">' + functionName + "</span>");
		}

		return rawLine;
	}

	function processLine(rawLine, lineNumber) {
		if(isComment(rawLine)) {
			rawLine = '<span class="comment">' + rawLine + '</span>';
			rawLine = rawLine.replace("\	", '<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');
		}
		else{
			rawLine = rawLine.replace("&gt;", ">");
			rawLine = rawLine.replace("&lt;", "<");
			rawLine = rawLine.replace(/[-=+*><]/g, function(string){
				return "<span class='symbol'>" + string + '</span>';
			});
			rawLine = rawLine.replace(/\"(.+?)\"/g, function(string){
				if(string == '"symbol"') return string;
				return '<span class="string">' + string + '</span>';
			})
			rawLine = rawLine.replace(/\'(.+?)\'/g, function(string){
				if(string == "'symbol'") return string;
				return '<span class="string">' + string + '</span>';
			})
			rawLine = rawLine.replace('var ', '<span class="var">var</span> ');
			rawLine = rawLine.replace('const ', '<span class="var">const</span> ');
			rawLine = rawLine.replace('let ', '<span class="var">let</span> ');
			rawLine = rawLine.replace('return ', '<span class="return">return</span> ');
			rawLine = rawLine.replace('for (', '<span class="for">for</span> (');
			rawLine = rawLine.replace('for(', '<span class="for">for</span>(');
			rawLine = rawLine.replace('if (', '<span class="if">if</span> (');
			rawLine = rawLine.replace('if(', '<span class="if">if</span>(');
			rawLine = rawLine.replace('else ', '<span class="else">else</span> ');
			rawLine = rawLine.replace('else{', '<span class="else">else</span>{');
			rawLine = rawLine.replace("\	", '<span class="tab">&nbsp;&nbsp;&nbsp;&nbsp;</span>');

			if(rawLine.indexOf("\\") > -1) {
				const additionalChar = rawLine[rawLine.indexOf("\\") +1];
				rawLine = rawLine.replace("\\" + additionalChar, '<span class="escape-char">\\' + additionalChar + '</span>');
			}

			if(rawLine.indexOf("function") > -1) {
				rawLine = processFunction(rawLine);
			}

			if (rawLine.indexOf("(") > -1 && rawLine.indexOf("function-name") === -1) {
				rawLine = processParenthesis(rawLine);
			}

			if (rawLine.indexOf("function-arg") === -1) {

				rawLine = rawLine.replace(/\d+/g, function(string){
					const precLetter = rawLine[rawLine.indexOf(string) -1];
					const nextLetter = rawLine[rawLine.indexOf(string) +1];
					if(precLetter.toLowerCase() != precLetter.toUpperCase()) return string;
					if(nextLetter.toLowerCase() != nextLetter.toUpperCase()) return string;
					return '<span class="number">' + string + "</span>"
				})
			}
		}

		return '<div class="code-line"><div class="code--line-number">' + (lineNumber +1) + '</div><div class="code--line-content">' + rawLine + '</div></div>';
	}

	function processParenthesis(rawLine) {
		const parenthesisPosition = rawLine.indexOf("(");
		let endPosition = 0;
		let stopChar = "";

		if(rawLine.substring(parenthesisPosition+1, rawLine.length -1).indexOf("(") > -1 ) {
			rawLine = rawLine.substring(0, parenthesisPosition) + "(" + processParenthesis(rawLine.substring(parenthesisPosition +1, rawLine.length -1));
		};

		for (let i = parenthesisPosition -1; i > 0; i--) {
			if(!/^[A-Z]$/i.test(rawLine[i]) && rawLine[i] != " ") {
				endPosition = i+1;
				stopChar = rawLine[i];
				break;
			}
		}

		const foundWord = rawLine.substring(endPosition, parenthesisPosition);

		return rawLine.replace(stopChar + foundWord + "(", stopChar + '<span class="function">' + foundWord + '</span>(');

	}
};
define("cg-code.directive", function(){});

'use strict'

require([
	'data',

	/* Controllers */
	'MainCtrl',

	/* Services */
	'ImageService',
	'UtilService',

	/* Components & Directives */
	'cg-diapo.component',
	'cg-figure.component',
	'cg-header.component',
	'cg-resume.component',
	'cg-code.directive'
	]);

const requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
	'ImageServiceProvider',
	'UtilServiceProvider'
];

angular.module('app',requiredServices)
	.controller('MainController', ['$scope', 'ImageService', 'UtilService', MainController])

	.component('cgDiapo', diapoComponent)
	.component('cgFigure', figureComponent)
	.component('cgHeader', headerComponent)
	.component('cgResume', resumeComponent)

	.directive('cgCode', codeDirective)

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Default entry point */
		$urlRouterProvider.otherwise(function(){
			return ""
		});

		const debugMode = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";

		const date = new Date(Date.now());
		const hourlyBuster = "?v=" + (date.getYear() +1900) + "|" + (date.getMonth() +1) + "|" + date.getDate() + "|" + (date.getHours());
		const millisecondlyBuster = "?v=" + date.getTime();
		const cacheBuster = !debugMode ? hourlyBuster : millisecondlyBuster;

		$stateProvider
			.state('home', {
				url: '/',
				cache: !debugMode,
				templateUrl: 'pages/home.template.html' + cacheBuster
			})

			.state('about', {
				url: '/about',
				cache: !debugMode,
				templateUrl: 'pages/about.template.html' + cacheBuster
			})
			.state('contact', {
				url: '/contact',
				cache: !debugMode,
				templateUrl: 'pages/contact.template.html' + cacheBuster
			})
			.state('resume', {
				url: '/resume',
				cache: !debugMode,
				templateUrl: 'pages/resume.template.html' + cacheBuster
			})
			.state('resume-print', {
				url: '/resume-print',
				cache: !debugMode,
				templateUrl: 'pages/resume-print.template.html' + cacheBuster
			})

			.state('dark-side-internet-adult-seo', {
				url: '/dark-side-internet-adult-seo',
				cache: !debugMode,
				templateUrl: 'articles/dark-side-internet-adult-seo/template.html' + cacheBuster
			})
			.state('imensana-social-fitness-app', {
				url: '/imensana-social-fitness-app',
				cache: !debugMode,
				templateUrl: 'articles/imensana-social-fitness-app/template.html' + cacheBuster
			})
			.state('learning-how-to-learn', {
				url: '/learning-how-to-learn',
				cache: !debugMode,
				templateUrl: 'articles/learning-how-to-learn/template.html' + cacheBuster
			})
			.state('red-cross-donor-app', {
				url: '/red-cross-donor-app',
				cache: !debugMode,
				templateUrl: 'articles/red-cross/template.html' + cacheBuster
			})
			.state('red-sox-companion-app', {
				url: '/red-sox-companion-app',
				cache: !debugMode,
				templateUrl: 'articles/red-sox-companion-app/template.html' + cacheBuster
			})
			.state('robohat-an-interface-to-make-hats', {
				url: '/robohat-an-interface-to-make-hats',
				cache: !debugMode,
				templateUrl: 'articles/robohat-an-interface-to-make-hats/template.html' + cacheBuster
			})
			.state('self-loading-controller-angularjs', {
				url: '/self-loading-controller-angularjs',
				cache: !debugMode,
				templateUrl: 'articles/self-loading-controller-angularjs/template.html' + cacheBuster
			})

		$locationProvider.html5Mode(!debugMode);

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});
define("app", function(){});

