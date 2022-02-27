'use strict';

import html from './cg-figure.template.html';

export const figureComponent = {
	controller: ['ImageService', figureComponentController],
	controllerAs: "figure",
	bindings: {
		src: '@',
		caption: '@'
	},
	template: html
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
}