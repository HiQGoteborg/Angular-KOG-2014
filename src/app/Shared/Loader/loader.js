angular.module('angular-kog')

// Simple directive to show a spinning loader icon
.directive('loader', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'loader.tpl.html'
	};
});