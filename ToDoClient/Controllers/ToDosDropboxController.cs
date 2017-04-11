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

namespace todoclient.Controllers
{
    public class ToDosDropboxController : ApiController
    {
        public async Task<DropboxViewModelsCollection> Get(int userId)
        {
            string jsonResult;
            using (var dbx = new DropboxClient("h3-3Vk5WbY8AAAAAAAAADqMwl-F4KwYp1ajgAaXJFjmozjGsrCvBRECOugqYBKsi"))
            {
                using (var response = await dbx.Files.DownloadAsync("/ToDoList/" + userId + ".txt"))
                {
                    jsonResult = await response.GetContentAsStringAsync();
                }
            }

            return JsonConvert.DeserializeObject<DropboxViewModelsCollection>(jsonResult);
        }

        public async Task Put(DropboxViewModelsCollection modelsCollection) 
        {
            string jsonData = JsonConvert.SerializeObject(modelsCollection);
            using (var dbx = new DropboxClient("h3-3Vk5WbY8AAAAAAAAADqMwl-F4KwYp1ajgAaXJFjmozjGsrCvBRECOugqYBKsi"))
            {
                using (var mem = new MemoryStream(Encoding.UTF8.GetBytes(jsonData)))
                {
                    await dbx.Files.UploadAsync(
                        "/ToDoList/" + modelsCollection.UserId + ".txt",
                        WriteMode.Overwrite.Instance,
                        body: mem);
                }
                
            }
        }
    }
}
