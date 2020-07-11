using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces.Notifications
{
    public interface INotificationHubService
    {
        Task<string> UserHasConnected(int userId, string connectionId);
        Task<string> UserHasDisconnected(int userId);
        Task<bool> isUserConnected(int userId);
        Task<int> GetTotalUsers();
    }
}
