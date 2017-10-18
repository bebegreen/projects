(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('appliedJobs', appliedJobs());


    function appliedJobs() {

        function appliedJobsController($rootScope, getService, $scope) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }
         
            getService.getData('appliedJobs')
                .then(jobs => {
                    
                    this.jobs = jobs.data;
                })
                .catch(err => {
                    alert('please login first');
                })
        }

        return {
            templateUrl: 'applied-jobs/applied-jobs.html',
            bindings: {},
            controller: ['$rootScope', 'getService', '$scope', appliedJobsController]
        }
    }

}());