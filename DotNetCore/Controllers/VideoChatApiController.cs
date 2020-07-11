using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain.Messages;
using Sabio.Models.Requests.Messages;
using Sabio.Services;
using Sabio.Services.Interfaces.Messages;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{

    [Route("api/videochat")]
    [ApiController]
    public class VideoChatApiController : BaseApiController
    {
        private IVideoChatService _service = null;
        private IAuthenticationService<int> _authService = null;
        public VideoChatApiController(IVideoChatService service, ILogger<MessageApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public async Task<ActionResult> getConfig()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {

                    HttpResponseMessage responseContent = await _service.getConfig();
                    var responseStream = await responseContent.Content.ReadAsStreamAsync();
                    var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                    response = new ItemResponse<Object> { Item = jsonresponse };
                   
            }

            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost("room")]
        public async Task<ActionResult> createRoom(int recipientId)
        {
            int code = 200;
            BaseResponse response = null;
  
            try
            {
                int userId = _authService.GetCurrentUserId();
                int[] usersArray = new int[] { userId, recipientId};
                Array.Sort(usersArray);
                string chatRoomId = $"{usersArray[0]}_{usersArray[1]}";

                HttpResponseMessage responseContent = await _service.createRoom(chatRoomId);
                var responseStream = await responseContent.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                response = new ItemResponse<Object> { Item = jsonresponse };

            }
            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("room/{roomId:minlength(3)}")]
        public async Task<ActionResult> getRoom(string roomId)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {

                HttpResponseMessage responseContent = await _service.getRoom(roomId);
                var responseStream = await responseContent.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                response = new ItemResponse<Object> { Item = jsonresponse };

            }

            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("room/{roomId:minlength(3)}")]
        public async Task<ActionResult> deleteRoom(string roomId)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {

                HttpResponseMessage responseContent = await _service.deleteRoom(roomId);
                var responseStream = await responseContent.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                response = new ItemResponse<Object> { Item = jsonresponse };

            }

            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


        [HttpGet("rooms")]
        public async Task<ActionResult> getRooms()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {

                HttpResponseMessage responseContent = await _service.getRooms();
                var responseStream = await responseContent.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                response = new ItemResponse<Object> { Item = jsonresponse };

            }

            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("meetings")]
        public async Task<ActionResult> getMeetings()
        {

            int code = 200;
            BaseResponse response = null;
            try
            {

                HttpResponseMessage responseContent = await _service.getMeetings();
                var responseStream = await responseContent.Content.ReadAsStreamAsync();
                var jsonresponse = await JsonSerializer.DeserializeAsync<Object>(responseStream);
                response = new ItemResponse<Object> { Item = jsonresponse };

            }

            catch (Exception ex)
            {
                code = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

    }
    
    
}