using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using ToDoClient.Models;
using ToDoClient.Services;

namespace ToDoClient.Controllers
{
    /// <summary>
    /// Processes todo requests.
    /// </summary>
    public class ToDosController : ApiController
    {
        private readonly ToDoService todoService;
        private readonly UserService userService;

        public ToDosController(ToDoService todoService, UserService userService)
        {
            this.todoService = todoService;
            this.userService = userService;
        }
        /// <summary>
        /// Returns all todo-items for the current user.
        /// </summary>
        /// <returns>The list of todo-items.</returns>
        public async Task<IList<ToDoItemViewModel>> Get()
        {
            var userId = await userService.GetOrCreateUserAsync();
            return await todoService.GetItemsAsync(userId);
        }

        /// <summary>
        /// Updates the existing todo-item.
        /// </summary>
        /// <param name="todo">The todo-item to update.</param>
        public async Task Put(ToDoItemViewModel todo)
        {
            todo.UserId = await userService.GetOrCreateUserAsync();
            await todoService.UpdateItemAsync(todo);
        }

        /// <summary>
        /// Deletes the specified todo-item.
        /// </summary>
        /// <param name="id">The todo item identifier.</param>
        public async Task Delete(int id)
        {
            await todoService.DeleteItemAsync(id);
        }

        /// <summary>
        /// Creates a new todo-item.
        /// </summary>
        /// <param name="todo">The todo-item to create.</param>
        public async Task Post(ToDoItemViewModel todo)
        {
            todo.UserId = await userService.GetOrCreateUserAsync();
            await todoService.CreateItemAsync(todo);
        }
    }
}
