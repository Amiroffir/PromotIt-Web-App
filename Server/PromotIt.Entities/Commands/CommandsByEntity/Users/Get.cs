using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class Get : CommandsManager, ICommand
	{
		public Get(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			LogManager.LogEvent("Users.Get.ExecuteCommand()");
			return MainManager.Instance.usersManager.GetUsers();
		}
	}
}
