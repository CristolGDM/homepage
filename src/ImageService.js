'use strict';
export const ImageServiceProvider = angular.module('ImageServiceProvider', [])
	.factory('ImageService', ['$transitions', function ($transitions) {

		/************** CONSTANTS **************/
		let allImages = [];
		const allImagesDictionary = {};
		let currentImage = {};
		let fullScreenShown = false;

		/************ START PROCESS ************/
		$transitions.onSuccess({}, function(){
			const images = document.getElementsByTagName('cg-figure');
			if(!images) {
				return;
			}
			allImages = Array.from(images).map((image) => {
				allImagesDictionary[image.getAttribute("src")] = image.getAttribute("caption");
				return {
				src: image.getAttribute("src"),
				caption: image.getAttribute("caption")
			}});
		})

		$transitions.onStart({}, function(){
			hideFullScreen();
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
			const currentImageIndex = allImages.findIndex((image) => {return image.src === currentImage.src});
			const nextImageIndex = currentImageIndex === -1 ? currentImageIndex
			 : currentImageIndex === allImages.length -1 ? 0 : currentImageIndex +1;

			const nextImage = allImages[nextImageIndex];
			setCurrentImage(nextImage.src, nextImage.caption);
		}

		function selectPreviousImage(){
			const currentImageIndex = allImages.findIndex((image) => {return image.src === currentImage.src});
			const previousImageIndex = currentImageIndex === -1 ? currentImageIndex
			 : currentImageIndex === 0 ? allImages.length -1 : currentImageIndex -1;

			const previousImage = allImages[previousImageIndex];
			setCurrentImage(previousImage.src, previousImage.caption);
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
	}]);