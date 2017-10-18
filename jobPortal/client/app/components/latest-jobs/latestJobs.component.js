(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('latestJobs', latestJobs());


    function latestJobs() {

        function latestJobsController(getService, $scope, $rootScope, $state) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');

            }

            getService.getData('allJobs')
                .then(jobs => {
                    this.jobs = jobs.data;

                }).catch(err => {
                    console.log('error occured');
                })
        }

        return {
            templateUrl: 'applied-jobs/applied-jobs.html',
            bindings: {},
            controller: ['getService', '$scope', '$rootScope', '$state', latestJobsController]
        }
    }

}());