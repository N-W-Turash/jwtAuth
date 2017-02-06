(function() {

    'use strict';

    angular
        .module('authApp', ['ui.router', 'satellizer'])
        .factory('httpRequestInterceptor', function () {
          return {
            request: function (config) {

              config.headers['Authorization'] = $auth.getToken();

              return config;
            }
          };
        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {


            //$authProvider.httpInterceptor = true; // Add Authorization header to HTTP request
            //$httpProvider.interceptors.push(interceptor);

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = '/api/authenticate';

            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise('/auth');
            
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'authView.html',
                    controller: 'AuthController as auth'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: 'userView.html',
                    controller: 'UserController as user'
                });

        });
})();