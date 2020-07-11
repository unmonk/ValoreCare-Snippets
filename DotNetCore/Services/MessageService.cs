using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Messages;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class MessageService : IMessageService
    {
        IDataProvider _data = null;
        public MessageService(IDataProvider data)
        {
            _data = data;

        }

        public Message Get(int id)
        {
            string procName = "[dbo].[Messages_SelectById]";
            Message message = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
               paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex;
                MapMessage(reader, out message, out startingIndex);
            });
            return message;
        }

        public List<Message> GetAll()
        {
            string procName = "[dbo].[Messages_SelectAll]";
            List<Message> messages = null;
            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
            }, delegate (IDataReader reader, short set)
            {
                Message message;
                int startingIndex;
                MapMessage(reader, out message, out startingIndex);
                if (messages == null)
                {
                    messages = new List<Message>();
                }
                messages.Add(message);
            });
            return messages;
        }

        public Paged<Message> Paginate(int pageIndex, int pageSize)
        {
            Paged<Message> pagedMessages = null;
            List<Message> messages = null;
            int totalCount = 0;

            _data.ExecuteCmd(
              "dbo.Messages_SelectAllPaginated",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@pageIndex", pageIndex);
                  parameterCollection.AddWithValue("@pageSize", pageSize);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  Message message;
                  int startingIndex;
                  MapMessage(reader, out message, out startingIndex);

                  if (totalCount == 0)
                  {
                      totalCount = reader.GetSafeInt32(startingIndex++);
                  }
                  if (messages == null)
                  {
                      messages = new List<Message>();
                  }
                  messages.Add(message);
              }
          );
            if (messages != null)
            {
                pagedMessages = new Paged<Message>(messages, pageIndex, pageSize, totalCount);
            }

            return pagedMessages;
        }

        public List<UserProfile> GetCorrespondents(int userId)
        {
            List<UserProfile> profiles = null;
            _data.ExecuteCmd(
              "dbo.Messages_Select_Correspondents",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@userId", userId);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  UserProfile profile;
                  int startingIndex;
                  MapUserProfile(reader, out profile, out startingIndex);
                  if (profiles == null)
                  {
                      profiles = new List<UserProfile>();
                  }
                  profiles.Add(profile);
              });
            return profiles;
        }

        public List<Message> GetSentBy(int sendId)
        {
       
            List<Message> messages = null;
            _data.ExecuteCmd(
              "dbo.Messages_Select_ByCreatedBy_V2",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@SenderId", sendId);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  Message message;
                  int startingIndex;
                  MapMessage(reader, out message, out startingIndex);
                  if (messages == null)
                  {
                      messages = new List<Message>();
                  }
                  messages.Add(message);
              });
            return messages;
        }

        public List<Message> GetReceivedBy(int receId)
        {
            List<Message> messages = null;
            _data.ExecuteCmd(
              "dbo.Messages_SelectRece_V2",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@RecipientId", receId);
              },
              singleRecordMapper:     delegate (IDataReader reader, short set)
              {
                  Message message;
                  int startingIndex;
                  MapMessage(reader, out message, out startingIndex);
                  if (messages == null)
                  {
                    messages = new List<Message>();
                  }
                messages.Add(message);
              });
            return messages;
        }

        public List<Message> GetDrafts(int sendId)
        {
            List<Message> messages = null;
            _data.ExecuteCmd(
              "dbo.Messages_SelectDrafts_ById",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@SenderId", sendId);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  Message message;
                  int startingIndex;
                  MapMessage(reader, out message, out startingIndex);
                  if (messages == null)
                  {
                      messages = new List<Message>();
                  }
                  messages.Add(message);
              });
            return messages;
        }

        public List<Message> GetConversation(int sendId, int receId)
        {
            List<Message> messages = null;
            _data.ExecuteCmd(
              "dbo.Messages_Select_Conversation",
              inputParamMapper: delegate (SqlParameterCollection parameterCollection)
              {
                  parameterCollection.AddWithValue("@SenderId", sendId);
                  parameterCollection.AddWithValue("@RecipientId", receId);
              },
              singleRecordMapper: delegate (IDataReader reader, short set)
              {
                  Message message;
                  int startingIndex;
                  MapMessage(reader, out message, out startingIndex);
                  if (messages == null)
                  {
                      messages = new List<Message>();
                  }
                  messages.Add(message);
              });
            return messages;
        }

        public int Add(MessageAddRequest model, int senderId)
        {
            int id = 0;
            string procName = "[dbo].[Messages_Insert]";
            _data.ExecuteNonQuery(procName,
           inputParamMapper: delegate (SqlParameterCollection col)
           {
               MapMessageAddRequest(model, col, senderId);
               SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
               idOut.Direction = ParameterDirection.Output;
               col.Add(idOut);
           },
           returnParameters: delegate (SqlParameterCollection returnCollection)
           {
               object oId = returnCollection["@Id"].Value;
               int.TryParse(oId.ToString(), out id);
           });
            return id;
        }

        public void Delete(int id)
        {
            string procName = "[dbo].[Messages_DeleteById]";
            _data.ExecuteNonQuery(procName,
           inputParamMapper: delegate (SqlParameterCollection col)
           {
               col.AddWithValue("@Id", id);
           },
           returnParameters: null);
        }

        public void Update(MessageUpdateRequest model, int senderId)
        {
            string procName = "[dbo].[Messages_Update]";
            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                MapMessageAddRequest(model, col, senderId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }

        private static void MapMessageAddRequest(MessageAddRequest model, SqlParameterCollection col, int senderId)
        {
            
            col.AddWithValue("@Message", model.MessageText);
            col.AddWithValue("@Subject", model.Subject);
            col.AddWithValue("@RecipientId", model.RecipientId);
            col.AddWithValue("@SenderId", senderId);
            col.AddWithValue("@DateSent", model.DateSent);
            col.AddWithValue("@DateRead", model.DateRead);
        }

        private static void MapMessage(IDataReader reader, out Message message, out int startingIndex)
        {
            message = new Message();
            startingIndex = 0;
            message.Id = reader.GetSafeInt32(startingIndex++);
            message.MessageText = reader.GetSafeString(startingIndex++);
            message.Subject = reader.GetSafeString(startingIndex++);
            message.DateSent = reader.GetSafeDateTimeNullable(startingIndex++);
            message.DateRead = reader.GetSafeDateTimeNullable(startingIndex++);
            message.DateModified = reader.GetSafeDateTime(startingIndex++);
            message.DateCreated = reader.GetSafeDateTime(startingIndex++);

            UserProfile senderProfile = new UserProfile();
            senderProfile.UserId = reader.GetSafeInt32(startingIndex++);
            senderProfile.FirstName = reader.GetSafeString(startingIndex++);
            senderProfile.LastName = reader.GetSafeString(startingIndex++);
            senderProfile.Mi = reader.GetSafeString(startingIndex++);
            senderProfile.AvatarUrl = reader.GetSafeString(startingIndex++);
            message.Sender = senderProfile;

            UserProfile recipientProfile = new UserProfile();
            recipientProfile.UserId = reader.GetSafeInt32(startingIndex++);
            recipientProfile.FirstName = reader.GetSafeString(startingIndex++);
            recipientProfile.LastName = reader.GetSafeString(startingIndex++);
            recipientProfile.Mi = reader.GetSafeString(startingIndex++);
            recipientProfile.AvatarUrl = reader.GetSafeString(startingIndex++);
            message.Recipient = recipientProfile;
        }

        private static void MapUserProfile(IDataReader reader, out UserProfile userProfile, out int startingIndex)
        {
            userProfile = new UserProfile();
            startingIndex = 0;
            userProfile.UserId = reader.GetSafeInt32(startingIndex++);
            userProfile.FirstName = reader.GetSafeString(startingIndex++);
            userProfile.LastName = reader.GetSafeString(startingIndex++);
            userProfile.Mi = reader.GetSafeString(startingIndex++);
            userProfile.AvatarUrl = reader.GetSafeString(startingIndex++);

        }
    }
}
