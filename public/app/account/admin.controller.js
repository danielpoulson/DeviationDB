(function () {
    'use strict';

    angular.module('app').controller('admin', admin);

    admin.$inject = ['appMode','mvDeviationService'];

    function admin(appMode, mvDeviationService) {
        var vm = this;

        vm.customers = mvDeviationService.getCust();

        function activate(){
            //getCustomers();
        }

        function getCustomers (){
            return mvDeviationService.getCust()
                .then(function(data){
                vm.customers = data;
            });
        }

        vm.setMode = function (customer){
            appMode.modeSet(customer);
        };

        activate();

    }


})();
