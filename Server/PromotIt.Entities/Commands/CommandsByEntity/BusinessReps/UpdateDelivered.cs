using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.BusinessReps
{
	public class UpdateDelivered : CommandsManager, ICommand
	{
		public UpdateDelivered(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[0] != null)
			{
				string Email = param[0].ToString();
				MainManager.Instance.businessRepsManager.UpdateDelivered(Email);
				LogManager.LogEvent("UpdateDelivered.ExecuteCommand()" + "Finished successfully");
				response = "Delivered Successfully";
				return response;
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("UpdateDelivered.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}			
		}
	}
}
