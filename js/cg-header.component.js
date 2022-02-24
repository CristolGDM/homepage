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

		return `articles/${view.id}/${fileName}.jpg`
	}

	function onInit(){
		const articles = varData.articles;

		if(!view.id || !view.id.length) {
			return;
		}

		const {title, date} = articles.find((article) => {return article.id === view.id});

		view.title = title;
		view.date = date;
	}
}