using PromotIt.DAL;
using System;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class NonProfitRepsSQL : BaseSQL
    {
        public NonProfitRepsSQL(LogManager logManager) : base(logManager)
        {
        }

        public void AddNonProfitRep(Model.NonProfitRep nonProfitRep)
        {
            try
            {
                SQLQueries.RunNonQuery("INSERT INTO [dbo].[Non-ProfitReps] ([UserID],[FullName],[Email],[OrganizationUrl],[OrganizationName]) VALUES ('" + nonProfitRep.UserID + "','" + nonProfitRep.FullName + "','" + nonProfitRep.Email + "','" + nonProfitRep.OrganizationUrl + "','" + nonProfitRep.OrganizationName + "')");
                LogManager.LogEvent("Successfully added New Non-Profit Rep to database: " + nonProfitRep.FullName);
            }
            catch (Exception ex)
            {
                LogManager.LogEvent("Error adding New Non-Profit Rep to database: " + ex.Message);
            }
        }
    }
}        
 