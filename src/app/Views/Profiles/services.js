angular.module('angular-kog')

.constant('profileApiBaseUrl', 'http://myservice.com/')

.factory('profileApi', ['$http', 'profileApiBaseUrl', function($http, baseUrl){

	// TODO Remove
	var profiles = [
			{id: 0, firstName: 'Homer', lastName: 'Simpson', role: 'Father', imageUrl: '/images/homer.png', description: 'Homer is one of the most influential characters in the history of television. The British newspaper The Sunday Times described him as "the greatest comic creation of [modern] time". He was named the greatest character "of the last 20 years" in 2010 by Entertainment Weekly, was ranked the second greatest cartoon character by TV Guide, behind Bugs Bunny, and was voted the greatest television character of all time by Channel 4 viewers. For voicing Homer, Castellaneta has won four Primetime Emmy Awards for Outstanding Voice-Over Performance and a special-achievement Annie Award. In 2000, Homer and his family were awarded a star on the Hollywood Walk of Fame.'},
			{id: 1, firstName: 'Marge', lastName: 'Simpson', role: 'Mother ', imageUrl: '/images/marge.png', description: 'Marge is the well-meaning and extremely patient matriarch of the Simpson family. With her husband Homer, she has three children: Bart, Lisa, and Maggie. Marge is the moralistic force in her family and often provides a grounding voice in the midst of her family\'s antics by trying to maintain order in the Simpson household. She is often portrayed as a stereotypical television mother and is often included on lists of top "TV moms". She has appeared in other media relating to The Simpsons—including video games, The Simpsons Movie, The Simpsons Ride, commercials, and comic books—and inspired an entire line of merchandise.'},
			{id: 2, firstName: 'Lisa', lastName: 'Simpson', role: 'Daughter', imageUrl: '/images/lisa.png', description: 'Lisa is one of the most enduring characters on the series. TV Guide ranked her 11th (tied with Bart) on their list of the "Top 50 Greatest Cartoon Characters of All Time". Her environmentalism has been especially well received; several episodes featuring her have won Genesis and Environmental Media Awards, including a special "Board of Directors Ongoing Commitment Award" in 2001. People for the Ethical Treatment of Animals included Lisa on their list of the "Most Animal-Friendly TV Characters of All Time". Yeardley Smith won a Primetime Emmy Award for Outstanding Voice-Over Performance in 1992, and in 2000 Lisa and her family were awarded a star on the Hollywood Walk of Fame.'},
			{id: 3, firstName: 'Bart', lastName: 'Simpson', role: 'Son', imageUrl: '/images/bart.png', description: 'At ten years old, Bart is the eldest child and only son of Homer and Marge, and the brother of Lisa and Maggie. His birth date is February 23, but the year is ambiguous as he is perpetually ten years old. Bart\'s most prominent character traits are his mischievousness, rebelliousness and disrespect for authority. He has appeared in other media relating to The Simpsons, including video games, The Simpsons Movie, The Simpsons Ride, commercials, and comic books; he has also inspired an entire line of merchandise. In casting, Nancy Cartwright originally planned to audition for the role of Lisa, while Yeardley Smith tried out for Bart. Smith\'s voice was too high for a boy, so she was given the role of Lisa. Cartwright found that Lisa was not interesting at the time, so instead auditioned for Bart, which she thought was a better role. Hallmarks of the character include his chalkboard gags in the opening sequence; his prank calls to Moe; and his catchphrases "Eat my shorts", "¡Ay, caramba!", and "Don\'t have a cow, man!"'}
		];

	return {
		getAllProfiles: function() {
			$http.get(baseUrl + 'profiles')
				.then(function(data) {
					// TODO
				});
			return profiles;
		},
		getProfile: function(id) {
			$http.get(baseUrl + 'profile/' + id)
				.then(function(data) {
					// TODO
				});
			return profiles[id];
		}
	};
}]);