(function () {

    angular.module('jobsPortal').service('jobDetailService', ['$http', '$q', '$rootScope',
        function ($http, $q, $rootScope) {
            this.sendApplication = job_id => {
                return $http.put('api/application', { id: job_id })

            }
            this.saveJob = job_id => {
                return $http.put('api/jobs/save', { id: job_id })
                
            }

        }
    ])

})()