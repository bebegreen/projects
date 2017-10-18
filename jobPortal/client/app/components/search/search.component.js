(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('searchJobs', searchJobs());


    function searchJobs() {

        function searchJobsController(getService, searchService, $rootScope, $state) {

            this.getOptions = () => {
                if (!this.keyword) {
                    this.skills = null;
                } else {

                    searchService.getSkills(this.keyword)
                        .then(obj => {
                            this.skills = obj.data;
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            }

            this.search = () => {
                if (this.keyword || this.location) {
                    $rootScope.currentJob = null;
                    searchService.search(this.keyword, this.location);
                
                }
            }
            
            this.mapView = () => {
                $state.go('main.map');
            }
            $rootScope.$on('logged in', () => {
                this.showMap = true;
            })
            if ($rootScope.username) {
                this.showMap = true;
            }
            this.$onInit = () => {
                let autocompleteFormField = document.getElementById('address');
                console.log(autocompleteFormField);
                let autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
                    types: ['(cities)'],
                });
                google.maps.event.addListener(autocomplete, 'place_changed', () => {
                    this.location = autocompleteFormField.value; 
                })
            }
        }

        return {
            templateUrl: 'search/search.html',
            bindings: {},
            controller: ['getService', 'searchService', '$rootScope', '$state', searchJobsController],
        }
    }

}());