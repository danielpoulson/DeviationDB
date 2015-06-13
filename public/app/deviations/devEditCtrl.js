(function () {
    'use strict';

    angular.module('app').controller('DevEditCtrl', DevEditCtrl);

    DevEditCtrl.$inject =
        ['$location', '$state', '$stateParams', 'getItemCount', 'IdService', 'mvNotifier', 'UserDataService', 'mvDeviationService', 'dvTaskCount'];

    function DevEditCtrl($location, $state, $stateParams, getItemCount, IdService, mvNotifier, UserDataService, mvDeviationService, dvTaskCount) {
        var vm = this;
        var currentUser = IdService.currentUser.firstName + " " + IdService.currentUser.lastName;
        var val = $stateParams.id;

        vm.new = true;
        vm.getDevDetails = getDevDetails;
        vm.cancelEdit = cancelEdit;
        vm.closed = "0";
        vm.dvPrint = dvPrint;
        vm.filecount = 5;
        vm.locked = false;
        vm._dvNo = '';
        vm.qaRole = false;
        vm.taskcount = '';
        vm.title = "Deviation";
        vm.open = open;
        vm.submitted = false;
        vm.save = save;
        vm.dvUser = '';


        vm.dvOutcome = [
            'Accept',
            'Rework',
            'Repair',
            'Reject',
            ''
        ];

        vm.Cat = [
            'Bulk',
            'Finished Goods',
            'Packaging / Labels',
            'Raw Materials',
            'other',
            ''
        ];

        vm.Class = [
            'Contamination',
            'Customer Complaint',
            'Documentation',
            'Formulation Difficulty',
            'Leakers',
            'Out of Specification',
            'Operator Error',
            'Procedure',
            'Transport Issue',
            'Stock Discrepancy',
            'Other',
            ''
        ];


        activate();

        function activate() {

            getDevDetails();
            getTaskCount();
            setRole();


        }

        function addlog(logMessage){
            var dvLog = {dvLogType : logMessage,
                dvLogBy : currentUser,
                dvLogDate : Date.now()};

            if (typeof vm.deviation.dvLog !== "undefined") {
                vm.deviation.dvLog.push(dvLog);
            } else {
                vm.deviation.dvLog = new Array(dvLog);
            }
        }


        function cancelEdit() {
            $location.url("/deviations");
        }

        function getDevDetails() {
            var val = $stateParams.id;

            if (val != 'new') {
                vm.new = false;
                return mvDeviationService.getDeviation(val)
                    .$promise.then(function(data) {
                        vm.deviation = data;
                        vm._dvNo = data.dvNo;
                        vm.locked = data.dvClosed;
                    }).then(function(){
                        //vm.users = UserDataService.getAllUsers();
                            return UserDataService.getAllUsers()
                                .$promise.then(function(users) {
                                    vm.users = users;
                                var idx = users.indexOf(vm.deviation.dvAssign);
                                vm.dvUser = vm.users[idx];
                            });
                    });
            } 

        }


        function getTaskCount(){
            var val = $stateParams.id;

            if (val != 'new') {
                return dvTaskCount.getTaskCount(val)
                    .then(function(data){
                        vm.taskcount = data;
                    });
            }

        }
        
        //Function move to the server

//        function _createNewDeviation() {
//            var cnt;
//            vm.new_date = new Date();
//            var yr = vm.new_date.getFullYear().toString().substr(2, 2);
//            getItemCount.getCount("Dev").then(function(data){
//                cnt = data.count;
//                vm._dvNo = "DV" + ((yr * 10000) + (cnt + 1));
//            });
//
//        }


        function open ($event){
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;

        }


    function save (data, form, logMessage) {
        vm.submitted = true;
        if(form.$valid || logMessage == 'closed') {
            //Log out an audit trail message
            if (logMessage == 'closed'){
                //Log out to Audit trail
                addlog('Deviation actioned and completed');
                data.dvClosed = 1;
            } else {
                data.dvClosed = 0;
                addlog(logMessage);
            }

            data.dvLog = vm.deviation.dvLog;

            //data.dvAssign = vm.dvUser;
            if(val != 'new'){
                data.dvAssign = vm.dvUser;
                return mvDeviationService.saveDeviation(data, val)
                    .$promise.then(success, failed);

            } else {

                //data.dvNo = vm._dvNo;
                if (!vm.deviation.dvAssign){
                    data.dvAssign = "Quality Assurance";
                }

                return mvDeviationService.saveNewDeviation(data)
                    .$promise.then(success, failed);
            }
        }
    }

    function success() {
        mvNotifier.notify('Deviation has been saved!');
        if(val == 'new'){ $state.go("deviationList"); }
    }

    function failed(error) {}

    function setRole(){
    if(IdService.currentUser.roles == 'QA' || IdService.currentUser.roles == 'admin'){
        vm.qaRole = true;
    }
}

    function dvPrint(){
        if(IdService.currentUser)
            $state.go('deviationsPrint', {id:vm._dvNo});
    }

}


})();

