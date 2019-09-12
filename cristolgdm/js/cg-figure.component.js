'use strict';

var templateUrlPrefix = location.hostname === "pixel-breath" ? "./cristolgdm/" : "./";

var figureComponent = {
	controller: ['ImageService', figureComponentController],
	controllerAs: "figure",
	bindings: {
		src: '@',
		caption: '@'
	},
	templateUrl: templateUrlPrefix + "js/cg-figure.template.html"
}

function figureComponentController(ImageService){
	/************** LOCAL VARIABLES **************/
	var view = this;

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