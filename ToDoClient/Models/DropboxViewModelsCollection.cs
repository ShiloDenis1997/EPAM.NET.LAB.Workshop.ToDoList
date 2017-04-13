using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace todoclient.Models
{
    /// <summary>
    /// Data structure to store in dropbox
    /// </summary>
    public class DropboxViewModelsCollection
    {
        /// <summary>
        /// List of user's todos
        /// </summary>
        public IList<DropboxViewModel> ToDoItems { get; set; }

        /// <summary>
        /// Gets or sets user id
        /// </summary>
        /// <value>
        /// The user identifier
        /// </value>
        public int UserId { get; set; }
    }
}