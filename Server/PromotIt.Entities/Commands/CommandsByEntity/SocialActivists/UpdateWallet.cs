using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.SocialActivists
{
	public class UpdateWallet : CommandsManager, ICommand
	{
		public UpdateWallet(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			
			if (param[0] != null && param[1] != null)
			{
				string email = param[0].ToString();
				string price = param[1].ToString();
				MainManager.Instance.socialActivistsManager.UpdateEarnings(price, email);
				LogManager.LogEvent("UpdateWallet.ExecuteCommand()" + "Finished successfully");
				return "Earnings updated";
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("UpdateWallet.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
