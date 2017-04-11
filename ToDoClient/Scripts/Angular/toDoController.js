angular.module('toDoList').controller('toDoController', ['$scope', 'toDoService',
    function ($scope, toDoService) {
        $scope.hello = 'hello';
        $scope.addClick = function()
        {
            $scope.hello = 'hi';
        }
    }]);