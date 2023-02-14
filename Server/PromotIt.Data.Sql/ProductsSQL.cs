using PromotIt.DAL;
using PromotIt.Model;
using System.Data;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class ProductsSQL : BaseSQL
    {
        public ProductsSQL(LogManager logManager) : base(logManager)
        {
        }
        public void AddProduct(Model.Product product)
        {
            try
            {
                int donatedByID = (int)SQLQueries.RunCommandScalar("SELECT id FROM [dbo].[BusinessReps] where Email = '" + product.DonatedBy + "'");

                SQLQueries.RunNonQuery("INSERT INTO [dbo].[Products] ([ProductID],[ProductName],[Price],[DonatedBy],[DonatedTo],[IsBought],[Image]) VALUES ('" + product.ProductID + "','" + product.ProductName + "','" + product.Price + "','" + donatedByID + "','" + product.DonatedTo + "','" + 0 + "','" + product.Image + "')");
				 LogManager.LogEvent("Successfully added product " + product.ProductName + " to the database.");
			}		
			catch (SqlException ex)
			{
				LogManager.LogEvent("Error adding product " + product.ProductName + " to the database. " + ex);
			}
        }
        
        public Product GetOneProduct(string pid)
        {
            try
            {
                Product product;
                product = (Product)SQLQueries.RunCommandResult("SELECT * FROM [dbo].[Products] where [id] = '" + pid + "'", GetProductFromReader);
				LogManager.LogEvent("Successfully retrieved product " + pid + " from the database.");
                return product;
            }
			catch (SqlException ex)
			{
				LogManager.LogEvent("Error retrieving product " + pid + " from the database. " + ex);
				return null;
			}
		}
        
        private Product GetProductFromReader(SqlDataReader reader)
        {
            Product product = new Product();
            while (reader.Read())
            {
                product.ProductSerialNumber = reader.GetInt32(0);
                product.ProductName = reader.GetString(2);
                product.Price = reader.GetDecimal(3);
                product.DonatedBy = reader.GetInt32(4).ToString();
                product.DonatedTo = reader.GetInt32(5).ToString();          
                product.BuyerID = reader.IsDBNull(7) ? "" : reader.GetInt32(7).ToString();
            }
            return product;
        }
            
        public DataTable GetProductsFromDB(string id)
        {
            try
            {
                SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM [dbo].[Products] WHERE [DonatedTo] = '" + id + "' AND [IsBought] = '0'", SQLQueries.connectionString);
                DataTable table = new DataTable();
                adapter.Fill(table);
				LogManager.LogEvent("Successfully retrieved products from the database.");
				return table;
            }
			catch (SqlException ex)
            {
				LogManager.LogEvent("Error retrieving products from the database. " + ex);
                return null;
			}
		}

        public void UpdateBoughtProduct(string extraParam, string email)
        {
            try
            {
                int buyerID = (int)SQLQueries.RunCommandScalar("SELECT id FROM [dbo].[SocialActivists] where Email = '" + email + "'");
                SQLQueries.RunNonQuery("UPDATE [dbo].[Products] SET [IsBought] = " + 1 + ",[BuyerID] = '" + buyerID + "' WHERE [id] = '" + extraParam + "'");
                LogManager.LogEvent("Successfully updated product " + extraParam + " in the database.");
            }
            catch (SqlException ex)
            {
                LogManager.LogEvent("Error updating product " + extraParam + " in the database. " + ex);
            }
        }  
   }
}

