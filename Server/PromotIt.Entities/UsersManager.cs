using PromotIt.Data.Sql;
using System;
using Utilities;

namespace PromotIt.Entities
{
    public class UsersManager : BaseEntity
    {
        public UsersManager(LogManager logManager) : base(logManager)
        {
        }
        public string AddNewUser(string userType)
        {
            try
            {
                UsersSQL usersSQL = new UsersSQL(LogManager);
                return usersSQL.AddNewUser(userType);
            }
            catch (Exception ex)
            {
                LogManager.LogException("UsersManager.AddNewUser - Failed", ex);
                throw ex;
            }
        }

        public string CheckFirstTime(string email)
        {
            try
            {
                UsersSQL usersSQL = new UsersSQL(LogManager);
                return usersSQL.CheckFirstTimeInDB(email);
            }
			catch (Exception ex)
			{
				LogManager.LogException("UsersManager.CheckFirstTime - Failed", ex);
				throw ex;
			}
		}            

        public object GetUserDetails(string extraParam)
        {
            try
            {
                UsersSQL usersSQL = new UsersSQL(LogManager);
                return usersSQL.GetUserDetails(extraParam);
            }
			catch (Exception ex)
			{
				LogManager.LogException("UsersManager.GetUserDetails - Failed", ex);
				throw ex;
			}
		}   
        public object GetUsers()
        {
            try
            {
                UsersSQL usersSQL = new UsersSQL(LogManager);
                return usersSQL.GetUsersFromDB();
            }
			catch (Exception ex)
            {
				LogManager.LogException("UsersManager.GetUsers - Failed", ex);
                throw ex;
			}
		}
    }
}
