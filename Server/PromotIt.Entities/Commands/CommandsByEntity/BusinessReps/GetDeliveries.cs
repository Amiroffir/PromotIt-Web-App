using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.BusinessReps
{
	public class GetDeliveries : CommandsManager, ICommand
	{
		public GetDeliveries(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[0] != null)
			{
				string Email = param[0].ToString();
				MainManager.Instance.businessRepsManager.GetDeliveries(Email);
				response = System.Text.Json.JsonSerializer.Serialize(MainManager.Instance.deliveriesList);
				LogManager.LogEvent("GetDeliveries.ExecuteCommand()" + "Finished successfully");
				return response;
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetDeliveries.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}	
}
