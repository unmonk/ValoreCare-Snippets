using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Messages
{
    public class MessageAddRequest
    {
        [Required(ErrorMessage = "A Message is required.")]
        [StringLength(1000, ErrorMessage = "Length Limit Exceeded")]
        public string MessageText { get; set; }

        [StringLength(1000, ErrorMessage = "Length Limit Exceeded")]
        public string Subject { get; set; }
        [Required(ErrorMessage = "A Recipient is required.")]
        public int RecipientId { get; set; }

        public DateTime? DateSent { get; set; }

        public DateTime? DateRead { get; set; }

    }
}
