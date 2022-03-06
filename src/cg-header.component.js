'use strict';

import html from './cg-header.template.html';
import {httpGetAsync} from './utils';

export const headerComponent = {
	controller: headerComponentController,
	controllerAs: "header",
	bindings: {
		id: "@"
	},
	template: html
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

	async function onInit(){
		if(!view.id || !view.id.length) {
			return;
		}

		const rawConfig = await httpGetAsync('./config.json');
		const config = await JSON.parse(rawConfig);

		const {title, date} = config.articles.find((article) => {return article.id === view.id});

		view.title = title;
		view.date = new Date(date).toLocaleString('default', {month: "long", year: "numeric"});
	}
}