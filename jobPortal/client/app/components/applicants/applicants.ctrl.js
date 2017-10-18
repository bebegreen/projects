(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('applicantsList', component());


    function component() {

        function componentController(getService, $rootScope) {
            $rootScope.$on('applicants', (event, applicants) => { 
                this.applicants = applicants.data; 
            })
        }

        return {
            templateUrl: 'applicants/applicants.html',
            bindings: {},
            controller: ['getService', '$rootScope', componentController],
        }
    }

}());