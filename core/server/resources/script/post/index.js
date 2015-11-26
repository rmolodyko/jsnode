/**
 * Created by rmolodyko on 21.11.2015.
 */
var app = angular.module('post', []);

/**
 * Create post controller
 */
app.controller('PostController', ['$scope', '$sce', function($scope, $sce) {

    // Set resize on textarea
    var helper = new Helper();
    helper.setResize();

    // Get markdown converter
    var converter = new showdown.Converter();

    // On content will be changed then update result block
    $scope.$watch('content', function(value){

        // Convert markdown to html
        $scope.result = $sce.trustAsHtml(converter.makeHtml(value));
    });
}]);

/**
 * Helper class
 */
Helper = (function(){
    function Helper(){}

    // Use plugin autosize to change height of textarea when field input
    Helper.prototype.setResize = function() {

        // Init plugin
        var element = $('#raw-input');
        autosize(element);

        // Resize element
        setTimeout(function(){
            autosize.update(element);
        }, 100);
    };

    return Helper;
})();
