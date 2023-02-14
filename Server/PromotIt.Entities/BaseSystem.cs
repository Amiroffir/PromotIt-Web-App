
using Utilities;

namespace PromotIt.Entities
{
    public class BaseSystem
    {
        public BaseSystem(LogManager logManager)
        {
            LogManager = logManager;
        }     
          public LogManager LogManager;
        
    }
}
