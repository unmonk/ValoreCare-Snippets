using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.Notification
{
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int NotificationTypeId { get; set; }

        public string NotificationText { get; set; }

        public bool IsRead { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
