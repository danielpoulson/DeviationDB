(function () {
    'use strict';

    var serviceId = 'mvDeviationService';
    angular.module('app').factory(serviceId, ['$resource', mvDeviationService]);

    function mvDeviationService($resource) {

        var devList = $resource("/api/deviationlist/:status/:cust", {status: '@status', cust: '@cust'}, {isArray:true} );

        var deviations = $resource("/api/deviations/:Id", {Id: '@id'},
            {'update': {method: 'PUT', params: {Id: '@id'}}, isArray:true});

        var customers = $resource("/api/customers", {isArray:true});

        var service = {
            getCust: getCust,
            getDeviation: getDeviation,
            getDeviations: getDeviations,
            saveDeviation: saveDeviation,
            saveNewDeviation: saveNewDeviation
            //requestCount: requestCount

        };

        return service;

        function getDeviation(DevId){
            var dev = deviations.get({Id: DevId});
            return dev;
        }


        function getDeviations(status, cust) {

            return devList.query({status: status, cust: cust});
        }

        function saveDeviation(deviation, DevId) {

            return deviations.update({Id:DevId},deviation);

        }

        function saveNewDeviation(deviation) {

            return deviations.save(deviation);
        }

        function getCust(){
            var cust = customers.query();
            return cust;
        }


    }

})();
