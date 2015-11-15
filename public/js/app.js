/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create main module and include all necessary modules
var mainModule = angular.module('mainModule', [
    'ngRoute',
    'appControllers',
    'restService'
]);

// Create routs
mainModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/word/:id', {
            templateUrl: '/partials/word.html',
            controller: 'wordCtrl'
        })
        .when('/login', {
            templateUrl: '/partials/login.html',
            controller: 'loginCtrl'
        })
        .otherwise({
            templateUrl: 'partials/main.html',
            controller: 'listCtrl'
        });
}]);