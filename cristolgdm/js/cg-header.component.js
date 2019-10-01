'use strict';

var templateUrlPrefix = "./";

if(location.hostname.indexOf("pixel-breath") > -1 || location.port === "8080") {
	templateUrlPrefix += "cristolgdm/";
}

var headerComponent = {
	controller: headerComponentController,
	controllerAs: "header",
	bindings: {
		id: "@"
	},
	templateUrl: templateUrlPrefix + "js/cg-header.template.html"
}

function headerComponentController(){
	/************** LOCAL VARIABLES **************/
	var view = this;
	var isSmallScreen = getComputedStyle(document.getElementById("js-mobile-detection")).display !== "none";
	var isReallySmallScreen = window.innerWidth < 500;

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/
	view.$onInit = onInit;
	view.getArticleBackground = getArticleBackground;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function getArticleBackground(){
		var fileName = "header";
		if (isReallySmallScreen) fileName += "_portrait";
		else if (isSmallScreen) fileName += "_small";

		return 'articles/'+ view.id +'/' + fileName + '.jpg';
	}

	function onInit(){
		var thisId = view.id;
		var articles = varData.articles;
		var thisArticle;

		if(view.id != null && view.id.length > 1) {
			for (var i = 0; i < articles.length; i++) {
				if(articles[i].id === thisId) {
					thisArticle = articles[i];
					break;
				}
			}

			view.title = thisArticle.title;
			view.date = thisArticle.date;
		}
	}
}