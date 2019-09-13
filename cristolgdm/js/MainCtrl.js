var MainController = function($scope, ImageService, UtilService){

	/*******************/
	/* Local variables */
	/*******************/
	var view = this;
	var data = varData;

	/*******************/
	/* Scope variables */
	/*******************/
	view.articles = data.articles;
	view.coolImage = "";
	view.coolImageSrc = "";
	view.sideMenuOpened = false;
	view.titles = {};
	view.transitioning = false;
	view.windowHeight = "";

	/*******************/
	/* Scope functions */
	/*******************/
	view.$onInit = onInit;
	view.goToArticle = goToArticle;
	view.scrollBackTop = scrollBackTop;
	view.shouldShowSideMenu = shouldShowSideMenu;

	/*******************/
	/* Key  listeners  */
	/*******************/
	UtilService.$transitions.onStart({}, function(){
		view.transitioning = true;
	})
	UtilService.$transitions.onSuccess({}, function(){
		window.scrollTo(0, 0);
		view.sideMenuOpened = false;
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

	function getRandomWallpaper(){
		UtilService.$http.get('https://www.reddit.com/r/ImaginaryWorlds/hot.json?sort=top&t=week')
			.then(function(response){
				var img = randArray(response.data.data.children).data;
				view.coolImage = img;

				if(location.hostname === "cristolgdm" || location.port === "8081") {
					return;
				}

				var title = img.title;
				var titleString = "";

				if (title.toUpperCase().indexOf(" BY ") > -1){
					var index = title.toUpperCase().indexOf(" BY ");
					var art = title.slice(0, index);
					var artist = title.slice(index + 4, title.length);

					titleString = "%c" + art + "%c by %c" + artist
				}
				else {
					titleString = "%c%c%c" + title;
				}

				var backgroundStyle = "margin-top: 15px;"
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

				}
			);
	}

	function getWindowHeight(){
		UtilService.$timeout(function(){
			view.windowHeight = window.innerHeight + "px";
		}, 1);
	}

	function goToArticle(id){
		var targetBlock = document.getElementById("header-" + id);
		var duration = 200;
		view.transitioning = true;

		scrollToX(document.body, document.body.scrollTop, targetBlock.offsetTop, 0, 1/duration, 20, easeOutCuaic)
			.then(function(){
				UtilService.$state.go(id);
			})
	}

	function onInit(){
		view.titles["header"] = data.title;
		getWindowHeight();
		getRandomWallpaper();
	}	

	function randArray(array) {
		var index = Math.floor(Math.random()*array.length);
		return array[index];
	}

	function scrollBackTop(duration) {
		if(duration == null) duration = 400;

		scrollToX(document.body, document.body.scrollTop, document.body.offsetTop, 0, 1/duration, 20, easeOutCuaic);
	}

	function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
		var promise = new Promise(function(resolve,reject){
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
}