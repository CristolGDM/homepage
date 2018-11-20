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
			getAllImages: getAllImages,
			getCurrentImage: getCurrentImage,
			hideFullScreen: hideFullScreen,
			selectNextImage: selectNextImage,
			selectPreviousImage: selectPreviousImage,
			setCurrentImage: setCurrentImage,
			shouldShowFullscreen: shouldShowFullscreen,
			showFullScreen: showFullScreen
		};

		/******** FUNCTION DECLARATIONS ********/
		function getAllImages() {
			return allImages;
		}

		function getCurrentImage() {
			return currentImage;
		}

		function hideFullScreen(){
			currentImage = {};
			fullScreenShown = false;
		}

		function selectNextImage(){
			var nextImage;

			for (var i = 0; i < allImages.length; i++) {
				if(allImages[i].src === currentImage.src) {
					if (i === allImages.length -1) {
						nextImage = allImages[0];
						break;
					}
					else {
						nextImage = allImages[i+1];
						break;
					}
				}
			}

			if(nextImage != null) {
				setCurrentImage(nextImage.src, nextImage.caption);
			}
		}

		function selectPreviousImage(){
			var previousImage;

			for (var i = 0; i < allImages.length; i++) {
				if(allImages[i].src === currentImage.src) {
					if (i === 0) {
						previousImage = allImages[allImages.length -1];
						break;
					}
					else {
						previousImage = allImages[i-1];
						break;
					}
				}
			}

			if(previousImage != null) {
				setCurrentImage(previousImage.src, previousImage.caption);
			}
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