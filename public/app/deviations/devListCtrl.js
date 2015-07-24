(function () {
    'use strict';

    angular.module('app').controller('DevListCtrl', DevListCtrl);

    DevListCtrl.$inject =
        ['$state', '$timeout', 'appMode','IdService', 'mvNotifier', 'mvDeviationService', 'dpSearchTermGlobal'];

    function DevListCtrl($state, $timeout, appMode, IdService, mvNotifier, mvDeviationService, dpSearchTermGlobal) {
        var vm = this;


        vm.getDeviation = getDeviation;
        vm.totalItems = 0;
        vm.currentPage = 1;
        vm.numPerPage = 15;
        vm.loadAll = loadAll;
        vm.loadActive = loadActive;
        vm.setPagPage = setPagPage;
        vm.openNewDeviation = openNewDeviation;

        activate();

        function activate() {
            getDev(1);
            vm.queryProject = dpSearchTermGlobal.dpSearchGlobal;
        }

        function getDev(status) {
            var cust = appMode.getCust();
            console.log(cust);
            return mvDeviationService.getDeviations(status, cust)
                .$promise.then(function (data) {
                    vm.deviation = data;
                    setPagPage();
                });

        }

        function getDeviation (DevId) {
            if(IdService.currentUser) {
                dpSearchTermGlobal.dpSearchGlobal = vm.queryProject;
                $state.go('deviationEdit.detail', {id:DevId});
            } else {
                mvNotifier.error('You are not logged in!');
            }

//            if(IdService.currentUser)
//                $state.go('deviationEdit.detail', {id:DevId});
        }

        function openNewDeviation(){
            if(IdService.currentUser) {
                $state.go('deviationEdit.detail', {id:"new"});
            } else {
                mvNotifier.error('You are not logged in!');
            }
        }

        function setPagPage() {

            $timeout(function () {
                //wait for 'filtered' to be changed
                vm.totalItems = vm.filtered.length;
            }, 10);

        }


        function loadAll(){
            getDev(2);
        }

        function loadActive(){
            getDev(1);
        }
    }

})();
