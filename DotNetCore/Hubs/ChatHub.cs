using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Razor.Language.Extensions;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Notification;
using Sabio.Models.Requests.Messages;
using Sabio.Models.Requests.Notifications;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Services.Interfaces.Messages;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly IMessageService _service = null;
        private readonly IAuthenticationService<int> _authService = null;
        private readonly IChatHubService _chatHubService = null;
        private readonly IUserProfilesService _profileService = null;
        private readonly IVideoChatService _videoChatService = null;
        private readonly INotificationService _notificationService = null;
        private readonly IHubContext<NotificationHub> _notificationHubContext = null;

        public ChatHub(IMessageService service, ILogger<ChatHub> logger, IAuthenticationService<int> authService, IChatHubService chatHubService, IUserProfilesService profileService, IVideoChatService videoChatService, INotificationService notificationContext, IHubContext<NotificationHub> notificationHubContext)
        {
            _service = service;
            _authService = authService;
            _chatHubService = chatHubService;
            _profileService = profileService;
            _videoChatService = videoChatService;
            _notificationService = notificationContext;
            _notificationHubContext = notificationHubContext;

        }

        public override async Task OnConnectedAsync()
        {

            int userId = _authService.GetCurrentUserId();
            string userConnection = this.Context.ConnectionId;
            //Add user to online list
            await _chatHubService.UserHasConnected(userId, userConnection);


            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            int userId = _authService.GetCurrentUserId();
            //Remove user from online list and get last chatroomid
            string oldChatRoomId =  await _chatHubService.UserHasDisconnected(userId);
            //Remove user from last chat room
            await Groups.RemoveFromGroupAsync(this.Context.ConnectionId, oldChatRoomId);


            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendAddContact(int contactId)
        {
            try
            {
                UserProfile userProfile = _profileService.Get(contactId);
                if (userProfile == null)
                {
                    await Clients.Caller.SendAsync("ReceiveAddContact", null);
                }
                else
                {
                    await Clients.Caller.SendAsync("ReceiveAddContact", userProfile);
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("ReceiveAddContact", null, ex);
            }

        }


        public async Task GetContacts()
        {
            int userId = _authService.GetCurrentUserId();
            try
            {
                //DB Call
                List<UserProfile> userProfiles = _service.GetCorrespondents(userId);
                if (userProfiles == null)
                {
                    await Clients.Caller.SendAsync("ReceiveContacts", null);
                }
                else
                {
                    //foreach (UserProfile user in userProfiles)
                    //{

                    //    user.isOnline = await _chatHubService.isUserConnected(profile.UserId);

                    //}
                    await Clients.Caller.SendAsync("ReceiveContacts", userProfiles);
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("ReceiveContacts", null, ex);
            }
        }

        public async Task GetConversation(int contactId)
        {
            int userId = _authService.GetCurrentUserId();
            //Leave Old Chatroom if in one
            string oldChatRoomId = await _chatHubService.GetCurrentUserRoom(userId);
            if(oldChatRoomId != null)
            {
                await Groups.RemoveFromGroupAsync(this.Context.ConnectionId, oldChatRoomId);
            }

            //Join Chatroom
            string chatRoomId = await _chatHubService.AddOrUpdateUserRoom(userId, contactId);
            await Groups.AddToGroupAsync(this.Context.ConnectionId, chatRoomId);
            try
            {
                //DB Call
                List<Message> messages = _service.GetConversation(userId, contactId);
                //send initial conversation individually, so user 1 doesnt refresh on user 2 join
                if (messages == null)
                {
                    await Clients.Caller.SendAsync("ReceiveMessages", null);
                }
                else
                {
                    await Clients.Caller.SendAsync("ReceiveMessages", messages);
                }
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("ReceiveMessages", null, ex);
            }

        }

        public async Task SendMessage(string messageText, int recipientId, string recipientName)
        {
            int userId = _authService.GetCurrentUserId();
            //Create MessageAddRequest
            MessageAddRequest message = new MessageAddRequest();
            message.RecipientId = recipientId;
            message.MessageText = messageText;
            message.DateSent = DateTime.Now;

            //DB Call
            int createdMessageId  = _service.Add(message, userId);

            //Create message to send
            Message createdMessage = new Message();
            UserProfile recipient = new UserProfile();
            recipient.UserId = recipientId;
            UserProfile sender = new UserProfile();
            sender.UserId = userId;
            createdMessage.Recipient = recipient;
            createdMessage.Sender = sender;
            createdMessage.MessageText = messageText;
            createdMessage.DateSent = DateTime.Now;
            Random rnd = new Random();
            createdMessage.Id = rnd.Next(500000);

            // TODO Try/catch sql exception

            //Get current chatroom and send
            NotificationAddRequest notification = new NotificationAddRequest();
            notification.UserId = recipientId;
            notification.NotificationTypeId = 2;
            notification.NotificationText = $"New message from {recipientName}";
            Notification notification1 = new Notification();
            notification1.NotificationText = $"New message from {recipientName}";
            notification1.UserId = recipientId;
            notification1.NotificationTypeId = 2;
            notification1.DateCreated = new DateTime();

            _notificationService.Add(notification);
            string chatRoomId = await _chatHubService.GetCurrentUserRoom(userId);
            await  Clients.Group(chatRoomId).SendAsync("AddMessage", createdMessage);
            await _notificationHubContext.Clients.User(recipientId.ToString()).SendAsync("ReceiveNotification", notification1);


        }

        public async Task DeleteMessage(int messageId)
        {
            //DB Call
            int userId = _authService.GetCurrentUserId();
            _service.Delete(messageId);
            // TODO Try/catch sql exception

            //Get current chatroom and send
            string chatRoomId = await _chatHubService.GetCurrentUserRoom(userId);
            await Clients.Group(chatRoomId).SendAsync("RecieveDelete", messageId);
        }


        public async Task StartVideoChat()
        {
            try
            {
                int userId = _authService.GetCurrentUserId();
                string chatRoomId = await _chatHubService.GetCurrentUserRoom(userId);
                HttpResponseMessage response = await _videoChatService.createRoom(chatRoomId);
                var responseStream = await response.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                var finalResponse = new ItemResponse<Object> { Item = jsonresponse };
                await Clients.Group(chatRoomId).SendAsync("AddVideoMessage", finalResponse);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("AddVideoMessage", null, ex);
            }

        }

        public async Task EndVideoChat()
        {
            try
            {
                int userId = _authService.GetCurrentUserId();
                string chatRoomId = await _chatHubService.GetCurrentUserRoom(userId);

                HttpResponseMessage response = await _videoChatService.deleteRoom(chatRoomId);
                var responseStream = await response.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                var finalResponse = new ItemResponse<Object> { Item = jsonresponse };
                await Clients.Group(chatRoomId).SendAsync("AddVideoMessage", finalResponse);
            }
            catch (Exception ex)
            {
                await Clients.Caller.SendAsync("AddVideoMessage", null, ex);
            }

        }



        public async Task TotalConversationCount()
        {
            int totalConversations = await _chatHubService.GetTotalConversations();
            await Clients.Caller.SendAsync("ReceiveTotalConversations", totalConversations);
        }




    }
}
