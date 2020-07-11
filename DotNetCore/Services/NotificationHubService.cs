using Sabio.Services.Interfaces.Notifications;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Notifications
{
    public class NotificationHubService : INotificationHubService
    {
        private readonly ConcurrentDictionary<int, string> _connectedUsers = new ConcurrentDictionary<int, string>();

        public Task<bool> isUserConnected(int userId)
        {
            bool isConnected = _connectedUsers.ContainsKey(userId);
            return Task.FromResult(isConnected);
        }
        public Task<string> UserHasConnected(int userId, string connectionId)
        {

            _connectedUsers.AddOrUpdate(userId, connectionId, (userId, oldConnectionId) =>
            {
                return connectionId;
            });

            //GetUnreadNotifictions 

            return Task.FromResult(connectionId);
        }

        public Task<string> UserHasDisconnected(int userId)
        {
            _connectedUsers.TryRemove(userId, out string oldConnectionId);

            return Task.FromResult(oldConnectionId);

        }

        //Admin Panel

        public Task<int> GetTotalUsers()
        {
            int totalUsers = _connectedUsers.Count;
            return Task.FromResult(totalUsers);
        }



    }
}
