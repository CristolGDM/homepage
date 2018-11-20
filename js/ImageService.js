'use strict';
var ImageServiceProvider = angular.module('ImageServiceProvider', [])
	.factory('ImageService', function () {

		/************** CONSTANTS **************/
		var allImages = [];
		var allImagesDictionary = {};
		var currentImage = {};
		var fullScreenShown = false;

		/************ START PROCESS ************/
		angular.element(document).ready(function(){
			var images = document.getElementsByTagName('cg-figure');

			for (var i = 0; i < images.length; i++) {
				allImages.push({
					src: images[i].getAttribute("src"),
					caption: images[i].getAttribute("caption")
				})

				allImagesDictionary[images[i].getAttribute("src")] = images[i].getAttribute("caption");
			}
		})

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
			currentImage = {};
			fullScreenShown = false;
		}

		function setCurrentImage(src, caption) {
			caption = caption == null? "" : caption;
			currentImage = {
				src: src,
				caption: caption
			};

		}

		function shouldShowFullscreen(){
			return fullScreenShown;
		}

		function showFullScreen(){
			fullScreenShown = true;
		}
	});