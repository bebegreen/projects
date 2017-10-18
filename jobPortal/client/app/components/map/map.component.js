(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('googleMap', googleMap());


    function googleMap() {

        function googleMapController(mapService, $rootScope, $scope) {
            $scope.radius = 10; 

            $scope.$watch('radius', (newVal, oldVal) => { 
                $rootScope.$emit('new radius', newVal); 
            })            

            this.$onInit = () => {
                mapService.drawMap(); 
            }
            
            $rootScope.$on('coordinates', (event, jobs, userCoords) => { 
                mapService.drawMarkers(jobs, userCoords); 
            })
        }

        return {
            bindings: {},
            controller: ['mapService', '$rootScope', '$scope', googleMapController],
            templateUrl: 'map/map.html'
        }
    }

}());