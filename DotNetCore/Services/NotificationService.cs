using Microsoft.AspNetCore.SignalR;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Notification;
using Sabio.Models.Requests.Notifications;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class NotificationService : INotificationService
    {
        
        IDataProvider _data = null;


        public NotificationService(IDataProvider data)
        {
            _data = data;

        }

        public List<Notification> GetByUserId(int userId)
        {
            List<Notification> list = null;

            string procName = "[dbo].[Notifications_SelectByUserId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@UserId", userId);
            }, delegate (IDataReader reader, short set)
            {
                Notification notification = MapNotification(reader, out int startingIndex);

                if (list == null)
                {
                    list = new List<Notification>();
                }
                list.Add(notification);
            });
            return list;
        }

        public Notification GetById(int id)
        {

            Notification outputNotification = null;
            string procName = "[dbo].[Notifications_SelectByNotificationId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                outputNotification = MapNotification(reader, out int startingIndex);

                
            });
            return outputNotification;
        }
        public List<Notification> GetNotReadByUserId(int userId)
        {
            List<Notification> list = null;

            string procName = "[dbo].[Notifications_GetNotReadByUserId]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                
                paramCollection.AddWithValue("@UserId", userId);
               
            }, delegate (IDataReader reader, short set)
            {
                Notification notification = MapNotification(reader, out int startingIndex);

                if (list == null)
                {
                    list = new List<Notification>();
                }
                list.Add(notification);
            });
            return list;
        }
        public int Add(NotificationAddRequest model)
            {

                int id = 0;

                string procName = "[dbo].[Notifications_Insert]";
                _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                {
                    ColAddParams(model, col);
                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;
                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object OId = returnCollection["@Id"].Value;
                    int.TryParse(OId.ToString(), out id);
                });


                return id;
            }

        public void Update(NotificationUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Notifications_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    ColAddParams(model, col);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);

        }
        public void UpdateIsReadStatus(int userId)
        {
            string procName = "[dbo].[Notifications_IsReadUpdate]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                },
                returnParameters: null);

        }

        private static void ColAddParams(NotificationAddRequest model, SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", model.UserId);
                col.AddWithValue("@NotificationTypeId", model.NotificationTypeId);
                col.AddWithValue("@NotificationText", model.NotificationText);
                col.AddWithValue("@IsRead", model.IsRead);
         
            }
        

        private static Notification MapNotification(IDataReader reader, out int startingIndex)
        {
          Notification singeleNotification = new Notification();

           startingIndex = 0;

            singeleNotification.Id = reader.GetSafeInt32(startingIndex++);
            singeleNotification.UserId = reader.GetSafeInt32(startingIndex++);
            singeleNotification.NotificationTypeId = reader.GetSafeInt32(startingIndex++);
            singeleNotification.NotificationText = reader.GetSafeString(startingIndex++);
            singeleNotification.IsRead = reader.GetSafeBool(startingIndex++);
            singeleNotification.DateCreated = reader.GetSafeDateTime(startingIndex++);

            return singeleNotification;
        }

        }
}
