using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class GetMyCampaigns : CommandsManager, ICommand
	{
		public GetMyCampaigns(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[1] != null)
			{
				
				string email = param[1].ToString();
				MainManager.Instance.campaignsManager.GetMyCampaigns(email);
				response = System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.campaignsList);
				LogManager.LogEvent("GetMyCampaigns.ExecuteCommand()" + "Finished successfully");
				return response;
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetMyCampaigns.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
