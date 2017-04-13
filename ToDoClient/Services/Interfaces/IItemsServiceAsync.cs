using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoClient.Services.Interfaces
{
    public interface IItemsServiceAsync<T>
    {
        Task<T> GetAllItemsAsync(int userId);

        Task PutAllItemsAsync(T items);
    }
}
