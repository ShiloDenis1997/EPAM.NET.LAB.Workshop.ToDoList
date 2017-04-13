using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace todoclient.Models
{
    public class DropboxViewModel
    {
        /// <summary>
        /// Indicates if todo is completed
        /// </summary>
        public bool IsCompleted { get; set; }

        /// <summary>
        /// Name of todo
        /// </summary>
        public string Name { get; set; }
    }
}