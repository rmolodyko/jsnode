/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create rest module
var restService = angular.module('restService', ['ngResource']);

// Create Word model
// TODO change it because we must use this(Word.getOne({count: true})) expression for get count of items
restService.factory('Word', ['$resource', '$http', function($resource, $http){
    // User main url for restful api
    var resources = $resource('api/words/:id', null, {
        getOne: {method: 'GET', isObject: true},
        getAll: {method: 'GET', isArray: true},
        add: {method: 'POST'},
        delete: {method: 'DELETE'}
    });
    return resources;
}]);
