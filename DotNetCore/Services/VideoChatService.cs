using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text;
using Sabio.Services.Interfaces.Messages;
using System.Threading.Tasks;
using Sabio.Models.Domain.AppSettings;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Routing.Patterns;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Sabio.Models.Requests.Messages;
using Sabio.Models.Domain.Messages;

namespace Sabio.Services.Messages
{
    public class VideoChatService : IVideoChatService
    {
        private IHttpClientFactory _clientFactory;
        private string BaseUrl = "https://api.daily.co/v1/";
        private AuthenticationHeaderValue AuthHeader;


        public VideoChatService(IOptions<AppKeys> appKeys, IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            string ApiKey = appKeys.Value.DailyCoApiKey;
            AuthHeader = new AuthenticationHeaderValue("Bearer", ApiKey);

        }
        public async Task<HttpResponseMessage> getRooms()
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            var response = await client.GetAsync($"{BaseUrl}rooms");
            client.Dispose();
            return response;
        }


        public async Task<HttpResponseMessage> getConfig()
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            var response = await client.GetAsync($"{BaseUrl}");
            client.Dispose();
            return response;
        }

        public async Task<HttpResponseMessage> getRoom(string roomId)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            var response = await client.GetAsync($"{BaseUrl}rooms/{roomId}");
            client.Dispose();
            return response;
        }

        public async Task<HttpResponseMessage> createRoom(string roomId)
        {
            var client = _clientFactory.CreateClient();
            VideoChatAddReqeust model = new VideoChatAddReqeust();
            model.name = roomId;
            model.properties = new VideoChatProperties();
            model.properties.max_participants = 2;
            model.properties.exp = GetUnixEpoch() + 3600;
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            HttpContent payload = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}rooms", payload);
            client.Dispose();
            return response;
        }

        public async Task<HttpResponseMessage> deleteRoom(string roomId)
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            var response = await client.DeleteAsync($"{BaseUrl}/rooms/{roomId}");
            client.Dispose();
            return response;
        }


        public async Task<HttpResponseMessage> getMeetings()
        {
            var client = _clientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = AuthHeader;
            var response = await client.GetAsync($"{BaseUrl}/meetings");
            client.Dispose();
            return response;
        }

        private static double GetUnixEpoch()
        {
            TimeSpan timeDifference = DateTime.UtcNow -
            new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            long unixEpochTime = Convert.ToInt64(timeDifference.TotalSeconds);
            return unixEpochTime;
        }





    }
}
