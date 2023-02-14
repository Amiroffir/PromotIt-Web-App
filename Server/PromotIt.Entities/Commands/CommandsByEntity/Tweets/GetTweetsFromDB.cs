using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Tweets
{
	public class GetTweetsFromDB : CommandsManager, ICommand
	{
		public GetTweetsFromDB(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			LogManager.LogEvent("GetTweetsFromDB.ExecuteCommand()" + "Started");
			return MainManager.Instance.tweetsManager.GetTweetsReportFromDB();
		}
	}
}
