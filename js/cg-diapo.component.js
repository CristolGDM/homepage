'use strict';

var diapoComponent = {
	controller: ['ImageService', diapoComponentController],
	controllerAs: "diaporama",
	bindings: {
	},
	templateUrl: "/js/cg-diapo.template.html"
}

function diapoComponentController(ImageService){
	/************** LOCAL VARIABLES **************/
	var view = this;

	/************** SCOPE VARIABLES **************/
	view.imageService = ImageService;

	/************** SCOPE FUNCTIONS **************/

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
}