'use strict';

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
		const thisId = view.id;
		const articles = varData.articles;
		let thisArticle;

		if(view.id != null && view.id.length > 1) {
			for (let i = 0; i < articles.length; i++) {
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