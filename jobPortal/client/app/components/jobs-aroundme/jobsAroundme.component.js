(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('jobsAroundme', jobsAroundme());


    function jobsAroundme() {

        function jobsAroundmeController($http, $rootScope) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }

            this.$onInit = () => {
                this.getJobs(10);
            }
            
            this.getJobs = (km) => {
                $http({
                    url: 'api/jobs/jobsInRadius',
                    method: "GET",
                    params: { km },
                    headers: {
                        authorization: localStorage.token
                    }
                })
                    .then(obj => {
                        this.jobs = obj.data.jobs;
                        let userCoords = obj.data.userCoords;
                        $rootScope.$emit('coordinates', this.jobs, userCoords);

                    })
                    .catch(err => {
                        console.log('no jobs in this radius');
                    })
            }


            $rootScope.$on('new radius', (event, radius) => {
                this.getJobs(radius);
            });

            // $rootScope.$on('map zoom' , (event, zoom) => { 
            //     this.getJobs(10); 
            // })
        }



        return {
            templateUrl: 'jobs-aroundme/jobsAroundme.html',
            bindings: {},
            controller: ['$http', '$rootScope', jobsAroundmeController],
        }
    }

}());