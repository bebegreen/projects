// Karma configuration
// Generated on Mon Sep 04 2017 12:01:57 GMT+0300 (IDT)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      // './node_modules/lodash/lodash.js',

      // './node_modules/moment/min/moment.min.js',
      "./node_modules/angular/angular.min.js",
      './node_modules/angular-mocks/angular-mocks.js.js',
      "./node_modules/angular-route/angular-route.min.js",
      './node_modules/angular-ui-router/release/angular-ui-router.min.js',
      
      
      // './node_modules/request/request.js',
      // './node_modules/angular-google-maps/dist/angular-google-maps.js',
      //  async defer src= "https://maps.googleapis.com/maps/api/js?key=AIzaSyDoXkSSqgDV07tBv42eBsKpoRBm4rJmMhQ&callback=initMap" ></script > -->
      //  '//maps.googleapis.com/maps/api/js?sensor=false' ></script > -->
      // <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoXkSSqgDV07tBv42eBsKpoRBm4rJmMhQ&libraries=places"></script>
      // "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js"></script>



      // './node_modules/angular/angular.min.js',
      // './node_modules/angular-route/angular-route.min.js',
      // './node_modules/angular-ui-router/release/angular-ui-router.min.js',

      // './node_modules/angular-mocks/*.js', 
      // ,'./node_modules/es6-promise/dist/es6-promise.js', 
      // "node_modules/jasmine-promise-matchers/**/*.js",
      // './node_modules/**/*.js',
      './client/app/main/mainCtrl.js',
      './client/app/main/main.config.js',

      // './public/components/jobs-list/jobsListService.js', 
      // './client/app/**/*.js',
      './client/app/**/*.js',
      './spec/first.spec.js'


    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 3000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
