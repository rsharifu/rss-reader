
'use strict'; // Strict mode. Throw more exceptions.

module.exports = function (grunt) { // Wrapper function 
 
  grunt.initConfig({ // grunt.init.config. Project configuration
   
    
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', []);

};