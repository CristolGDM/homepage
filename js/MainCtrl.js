var MainController = function($scope, $transitions, $state, $timeout, ImageService){

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
	view.goToArticle = goToArticle;
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

	function goToArticle(id){
		var targetBlock = document.getElementById("header-" + id);
		var duration = 200;

		scrollToX(document.body, document.body.scrollTop, targetBlock.offsetTop, 0, 1/duration, 20, easeOutCuaic);

		$timeout(function(){
				$state.go(id);
			}, duration + 100)


	}

	function onInit(){
		view.titles["header"] = data.title;
		for (var i = 0; i < data.articles.length; i++) {
			view.titles[data.articles[i].id] = data.articles[i].title;
		}
	}

	function scrollBackTop(duration) {
		if(duration == null) duration = 400;

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