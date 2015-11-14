/**
 * Created by rmolodyko on 14.11.2015.
 */

// Create new model
var appControllers = angular.module('appControllers', ['angularUtils.directives.dirPagination']);

// Controller for work with one word
appControllers.controller('wordCtrl', ['$scope', '$routeParams', '$http', 'Word', function ($scope, $routeParams, $http, Word) {
    var id = $routeParams.id;
    $scope.word = Word.getOne({id: id, limit: 1});
}]);

// Controller for work with list of words(items)
appControllers.controller('listCtrl', ['$scope', '$http', 'Word', function ($scope, $http, Word) {

    // Set initial data for pagination
    $scope.currentPage = 1;
    $scope.pageSize = 2;

    // If page of page was changed update pagination
    $scope.pageChangeHandler = function(num) {
        $scope.currentPage = num;
        refreshData();
    };

    // Update data
    refreshData();

    // Set initial count of items
    $scope.totalItems = Word.getOne({count: true});

    $scope.add = function(){
        // Add word
        Word.add({'word': $scope.word});
        // Remove some text from input
        $scope.word = '';
        // Update count of items
        $scope.totalItems = Word.getOne({count: true});
        refreshData();
    };

    $scope.delete = function(id){
        // Delete word
        Word.delete({id: id});
        // Update count of items
        $scope.totalItems = Word.getOne({count: true});
        refreshData();
    };

    // Get need data which is nested in criteria
    function refreshData() {
        $scope.words = Word.getAll({limit:$scope.pageSize, skip:$scope.pageSize*($scope.currentPage-1)});
    }
}]);
