angular.module('angular-kog')

.controller('ProfileListCtrl', ['$scope', '$location', 'profileApi', function($scope, $location, profileApi){

	$scope.profiles = profileApi.getAllProfiles();

	$scope.open = function(id) {
		$location.path('/Profiles/'+id);
	};
}])

.controller('ProfileCtrl', ['$scope', '$routeParams', '$sce', 'profileApi', function($scope, $routeParams, $sce, profileApi) {

	var profile = profileApi.getProfile($routeParams.id),
		nameRegexp = new RegExp(profile.firstName, 'gi'),
		htmlDescription = profile.description.replace(nameRegexp, '<b>'+ profile.firstName +'</b>');

	profile.htmlDescription = $sce.trustAsHtml(htmlDescription);

	$scope.profile = profile;
}]);