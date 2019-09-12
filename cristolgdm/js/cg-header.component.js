'use strict';

var templateUrlPrefix = "./";

if(location.hostname === "pixel-breath" || location.port === "8080") {
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

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/
	view.$onInit = onInit;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function onInit(){
		var thisId = view.id;
		var articles = varData.articles;
		var thisArticle;

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