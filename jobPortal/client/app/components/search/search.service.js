(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .service('searchService', ['$location', '$http', '$rootScope', '$state', searchService])


    function searchService($location, $http, $rootScope, $state) {
        this.search = (keyword, location) => {

            $http({
                url: '/api/jobs',
                method: "GET",
                params: { keyword, location }
            })
                .then(jobs => {
                    $rootScope.searchResults = jobs.data;
                    // $rootScope.$emit('search results');
                    if ($location.path() !== '/main/search-results') {
                        $state.go('main.search-results');
                    }
                    else {
                        $state.reload();
                    }
                    console.log($location.path());
                })
                .catch(err => {
                    throw err;
                })
        }

        this.getSkills = (keyword) => {
            return $http({
                url: 'api/jobs/skills',
                method: 'GET',
                params: { keyword }
            })

                .then(skills => {
                    return skills;
                })
                .catch(err => {
                    return err;
                })
        }
    }

}());