using PromotIt.DAL;
using PromotIt.Model;
using System.Collections.Generic;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class CampaignsSQL : BaseSQL
    {
        public CampaignsSQL(LogManager logManager) : base(logManager)
        {
        }

        public string GetNonProfitRepID(string email)
        {
            try
            {
                int id = 0;
                id = (int)SQLQueries.RunCommandScalar(("SELECT [id] FROM [dbo].[Non-ProfitReps] WHERE [Email] = '" + email + "'"));
                LogManager.LogEvent("Succsesfully Get NonProfitRepID from DB");
                return id.ToString();
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Get NonProfitRepID from DB", ex);
                return null;
            }
        }

        public void AddNewCampaign(Model.Campaign campaign)
        {
            try
            {
                SQLQueries.RunNonQuery(("INSERT INTO [dbo].[Campaigns] ([CampaignName],[CampaignDesc],[CampaignHash],[CampaignUrl],[DonationsAmount],[NonProfitRepID],[Image]) VALUES ('" + campaign.CampaignName + "','" + campaign.CampaignDesc + "','" + campaign.CampaignHash + "','" + campaign.CampaignUrl + "','" + campaign.DonationsAmount + "','" + campaign.NonProfitRepID + "','" + campaign.Image + "')"));
                LogManager.LogEvent("Succsesfully Add New Campaign to DB: " + campaign.CampaignName);
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Adding New Campaign to DB: " + campaign.CampaignName, ex);
            }
        }

        private Dictionary<int, Campaign> GetCampaignsFromDB(SqlDataReader reader)
        {
            Dictionary<int, Campaign> campaignsList = new Dictionary<int, Campaign>();
            campaignsList.Clear();

            while (reader.Read())
            {

                Campaign campaign = new Campaign();
                campaign.id = reader.GetInt32(0);
                campaign.CampaignName = reader.GetString(1);
                campaign.CampaignDesc = reader.GetString(2);
                campaign.CampaignHash = reader.GetString(3);
                campaign.CampaignUrl = reader.GetString(4);
                campaign.DonationsAmount = reader.GetDecimal(5);
                int nonProfitRepID = reader.GetInt32(6);
                campaign.Image = reader.GetString(7);

                try
                {
                    // Select the nonProfitOrganizationName
                    string nonProfitOrg = (string)SQLQueries.RunCommandScalar("SELECT [OrganizationName] FROM [dbo].[Non-ProfitReps] WHERE id = '" + nonProfitRepID + "'");
                    campaign.NonProfitRepID = nonProfitOrg;
                    campaignsList.Add(campaign.id, campaign);
                }
                catch (SqlException ex)
                {
                    LogManager.LogException("Error Get NonProfitRepID from DB", ex);
                    return null;
                }

            }
            return campaignsList;
        }
        
        public object GetCampaigns()
        {
            object retDictionary = null;
            try
            {
                retDictionary = SQLQueries.RunCommandResult("SELECT * FROM [dbo].[Campaigns]", GetCampaignsFromDB);
                LogManager.LogEvent("Succsesfully Get Campaigns from DB");
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Get Campaigns from DB", ex);
            }
            return retDictionary;
        }
        public object GetMyCampaigns(string email)
        {
            string id;
            object retDictionary = null;
            try
            {
                id = GetNonProfitRepID(email);
                retDictionary = SQLQueries.RunCommandResult("SELECT * FROM [dbo].[Campaigns] WHERE [NonProfitRepID] = '" + id + "'", GetCampaignsFromDB);
                LogManager.LogEvent("Succsesfully Get My Campaigns from DB");
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Get My Campaigns from DB", ex);
            }
            return retDictionary;
        }

        public Campaign GetCampaignDetails(string extraParam)
        {
            Campaign campaign;
            try
            {
                campaign = (Campaign)SQLQueries.RunCommandResult(" SELECT * FROM [dbo].[Campaigns] WHERE [id] = '" + extraParam + "'", GetOneCampaign);
                LogManager.LogEvent("Succsesfully Get Campaign Details from DB");
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Get Campaign Details from DB", ex);
                return null;
            }
            return campaign;
        }

        private Campaign GetOneCampaign(SqlDataReader reader)
        {
            Campaign campaign = new Campaign();
            while (reader.Read())
            {
                campaign.id = reader.GetInt32(0);
                campaign.CampaignName = reader.GetString(1);
                campaign.CampaignDesc = reader.GetString(2);
                campaign.CampaignHash = reader.GetString(3);
                campaign.CampaignUrl = reader.GetString(4);
                campaign.DonationsAmount = reader.GetDecimal(5);
                int nonProfitRepID = reader.GetInt32(6);
                campaign.Image = reader.GetString(7);

                try
                {
                    // Select the nonProfitOrganizationName
                    string nonProfitOrg = (string)SQLQueries.RunCommandScalar("SELECT [OrganizationName] FROM [dbo].[Non-ProfitReps] WHERE id = '" + nonProfitRepID + "'");
                    campaign.NonProfitRepID = nonProfitOrg;
                }
                catch (SqlException ex)
                {
                    LogManager.LogException("Error Get NonProfitRepID from DB", ex);
                    return null;
                }
            }
            return campaign;
        }

        public void UpdateCampaign(Campaign campaignToUpdate)
        {
            try
            {
                SQLQueries.RunNonQuery("UPDATE [dbo].[Campaigns] SET [CampaignName] = '" + campaignToUpdate.CampaignName + "', [CampaignDesc] = '" + campaignToUpdate.CampaignDesc + "', [CampaignHash] = '" + campaignToUpdate.CampaignHash + "', [CampaignUrl] = '" + campaignToUpdate.CampaignUrl + "', [DonationsAmount] = '" + campaignToUpdate.DonationsAmount + "' WHERE [id] = '" + campaignToUpdate.id + "'");
                LogManager.LogEvent("Succsesfully Update Campaign in DB: " + campaignToUpdate.CampaignName);
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Update Campaign in DB: " + campaignToUpdate.CampaignName, ex);
            }
        }

        public void DeleteCampaign(string extraParam)
        {
            try
            {
                SQLQueries.RunNonQuery("DELETE FROM [dbo].[Tweets] WHERE [PromotedCampaign]= '" + extraParam + "'");

                SQLQueries.RunNonQuery("DELETE FROM [dbo].[Campaigns] WHERE [id] = '" + extraParam + "'");
                LogManager.LogEvent("Succsesfully Delete Campaign from DB");
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Delete Campaign from DB", ex);
            }
        }
        public int GetCampaignByHash(string tag)
        {
            try
            {
                int id = (int)SQLQueries.RunCommandScalar("SELECT [id] FROM [dbo].[Campaigns] WHERE [CampaignHash] = '" + tag + "'");
                LogManager.LogEvent("Succsesfully Get Campaign By Hash from DB");
                return id;
            }
            catch (SqlException ex)
            {
                LogManager.LogException("Error Get Campaign By Hash from DB", ex);
				return -1;
			}
        }
    }
}