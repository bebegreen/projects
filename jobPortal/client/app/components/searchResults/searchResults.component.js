(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('searchResults', searchResults());


    function searchResults() {

        function searchResultsController(getService, $scope, $rootScope) {
            this.jobs = $rootScope.searchResults; 
        }

        
        return {
            templateUrl: 'searchResults/searchResults.html',
            bindings: {},
            controller: ['getService', '$scope', '$rootScope', searchResultsController]
        }
    }

}());