using Dropbox.Api;
using Dropbox.Api.Files;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
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
        private static readonly string API_KEY = "h3-3Vk5WbY8AAAAAAAAADqMwl-F4KwYp1ajgAaXJFjmozjGsrCvBRECOugqYBKsi";

        private static readonly string folder = "/ToDoList/";

        private static readonly string extension = ".txt";

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