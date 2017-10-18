(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('jobDescription', component());


    function component() {

        function componentController(getService, $rootScope, $location, jobDetailService) {
            this.job = $rootScope.currentJob;

            $rootScope.$watch('currentJob', (newVal, oldVal) => {
                // this.job = newVal;
                getService.getData('allJobs', newVal._id)
                .then(obj => { 
                    this.job = obj.data; 
                })
            })

        }

        return {
            templateUrl: 'job-description/job-description.html',
            bindings: {},
            controller: [ 'getService', '$rootScope', '$location', 'jobDetailService', componentController]
        }

    }

})();