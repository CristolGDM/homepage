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

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Default entry point */
		$urlRouterProvider.otherwise(function(){
			return ""
		});

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'pages/home.template.html'
			})
			.state('game-dat', {
				url: '/game-conversation-simulator',
				templateUrl: 'articles/game-dat/template.html'
			})
			.state('rpg-shonen', {
				url: '/shonen-tabletop-analysis',
				templateUrl: 'articles/rpg-shonen/template.html'
			})

		$locationProvider.html5Mode(true);

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});