using PromotIt.Data.Sql;
using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities
{
    public class ProductsManager : BaseEntity
    {
        public ProductsManager(LogManager logManager) : base(logManager)
        {
        }

        public void AddProducts(Model.Product[] productsArr)
        {
            try
            {
                ProductsSQL productsSQL = new ProductsSQL(LogManager);
                foreach (var product in productsArr)
                {
                    productsSQL.AddProduct(product);
                }
            }
			catch (Exception ex)
			{
				LogManager.LogException("ProductsManager.AddProducts - Failed", ex);
				throw ex;
			}
		}      
        public object GetProducts(string id)
        {
            try
            {
                ProductsSQL productsSQL = new ProductsSQL(LogManager);
                return productsSQL.GetProductsFromDB(id);
            }
			catch (Exception ex)
            {
				LogManager.LogException("ProductsManager.GetProducts - Failed", ex);
				throw ex;
			}
		}

        public void UpdateBoughtProduct(string extraParam,string email)
        {
            try
            {
                ProductsSQL productsSQL = new ProductsSQL(LogManager);
                productsSQL.UpdateBoughtProduct(extraParam, email);
            }
			catch (Exception ex)
			{
				LogManager.LogException("ProductsManager.UpdateBoughtProduct - Failed", ex);
				throw ex;
			}
		}
       
        public Product GetOneProduct(string pid)
        {
            try
            {
                ProductsSQL productsSQL = new ProductsSQL(LogManager);
                return productsSQL.GetOneProduct(pid);
            }
			catch (Exception ex)
			{
				LogManager.LogException("ProductsManager.GetOneProduct - Failed", ex);
				throw ex;
			}
		}
    }
}
