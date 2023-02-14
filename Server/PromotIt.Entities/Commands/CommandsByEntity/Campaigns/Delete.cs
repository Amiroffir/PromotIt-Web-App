using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class Delete : CommandsManager, ICommand
	{
		public Delete(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[1] != null)
			{
				
				string campaignId = param[1].ToString();
				MainManager.Instance.campaignsManager.DeleteCampaign(campaignId);
				LogManager.LogEvent("Campaigns.Delete.ExecuteCommand()" + "Finished successfully");
				response = "Campaign Deleted";
				return response;
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("Campaigns.Delete.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
