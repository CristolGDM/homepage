'use strict';
var ImageServiceProvider = angular.module('ImageServiceProvider', [])
	.factory('ImageService', function () {

		/************** CONSTANTS **************/
		var fullScreenShown = false;
		var currentImage = "";

		/************ START PROCESS ************/
		// onInit();

		return {
			getCurrentImage: getCurrentImage,
			hideFullScreen: hideFullScreen,
			setCurrentImage: setCurrentImage,
			shouldShowFullscreen: shouldShowFullscreen,
			showFullScreen: showFullScreen
		};

		/******** FUNCTION DECLARATIONS ********/
		function getCurrentImage() {
			return currentImage;
		}

		function hideFullScreen(){
			fullScreenShown = false;
		}

		function setCurrentImage(url) {
			currentImage = url;
		}

		function shouldShowFullscreen(){
			return fullScreenShown;
		}

		function showFullScreen(){
			fullScreenShown = true;
		}
	});