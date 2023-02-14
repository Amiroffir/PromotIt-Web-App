using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class AddNonProfitRep : CommandsManager, ICommand
	{
		public AddNonProfitRep(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[0] != null)
			{
				string newNonProfit = param[0].ToString();
				NonProfitRep nonProfitRep = System.Text.Json.JsonSerializer.Deserialize<NonProfitRep>(newNonProfit);
				MainManager.Instance.nonProfitRepsManager.AddNonProfitRep(nonProfitRep);
				LogManager.LogEvent("AddNonProfitRep.ExecuteCommand()" + "Finished successfully");
				return "Non Profit Rep added successfully";

			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("AddNonProfitRep.ExecuteCommand()" + "Failed to add NonProfitRep", ex);
				throw ex;
			}
		}
	}
}
