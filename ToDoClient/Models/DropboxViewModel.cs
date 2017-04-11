using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace todoclient.Models
{
    public class DropboxViewModel
    {
        public int Userid { get; set; }

        public bool IsCompleted { get; set; }

        public string Name { get; set; }
    }
}