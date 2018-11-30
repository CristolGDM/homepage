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
				url: '/dark-side-internet-adult-seo',
				templateUrl: 'articles/adult-seo/template.html'
			})
			.state('imensana', {
				url: '/imensana-social-fitness-app',
				templateUrl: 'articles/imensana/template.html'
			})
			.state('red-cross', {
				url: '/red-cross-donor-app',
				templateUrl: 'articles/red-cross/template.html'
			})
			.state('robohat', {
				url: '/robohat-an-interface-to-make-hats',
				templateUrl: 'articles/robohat/template.html'
			})

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});