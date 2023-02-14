using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Products
{
	public class Get : CommandsManager, ICommand
	{
		public Get(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			string response;
			if (param[1] != null)
			{

				string campaignId = param[1].ToString();
				LogManager.LogEvent("Products.Get.ExecuteCommand()" + "Started");
				return MainManager.Instance.productsManager.GetProducts(campaignId);
				
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("Products.Get.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}

		}
	}
}
