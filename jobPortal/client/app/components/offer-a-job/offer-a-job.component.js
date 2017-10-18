(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('offerJob', offerAJob());


    function offerAJob() {

        function offerAJobController($http, $rootScope) {
            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }

            this.$onInit = () => {
                let autocompleteFormField = document.getElementById('address');

                let autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
                    types: ['(cities)'],
                });
                google.maps.event.addListener(autocomplete, 'place_changed', () => {
                    this.job.address = autocompleteFormField.value;
                })
            }

            this.post = () => {
                $http.post('/api/jobs', this.job)
                    .then(() => {
                        document.getElementById('offerJobForm').style.display = 'none';
                        this.posted = true;
                    }).catch(err => {
                        alert('error');
                    })
            }
        }

        return {
            templateUrl: 'offer-a-job/offer-a-job.html',
            bindings: {},
            controller: ['$http', '$rootScope', offerAJobController]
        }
    }

}());