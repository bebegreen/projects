

angular.module('jobsPortal').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main');

    $stateProvider
        .state('main', {
            url: '/main',
            views: {
                '': {
                    templateUrl: 'views/main.html'
                },
                'left-column@main': {
                    template: '<latest-jobs></latest-jobs>'
                },
                'right-column@main': {
                    template: '<registration-form></registration-form>'
                }
            }
        })
        .state('main.job-description', {
            url: '/job-description',
            views: {
                'left-column@main': {
                    template: '<latest-jobs></latest-jobs>'
                },
                'right-column@main': {
                    template: '<job-description></job-description>'
                }
            }
        })
        .state('main.logged', {
            url: '/logged',
            views: {
                'right-column@main': {
                    template: '<welcome-page></welcome-page>'
                },
                'left-column@main': {
                    template: '<latest-jobs></latest-jobs>'
                }
            }
        })
        .state('main.applied-jobs', {
            url: '/applied-jobs',
            views: {
                'right-column@main': {
                    template: '<job-description></job-description>'
                },
                'left-column@main': {
                    template: '<applied-jobs></applied-jobs>'
                }
            }
        })
        .state('main.search-results', {
            url: '/search-results',
            views: {
                'right-column@main': {
                    template: '<job-description></job-description>'
                },
                'left-column@main': {
                    template: '<search-results></search-results>'
                }
            }
        })
        .state('main.my-offers', {
            url: '/my-offers',
            views: {
                'right-column@main': {
                    template: '<applicants-list></applicants-list>'
                },
                'left-column@main': {
                    template: '<offerd-jobs></offered-jobs>'
                }
            }
        })
        .state('main.map', {
            url: '/map',
            views: {
                'right-column@main': {
                    template: '<google-map></google-map>'
                },
                'left-column@main': {
                    template: '<jobs-aroundme></jobs-aroundme>'
                }
            }
        })
        .state('agent', {
            url: '/agent',
            views: {
                '': {
                    templateUrl: 'views/agent.html'
                },
                'left-column@agent': {
                    template: '<agent-jobs></agent-jobs>'
                },
                'right-column@agent': {
                    template: '<job-description></job-description>'
                }

            }
        })
        .state('offer-a-job', { 
            url: '/offer-a-job', 
            views: { 
                '': { 
                    templateUrl: 'views/offer-a-job.html'
                }
            }
        })
        .state('profile', { 
            url: '/profile', 
            views: { 
                '': { 
                    templateUrl: 'views/profile.html'
                }
            }
        })





}).run(function ($http, $rootScope, $state) {
    if (localStorage.token) {
        $http.defaults.headers.common.authorization = localStorage.token;
    }
   

});
    // .config(['$httpProvider', '$http', function ($httpProvider, $http) {
    //    
    // }])
