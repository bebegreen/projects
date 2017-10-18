

describe('jobs service spec', () => {
    var service;
    var answer; 
    var answer; 
    var $rootScope; 
    var $q; 

    // beforeEach(module('ngRoute'));
    beforeEach(module('jobsPortal'));
    // installPromiseMatchers();

    beforeEach(inject(function (_jobsListService_,) {
        service = _jobsListService_;
     
    }))



    beforeEach(() => { 
        // installPromiseMatchers();
    });
    // afterEach(JasminePromiseMatchers.uninstall);


    it('method getJobs should be defined', () => {
        // expect(service.getJobs).toBeDefined();
    })

    // it('return value should be defined', () => {
    //     // console.log("((((((((" + expect().toBeResolved)
    //     var p = service.getJobs(); 
    //     expect(p).toBePromise();  
    // })



})

