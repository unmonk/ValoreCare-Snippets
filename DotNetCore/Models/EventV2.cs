using Sabio.Models.Domain.Venues;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.EventV2
{
    public class EventV2 : Event
    {
        public long? Price { get; set; }

        public int? Capacity { get; set; }

        public int? ParticipantUserId { get; set; }

        public string StripeProductId { get; set; }

        public string StripePriceId { get; set; }

        public VenuesV2 VenueV2 { get; set; }
  
    }
}

