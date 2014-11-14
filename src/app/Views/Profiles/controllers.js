angular.module('angular-kog')

// Profile List Controller
.controller('ProfileListCtrl', ['$scope', '$location', 'ProfilesApiService', function($scope, $location, profilesApi){

	profilesApi.getAllProfiles(function(profiles) {
		$scope.profiles = profiles;
	});

	$scope.open = function(id) {
		// Open profile by changing the route
		$location.path('/Profile/'+id);
	};
}])

// Profile Controller
.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', 'ProfilesApiService', function($scope, $routeParams, $sce, profilesApi) {

	// Get profile from service
	profilesApi.getProfile($routeParams.id, function(profile) {
		// Make first name bold in the description
		var nameRegexp = new RegExp(profile.firstName, 'gi'),
			htmlDescription = profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>');

		// Specify the html description to be trusted (Strict Contextual Escaping)
		profile.htmlDescription = $sce.trustAsHtml(htmlDescription);

		$scope.profile = profile;
	});
}]);