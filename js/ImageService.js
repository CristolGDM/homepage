'use strict';
var ImageServiceProvider = angular.module('ImageServiceProvider', [])
	.factory('ImageService', function () {

		/************** CONSTANTS **************/
		var fullScreenShown = false;

		/************ START PROCESS ************/
		// onInit();

		return {
			hideFullScreen: hideFullScreen,
			shouldShowFullscreen: shouldShowFullscreen,
			showFullScreen: showFullScreen
		};

		/******** FUNCTION DECLARATIONS ********/
		function hideFullScreen(){
			fullScreenShown = false;
		}

		function shouldShowFullscreen(){
			return fullScreenShown;
		}

		function showFullScreen(){
			fullScreenShown = true;
		}
	});