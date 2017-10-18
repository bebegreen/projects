angular.module('jobsPortal')

    .service('jobsListService', ['$http', '$q', function ($http, $q) {

        var urls = {
            allJobs: '/api/jobs',
            appliedJobs: '/api/jobs/appliedJobs'
        }
        this.search = (keyword, location) => {

            return $http({
                url: '/api/jobs',
                method: "GET",
                params: { keyword, location } 
            })
            .then(jobs => {
                return $q.resolve(jobs);
            })
            .catch(err => {
                throw err;
            })
        }



    }])