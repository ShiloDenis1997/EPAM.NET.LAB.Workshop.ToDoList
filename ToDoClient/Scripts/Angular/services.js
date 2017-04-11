angular.module('toDoList').service('toDoService', [
    '$http', function($http) {
        return {
            loadTasks: loadTasks,
            createTask: createTask,
            updatTask: updateTask,
            deleteTask: deleteTask
        }
    }
]);