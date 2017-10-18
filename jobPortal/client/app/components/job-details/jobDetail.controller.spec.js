// describe('jobDetail ctrl spec', () => {
//     var $controller;
//     var $scope;
//     var jobService;
 
//     var ctrl;
//     var $componentController;

//     beforeEach(module('ngRoute'));
//     beforeEach(module('jobsPortal'));

//     beforeEach(inject(function (_$componentController_, _jobDetailService_) {
//         $scope = {};
//         $componentController = _$componentController_;
//         ctrl = $componentController('jobDetail', $scope);
//         jobService = _jobDetailService_;
//         spyOn(jobService, 'sendApplication');
//         ctrl.job_id = '1234';
//         ctrl.job = {};

//     }));


//     it('service should be defined', () => {
//         expect(jobService.sendApplication).toBeDefined();
//     })

//     it('service should be defined', () => {
//        expect(jobService).toBeDefined(); 
        
//     })

// })