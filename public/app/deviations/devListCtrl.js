(function () {
    'use strict';

    angular.module('app').controller('DevListCtrl', DevListCtrl);

    DevListCtrl.$inject =
        ['$state', '$timeout', 'IdService', 'mvNotifier', 'mvDeviationService'];

    function DevListCtrl($state, $timeout, IdService, mvNotifier, mvDeviationService) {
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
        }

        function getDev(status) {
            return mvDeviationService.getDeviations(status)
                .$promise.then(function (data) {
                    vm.deviation = data;
                    setPagPage();
                });

        }

        function getDeviation (DevId) {
            if(IdService.currentUser) {
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
