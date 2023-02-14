using PromotIt.Data.Sql;
using System;
using Utilities;

namespace PromotIt.Entities
{
    public class SocialActivistsManager : BaseEntity
    {
        public SocialActivistsManager(LogManager logManager) : base(logManager)
        {
        }

        public void AddSocialActivist(Model.SocialActivist newSocialActivist)
        {
            try
            {
                string userID = MainManager.Instance.usersManager.AddNewUser("SocialActivist");
                newSocialActivist.UserID = userID;
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                socialActivistsSQL.AddSocialActivist(newSocialActivist);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.AddSocialActivist - Failed", ex);
				throw ex;
			}
		}

        public decimal GetEarnings(string extraParam)
        {
            try
            {
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                return socialActivistsSQL.GetEarningsByEmail(extraParam);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.GetEarnings - Failed", ex);
				throw ex;
			}
		}
        
        public DateTime GetLastUpdate(string extraParam)
        {
            try
            {
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                return socialActivistsSQL.GetLastUpdate(extraParam);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.GetLastUpdate - Failed", ex);
				throw ex;
			}
		}
        
        public void GetPaid(dynamic data)
        {
            try
            {
                string twitterHandle = data.includes.users[0].username.ToString();
                decimal verifiedPromotions = (decimal)data.meta.result_count;
                LogManager.LogEvent("Twitter handle: " + twitterHandle + " verified promotions: " + verifiedPromotions + "Extracted from twitter query");
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                socialActivistsSQL.GetPaid(twitterHandle, verifiedPromotions);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.GetPaid - Failed", ex);
				throw ex;
			}
		}

        public string GetTwitterHandle(string email)
        {
            try
            {
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                return socialActivistsSQL.GetTwitterHandle(email);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.GetTwitterHandle - Failed", ex);
				throw ex;
			}

		}

        public int GetUserID(string extraParam)
        {
            try
            {
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                return socialActivistsSQL.GetUserID(extraParam);
            }
			catch (Exception ex)
            {
				LogManager.LogException("SocialActivistsManager.GetUserID - Failed", ex);
				throw ex;
			}

		}

        public void UpdateEarnings(string extraParam, string requestBody)
        {
            try
            {
                SocialActivistsSQL socialActivistsSQL = new SocialActivistsSQL(LogManager);
                socialActivistsSQL.UpdateEarnings(extraParam, requestBody);
            }
			catch (Exception ex)
			{
				LogManager.LogException("SocialActivistsManager.UpdateEarnings - Failed", ex);
				throw ex;
			}
		}
    }
}
