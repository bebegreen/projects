(function () {
    'use strict';

    angular
        .module ('jobsPortal')
        .component ('applicantDetail', component());


    function component() {

        function componentController(){
            var vm = this;
            
            init();

            function init(){

            }
        }

        return {
            templateUrl: 'applicant-detail/applicant.html',
            bindings: { 
                applicant: '<'
            },
            controller: componentController,
            controllerAs: ''
        }
    }

} ());