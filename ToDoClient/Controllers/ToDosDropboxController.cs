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
using todoclient.Models;
using ToDoClient.Models;
using ToDoClient.Services;

namespace todoclient.Controllers
{
    public class ToDosDropboxController : ApiController
    {
        private readonly DropBoxToDoService dropboxToDoService;

        public ToDosDropboxController(DropBoxToDoService dropBoxService)
        {
            dropboxToDoService = dropBoxService;
        }

        /// <summary>
        /// Gets all ToDos from dropbox
        /// </summary>
        /// <param name="userId">id of user</param>
        /// <returns>User's todos</returns>
        public async Task<DropboxViewModelsCollection> Get(int userId)
        {
            return await dropboxToDoService.GetAllTasksAsync(userId);
        }

        /// <summary>
        /// Puts all tasks in dropbox
        /// </summary>
        /// <param name="modelsCollection"></param>
        /// <returns></returns>
        public async Task Put(DropboxViewModelsCollection modelsCollection)
        {
            await dropboxToDoService.PutAllTasksAsync(modelsCollection);
        }
    }
}
