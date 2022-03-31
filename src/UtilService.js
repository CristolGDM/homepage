'use strict';
const angular = require("angular");
export const UtilServiceProvider = angular.module('UtilServiceProvider', [])
	.factory('UtilService', ['$transitions', '$state', '$timeout', '$http', function ($transitions, $state, $timeout, $http) {

		return {
			$transitions: $transitions,
			$state: $state,
			$timeout: $timeout,
			$http: $http
		};
	}]);