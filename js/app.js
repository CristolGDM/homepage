'use strict'

require([
	'./data',

	/* Controllers */
	'../cristolgdm/js/MainCtrl',

	/* Services */
	'../cristolgdm/js/ImageService',

	/* Components & Directives */
	'../cristolgdm/js/cg-diapo.component',
	'../cristolgdm/js/cg-figure.component',
	'../cristolgdm/js/cg-header.component',
	'../cristolgdm/js/cg-code.directive'
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
			.state('game-dat', {
				url: '/game-conversation-simulator',
				cache: !debugMode,
				templateUrl: 'articles/game-dat/template.html' + cacheBuster
			})
			.state('rpg-shonen', {
				url: '/shonen-tabletop-analysis',
				cache: !debugMode,
				templateUrl: 'articles/rpg-shonen/template.html' + cacheBuster
			})
			.state('shadowrun-overprep', {
				url: '/shadowrun-handling-overplanning',
				cache: !debugMode,
				templateUrl: 'articles/shadowrun-overprep/template.html?v=' + cacheBuster
			})
			.state('mhr-hack-affil', {
				url: '/mhr-hacking-affiliations',
				cache: !debugMode,
				templateUrl: 'articles/mhr-hack-affil/template.html?v=' + cacheBuster
			})

		$locationProvider.html5Mode(!debugMode);

		}]);


angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});