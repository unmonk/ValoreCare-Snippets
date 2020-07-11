using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Notification;
using Sabio.Models.Requests.Notifications;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Services.Interfaces
{
   public interface INotificationService
    {
        List<Notification> GetByUserId(int userId);
        List<Notification> GetNotReadByUserId(int userId);
        Notification GetById(int id);
        int Add(NotificationAddRequest model);
        void Update(NotificationUpdateRequest model, int userId);
        void UpdateIsReadStatus( int userId);
    }
}
