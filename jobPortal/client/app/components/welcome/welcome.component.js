(function () {
    'use strict';

    angular
        .module ('jobsPortal')
        .component ('welcomePage', component());


    function component() {

        function componentController(){
            
        }

        return {
            templateUrl: 'welcome/welcome.html', 
            bindings: {},
            controller: componentController,
            controllerAs: '${ctrl}'
        }
    }

} ());