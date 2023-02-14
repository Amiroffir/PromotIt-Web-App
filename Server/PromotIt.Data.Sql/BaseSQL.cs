using Utilities;


namespace PromotIt.Data.Sql
{
    public class BaseSQL
    {
        public BaseSQL(LogManager logManager)
        {
            LogManager = logManager;
        }
        public LogManager LogManager;
    }
}
