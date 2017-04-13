using Dropbox.Api;
using Dropbox.Api.Files;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using todoclient.Models;

namespace ToDoClient.Services
{
    public class DropBoxToDoService
    {
        /// <summary>
        /// Dropbox application api key
        /// </summary>
        private static readonly string API_KEY = ConfigurationManager.AppSettings["DropBoxApiToken"];

        /// <summary>
        /// Path to folder in dropbox where user data will be stored
        /// </summary>
        private static readonly string folder = "/ToDoList/";

        /// <summary>
        /// Extension for files with user's data (needs only to simplify review of files on dropbox)
        /// </summary>
        private static readonly string extension = ".txt";

        /// <summary>
        /// Gets all toDoItems of concrete user from dropbox
        /// </summary>
        /// <param name="userId">id of user</param>
        /// <returns>All toDoItems of user with <paramref name="userId"/> </returns>
        public async Task<DropboxViewModelsCollection> GetAllTasksAsync(int userId)
        {
            string jsonResult;
            using (var dbx = new DropboxClient(API_KEY))
            {
                using (var response = await dbx.Files.DownloadAsync($"{folder}{userId}{extension}"))
                {
                    jsonResult = await response.GetContentAsStringAsync();
                }
            }

            return JsonConvert.DeserializeObject<DropboxViewModelsCollection>(jsonResult);
        }

        /// <summary>
        /// Puts all tasks to user's file on dropbox
        /// </summary>
        /// <param name="modelsCollection">Contains user's tasks and userId</param>
        /// <returns></returns>
        public async Task PutAllTasksAsync(DropboxViewModelsCollection modelsCollection)
        {
            string jsonData = JsonConvert.SerializeObject(modelsCollection);
            using (var dbx = new DropboxClient(API_KEY))
            {
                using (var mem = new MemoryStream(Encoding.UTF8.GetBytes(jsonData)))
                {
                    await dbx.Files.UploadAsync(
                        $"{folder}{modelsCollection.UserId}{extension}",
                        WriteMode.Overwrite.Instance,
                        body: mem);
                }

            }
        }
    }
}