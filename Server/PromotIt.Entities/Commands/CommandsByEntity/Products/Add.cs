using Newtonsoft.Json;
using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Products
{
	public class Add : CommandsManager, ICommand
	{
		public Add(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{
			Product[] newProducts;
			if (param[0] != null)
			{
				string productsToAdd = param[0].ToString();
				newProducts = JsonConvert.DeserializeObject<Product[]>(productsToAdd);
				MainManager.Instance.productsManager.AddProducts(newProducts);
				LogManager.LogEvent("Products.Add.ExecuteCommand()" + "Finished successfully");
				return "Products Added";
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("Products.Add.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
