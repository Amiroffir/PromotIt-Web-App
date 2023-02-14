using PromotIt.DAL;
using System.Data;
using System.Data.SqlClient;
using Utilities;

namespace PromotIt.Data.Sql
{
    public class UsersSQL : BaseSQL
    {
        public UsersSQL(LogManager logManager) : base(logManager)
        {
        }
        public string AddNewUser(string userType)
        {
            try
            {
                object userID = SQLQueries.RunCommandScalar("INSERT INTO [dbo].[Users] ([UserType]) VALUES ('" + userType + "') SELECT @@IDENTITY");
                LogManager.LogEvent("Succsesfully added New User to DB");
				return userID.ToString();
			}
			catch (SqlException ex)
			{
                LogManager.LogException("Error adding New User to DB", ex);
				return "";
			}        
        }

        public string CheckFirstTimeInDB(string email)
        {
            try
            {
                string answer;
                answer = (string)SQLQueries.RunCommandScalar("checkUserExistByEmail @email = '" + email + "'");
                LogManager.LogEvent("First Time Check passed succsesfully");
                return answer;
            }
            catch(SqlException ex)
            {
                LogManager.LogException("First Time Check failed", ex);
                return "false";
            }
        }

        public object GetUserDetails(string extraParam)
        {
            try
            {
                SqlDataAdapter adapter = new SqlDataAdapter("GetUserDetails @userID = '" + extraParam + "'", SQLQueries.connectionString);
                DataTable table = new DataTable();
                adapter.Fill(table);
                LogManager.LogEvent("Succsesfully retrieved User Details");
                return table;
            }
            catch(SqlException ex)
            {
                LogManager.LogException("Failed to retrieved User Details",ex);
                return null;
            }
        }

        public object GetUsersFromDB()
        {
            try
            {
                SqlDataAdapter adapter = new SqlDataAdapter("GetAllUsers", SQLQueries.connectionString);
                DataTable table = new DataTable();
                adapter.Fill(table);
				 LogManager.LogEvent("Succsesfully retrieved Users from DB");
				return table;
            }
			catch (SqlException ex)
			{
				LogManager.LogException("Failed to retrieved Users from DB", ex);
				return null;
			}
		}
    }
}
