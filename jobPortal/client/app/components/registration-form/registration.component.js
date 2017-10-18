(function () {
    'use strict';

    angular
        .module('jobsPortal')
        .component('registrationForm', component());


    function component() {

        function componentController($state, $http, $location, $rootScope, $scope) {

            this.regFirst = true;

            this.register = (user) => {
                if (user.username && user.password) {
                    $http.post('api/users/register', user)
                        .then(obj => {

                            localStorage.username = user.username;
                            localStorage.token = obj.data;
                            $http.defaults.headers.common.authorization = localStorage.token;

                            $rootScope.username = user.username;
                            $rootScope.$emit('logged in');
                            $state.go('main.logged');
                        })
                        .catch(err => {
                            alert('username exists');
                        })
                }
            }

            this.$onInit = () => {
                let autocompleteFormField = document.getElementById('user-address');
                console.log(autocompleteFormField);
                let autocomplete = new google.maps.places.Autocomplete((autocompleteFormField), {
                    types: [`(cities)`],
                });
                google.maps.event.addListener(autocomplete, 'place_changed', () => {
                    $scope.user.city = autocompleteFormField.value;
                })



            }
            this.next = () => {
                if ($scope.user.username && $scope.user.password && $scope.user.email && $scope.user.fname && $scope.user.lname) {
                    this.regFirst = false;
                    this.regSecond = true;

                    // $('.js-example-basic-multiple').select2();

                } else {
                    alert('all fields required');
                }

            }
        }

        return {
            bindings: {},
            controller: ['$state', '$http', '$location', '$rootScope', '$scope', componentController],
            templateUrl: 'registration-form/registration.html'
        }
    }

}());