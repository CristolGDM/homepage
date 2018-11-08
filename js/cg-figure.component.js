'use strict';

var figureComponent = {
	controller: ['ImageService', figureComponentController],
	controllerAs: "figure",
	bindings: {
		src: '=',
		caption: '='
	},
	templateUrl: "/js/cg-figure.template.html"
}

function figureComponentController(ImageService){
	/************** LOCAL VARIABLES **************/
	var view = this;

	/************** SCOPE VARIABLES **************/

	/************** SCOPE FUNCTIONS **************/
	view.maximizePicture = maximizePicture;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function maximizePicture(src) {
		ImageService.setCurrentImage(src);
		ImageService.showFullScreen();
	}
}