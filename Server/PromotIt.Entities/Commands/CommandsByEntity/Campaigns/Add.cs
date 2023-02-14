using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class Add : CommandsManager,ICommand
	{
		public Add(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			Campaign newCampaign;
			if (param[0] != null)
			{
				string campaignToAdd = param[0].ToString();
				newCampaign = System.Text.Json.JsonSerializer.Deserialize<Campaign>(campaignToAdd);
				MainManager.Instance.campaignsManager.AddNewCampaign(newCampaign);
				LogManager.LogEvent("Campaigns.Add.ExecuteCommand()" + "Finished successfully");
				return "Campaign Added";
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("Campaigns.Add.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
