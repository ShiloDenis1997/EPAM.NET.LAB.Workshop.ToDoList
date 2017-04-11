angular.module('toDoList').service('toDoService', [
        '$http', function($http) {
            return {
                loadTasks: loadTasks,
                createTask: createTask,
                updateTask: updateTask,
                deleteTask: deleteTask
            }

            function loadTasks() {
                return $http.get("api/todos");
            }

            function createTask(isCompleted, name) {
                return $http.post("api/todos", { IsCompleted: isCompleted, Name: name });
            }

            function updateTask(id, isCompleted, name) {
                return $http.put("api/todos", { ToDoId: id, IsCompleted: isCompleted, Name: name })
            }

            function deleteTask(taskId) {
                return $http.delete("api/todos/" + taskId);
            }
        }
    ])
    .service('toDoDropboxService', [
        '$http', '$cookies', function ($http, $cookies) {

            var data = {};
            data.result = [];

            return {
                loadTasks: loadTasks,
                //updateTasks: updateTasks
            }

            function loadTasks() {
                var dbx = new Dropbox({ accessToken: 'h3-3Vk5WbY8AAAAAAAAACYShHGUxPvzjeikvkxEzHSI89eUfRWrr_KPvi-pKMuoY' });
                var result = [];
                dbx.filesDownload({ path: '/test1.txt' })
                .then(function (response) {
                    var blob = response.fileBlob;
                    var reader = new FileReader();
                    
                    reader.addEventListener("loadend", function () {
                        //console.log(reader.result);
                       result.push(reader.result);
                    });
                    reader.readAsText(blob);
                });

                return result;
            }
        }
    ]);