(function () {

    angular.module('jobsPortal').component('jobsList', {
        bindings: {
            jobs: '=',
            hello: '='
        },
        templateUrl: '/jobs-list/jobsList.html',
        controller: ['jobsListService', '$scope',
            '$rootScope', '$location', 'getService', jobsListCtrl]
    })

    function jobsListCtrl(jobsListService, $scope, $rootScope, $location, getService) {

        $rootScope.$on('search results', (event, jobs) => {
            this.jobsList = jobs;
        })

        this.jobsList = this.jobs;

        if (!$rootScope.username) {
            $rootScope.regForm = true;
        }

    }
})()












                // $rootScope.$on('jobs I offered', () => {
                //     getService.getData('jobsUserOffered')
                //         .then(jobs => {
                //             this.jobsList = jobs.data;
                //             $rootScope.$emit('show applicants button');
                //             $rootScope.applicantsBtn = true;
                //         })
                // })