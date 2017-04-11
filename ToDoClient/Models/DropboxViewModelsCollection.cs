using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace todoclient.Models
{
    public class DropboxViewModelsCollection
    {
        public IList<DropboxViewModel> ToDoItems { get; set; }

        public int UserId { get; set; }
    }
}