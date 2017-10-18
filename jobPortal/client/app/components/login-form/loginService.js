(function () {
    angular.module('jobsPortal')
        .service('loginService', ['$state',  '$http', '$rootScope', '$location', loginService])

    function loginService($state, $http, $rootScope, $location) {
        this.login = (username, password) => {

            return $http.post('/api/users/login', {
                username,
                password
            })
                .then(obj => {

                    localStorage.username = username; 
                    localStorage.token = obj.data.token; 
                    $http.defaults.headers.common.authorization = localStorage.token;
                    
                    $rootScope.$emit('logged in');
                    $rootScope.username = username;
                })
                .catch(err => {
                    throw err;
                })

        }
    }
})();