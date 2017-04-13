using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoClient.Models
{
    public class FastStorageViewModel
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