'use strict'

require([
	'data',

	/* Controllers */
	'MainCtrl',

	/* Services */
	'ImageService',

	/* Components & Directives */
	'cg-diapo.component',
	'cg-figure.component'
	]);

var requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
	'ImageServiceProvider'
];

angular.module('app',requiredServices)
	.controller('MainController', ['$scope', MainController])

	.component('cgDiapo', diapoComponent)
	.component('cgFigure', figureComponent)

	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
		/* Default entry point */
		$urlRouterProvider.otherwise(function(){
			return ""
		});

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'mainTemplate.html'
			})
			.state('adult-seo', {
				url: '/adult-seo',
				templateUrl: 'articles/adult-seo/template.html'
			})
			.state('robohat', {
				url: '/robohat',
				templateUrl: 'articles/robohat/template.html'
			})
			.state('red-cross', {
				url: '/red-cross',
				templateUrl: 'articles/red-cross/template.html'
			})

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});