angular.module('toDoList').controller('toDoController', ['$scope', 'toDoService', 'toDoDropboxService',
    function ($scope, toDoService, toDoDropboxService) {
        //var dbx = new Dropbox({ accessToken: 'h3-3Vk5WbY8AAAAAAAAACYShHGUxPvzjeikvkxEzHSI89eUfRWrr_KPvi-pKMuoY' });
        //dbx.filesListFolder({ path: '' })
        //  .then(function (response) {
        //      console.log(response);
        //  })
        //  .catch(function (error) {
        //      console.log(error);
        //  });
        //dbx.filesDownload({ path: '/test.txt' })
        //    .then(function(response) {
        //        var blob = response.fileBlob;
        //        var reader = new FileReader();
        //        reader.addEventListener("loadend", function() {
        //            console.log(reader.result);
        //        });
        //        reader.readAsText(blob);
        //    });
        //dbx.filesDelete({path: '/test1.txt'}).then(dbx.filesUpload({ path: '/test1.txt', contents: 'Hello world.' }));
        $scope.hello = 'hello';
        $scope.newCompleted = false;
        $scope.newName = '';
        $scope.data = [];

        $scope.test = toDoDropboxService.loadTasks();
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