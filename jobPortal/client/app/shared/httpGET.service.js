(function () {
    // 'use strict';

    angular
        .module('jobsPortal')
        .service('getService', ['$http', Service] )

    /** @ngInject */
    
    function Service($http) {

        let urls = {
            agentJobs: 'api/jobs/agent', 
            allJobs: 'api/jobs',
            appliedJobs: '/api/jobs/appliedJobs', 
            applicants: 'api/users/applicants', 
            jobsUserOffered: 'api/jobs/jobsUserOffered', 
            skills: 'api/jobs/skills'
        }

        this.getData = (req, id='') => {
            return $http.get(urls[req] + '/' + id)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    throw err;
                })
        }
    }

}());