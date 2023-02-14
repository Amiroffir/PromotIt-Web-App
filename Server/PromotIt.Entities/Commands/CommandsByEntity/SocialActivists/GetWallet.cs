using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.SocialActivists
{
	public class GetWallet : CommandsManager, ICommand
	{
		public GetWallet(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			
			if (param[1] != null)
			{
				string email = param[1].ToString();
				LogManager.LogEvent("GetWallet.ExecuteCommand()" + "Started");
				return MainManager.Instance.socialActivistsManager.GetEarnings(email);
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetWallet.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
