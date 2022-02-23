'use strict'

require([
	'data',

	/* Controllers */
	'MainCtrl',

	/* Services */
	'ImageService',
	'UtilService',

	/* Components & Directives */
	'cg-diapo.component',
	'cg-figure.component',
	'cg-header.component',
	'cg-resume.component',
	'cg-code.directive'
	]);

const requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
	'ImageServiceProvider',
	'UtilServiceProvider'
];

angular.module('app',requiredServices)
	.controller('MainController', ['$scope', 'ImageService', 'UtilService', MainController])

	.component('cgDiapo', diapoComponent)
	.component('cgFigure', figureComponent)
	.component('cgHeader', headerComponent)
	.component('cgResume', resumeComponent)

	.directive('cgCode', codeDirective)

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Default entry point */
		$urlRouterProvider.otherwise(function(){
			return ""
		});

		const debugMode = location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "";

		const date = new Date(Date.now());
		const hourlyBuster = "?v=" + (date.getYear() +1900) + "|" + (date.getMonth() +1) + "|" + date.getDate() + "|" + (date.getHours());
		const millisecondlyBuster = "?v=" + date.getTime();
		const cacheBuster = !debugMode ? hourlyBuster : millisecondlyBuster;

		$stateProvider
			.state('home', {
				url: '/',
				cache: !debugMode,
				templateUrl: 'pages/home.template.html' + cacheBuster
			})

			.state('about', {
				url: '/about',
				cache: !debugMode,
				templateUrl: 'pages/about.template.html' + cacheBuster
			})
			.state('contact', {
				url: '/contact',
				cache: !debugMode,
				templateUrl: 'pages/contact.template.html' + cacheBuster
			})
			.state('resume', {
				url: '/resume',
				cache: !debugMode,
				templateUrl: 'pages/resume.template.html' + cacheBuster
			})
			.state('resume-print', {
				url: '/resume-print',
				cache: !debugMode,
				templateUrl: 'pages/resume-print.template.html' + cacheBuster
			})

			.state('dark-side-internet-adult-seo', {
				url: '/dark-side-internet-adult-seo',
				cache: !debugMode,
				templateUrl: 'articles/dark-side-internet-adult-seo/template.html' + cacheBuster
			})
			.state('imensana-social-fitness-app', {
				url: '/imensana-social-fitness-app',
				cache: !debugMode,
				templateUrl: 'articles/imensana-social-fitness-app/template.html' + cacheBuster
			})
			.state('learning-how-to-learn', {
				url: '/learning-how-to-learn',
				cache: !debugMode,
				templateUrl: 'articles/learning-how-to-learn/template.html' + cacheBuster
			})
			.state('red-cross-donor-app', {
				url: '/red-cross-donor-app',
				cache: !debugMode,
				templateUrl: 'articles/red-cross/template.html' + cacheBuster
			})
			.state('red-sox-companion-app', {
				url: '/red-sox-companion-app',
				cache: !debugMode,
				templateUrl: 'articles/red-sox-companion-app/template.html' + cacheBuster
			})
			.state('robohat-an-interface-to-make-hats', {
				url: '/robohat-an-interface-to-make-hats',
				cache: !debugMode,
				templateUrl: 'articles/robohat-an-interface-to-make-hats/template.html' + cacheBuster
			})
			.state('self-loading-controller-angularjs', {
				url: '/self-loading-controller-angularjs',
				cache: !debugMode,
				templateUrl: 'articles/self-loading-controller-angularjs/template.html' + cacheBuster
			})

		$locationProvider.html5Mode(!debugMode);

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});