(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('agentJobs', agentJobs());


    function agentJobs() {

        function agentJobsController(getService, $rootScope) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }

            getService.getData('agentJobs')
                .then(jobs => {
                    // this.hello = 'other'; 
                    this.jobs = jobs.data;
                })
                .catch(err => {
                    console.log('please login first');
                })
        }

        return {
            templateUrl: 'agent/agent.html',
            bindings: {},
            controller: ['getService', '$rootScope', agentJobsController]
        }
    }

}());