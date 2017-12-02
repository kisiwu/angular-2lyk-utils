module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	nggettext_extract: {
		pot: {
	      files: {
	        'po/template.pot': ['app/*.html', 'app/partials/*.html', 'app/partials/**/*.html', 'app/js/angular/**/*.js']
	      }
	    },
	},

	nggettext_compile: {
		all: {
		    options: {
		      module: 'translateApp'
		    },
		  files: {
		    'app/js/translate/translations.js': ['po/*.po']
		  }
	   },
  },

  jsdoc: {
		dist: {
	      src: ['./dev/dist/**/*.js'],
	      options: {
	        destination: './docs',
	        configure: 'node_modules/angular-jsdoc/common/conf.json',
	        template: 'node_modules/angular-jsdoc/angular-template',
	        tutorial: 'tutorials',
	        readme: './README.md'
	      }
	    }
	},

  apidoc: {
		myapp: {
		    src: "./app/js/apidoc/",
		    dest: "./build/apidoc/",
        options: {
          debug: true,
          includeFilters: [ ".*\\.js$" ],
          excludeFilters: [ "node_modules/" ]
        }
		}
	},

  ngAnnotate: {
    options: {
        singleQuotes: true
    },
    app: {
        files: {
            './dev/min-safe/js/angular-2lyk-utils.js': ['./dev/dist/js/angular-2lyk-utils.js'],
            './dev/min-safe/directives/angular-2lyk-directives.js': [
              './dev/dist/js/directives/lyk-ng-repeat-listen-to.directive.js',
              './dev/dist/js/directives/lyk-on-bottom.directive.js',
              './dev/dist/js/directives/lyk-stick.directive.js',
              './dev/dist/js/directives/lyk-list.directive.js'
            ]
        }
    }
  },

  concat: {
    js: { //target
        src: ['./dev/min-safe/js/*.js'],
        dest: './dist/js/angular-2lyk-utils.js'
    },
    directives: { //target
        src: ['./dev/min-safe/directives/*.js'],
        dest: './dist/js/angular-2lyk-directives.js'
    }
  },

  uglify: {
    js: { //target
      options: {
        sourceMap: {
          includeSources: true
        }
      },
      files: {
        './dist/js/angular-2lyk-utils.min.js': ['./dist/js/angular-2lyk-utils.js']
      }
    },
    directives: { //target
        options: {
          sourceMap: {
            includeSources: true
          }
        },
        files: {
          './dist/js/angular-2lyk-directives.min.js': ['./dist/js/angular-2lyk-directives.js']
        }
    }
  }

  });

  // Load the plugin that provides "nggettext_extract" and "nggettext_compile" tasks.
  grunt.loadNpmTasks('grunt-angular-gettext');

  // Load the plugin that provides the "jsdoc" task.
  grunt.loadNpmTasks('grunt-jsdoc');

  // Load the plugin that provides the "apidoc" task.
  grunt.loadNpmTasks('grunt-apidoc');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Default task(s).
  grunt.registerTask('default', ['nggettext_extract']);

  grunt.registerTask('min_angular', ['ngAnnotate', 'concat', 'uglify']);

  grunt.registerTask('build', [
	  'nggettext_extract',
	  'nggettext_compile'
  ]);

  grunt.registerTask('pot', [
	  'nggettext_extract'
  ]);

  grunt.registerTask('potojs', [
	  'nggettext_compile'
  ]);

  grunt.registerTask('docs', [
	  'jsdoc'
  ]);

};
