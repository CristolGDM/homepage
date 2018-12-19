var MainController = function($scope, $transitions, ImageService){

	/*******************/
	/* Local variables */
	/*******************/
	var view = this;
	var data = varData;

	/*******************/
	/* Scope variables */
	/*******************/
	view.articles = data.articles;
	view.sideMenuOpened = false;
	view.titles = {};

	/*******************/
	/* Scope functions */
	/*******************/
	view.$onInit = onInit;
	view.scrollBackTop = scrollBackTop;
	view.shouldShowSideMenu = shouldShowSideMenu;

	/*******************/
	/* Key  listeners  */
	/*******************/
	$transitions.onSuccess({}, function(){
		window.scrollTo(0, 0);
		view.sideMenuOpened = false;
	})

	/*******************/
	/* Local functions */
	/*******************/

	function onInit(){
		view.titles["header"] = data.title;
		for (var i = 0; i < data.articles.length; i++) {
			view.titles[data.articles[i].id] = data.articles[i].title;
		}
	}

	function scrollBackTop() {
		var duration = 400;

		scrollToX(document.body, document.body.scrollTop, document.body.offsetTop, 0, 1/duration, 20, easeOutCuaic);
	}

	function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
		if (t01 < 0 || t01 > 1 || speed<= 0) {
			element.scrollTop = xTo;
			return;
		}
		element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
		t01 += speed * step;

		setTimeout(function() {
			scrollToX(element, xFrom, xTo, t01, speed, step, motion);
		}, step);
	}
	function easeOutCuaic(t){
		t--;
		return t*t*t+1;
	}

	function shouldShowSideMenu(){
		return !ImageService.shouldShowFullscreen();
	}
}