using Newtonsoft.Json.Linq;
using Sabio.Models.Requests.Messages;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces.Messages
{
    public interface IVideoChatService
    {
        Task<HttpResponseMessage> getRooms();

        Task<HttpResponseMessage> getConfig();

        Task<HttpResponseMessage> getMeetings();

        Task<HttpResponseMessage> getRoom(string roomId);

        Task<HttpResponseMessage> createRoom(string roomId);

        Task<HttpResponseMessage> deleteRoom(string roomId);

    }
}
