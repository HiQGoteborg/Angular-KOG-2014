module.exports = function(grunt) {

	// Load all grunt plugins
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		// The angular app module
		app_module: 'angular-kog',

		// Source and destionation directories
		src_dir: './src',
		build_dir: './build',

		// Globbing patterns for different file types
		src_js: '<%= src_dir %>/app/**/*.js',		// All app js files
		src_init_js: '<%= src_dir %>/init/**/*.js',	// All (should be only one) initialisation js files
		src_spec: '<%= src_dir %>/**/*.spec.js',	// All unit test spec js files
		src_tpl: '<%= src_dir %>/**/*.tpl.html',	// All html template files
		src_less: '<%= src_dir %>/**/*.less',		// All less files


		build_js: '<%= build_dir %>/scripts.js',	// Destination js file, this is the concatenated, minified version of all js and html templates
		build_css: '<%= build_dir %>/styles.css',	// Destination css file, this is the compiled, concatenated, minifed version of all less files


		// Lint javascripts
		jshint: {
			files: ['<%= src_init_js %>', '<%= src_js %>', '!<%= src_spec %>'], // Include all js except unit test specs
			options: {
				jshintrc: true,	// Use config: .jshintrc
				force: true		// Force task to continue even if there are errors
			}
		},

		// Concatenate and minify javascripts
		uglify: {
			dev: {
				options: {
					// Uncomment rows below to prevent minification
					// mangle: false,
					// compress: false,
					// beautify: true
				},
				src: ['<%= src_init_js %>', '<%= src_js %>', '!<%= src_spec %>'],	// Include all js except unit test specs
				dest: '<%= build_js %>'		// Place the result in the destination js file
			}
		},

		// Put html templates in the angular javascript template cache
		ngtemplates: {
			app: {
				src: '<%= src_tpl %>',		// Include all html templates
				dest: '<%= build_js %>',	// Append the result to the destination js file
				options: {
					append: true,
					module: '<%= app_module %>',	// The angular module to add the templates to
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					},
					url: function(url) {
						// Remove any directories from the template url
						// Example:
						//  A template /src/app/MyFolder/mytemplate.tpl.html will get the name mytemplate.tpl.html (That's the name that should be used as 'templateUrl')
						var templateMatch = url.match(/\/[a-z0-9]+\.tpl\.html/gi);
						return templateMatch[0].replace('/', '');
					}
				}
			}
		},

		// Test runner
		karma: {
			unit: {
				// Used to run tests when javascripts change
				configFile: 'test/karma.conf.js',
				background: true,
				runnerPort: 9999,
				logLevel: 'ERROR'
			},
			single: {
				// Used to run tests one time and end process
				configFile: 'test/karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				logLevel: 'ERROR'
			}
		},

		// Compile, concatenate and minify less to css
		less: {
			options: {
				cleancss: true,
			},
			files: {
				expand: false,
				src: '<%= src_less %>',		// Include all less files
				dest: '<%= build_css %>'	// Place the result in the destination css file
			}
		},

		// Watch file changes and trigger actions such as livereload, recompile etc
		watch: {
			options: {
				spawn: false,		// Faster reaction when files change
				livereload: true	// Enables live reload when files change (use for example Chrome LiveReload app)
			},

			index: {
				files: ['index.html']
			},

			templates: {
				files: ['<%= src_tpl %>'],
				tasks: ['js']
			},

			less: {
				files: ['<%= src_less %>'],
				tasks: ['less']
			},

			scripts: {
				files: ['<%= src_init_js %>', '<%= src_js %>', '!<%= src_spec %>'],
				tasks: ['js']
			},

			tests: {
				files: ['<%= src_init_js %>', '<%= src_js %>'],
				tasks: ['karma:unit:run']
			},
		},

		// Local dev static server
		connect: {
			dev: {
				options: {
					hostname: '*',
					port: 8001,
					base: './',
					keepalive: true,
					open: 'http://localhost:8001'
				}
			}
		}
	});


	// Run task when developing. Runs tasks when file changes.
	grunt.registerTask('dev', ['karma:unit', 'watch']);

	// Group js tasks together
	grunt.registerTask('js', ['jshint', 'uglify', 'ngtemplates']);

	// Build project
	grunt.registerTask('build', ['js', 'karma:single', 'less']);

	// Build and run local dev server by default
	grunt.registerTask('default', ['build', 'connect']);

};