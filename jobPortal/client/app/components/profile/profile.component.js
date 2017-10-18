(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('profile', profile());

    function profile() {

        function profileController($http, $rootScope, $scope) {

            if (localStorage.token) {
                $rootScope.username = localStorage.username;
                $rootScope.$emit('logged in');
            }

            this.save = () => {

                this.saved = true; 
                setTimeout(() => {
                    $scope.$apply(() => {
                        this.saved = false;
                    })
                }, 1000);
            }

            this.$onInit = () => {

                $http.get('api/users/' + $rootScope.username)
                    .then(obj => {
                        console.log(obj.data);
                        this.user = obj.data;
                    })

                
                let autocompleteFormField = document.getElementById('user-address');
                console.log(autocompleteFormField);
                let autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
                    types: [`(cities)`],
                });
                google.maps.event.addListener(autocomplete, 'place_changed', () => {
                    $scope.user.city = autocompleteFormField.value;
                })
                setTimeout(() => {
                    document.getElementsByClassName('form-item-container')[0].style.border = 'none';
                    document.getElementsByClassName('form-item-container')[0].style.height = 101 + '%';
                }, 0);

            }

            this.$onDestroy = () => {
                setTimeout(() => {
                    document.getElementsByClassName('form-item-container')[0].style.border = '1px solid gray';
                }, 0);
            }

        }

        return {
            templateUrl: 'profile/profile.html',
            bindings: {},
            controller: ['$http', '$rootScope', '$scope', profileController]
        }
    }

}());