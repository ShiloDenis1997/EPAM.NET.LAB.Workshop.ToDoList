using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Dropbox.Api;
using Dropbox.Api.Files;
using Newtonsoft.Json;
using ToDoClient.Models;
using ToDoClient.Services;
using ToDoClient.Services.Interfaces;

namespace ToDoClient.Controllers
{
    public class ToDosFastStorageController : ApiController
    {
        private readonly IItemsServiceAsync<FastStorageViewModelsCollection> fastTasksService;

        public ToDosFastStorageController(IItemsServiceAsync<FastStorageViewModelsCollection> fastTasksService)
        {
            this.fastTasksService = fastTasksService;
        }

        /// <summary>
        /// Gets all ToDos from fast storage
        /// </summary>
        /// <param name="userId">id of user</param>
        /// <returns>User's todos</returns>
        public async Task<FastStorageViewModelsCollection> Get(int userId)
        {
            return await fastTasksService.GetAllItemsAsync(userId);
        }

        /// <summary>
        /// Puts all tasks in fast storage
        /// </summary>
        /// <param name="modelsCollection"></param>
        /// <returns></returns>
        public async Task Put(FastStorageViewModelsCollection modelsCollection)
        {
            await fastTasksService.PutAllItemsAsync(modelsCollection);
        }
    }
}
