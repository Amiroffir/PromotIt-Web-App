using PromotIt.Data.Sql;
using PromotIt.Model;
using System;
using System.Collections.Generic;
using Utilities;

namespace PromotIt.Entities
{
    public class CampaignsManager : BaseEntity
    {
        public CampaignsManager(LogManager logManager) : base(logManager)
        {
        }

        public string GetNonProfitRepID(string email)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                return campaignsSQL.GetNonProfitRepID(email);
            }
			catch (Exception ex)
			{
				LogManager.LogException("CampaignsManager.GetNonProfitRepID - Failed",ex);
                throw ex;
            }
        }
        
        public void AddNewCampaign(Model.Campaign campaign)
        {
            try
            {
                string newRepID = MainManager.Instance.campaignsManager.GetNonProfitRepID(campaign.NonProfitRepID);
                campaign.NonProfitRepID = newRepID;
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                campaignsSQL.AddNewCampaign(campaign);
            }
			catch (Exception ex)
            {
				LogManager.LogException("CampaignsManager.AddNewCampaign - Failed", ex);
				throw ex;
			}
		}

        public void GetCampaigns()
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                MainManager.Instance.campaignsList = (Dictionary<int, Campaign>)campaignsSQL.GetCampaigns();
                LogManager.LogEvent("CampaignsManager.GetCampaigns() - " + MainManager.Instance.campaignsList.Count + " campaigns loaded");
            }
            catch (Exception ex)
            {
                LogManager.LogException("CampaignsManager.GetCampaigns - Failed", ex);
                throw ex;
            }
        }
        public void GetMyCampaigns(string email)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                MainManager.Instance.campaignsList = (Dictionary<int, Campaign>)campaignsSQL.GetMyCampaigns(email);
                LogManager.LogEvent("CampaignsManager.GetMyCampaigns() - " + MainManager.Instance.campaignsList.Count + " campaigns loaded");
            }
			catch (Exception ex)
			{
				LogManager.LogException("CampaignsManager.GetMyCampaigns - Failed", ex);
				throw ex;
			}
		}
        
        public Campaign GetCampaignDetails(string extraParam)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                return campaignsSQL.GetCampaignDetails(extraParam);
            }
			catch (Exception ex)
			{
				LogManager.LogException("CampaignsManager.GetCampaignDetails - Failed", ex);
				throw ex;
			}
		}

        public void UpdateCampaign(Campaign campaignToUpdate)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                campaignsSQL.UpdateCampaign(campaignToUpdate);
            }
			catch (Exception ex)
            {
				LogManager.LogException("CampaignsManager.UpdateCampaign - Failed", ex);
				throw ex;
			}

		}

        public void DeleteCampaign(string extraParam)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                campaignsSQL.DeleteCampaign(extraParam);
            }
            catch (Exception ex)
            {
                LogManager.LogException("CampaignsManager.DeleteCampaign - Failed", ex);
                throw ex;
            }
		}
        
        public int GetCampaignByHash(string tag)
        {
            try
            {
                CampaignsSQL campaignsSQL = new CampaignsSQL(LogManager);
                return campaignsSQL.GetCampaignByHash(tag);
            }
			catch (Exception ex)
			{
				LogManager.LogException("CampaignsManager.GetCampaignByHash - Failed", ex);
				throw ex;
			}
        }
    }
}
