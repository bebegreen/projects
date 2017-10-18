// describe('main controller', () => { 
//     var $controller; 
//     var $scope; 
//     var $rootScope; 
//     beforeEach(module('jobsPortal')); 
//     beforeEach(inject(function(_$controller_, _$rootScope_){
//         $controller = _$controller_;
//         $rootScope = _$rootScope_; 
//         $scope = {}; 
//         main = $controller('main', {$scope: $scope}); 

//     }))

//     it('login butto should be true', () => { 
//         expect(main.loginBtn).toBe(true); 
//     })

//     it('should make navbar true and login false', () => { 
//         $rootScope.$emit('logged in'); 
//         expect(main.loginBtn).toBe(false); 
//         expect(main.nav).toBe(true); 
//     })
   
// })