'use strict';

var hashApp = angular.module('hashApp', []);

hashApp.controller('InputCtrl', function($scope) {

	$scope.algorithms = [ 'SHA512', 'SHA256', 'SHA1', 'MD5' ];

	$scope.input = '';

	if ('localStorage' in window && 'algorithm' in localStorage) {
		$scope.algorithm = localStorage.algorithm;
	} else {
		$scope.algorithm = $scope.algorithms[0];
	}

	$scope.hash = function() {

		if ($scope.input.length) {
			return '' + CryptoJS[$scope.algorithm]($scope.input);
		} else {
			return '';
		}
	};

	$scope.change = function() {

		if ('localStorage' in window) {
			localStorage.algorithm = $scope.algorithm;
		}
	};
});

