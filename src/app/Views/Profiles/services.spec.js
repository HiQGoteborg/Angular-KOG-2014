describe('Profiles Services', function(){

	var TEST_ID = 1,
		profileApi, mockServer;

	beforeEach(module('angular-kog'));

	describe('Profile Api', function(){

		beforeEach(inject(function($httpBackend, profileApiBaseUrl, _profileApi_) {
			profileApi = _profileApi_;

			mockServer = $httpBackend;

			mockServer.when('GET', profileApiBaseUrl + 'profiles')
				.respond(200, [{},{},{}]);

			mockServer.when('GET', profileApiBaseUrl + 'profile/' + TEST_ID)
				.respond(200, {id: TEST_ID});
		}));

		afterEach(function() {
			mockServer.verifyNoOutstandingExpectation();
			mockServer.verifyNoOutstandingRequest();
		});

		it('A call to get all profiles should make a ajax call to the rest api', function() {
			expect(profileApi.getAllProfiles().length).toBe(4);
			mockServer.flush();
		});

		it('A call to get a specific profile should make a ajax call to the rest api', function() {
			expect(profileApi.getProfile(TEST_ID).id).toBe(TEST_ID);
			mockServer.flush();
		});
	});

});