(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('UserController', UserController);


    function UserController($http, $auth, $state) {

        var vm = this;
        
        vm.users;
        vm.error;

        /*if($auth.getToken() == null){
            $state.go('auth', {});
        }*/

        vm.getUsers = function() {

            $http.get('api/users'+'?token='+$auth.getToken()).then(successCallback, errorCallback);
            //$http.get('api/users').then(successCallback, errorCallback);


            function successCallback(response){
                //success code
                vm.users = response.data;
                console.log(vm.users);
            }
            function errorCallback(error){
                //error code
                vm.error = error;
            }
        }

        vm.logOut = function() {

          $auth.logout();
          $state.go('auth', {});
        }
    }

})();