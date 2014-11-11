angular.module('angular-kog')

.controller('ProfileListCtrl', ['$scope', '$location', 'profileApi', function($scope, $location, profileApi){

	// TODO Get from service
	$scope.profiles = profileApi.getAllProfiles();

	$scope.open = function(id) {
		$location.path('/Profiles/'+id);
	};
}])

.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', 'profileApi', function($scope, $routeParams, $sce, profileApi) {

	var profile = profileApi.getProfile($routeParams.id),
		nameRegexp = new RegExp(profile.firstName, 'gi');

	profile.description = $sce.trustAsHtml(profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>'));

	$scope.profile = profile;
}]);