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
                return $http.put("api/todos", { ToDoId: id, IsCompleted: isCompleted, Name: name });
            }

            function deleteTask(taskId) {
                return $http.delete("api/todos/" + taskId);
            }
        }
    ])
    .service('toDoDropboxService', [
        '$http', function ($http) {
            return {
                loadTasks: loadTasks,
                updateTasks: updateTasks
            } 

            function loadTasks(userId) {
                return $http.get("api/todosDropbox?userid=" + userId);
            }

            function updateTasks(tasks) {
                return $http.put("api/todosDropbox", tasks);
            }
        }
    ]);