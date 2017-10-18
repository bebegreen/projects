(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('offerdJobs', offerdJobs());


    function offerdJobs() {

        function offerdJobsController(getService, $scope, $rootScope) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }

            getService.getData('jobsUserOffered')
                .then(jobs => {
                    // this.hello = 'other'; 
                    this.jobs = jobs.data;
                    $rootScope.emit('applicants'); 
                })
                .catch(err => {
                    console.log('please login first');
                })
        }

        return {
            templateUrl: 'offeredJobs/offeredJobs.html',
            bindings: {},
            controller: ['getService', '$scope', '$rootScope', offerdJobsController]
        }
    }

}());