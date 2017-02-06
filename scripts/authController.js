(function() {

    'use strict';

    angular
        .module('authApp')
        .controller('AuthController', AuthController);
    
    function AuthController($auth, $state) {

        var vm = this;

        vm.errorText = ''
            
        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }
            
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {


                if($auth.getToken() == null){
                    vm.errorText = 'Error logging in!';  
                }

                // If login is successful, redirect to the users state
                else{
                    $state.go('users', {});
                    vm.errorText = '';  
                }
            });
        }

    }

})();