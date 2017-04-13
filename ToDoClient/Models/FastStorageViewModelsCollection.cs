using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoClient.Models
{
    /// <summary>
    /// Data structure to store in dropbox
    /// </summary>
    public class FastStorageViewModelsCollection
    {
        /// <summary>
        /// List of user's todos
        /// </summary>
        public IList<FastStorageViewModel> ToDoItems { get; set; }

        /// <summary>
        /// Gets or sets user id
        /// </summary>
        /// <value>
        /// The user identifier
        /// </value>
        public int UserId { get; set; }
    }
}