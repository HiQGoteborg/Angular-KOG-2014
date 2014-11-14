angular.module('angular-kog')

// TODO
// Define the base url for the profile api web service
.constant('ProfilesApiBaseUrl', 'http://localhost:8001/data/')

// A service to get profiles from the profile api web service
.factory('ProfilesApiService', ['$http', 'ProfilesApiBaseUrl', function($http, baseUrl){

	return {
		getAllProfiles: function(callback) {

			$http.get(baseUrl + 'profiles')
				.success(callback);
		},
		getProfile: function(id, callback) {
			// TODO
			// $http.get(baseUrl + 'profile' + id)
			// 	.success(callback);

			$http.get(baseUrl + 'profiles')
				.success(function(data) {
					callback(data[id]);
				});

		}
	};
}]);