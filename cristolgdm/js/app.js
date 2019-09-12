'use strict'

require([
	'data',

	/* Controllers */
	'MainCtrl',

	/* Services */
	'ImageService',

	/* Components & Directives */
	'cg-diapo.component',
	'cg-figure.component',
	'cg-header.component',
	'cg-code.directive'
	]);

var requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
	'ImageServiceProvider'
];

angular.module('app',requiredServices)
	.controller('MainController', ['$scope', '$transitions', '$state', '$timeout', 'ImageService', MainController])

	.component('cgDiapo', diapoComponent)
	.component('cgFigure', figureComponent)
	.component('cgHeader', headerComponent)

	.directive('cgCode', codeDirective)	

	// .run(function($rootScope, $templateCache) {
	// 	$rootScope.$on('$viewContentLoaded', function() {
	// 		$templateCache.removeAll();
	// 	});
	// })

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Default entry point */
		$urlRouterProvider.otherwise(function(){
			return ""
		});

		var debugMode = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";

		var date = new Date(Date.now());
		var hourlyBuster = "?v=" + (date.getYear() +1900) + "|" + (date.getMonth() +1) + "|" + date.getDate() + "|" + (date.getHours());
		var millisecondlyBuster = "?v=" + date.getTime();
		var cacheBuster = !debugMode ? hourlyBuster : millisecondlyBuster;

		$stateProvider
			.state('home', {
				url: '/',
				cache: !debugMode,
				templateUrl: 'pages/home.template.html' + cacheBuster
			})
			.state('resume', {
				url: '/resume',
				cache: !debugMode,
				templateUrl: 'pages/resume.template.html' + cacheBuster
			})
			.state('contact', {
				url: '/contact',
				cache: !debugMode,
				templateUrl: 'pages/contact.template.html' + cacheBuster
			})
			.state('about', {
				url: '/about',
				cache: !debugMode,
				templateUrl: 'pages/about.template.html' + cacheBuster
			})
			.state('game-dat', {
				url: '/game-conversation-simulator',
				cache: !debugMode,
				templateUrl: 'articles/game-dat/template.html' + cacheBuster
			})
			.state('adult-seo', {
				url: '/dark-side-internet-adult-seo',
				cache: !debugMode,
				templateUrl: 'articles/adult-seo/template.html' + cacheBuster
			})
			.state('imensana', {
				url: '/imensana-social-fitness-app',
				cache: !debugMode,
				templateUrl: 'articles/imensana/template.html' + cacheBuster
			})
			.state('red-cross', {
				url: '/red-cross-donor-app',
				cache: !debugMode,
				templateUrl: 'articles/red-cross/template.html' + cacheBuster
			})
			.state('red-sox', {
				url: '/red-sox-companion-app',
				cache: !debugMode,
				templateUrl: 'articles/red-sox/template.html' + cacheBuster
			})
			.state('robohat', {
				url: '/robohat-an-interface-to-make-hats',
				cache: !debugMode,
				templateUrl: 'articles/robohat/template.html' + cacheBuster
			})
			.state('self-loading-cont', {
				url: '/self-loading-controller-angularjs',
				cache: !debugMode,
				templateUrl: 'articles/self-loading-cont/template.html' + cacheBuster
			})

		$locationProvider.html5Mode(!debugMode);

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});