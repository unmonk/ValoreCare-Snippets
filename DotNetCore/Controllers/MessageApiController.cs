using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.Web.CodeGeneration.DotNet;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Messages;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/messages")]
    [ApiController]
    public class MessageApiController : BaseApiController
    {
        private IMessageService _service = null;
        private IAuthenticationService<int> _authService = null;

        public MessageApiController(IMessageService service, ILogger<MessageApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet]
        public ActionResult<ItemsResponse<List<Message>>> Get()
        {
            int iCode = 200;
            BaseResponse response;
            try
            {
                List<Message> messages = _service.GetAll();
                if (messages == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Messages Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = messages };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemsResponse<Paged<Message>>> GetPaginate(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Message> paged = _service.Paginate(pageIndex, pageSize);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Message>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("conversation/{id:int}")]
        public ActionResult<ItemsResponse<List<Message>>> GetConversation(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                List<Message> paged = _service.GetConversation(userId, id);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("correspondents")]
        public ActionResult<ItemsResponse<List<UserProfile>>> GetCorrespondents()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                List<UserProfile> paged = _service.GetCorrespondents(userId);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<List<UserProfile>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }



        [HttpGet("sent")]
        public ActionResult<ItemsResponse<List<Message>>> GetSentBy()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                List<Message> paged = _service.GetSentBy(userId);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("received")]
        public ActionResult<ItemsResponse<List<Message>>> GetReceivedBy()
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                List<Message> paged = _service.GetReceivedBy(userId);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("drafts")]
        public ActionResult<ItemsResponse<List<Message>>> GetDrafts()
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<Message> paged = _service.GetDrafts(userId);
                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Item Not Found");
                }
                else
                {
                    response = new ItemResponse<List<Message>> { Item = paged };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Message>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response;
            try
            {
                Message message = _service.Get(id);
                if (message == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Message Not Found");
                }
                else
                {
                    response = new ItemResponse<Message> { Item = message };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(MessageAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int> { Item = id };
                result = Created201(response);

            }
            catch (Exception ex)
            {
         
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse($"Server Error: {ex.Message}");
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(MessageUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error: {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                _service.Delete(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }
    }
}