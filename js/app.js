'use strict'

require([
	'data'
	]);

var MainController = function($scope){

	/*******************/
	/* Local variables */
	/*******************/
	var view = this;
	var data = varData;

	/*******************/
	/* Scope variables */
	/*******************/
	view.articles = data.articles;
	view.titles = {};

	/*******************/
	/* Scope functions */
	/*******************/
	view.$onInit = onInit;

	/*******************/
	/* Key  listeners  */
	/*******************/

	/*******************/
	/* Local functions */
	/*******************/

	function onInit(){
		view.titles["header"] = data.title;
		for (var i = 0; i < data.articles.length; i++) {
			view.titles[data.articles[i].id] = data.articles[i].title;
		}
	}
}

var requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
];

angular.module('app',requiredServices)
	.controller('MainController', ['$scope', MainController])
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

		}]);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['app']);
});