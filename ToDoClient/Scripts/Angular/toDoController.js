angular.module('toDoList').controller('toDoController', ['$scope', '$cookies', 'toDoService', 'toDoDropboxService',
    function ($scope, $cookies, toDoService, toDoDropboxService) {
        $scope.hello = 'hello';
        $scope.newCompleted = false;
        $scope.newName = '';
        $scope.data = [];

        $scope.userId = $cookies.get('user');
        console.log('user');
        console.log($scope.userId);
        if ($scope.userId !== undefined)
        {
            toDoDropboxService.updateTasks([{
                Userid: $scope.userId,
                IsCompleted: false,
                Name: "genTask"
            }]
            );
            $scope.test = toDoDropboxService.loadTasks($scope.userId);
        }
        //$scope.test = toDoDropboxService.loadTasks();
        console.log($scope.test);

        $scope.addClick = function()
        {
            toDoService.createTask($scope.newCompleted, $scope.newName)
                .then(function () {
                    $scope.loadTasks();
                });
        }

        $scope.updateTask = function(taskId, isCompleted, name)
        {
            toDoService.updateTask(taskId, isCompleted, name)
                .then(function (response) {
                    $scope.loadTasks();
                });
        }

        $scope.deleteTask = function(taskId)
        {
            toDoService.deleteTask(taskId)
                .then(function (response) {
                    $scope.loadTasks();
                });
        }

        $scope.loadTasks = function()
        {
            toDoService.loadTasks()
                .then(function (responce) {
                    $scope.data = responce.data;
                    console.log($scope.data);
                });
        }
        
        //init tasks list
        $scope.loadTasks();
    }]);