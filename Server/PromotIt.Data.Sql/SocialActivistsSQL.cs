using PromotIt.DAL;
using System;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class SocialActivistsSQL : BaseSQL
    {
        public SocialActivistsSQL(LogManager logManager) : base(logManager)
        {
        }
        public void AddSocialActivist(Model.SocialActivist socialActivist)
        {
            try
            {
                SQLQueries.RunNonQuery("INSERT INTO [dbo].[SocialActivists] ([UserID],[FullName],[Email],[Address],[Phone],[EarningStatus],[TwitterHandle]) VALUES ('" + socialActivist.UserID + "','" + socialActivist.FullName + "','" + socialActivist.Email + "','" + socialActivist.Address + "','" + socialActivist.Phone + "','" + socialActivist.EarningStatus + "','" + socialActivist.TwitterHandle + "')");
				LogManager.LogEvent("New Social Activist added successfully");
			}
            catch (SqlException ex)
            {
				LogManager.LogEvent("Error adding new Social Activist: " + ex.Message);
			}
        }

        public decimal GetEarningsByEmail(string extraParam)
        {
            try
            {
                decimal earnings;
                earnings = (decimal)SQLQueries.RunCommandScalar("SELECT [EarningStatus] FROM [dbo].[SocialActivists] WHERE Email = '" + extraParam + "'");
				LogManager.LogEvent("Earnings retrieved successfully");
				return earnings;
            }

			 catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving earnings" , ex);
				return 0;
			}                    
        }

        public DateTime GetLastUpdate(string extraParam)
        {
            try
            {
				DateTime lastUpdate;
                lastUpdate = (DateTime)SQLQueries.RunCommandScalar("SELECT [LastEarningsUpdate] FROM [dbo].[SocialActivists] WHERE Email = '" + extraParam + "'");
				LogManager.LogEvent("Last update retrieved successfully");
				return lastUpdate;
			}
            catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving last update", ex);
				return DateTime.Now;
            }
        }

        public void GetPaid(string twitterHandle, decimal verifiedPromotions)
        {
            try
            {          
                SQLQueries.RunNonQuery("UPDATE [dbo].[SocialActivists] SET [EarningStatus] = [EarningStatus] + " + verifiedPromotions + ", [LastEarningsUpdate] = (DATEADD(hour, -2, GETDATE())) WHERE TwitterHandle = '" + twitterHandle + "'");
				LogManager.LogEvent("Social Activist paid successfully");
			}
            catch (SqlException ex)
            {
				LogManager.LogException("Error paying Social Activist: " + twitterHandle, ex);
			}

        }

        public string GetTwitterHandle(string email)
        {
            try
            {
				string twitterHandle;
				twitterHandle = (string)SQLQueries.RunCommandScalar("SELECT [TwitterHandle] FROM [dbo].[SocialActivists] WHERE Email = '" + email + "'");
				LogManager.LogEvent("Twitter handle retrieved successfully");
				return twitterHandle;
			}
            catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving Twitter handle", ex);
				return null;
            }
        }

        public int GetUserID(string extraParam)
        {
            try
            {
				int userID;
                userID = (int)SQLQueries.RunCommandScalar("SELECT [id] FROM [dbo].[SocialActivists] WHERE TwitterHandle = '" + extraParam + "'");
				LogManager.LogEvent("User ID retrieved successfully");
				return userID;
			}
            catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving user ID", ex);
				return 0;
            }
        }
        public void UpdateEarnings(string price, string email)
        {
            try
            {
                SQLQueries.RunNonQuery("UPDATE [dbo].[SocialActivists] SET [EarningStatus] = [EarningStatus] - '" + decimal.Parse(price) + "' WHERE [Email] = '" + email + "'");
				LogManager.LogEvent("Earnings updated successfully");
			}
            catch (SqlException ex)
            {
				LogManager.LogException("Error updating earnings", ex);
			}
        }
    }
}
