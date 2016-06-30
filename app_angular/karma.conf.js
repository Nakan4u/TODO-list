//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/bootstrap-ui-datetime-picker/dist/datetime-picker.min.js',
      'node_modules/lodash/lodash.js',
      
      'js/app.js',
      'js/controllers/*.js',
      'js/directives/*.js',
      
      '*!(.module|.spec).js',
      '!(node_modules)/**/*!(.module|.spec).js',
      'js/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    }

  });
};
