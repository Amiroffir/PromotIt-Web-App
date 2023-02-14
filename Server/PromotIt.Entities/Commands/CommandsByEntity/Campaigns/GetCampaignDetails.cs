using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class GetCampaignDetails : CommandsManager, ICommand
	{
		public GetCampaignDetails(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[1] != null)
			{

				string email = param[1].ToString();
				Campaign campaign = MainManager.Instance.campaignsManager.GetCampaignDetails(email);
				response = System.Text.Json.JsonSerializer.Serialize(campaign);
				LogManager.LogEvent("GetCampaignDetails.ExecuteCommand()" + "Finished successfully");
				return response;
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetCampaignDetails.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
