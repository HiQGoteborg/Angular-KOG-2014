module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		src_dir: './src',
		build_dir: './build',

		src_js: '<%= src_dir %>/**/*.js',
		src_spec: '<%= src_dir %>/**/*.spec.js',
		src_tpl: '<%= src_dir %>/**/*.tpl.html',
		src_less: '<%= src_dir %>/**/*.less',

		build_js: '<%= build_dir %>/scripts.js',
		build_css: '<%= build_dir %>/styles.css',


		// Lint javascript
		jshint: {
			files: ['<%= src_js %>', '!<%= src_spec %>'],
			options: {
				jshintrc: true,
				force: true
			}
		},

		// Minify javascript
		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				src: ['<%= src_js %>', '!<%= src_spec %>'],
				dest: '<%= build_js %>'
			}
		},

		// Put templates in javascript template cache
		ngtemplates: {
			app: {
				src: '<%= src_tpl %>',
				dest: '<%= build_js %>',
				options: {
					module: 'angular-kog',
					htmlmin: {
						collapseWhitespace: true,
						collapseBooleanAttributes: true
					},
					append: true,
					url: function(url) {
						var templateMatch = url.match(/\/[a-z]+\.tpl\.html/gi);
						return templateMatch[0].replace('/', '');
					}
				}
			}
		},

		// Test runner
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				background: true,
				runnerPort: 9999,
				logLevel: 'ERROR'
			},
			single: {
				configFile: 'test/karma.conf.js',
				runnerPort: 9999,
				singleRun: true,
				logLevel: 'ERROR'
			}
		},

		// LESS / CSS
		less: {
			options: {
				cleancss: true,
			},
			files: {
				expand: false,
				src: '<%= src_less %>',
				dest: '<%= build_css %>'
			}
		},

		// Watch file changes and trigger actions such as livereload, recompile etc
		watch: {
			options: {
				spawn: false,
				livereload: true
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
				files: ['<%= src_js %>', '!<%= src_spec %>'],
				tasks: ['js']
			},

			tests: {
				files: ['<%= src_js %>'],
				tasks: ['karma:unit:run']
			},
		},

		// Local dev static server
		connect: {
			dev: {
				options: {
					hostname: '*',
					port: 8002,
					base: './',
					keepalive: true,
					open: 'http://localhost:8002'
				}
			}
		}
	});

	grunt.registerTask('dev', ['karma:unit', 'watch']);

	grunt.registerTask('js', ['jshint', 'uglify', 'ngtemplates']);
	grunt.registerTask('build', ['js', 'karma:single', 'less']);

	grunt.registerTask('default', ['build']);

};