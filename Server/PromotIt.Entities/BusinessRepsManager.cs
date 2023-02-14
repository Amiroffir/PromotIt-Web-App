
using PromotIt.Data.Sql;
using PromotIt.Model;
using System;
using System.Collections.Generic;
using Utilities;

namespace PromotIt.Entities
{
    public class BusinessRepsManager : BaseEntity
    {
        public BusinessRepsManager(LogManager logManager) : base(logManager)
        {
        }
        public void AddNewBusinessRep(BusinessRep newBusinessRep)
        {
            try
            {
                string userID = MainManager.Instance.usersManager.AddNewUser("BusinessRep");
                newBusinessRep.UserID = userID;
                BusinessRepsSQL businessRepsSQL = new BusinessRepsSQL(LogManager);
                businessRepsSQL.AddNewBusinessRep(newBusinessRep);
            }
            catch (Exception ex)
            {
                LogManager.LogException("BusinessRepsManager.AddNewBusinessRep - Failed", ex);
                throw ex;
            }
		}
        
        public void GetDeliveries(string email)
        {
            try
            {
                BusinessRepsSQL businessRepsSQL = new BusinessRepsSQL(LogManager);
                MainManager.Instance.deliveriesList = (List<Delivery>)businessRepsSQL.GetDeliveries(email);
                LogManager.LogEvent("BusinessRepsManager.GetDeliveries() - " + MainManager.Instance.deliveriesList.Count + " deliveries loaded");
            }
			catch (Exception ex)
			{
				LogManager.LogException("BusinessRepsManager.GetDeliveries - Failed", ex);
				throw ex;
			}
		}

        public void UpdateDelivered(string productSerialNumber)
        {
            try
            {
                BusinessRepsSQL businessRepsSQL = new BusinessRepsSQL(LogManager);
                businessRepsSQL.UpdateDelivered(productSerialNumber);
            }
			catch (Exception ex)
			{
				LogManager.LogException("BusinessRepsManager.UpdateDelivered - Failed", ex);
				throw ex;
			}
		}
    }
}
