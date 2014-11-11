angular.module('angular-kog')

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/Profiles', {
			templateUrl: 'profilelist.tpl.html',
			controller: 'ProfileListCtrl'
		})
		.when('/Profiles/:id', {
			templateUrl: 'profile.tpl.html',
			controller: 'ProfileCtrl'
		})
		.when('/About', {
			templateUrl: 'about.tpl.html'
		})
		.otherwise({
			templateUrl: 'home.tpl.html'
		});
}]);