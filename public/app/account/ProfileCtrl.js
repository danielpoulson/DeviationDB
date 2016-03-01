(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$stateParams', 'AuthService', 'IdService', 'mvNotifier', 'UserServ', 'UserDataService'];
    /* @ngInject */
    function ProfileCtrl($stateParams, AuthService, IdService, mvNotifier, UserServ, UserDataService) {

    var vm = this;
    var vmNew = $stateParams.id;

    activate = activate;
    vm.identity = IdService;
    vm.new = true;
    vm.users = [];
    vm.update = update;

  //TODO convert static select to dynamic
  vm.listRoles = [
    'user',
    'admin',
    'QA'
  ];

    activate();

    function activate() {

        if(vmNew === "new"){
            vm.new = 1;
        } else {
            vm.new = 0;
            vm.users = UserServ.query();
        }

    }
        

  function update (form) {

    var username = vm.fUsers.username;
    var newUserData = {
      username: vm.fUsers.username,
      firstName: vm.fUsers.firstName,
      lastName: vm.fUsers.lastName,
      email: vm.fUsers.email,
      roles: vm.fUsers.roles

    };

    if (form.$valid) {
      if(vm.fUsers.password && vm.fUsers.password.length > 0) {
        newUserData.password = vm.fUsers.password;

      }

        if (vmNew == "new"){

            AuthService.createUser(newUserData).then(success, failed);

        } else {

            return UserDataService.saveUser(newUserData, username)
                .$promise.then(success, failed);
        }
    }

    function success() {
      mvNotifier.notify('Account has been created / updated');
    }

    function failed(reason) {
      mvNotifier.error("Oops looks like something has gone wrong please contact your administrator - " + reason);
    }

  }

  vm.delete = function(fUsers) {
    var user = vm.fUsers.username;

    if(user && user.length > 0) {

      var index = vm.users.indexOf(fUsers);


      return UserDataService.deleteUser(user)
          .$promise.then(function(){
            mvNotifier.notify('User account has been deleted');
            //TODO: clear the form and refresh the account users dropdown list
            vm.users.splice(index, 1);
            vm.fUsers.firstName = 'First Name';
            vm.fUsers.lastName = 'Last Name';
            vm.fUsers.email = 'Email';
            vm.fUsers.roles = 'Roles';

          });
    }
  };

    }
})();