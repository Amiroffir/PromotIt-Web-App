using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Campaigns
{
	public class Get : CommandsManager, ICommand
	{
		public Get(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			
			MainManager.Instance.campaignsManager.GetCampaigns();
			response = System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.campaignsList);
			LogManager.LogEvent("Campaigns.Get.ExecuteCommand()" + "Finished successfully");
			return response;

		}
	}
}
