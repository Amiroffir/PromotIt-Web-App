using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class AddBusinessRep : CommandsManager, ICommand
	{
		public AddBusinessRep(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[0] != null)
			{
				string businessRep = param[0].ToString();
				BusinessRep newBusinessRep = System.Text.Json.JsonSerializer.Deserialize<BusinessRep>(businessRep);
				MainManager.Instance.businessRepsManager.AddNewBusinessRep(newBusinessRep);
				LogManager.LogEvent("AddBusinessRep.ExecuteCommand()" + "Finished successfully");
				return "Business Rep added successfully";

			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("AddBusinessRep.ExecuteCommand()" + "Failed to add BusinessRep", ex);
				throw ex;
			}
		}
	}
}
