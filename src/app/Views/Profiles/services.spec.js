describe('Profiles Services', function(){

	var TEST_ID = 1,
		profilesApiService, mockServer;

	beforeEach(module('angular-kog'));

	describe('Profile Api', function(){

		beforeEach(inject(function($httpBackend, _ProfilesApiBaseUrl_, _ProfilesApiService_) {

			// Using wrapping underscores prevent variable name clashes and angular will still find the services
			var profilesApiServiceBaseUrl = _ProfilesApiBaseUrl_;
			profilesApiService = _ProfilesApiService_;

			mockServer = $httpBackend;

			// Mock request to get all profiles
			mockServer.when('GET', profilesApiServiceBaseUrl + 'profiles')
				.respond(200, [{id:0},{id:1},{id:2}]);

			// Mock request to get a specific profile
			mockServer.when('GET', profilesApiServiceBaseUrl + 'profile/' + TEST_ID)
				.respond(200, {id: TEST_ID});
		}));

		afterEach(function() {
			// Make sure all requests have been flushed
			mockServer.verifyNoOutstandingExpectation();
			mockServer.verifyNoOutstandingRequest();
		});

		it('A call to get all profiles should make a ajax call to the rest api', function() {
			profilesApiService.getAllProfiles(function(profiles) {
				expect(profiles.length).toBe(3);
			});

			mockServer.flush(); // Flush pending requests
		});

		it('A call to get a specific profile should make a ajax call to the rest api', function() {
			profilesApiService.getProfile(TEST_ID, function(profile) {
				expect(profile.id).toBe(TEST_ID);
			});

			mockServer.flush(); // Flush pending requests
		});
	});

});