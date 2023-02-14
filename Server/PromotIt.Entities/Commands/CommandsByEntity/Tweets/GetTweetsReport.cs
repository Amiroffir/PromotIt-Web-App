using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Tweets
{
	public class GetTweetsReport : CommandsManager, ICommand
	{
		public GetTweetsReport(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			LogManager.LogEvent("GetTweetsReport.ExecuteCommand()" + "Started");
			return MainManager.Instance.tweetsManager.GetTweetsReport();
		}
	}
}
