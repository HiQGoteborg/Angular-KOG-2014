angular.module('angular-kog')

// Profile List Controller
.controller('ProfileListCtrl', ['$scope', '$location', '$timeout', 'ProfileApiService', function($scope, $location, $timeout, profileApi){

	// TODO Remove timeout
	$timeout(function() {
		$scope.profiles = profileApi.getAllProfiles();
	}, 500);

	$scope.open = function(id) {
		// Open profile by changing the route
		$location.path('/Profiles/'+id);
	};
}])

// Profile Controller
.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', '$timeout', 'ProfileApiService', function($scope, $routeParams, $sce, $timeout, profileApi) {

	// Get profile from service and make first name bold in the description
	var profile = profileApi.getProfile($routeParams.id),
		nameRegexp = new RegExp(profile.firstName, 'gi'),
		htmlDescription = profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>');

	// Specify the html description to be trusted (Strict Contextual Escaping)
	profile.htmlDescription = $sce.trustAsHtml(htmlDescription);

	// TODO Remove timeout
	$timeout(function() {
		$scope.profile = profile;
	}, 500);
}]);