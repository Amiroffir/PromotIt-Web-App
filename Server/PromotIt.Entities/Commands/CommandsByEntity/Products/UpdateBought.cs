using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Products
{
	public class UpdateBought : CommandsManager, ICommand
	{
		public UpdateBought(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			
			if (param[0] != null && param[1] != null)
			{
				string email = param[0].ToString();
				string productId = param[1].ToString();
				MainManager.Instance.productsManager.UpdateBoughtProduct(productId, email);
				LogManager.LogEvent("Products.UpdateBought.ExecuteCommand()" + "Finished successfully");
				return "Product Updated";
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("UpdateBought.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
