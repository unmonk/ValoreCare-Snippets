using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IChatHubService
    {
        Task<string> AddOrUpdateUserRoom(int userOneId, int userTwoId);
        Task<string> UserHasConnected(int userId, string connectionId);
        Task<string> UserHasDisconnected(int userId);
        Task<string> GetCurrentUserRoom(int userId);
        Task<bool> isUserConnected(int userId);
        Task<int> GetTotalConversations();

    }
}
