(function () {

    angular.module('jobsPortal').component('jobDetail', {
        templateUrl: '/job-details/jobDetail.html',
        bindings: {
            job: '<'
        },
        controller: ['$state', '$scope', 'jobDetailService', '$rootScope', '$location', 'getService', jobDetialCtrl]
    })


    function jobDetialCtrl($state, $scope, jobDetailService, $rootScope, $location, getService) {

        this.applyBtn = false;

        this.appliedMsg = false;

        this.apply = () => {
            jobDetailService.sendApplication(this.job._id)
                .then(() => {
                    this.appliedMsg = true;
                    this.applyBtn = false;
                })
                .catch((err) => {
                    (alert('server error, failed to apply'));
                })
        }


        this.showApplicants = () => {
            getService.getData('applicants', this.job._id)
                .then(applicants => {
                    $rootScope.$emit('applicants', applicants);
                })
        }

        this.showDescription = () => {
            $rootScope.currentJob = this.job;
            // $rootScope.regForm = false; 
            let path = $location.path();
            if (path === '/main' || path === '/main/logged' || path === '/main/map') {
                $state.go('main.job-description');
            }

        }

        $rootScope.$on('logged in', () => {
            this.applyBtn = true;
            // $rootScope.regForm = false;
        })

        this.$onInit = () => {
            let path = $location.path(); 
            this.formalDate = new Date(this.job.date);
            this.date = moment(this.formalDate).fromNow();
            if (this.job.applicants) {
                
                this.applyBtn = false;
                this.appliedMsg = true;
            }
            if (path === '/main/my-offers') {
                this.applicantsBtn = true;
                this.appliedMsg = false;
            }
            else {
                if ($rootScope.username) {
                    this.saveBtn = true; 
                    this.applyBtn = !this.appliedMsg;
                }
            }
            if (path === '/main/map') { 
                this.car = true; 
            }
            this.saved = false; 
            this.save = () => { 
                
                this.saved = !this.saved; 
            }

        }

    }

})()
