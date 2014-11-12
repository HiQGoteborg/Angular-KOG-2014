angular.module('angular-kog')

.controller('ProfileListCtrl', ['$scope', '$location', '$timeout', 'profileApi', function($scope, $location, $timeout, profileApi){

	// TODO Remove timeout
	$timeout(function() {
		$scope.profiles = profileApi.getAllProfiles();
	}, 500);

	$scope.open = function(id) {
		$location.path('/Profiles/'+id);
	};
}])

.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', '$timeout', 'profileApi', function($scope, $routeParams, $sce, $timeout, profileApi) {

	var profile = profileApi.getProfile($routeParams.id),
		nameRegexp = new RegExp(profile.firstName, 'gi'),
		htmlDescription = profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>');

	profile.htmlDescription = $sce.trustAsHtml(htmlDescription);

	// TODO Remove timeout
	$timeout(function() {
		$scope.profile = profile;
	}, 500);
}]);