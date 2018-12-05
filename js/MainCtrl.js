var MainController = function($scope, $transitions){

	/*******************/
	/* Local variables */
	/*******************/
	var view = this;
	var data = varData;

	/*******************/
	/* Scope variables */
	/*******************/
	view.articles = data.articles;
	view.titles = {};

	/*******************/
	/* Scope functions */
	/*******************/
	view.$onInit = onInit;
	view.scrollBackTop = scrollBackTop;

	/*******************/
	/* Key  listeners  */
	/*******************/
	$transitions.onSuccess({}, function(transition){
		window.scrollTo(0, 0);
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

	function scrollBackTop(){
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		})
	}
}