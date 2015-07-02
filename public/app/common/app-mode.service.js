(function () {
    'use strict';

    angular
        .module('app')
        .factory('appMode', appMode);

    appMode.$inject = [];
    /* @ngInject */
    function appMode() {
        //TODO: Dynamically set customer mode
        //var currentCustomer; //Production Setting
        var currentCustomer = "all";
        var customerMode = true;

        var service = {
            getCust : getCust,
            customerMode: customerMode,
            modeSet: modeset
        };

        return service;

        function modeset(customer){
            currentCustomer = customer;
        };

        function getCust(){
            return currentCustomer;
        };


    }
})();