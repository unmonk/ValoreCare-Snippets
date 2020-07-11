using Sabio.Services.Interfaces;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Messages
{
    public class ChatHubService : IChatHubService
    {
        private readonly ConcurrentDictionary<int, string> _connectedUsers = new ConcurrentDictionary<int, string>();
        private readonly ConcurrentDictionary<int, string> _currentChatrooms = new ConcurrentDictionary<int, string>();


        //Chat Functions
        public Task<string> AddOrUpdateUserRoom(int userOneId, int userTwoId)
        {
            //Create unique chatroom ID for two users
            //UserId 1,  UserId 2, sorted.
            //EX:  USER 5, USER 2 both join room "2_5"
            int[] usersArray = new int[] { userOneId, userTwoId };
            Array.Sort(usersArray);
            string chatRoomId = $"{usersArray[0]}_{usersArray[1]}";

            _currentChatrooms.AddOrUpdate(userOneId, chatRoomId, (userOneId, oldChatRoomId) =>
            {
                return chatRoomId;
            });

            return Task.FromResult(chatRoomId);
        }

        public Task<bool> isUserConnected(int userId)
        {
            bool isConnected = _connectedUsers.ContainsKey(userId);
            return Task.FromResult(isConnected);
        }

        public Task<string> GetCurrentUserRoom(int userId)
        {
            string currentUserRoom = _currentChatrooms.GetValueOrDefault(userId, null);
            return Task.FromResult(currentUserRoom);
        }

        public Task<string> UserHasConnected(int userId, string connectionId)
        {
            _connectedUsers.AddOrUpdate(userId, connectionId, (userId, oldConnectionId) =>
            {
                return connectionId;
            });

            return Task.FromResult(connectionId);
        }

        public Task<string> UserHasDisconnected(int userId)
        {
            _connectedUsers.TryRemove(userId, out string oldConnectionId);
            _currentChatrooms.TryRemove(userId, out string oldChatRoomId);

            return Task.FromResult(oldChatRoomId);

        }

        //Admin Panel

        public Task<int> GetTotalConversations()
        {
            int totalChatrooms = _currentChatrooms.Count;
            return Task.FromResult(totalChatrooms);
        }
    }

}
