/*

Uses:

* check syntax with *lint, compile with google closure builder/compiler

  $ grunt deploy

* watch and build the debug version when file changes, also use livereload

  $ grunt

*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-append-sourcemapping');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('deploy', ['uglify', 'less', 'jade']);

  grunt.registerTask('default', ['deploy', 'connect', 'watch']);

  // Project configuration.
  grunt.initConfig({
    connect: {
      server: {
        options: {
            port: 9000,
            hostname: '0.0.0.0',
            base: 'dist',
            keepalive: true,
            livereload: true
        },
      }
    },
    less: {
      production: {
        files: {
          "dist/style.min.css": "src/**/*.less"
        }
      }
    },
    jade: {
      release: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          "dist/index.html": ["src/index.jade"]
        }
      }
    },
    uglify: {
        js: {
            files: {
                "dist/app.min.js": "src/**/*.js"
            }
        }
    },
    "append-sourcemapping": {
        main: {
            files: {
                "dist/app.min.js": "dist/app.min.js.map"
            }
        }
    },
    watch: {
      options: {
        livereload: true,
      },
      all: {
        files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.less', 'src/**/*.jade', 'Gruntfile.js'],
        tasks: ['deploy']
      },
    }
  });
}
