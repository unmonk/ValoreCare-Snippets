using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Messages;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Services.Interfaces
{
    public interface IMessageService
    {
        Message Get(int id);
        int Add(MessageAddRequest model, int senderId);
        void Update(MessageUpdateRequest model, int senderId);
        void Delete(int id);

        List<Message> GetAll();
        Paged<Message> Paginate(int pageIndex, int pageSize);
        List<Message> GetSentBy(int senderId);

        List<Message> GetDrafts(int senderId);
        List<Message> GetReceivedBy(int recipientId);
        List<Message> GetConversation(int senderId, int recipientId);
        List<UserProfile> GetCorrespondents(int userId);

    }
}
