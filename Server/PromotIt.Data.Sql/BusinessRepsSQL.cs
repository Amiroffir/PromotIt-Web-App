using PromotIt.DAL;
using PromotIt.Model;
using System.Collections.Generic;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class BusinessRepsSQL : BaseSQL
    {
        public BusinessRepsSQL(LogManager logManager) : base(logManager)
        {
        }
        public void AddNewBusinessRep(Model.BusinessRep businessRep)
        {
            try
            {
                SQLQueries.RunNonQuery("INSERT INTO [dbo].[BusinessReps] ([UserID],[FullName],[Email],[CompanyName]) VALUES ('" + businessRep.UserID + "','" + businessRep.FullName + "','" + businessRep.Email + "','" + businessRep.CompanyName + "')");
				LogManager.LogEvent("New Business Rep added to db: " + businessRep.FullName);
			}

            catch (SqlException ex)
            {
				LogManager.LogException("Error adding New Business Rep to db" , ex);
			}
           
        }

        private List<Delivery> GetDeliveriesFromDB(SqlDataReader reader)
        {
            List<Delivery> deliveriesList = new List<Delivery>();
            deliveriesList.Clear();
            
                while (reader.Read())
                {

                    Delivery delivery = new Delivery();
                    delivery.ProductSerialNumber = reader.GetInt32(reader.GetOrdinal("id"));
                    delivery.PID = reader.GetInt32(reader.GetOrdinal("ProductID"));
                    delivery.FullName = reader.GetString(reader.GetOrdinal("FullName"));
                    delivery.Email = reader.GetString(reader.GetOrdinal("Email"));
                    delivery.Address = reader.GetString(reader.GetOrdinal("Address"));
                    delivery.Phone = reader.GetString(reader.GetOrdinal("Phone"));

                    deliveriesList.Add(delivery);
                }
           
			return deliveriesList;
        }

        public object GetDeliveries(string email)
        {
            object retDictionary = null;
            try
            {
                string companyName = (string)SQLQueries.RunCommandScalar("SELECT [CompanyName] FROM [dbo].[BusinessReps] WHERE [Email] = '" + email + "'"); // get company name
                retDictionary = SQLQueries.RunCommandResult("getPendingDeliveries @companyName = '" + companyName + "'", GetDeliveriesFromDB);
                LogManager.LogEvent("Succsessfully get deliveries list from db");
               
            }
            catch (SqlException ex)
            {
				LogManager.LogException("Error getting deliveries list from db", ex);
			}
            return retDictionary;
        }
        public void UpdateDelivered(string productSerialNumber)
        {
            try
            {
                SQLQueries.RunNonQuery("UPDATE [dbo].[Deliveries] SET [Delivered] = 1 WHERE [id] = '" + productSerialNumber + "'");
                LogManager.LogEvent("Succsessfully updated delivery status to delivered");
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error updating delivery status to delivered", ex);
            }         
        }
    }
}
