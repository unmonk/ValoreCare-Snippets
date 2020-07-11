using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Message
    {
        public int Id { get; set; }
        public string MessageText { get; set; }

        public string Subject { get; set; }

        public UserProfile Recipient { get; set; }

        public UserProfile Sender { get; set; }

        public DateTime? DateSent { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime DateModified { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
