'use strict';

import html from './cg-diapo.template.html'

export const diapoComponent = {
	controller: ['ImageService', '$timeout', diapoComponentController],
	controllerAs: "diaporama",
	bindings: {
		showSlideshow: '@'
	},
	template: html
}

function diapoComponentController(ImageService, $timeout){
	/************** LOCAL VARIABLES **************/
	const view = this;

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
		if(src === ImageService.getCurrentImage().src) return;
		view.isLoading = true;
		$timeout(function(){
			ImageService.setCurrentImage(src, caption);
			view.isLoading = false;
		},200)
	}
}