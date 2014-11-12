module.exports = function(grunt){
  grunt.initConfig({
    directives:{
      app:{
        files: {
          "dist/sumup-twitter-search.js": "src/scripts/sumup-twitter-search.js"
        }  
      } 
    },
    watch:{
      options: {
        spawn: false,
      },
      scripts: {
        files: "src/**/*.js",
        tasks: ["build:scripts"],
      },
      stylesheets: {
        files: "src/stylesheets/**/*.scss",
        tasks: ["sass"],
      }
    },
    jshint: {
      options:{
        debug: true
      },
      all: ["src/**/*.js"]
    },
    sass: {
      dist: {
        files: {
          "dist/sumup-twitter-search.css": "src/stylesheets/sumup-twitter-search.css.scss"
        }
      }
    }
  })

  grunt.loadNpmTasks("grunt-sprockets-directives");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-sass");

  grunt.registerTask("build:scripts", ["jshint", "directives:app"]);
  grunt.registerTask("build:stylesheets", ["sass"]);
  grunt.registerTask("default", ["build:scripts", "build:stylesheets", "watch"]);
}