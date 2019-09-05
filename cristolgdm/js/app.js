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

		var debugMode = true;

		$stateProvider
			.state('home', {
				url: '/',
				cache: !debugMode,
				templateUrl: 'pages/home.template.html'
			})
			.state('resume', {
				url: '/resume',
				cache: !debugMode,
				templateUrl: 'pages/resume.template.html'
			})
			.state('contact', {
				url: '/contact',
				cache: !debugMode,
				templateUrl: 'pages/contact.template.html'
			})
			.state('about', {
				url: '/about',
				cache: !debugMode,
				templateUrl: 'pages/about.template.html'
			})
			.state('game-dat', {
				url: '/game-conversation-simulator',
				cache: !debugMode,
				templateUrl: 'articles/game-dat/template.html'
			})
			.state('adult-seo', {
				url: '/dark-side-internet-adult-seo',
				cache: !debugMode,
				templateUrl: 'articles/adult-seo/template.html'
			})
			.state('imensana', {
				url: '/imensana-social-fitness-app',
				cache: !debugMode,
				templateUrl: 'articles/imensana/template.html'
			})
			.state('red-cross', {
				url: '/red-cross-donor-app',
				cache: !debugMode,
				templateUrl: 'articles/red-cross/template.html'
			})
			.state('red-sox', {
				url: '/red-sox-companion-app',
				cache: !debugMode,
				templateUrl: 'articles/red-sox/template.html'
			})
			.state('robohat', {
				url: '/robohat-an-interface-to-make-hats',
				cache: !debugMode,
				templateUrl: 'articles/robohat/template.html'
			})
			.state('self-loading-cont', {
				url: '/self-loading-controller-angularjs',
				cache: !debugMode,
				templateUrl: 'articles/self-loading-cont/template.html'
			})

		$locationProvider.html5Mode(!debugMode);

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});