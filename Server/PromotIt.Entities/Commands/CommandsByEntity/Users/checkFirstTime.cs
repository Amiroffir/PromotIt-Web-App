using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class checkFirstTime : CommandsManager, ICommand
	{
		public checkFirstTime(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[1] != null)
			{
				string email = param[1].ToString();
				LogManager.LogEvent("checkFirstTime.ExecuteCommand()" + "email: " + email);
				return MainManager.Instance.usersManager.CheckFirstTime(email);

			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("checkFirstTime.ExecuteCommand() - email is null", ex);
				throw ex;
			}
		}
	}
}
