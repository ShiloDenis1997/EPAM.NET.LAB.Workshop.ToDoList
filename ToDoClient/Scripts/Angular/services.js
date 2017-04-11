﻿angular.module('toDoList').service('toDoService', [
    '$http', function($http) {
        return {
            loadTasks: loadTasks,
            createTask: createTask,
            updatTask: updateTask,
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
]);