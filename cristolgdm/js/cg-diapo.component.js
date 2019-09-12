'use strict';

var templateUrlPrefix = "./";

if(location.hostname === "pixel-breath" || location.port === "8080") {
	templateUrlPrefix += "cristolgdm/";
}

var diapoComponent = {
	controller: ['ImageService', '$timeout', diapoComponentController],
	controllerAs: "diaporama",
	bindings: {
	},
	templateUrl: templateUrlPrefix + "js/cg-diapo.template.html"
}

function diapoComponentController(ImageService, $timeout){
	/************** LOCAL VARIABLES **************/
	var view = this;

	/************** SCOPE VARIABLES **************/
	view.imageService = ImageService;
	view.isLoading = false;

	/************** SCOPE FUNCTIONS **************/
	view.selectNextImage = selectNextImage;
	view.selectPreviousImage = selectPreviousImage;
	view.setCurrentImage = setCurrentImage;

	/***************** LISTENERS *****************/

	/********** FUNCTIONS DECLARATIONS ***********/
	function selectNextImage(){
		view.isLoading = true;
		$timeout(function(){
			ImageService.selectNextImage();
			view.isLoading = false;
		},200)
	}

	function selectPreviousImage(){
		view.isLoading = true;
		$timeout(function(){
			ImageService.selectPreviousImage();
			view.isLoading = false;
		},200)
	}

	function setCurrentImage(src, caption){
		view.isLoading = true;
		$timeout(function(){
			ImageService.setCurrentImage(src, caption);
			view.isLoading = false;
		},200)
	}
}