angular.module('angular-kog')

.directive('loader', function() {
	// Runs during compile
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'loader.tpl.html'
	};
});