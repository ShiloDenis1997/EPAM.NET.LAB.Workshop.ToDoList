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
            var nameToAdd = $scope.newName + 'guid:' + getGuid();

            $scope.tasks.push({
                IsCompleted: $scope.newCompleted, Name: nameToAdd
            });
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            toDoService.createTask($scope.newCompleted, nameToAdd)
                .then(function () {
                    $scope.loadTasks();
                });
            $scope.newCompleted = false;
            $scope.newName = '';
        }

        function getGuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        $scope.trimGuid = function (taskWithGuid) {
            var index = taskWithGuid.lastIndexOf('guid:');
            return taskWithGuid.substring(0, index);
        }

        $scope.updateTask = function()
        {
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            $scope.loadTasks();
        }

        $scope.deleteTask = function(index)
        {
            $scope.tasks.splice(index, 1);
            toDoDropboxService.updateTasks($scope.tasks, $scope.userId);
            $scope.loadTasks();
        }

        $scope.loadTasks = function()
        {
            toDoService.loadTasks()
                .then(function (response) {
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