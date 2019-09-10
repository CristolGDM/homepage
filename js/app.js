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

		$stateProvider
			.state('home', {
				url: '/',
				cache: !debugMode,
				templateUrl: 'pages/home.template.html'
			})
			.state('game-dat', {
				url: '/game-conversation-simulator',
				cache: !debugMode,
				templateUrl: 'articles/game-dat/template.html'
			})
			.state('rpg-shonen', {
				url: '/shonen-tabletop-analysis',
				cache: !debugMode,
				templateUrl: 'articles/rpg-shonen/template.html'
			})
			.state('shadowrun-overprep', {
				url: '/shadowrun-handling-overplanning',
				cache: !debugMode,
				templateUrl: 'articles/shadowrun-overprep/template.html'
			})

		$locationProvider.html5Mode(!debugMode);

		}]);


angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});