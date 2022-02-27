'use strict'

import {MainController} from './MainCtrl';

import {ImageServiceProvider} from './ImageService';
import {UtilServiceProvider} from './UtilService';

import styles from "../css/style.css";

import {codeDirective} from './cg-code.directive';
import {diapoComponent} from './cg-diapo.component';
import {figureComponent} from './cg-figure.component';
import {headerComponent} from './cg-header.component';
import {resumeComponent} from './cg-resume.component';

import {httpGetAsync} from './utils';

const requiredServices = [
	/* External services */
	'ui.router',

	/* Local Services */
	'ImageServiceProvider',
	'UtilServiceProvider'
];

httpGetAsync("./config.json").then(async (dataRaw) => {
	const config = await JSON.parse(dataRaw);

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

			const debugMode = !location.hostname.includes('cristol');

			const date = new Date(Date.now());
			const hourlyBuster = "?v=" + (date.getYear() +1900) + "|" + (date.getMonth() +1) + "|" + date.getDate() + "|" + (date.getHours());
			const millisecondlyBuster = "?v=" + date.getTime();
			const cacheBuster = debugMode ? millisecondlyBuster : hourlyBuster;

			$stateProvider
				.state('home', {
					url: '/',
					cache: !debugMode,
					templateUrl: `pages/home.template.html` + cacheBuster
				})
			
			config.pages.map((page) => {
				$stateProvider
					.state(page, {
						url: `/${page}`,
						cache: !debugMode,
						templateUrl: `pages//${page}.template.html` + cacheBuster
					})
			})

			config.articles.map((article) => {
				const {id} = article;
				$stateProvider
				.state(id, {
					url: `/${id}`,
					cache: !debugMode,
					templateUrl: `articles/${id}/template.html?v=${cacheBuster}`
				})
			})

			$locationProvider.html5Mode(!debugMode);

			}]);

	angular.element(document).ready(function () {
		angular.bootstrap(document, ['app']);
	});
})