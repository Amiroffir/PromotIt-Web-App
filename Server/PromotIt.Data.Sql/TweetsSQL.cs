using PromotIt.DAL;
using System;
using System.Data;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class TweetsSQL : BaseSQL
    {
        public TweetsSQL(LogManager logManager) : base(logManager)
        {
        }
        
        public void AddTweet(string tweetID, int promotedCampaign, int userID)
        {
            try
            {
                SQLQueries.RunNonQuery($"INSERT INTO Tweets (TweetID, PromotedCampaign, TweetedBy, InsertedAt) VALUES ({tweetID}, {promotedCampaign}, {userID}, (DATEADD(hour, -2, GETDATE())))");
                LogManager.LogEvent($"Tweet {tweetID} added to database");
            }
			catch (SqlException ex)
			{
				LogManager.LogException("Error adding tweet to database", ex);
			}
		}

        public DateTime GetLastSearchTime()
        {
            try
            {
                DateTime LastSearch = (DateTime)SQLQueries.RunCommandScalar("SELECT TOP 1 InsertedAt FROM Tweets ORDER BY InsertedAt DESC");
                LogManager.LogEvent("Last search time retrieved succsesfully from DB");
				return LastSearch;
            }
			catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving last search time from database", ex);
                return DateTime.Now;
			}  
		}

        public string GetTweetDetails(string donatedBy, string buyerID)
        {
            try
            {
                string donatedByCompany = (string)SQLQueries.RunCommandScalar("SELECT [CompanyName] FROM [dbo].[BusinessReps] WHERE [id] = '" + int.Parse(donatedBy) + "'");
                if (buyerID == "")
                {
                    return $"Product donated by {donatedByCompany} just bought and donated back in our platform ";
                }
                string activistUsername = (string)SQLQueries.RunCommandScalar("SELECT [TwitterHandle] FROM [dbo].[SocialActivists] WHERE [id] = '" + int.Parse(buyerID) + "'");
                LogManager.LogEvent("Succsesfully retrieved tweet details from DB");
                return $"@{activistUsername} just bought a product donated by {donatedByCompany} in our platform!";
            }
			catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving tweet details from database", ex);
				return "";				
	    	}
		}

        public DataTable GetTweetsReport()
        {
            try
            {
                SqlDataAdapter adapter = new SqlDataAdapter("GetTweetsReport", SQLQueries.connectionString);
                DataTable table = new DataTable();
                adapter.Fill(table);
                LogManager.LogEvent("Succsesfully retrieved tweets report from DB");
                return table;
            }
			catch (SqlException ex)
			{
				LogManager.LogException("Error retrieving tweets report from database", ex);
				return null;
			}			
        }

        public object GetTweetsReportFromDB()
        {
            try
            {
                SqlDataAdapter adapter = new SqlDataAdapter("SELECT TOP 6 TweetID FROM [dbo].[Tweets] ORDER BY id DESC", SQLQueries.connectionString);
                DataTable table = new DataTable();
                adapter.Fill(table);
                LogManager.LogEvent("Succsesfully retrieved tweets report from DB");
				return table;
            }
			catch (SqlException ex)
            {
				LogManager.LogException("Error retrieving tweets report from database", ex);
				return null;
			}
		}
    }
}
