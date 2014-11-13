angular.module('angular-kog')

// Profile List Controller
.controller('ProfileListCtrl', ['$scope', '$location', 'ProfileApiService', function($scope, $location, profileApi){

	profileApi.getAllProfiles(function(profiles) {
		$scope.profiles = profiles;
	});

	$scope.open = function(id) {
		// Open profile by changing the route
		$location.path('/Profiles/'+id);
	};
}])

// Profile Controller
.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', 'ProfileApiService', function($scope, $routeParams, $sce, profileApi) {

	// Get profile from service
	profileApi.getProfile($routeParams.id, function(profile) {
		// Make first name bold in the description
		var nameRegexp = new RegExp(profile.firstName, 'gi'),
			htmlDescription = profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>');

		// Specify the html description to be trusted (Strict Contextual Escaping)
		profile.htmlDescription = $sce.trustAsHtml(htmlDescription);

		$scope.profile = profile;
	});
}]);