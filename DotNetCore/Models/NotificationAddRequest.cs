using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Notifications
{
    public class NotificationAddRequest
    {
        [Required(ErrorMessage = "Provide a Valid User Id")]
        [Range(1, Int32.MaxValue)]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Provide a Valid Notification Type Id")]
        [Range(1, Int32.MaxValue)]
        public int NotificationTypeId { get; set; }

        [Required(ErrorMessage = "Provide a Valid Notification Text")]
        public string NotificationText { get; set; }

        [Required(ErrorMessage = "Notification Status is required")]
        public bool IsRead { get; set; }
    }
}
