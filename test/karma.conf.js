module.exports = function(config){
	config.set({

		basePath : '../',

		// Include angular, scripts and templates
		files : [
			'vendor/angular/angular.js',
			'vendor/angular-route/angular-route.js',
			'vendor/angular-mocks/angular-mocks.js',
			'src/init/**/*.js',
			'src/app/**/*.js',
			'src/**/*tpl.html'
		],

		frameworks: ['jasmine'],

		browsers : ['Chrome'],

		plugins : [
			'karma-chrome-launcher',
			'karma-jasmine',
			'karma-junit-reporter',
			'karma-coverage',
			'karma-ng-html2js-preprocessor'
		],

		junitReporter : {
			outputFile: 'test_out/unit.xml',
			suite: 'unit'
		},

		// coverage reporter generates the coverage
		reporters: ['progress', 'coverage'],

		preprocessors: {
			'src/**/*.js': ['coverage'],		// Get test coverage
			'src/**/*.tpl.html': ['ng-html2js'] // Put html templates in the angular javascipt template cache before running tests
		},

		// Optionally, configure the reporter
		coverageReporter: {
			type : 'html',
			dir : 'test/coverage/'
		},

		// Create js template cache
		ngHtml2JsPreprocessor: {
			cacheIdFromPath: function(filepath) {
				// Remove the path and only keep the filename, which is used as 'templateUrl'.
				var parts = filepath.split('/'),
					filename = parts[parts.length-1];
				return filename;
			}
		}

	});
};