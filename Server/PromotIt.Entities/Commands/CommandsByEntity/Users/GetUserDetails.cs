using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class GetUserDetails : CommandsManager, ICommand
	{
		public GetUserDetails(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[1] != null)
			{
				string userID = param[1].ToString();
				LogManager.LogEvent("GetUserDetails.ExecuteCommand-" + "UserID: " + userID);
				return MainManager.Instance.usersManager.GetUserDetails(userID);
			
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetUserDetails.ExecuteCommand-" + "UserID is null", ex);
				throw ex;
			}
		}
	}
}
