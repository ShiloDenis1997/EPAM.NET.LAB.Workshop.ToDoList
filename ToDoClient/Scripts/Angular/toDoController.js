angular.module('toDoList').controller('toDoController', ['$scope', '$cookies', 'toDoService', 'toDoDropboxService',
    function ($scope, $cookies, toDoService, toDoDropboxService) {
        $scope.newCompleted = false;
        $scope.newName = '';
        $scope.tasks = [];
        $scope.showPreloader = true;;
        $scope.userId = $cookies.get('user');
        console.log('user');
        console.log($scope.userId);
        if ($scope.userId !== undefined)
        {
            toDoDropboxService.loadTasks($scope.userId)
                .then(function (response) {
                    console.log('get from dropbox success');
                    $scope.tasks = response.data.ToDoItems;
                    console.log($scope.tasks);
                    $scope.showPreloader = false;
                }, function (response) {
                    console.log('get from dropbox failed');
                });
        }
        //$scope.test = toDoDropboxService.loadTasks();
        console.log($scope.test);

        $scope.addClick = function()
        {
            $scope.tasks.push({
                IsCompleted: $scope.newCompleted, Name: $scope.newName
            });
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            toDoService.createTask($scope.newCompleted, $scope.newName)
                .then(function () {
                    $scope.loadTasks();
                });
            $scope.newCompleted = false;
            $scope.newName = '';
        }

        $scope.updateTask = function()
        {
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            $scope.loadTasks();
            //toDoService.updateTask(taskId, isCompleted, name)
            //    .then(function (response) {
            //        $scope.loadTasks();
            //    });
        }

        $scope.deleteTask = function(index)
        {
            $scope.tasks.splice(index, 1);
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            $scope.loadTasks();
            //toDoService.deleteTask(taskId)
            //    .then(function (response) {
            //        $scope.loadTasks();
            //    });
        }

        $scope.loadTasks = function()
        {
            toDoService.loadTasks()
                .then(function (response) {
                    //$scope.tasks = response.data;
                    $scope.synchronize(response.data);
                    console.log($scope.tasks);
                    $scope.showPreloader = false;
                });
        }
        
        //init tasks list
        $scope.loadTasks();

        $scope.synchronize = function (cloudTasks) {
            $scope.userId = $cookies.get('user');
            for (var i = 0; i < cloudTasks.length; i++) {
                for (var j = 0; j < $scope.tasks.length; j++) {
                    if (cloudTasks[i].Name.replace(/\s+$/, '') === $scope.tasks[j].Name) {
                        if (cloudTasks[i].IsCompleted !== $scope.tasks[j].IsCompleted) {
                            toDoService.updateTask(
                                cloudTasks[i].ToDoId, $scope.tasks[j].IsCompleted, $scope.tasks[j].Name);
                        }
                        break;
                    }
                }
                if (j === $scope.tasks.length) {
                    toDoService.deleteTask(cloudTasks[i].ToDoId);
                }
            }
            console.log('scope tasks');
            console.log($scope.tasks);
            console.log('cloud tasks');
            console.log(cloudTasks);
        }
    }]);