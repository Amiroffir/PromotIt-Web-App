using PromotIt.Data.Sql;
using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities
{
    public class NonProfitRepsManager : BaseEntity
    {
        public NonProfitRepsManager(LogManager logManager) : base(logManager)
        {
        }

        public void AddNonProfitRep(NonProfitRep newNonProfitRep)
        {
            try
            {
                string userID = MainManager.Instance.usersManager.AddNewUser("NonProfitRep");
                newNonProfitRep.UserID = userID;
                NonProfitRepsSQL nonProfitRepsSQL = new NonProfitRepsSQL(LogManager);
                nonProfitRepsSQL.AddNonProfitRep(newNonProfitRep);
            }
			catch (Exception ex)
			{
				LogManager.LogException("NonProfitRepsManager.AddNonProfitRep - Failed", ex);
				throw ex;
			}
		}
    }
}
