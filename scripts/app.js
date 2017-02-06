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
            function _redirectIfNotAuthenticated($q, $state, $auth) {
              var defer = $q.defer();
              if($auth.authenticate()) {
                defer.resolve(); /* (3) */
              } else {
                $timeout(function () {
                  $state.go('auth', {});
                });
                defer.reject();
              }
              return defer.promise;
            }

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
                    /*resolve: {
                        redirectIfNotAuthenticated: _redirectIfNotAuthenticated
                    },*/
                    controller: 'UserController as user'
                });

        });
})();