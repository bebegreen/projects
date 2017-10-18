angular.module('jobsPortal', [ 'ui.router','ngAnimate', 'multipleSelect'])
// angular.module('jobsPortal', [])
    .controller('main', ['$scope', '$http', '$rootScope', 
        function ($scope, $http, $rootScope) {

            this.loginBtn = true;
            
            $rootScope.$on('logged in', () => { 
                this.loginBtn = false; 
                this.nav = true;
            })

            $rootScope.$emit('get all jobs'); 
        }
    ])


    // var myApp = angular.module('MyApp', [ "ui.router", "ngAnimate", "MyControllers" ]);
    
   