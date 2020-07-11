using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Sabio.Models.Domain.Notification;
using Sabio.Services;
using Sabio.Services.Interfaces.Notifications;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Hubs
{
 
    public class NotificationHub : Hub
    {
        private readonly IAuthenticationService<int> _authService = null;
        private readonly INotificationHubService _notificationHubService = null;
        private readonly INotificationService _notificationService = null;

        public NotificationHub(IAuthenticationService<int> authService, INotificationHubService notificationHubService, INotificationService notificationService)
        {
            _authService = authService;
            _notificationHubService = notificationHubService;
            _notificationService = notificationService;
        }

        public override async Task OnConnectedAsync()
        {

            int userId = _authService.GetCurrentUserId();
            string userConnection = this.Context.ConnectionId;
            //Add user to online list
            await _notificationHubService.UserHasConnected(userId, userConnection);
            List<Notification> notifications = _notificationService.GetNotReadByUserId(userId);

            //Return unread notifications


            await base.OnConnectedAsync();
        }

        public async Task GetNotifications()
        {
            int userId = _authService.GetCurrentUserId();
            List<Notification> notifications = _notificationService.GetNotReadByUserId(userId);
            await Clients.Caller.SendAsync("ReceiveNotifications", notifications);

        }

        public async Task SendNotification(Notification notification)
        {
            string userId = notification.UserId.ToString();
            await Clients.User(userId).SendAsync("ReceiveNotification", notification);
        }

        public void NotificationsViewed()
        {
            int userId = _authService.GetCurrentUserId();
            _notificationService.UpdateIsReadStatus(userId);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            int userId = _authService.GetCurrentUserId();
            //Remove user from online list
            await _notificationHubService.UserHasDisconnected(userId);

            await base.OnDisconnectedAsync(exception);
        }
    }


}
