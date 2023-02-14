using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class Update : CommandsManager, ICommand
	{
		public Update(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			Campaign campaignToUpdate;
			if (param[0] != null)
			{
				string campaign = param[0].ToString();
				campaignToUpdate = System.Text.Json.JsonSerializer.Deserialize<Campaign>(campaign);
				MainManager.Instance.campaignsManager.UpdateCampaign(campaignToUpdate);
				LogManager.LogEvent("Campaigns.Update.ExecuteCommand()" + "Finished successfully");
				return "Campaign Updated";
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("Campaigns.Update.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
