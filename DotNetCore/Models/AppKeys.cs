using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain.AppSettings
{
    public class AppKeys
    {
        public string SendGridApiKey { get; set; }
        public string DailyCoApiKey { get; set; }
        public string StripeApiKey { get; set; }
        public AWSCredential AWSCredential { get; set; }
        public EvidentIdCredentials EvidentIdCredentials { get; set; }
    }
}
