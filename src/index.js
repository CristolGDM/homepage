'use strict'

import {varData} from './data';

import {MainController} from './MainCtrl';

import {ImageServiceProvider} from './ImageService';
import {UtilServiceProvider} from './UtilService';

import styles from "../css/style.css";

import {codeDirective} from './cg-code.directive';
import {diapoComponent} from './cg-diapo.component';
import {figureComponent} from './cg-figure.component';
import {headerComponent} from './cg-header.component';
import {resumeComponent} from './cg-resume.component';

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

    const debugMode = !location.hostname.includes('cristol');

    const date = new Date(Date.now());
    const hourlyBuster = "?v=" + (date.getYear() +1900) + "|" + (date.getMonth() +1) + "|" + date.getDate() + "|" + (date.getHours());
    const millisecondlyBuster = "?v=" + date.getTime();
    const cacheBuster = debugMode ? millisecondlyBuster : hourlyBuster;

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
			});

		varData.articles.map((article) => {
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