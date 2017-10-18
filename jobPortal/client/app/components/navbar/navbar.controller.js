(function () {
    angular.module('jobsPortal').component('navBar', {
        templateUrl: '../navbar/navbar.html',
        controller: 'navbar'
    })

        .controller('navbar', ['$state', '$location', '$rootScope', '$http', 
            function ($state, $location, $rootScope, $http) {
                this.profile = () => { 
                    $state.go('profile'); 
                }
                this.appliedJobs = () => {
                    $state.go('main.applied-jobs');
                }
                this.offerJob = () => {
                    $state.go('offer-a-job'); 
                }
                this.latestJobs = () => {
                    // $location.path('main');
                    $state.go('main.logged');
                }
                this.applicants = () => {
                    $state.go('main.my-offers')
                    // $rootScope.$emit('jobs I offered'); 
                }
                this.agent = () => {
                    $state.go('agent');
                }
                this.main = () => {
                    if ($rootScope.username) {
                        $state.go('main.logged')
                    }
                    else {
                        $state.go('main');
                    }
                }
                this.logout = () => {
                    delete $http.defaults.headers.common.authorization;
                    delete localStorage.token;
                    delete localStorage.username;
                    delete $rootScope.username;
                 
                    this.navbar = false; 
                    this.loginBtn = true; 
                    $rootScope.$emit('logged out'); 
                    $state.go('main');
                }

                this.loginBtn = true;
                this.navbar = false;
                $rootScope.$on('logged in', () => {
                    this.loginBtn = false;
                    this.navbar = true;
                })


            }])
})()