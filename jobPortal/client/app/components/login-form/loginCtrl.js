(function () {

    angular.module('jobsPortal').component('loginForm', {
        templateUrl: '../login-form/loginForm.html',
        controller: 'loginCtrl'
    })

        .controller('loginCtrl', ['$state', '$scope', 'loginService', '$location', '$rootScope', loginCtrl])

    function loginCtrl($state, $scope, loginService, $location, $rootScope) {

        this.failedMsg = false;
        this.login = (username, password) => {

            loginService.login(username, password)
                .then(() => {

                    $rootScope.username = username;
                    $state.go('main.logged');

                }).catch((err) => {
                    if (err.status === 401) {
                        this.failedMsg = true;
                        setTimeout(() => {
                            $scope.$apply(() => {
                                this.failedMsg = false;
                            })
                        }, 1000);
                    } else {
                        console.log('internal error, try again');
                    }
                })
        }

        $rootScope.$on('logged in', () => {
            this.hide = true;
        })

        $rootScope.$on('logged out', () => {
            this.hide = false;
        })

        this.$onInit = () => {

            if ($rootScope.username) {
                this.hide = true;
            } else {
                this.hide = false;
            }
        }

        this.showRegForm = () => {
            $state.go('main');
        }

    }
})()