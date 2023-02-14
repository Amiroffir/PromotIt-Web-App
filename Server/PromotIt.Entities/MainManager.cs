
using PromotIt.Entities.Commands;
using PromotIt.Model;
using System.Collections.Generic;
using Utilities; 

namespace PromotIt.Entities
{
    public class MainManager
    {
        // singelton 
        private static readonly MainManager _instance = new MainManager();
        private MainManager()
        {

            Init();         

        }
        
        public void Init()
        {
            LogManager = new LogManager();
			LogManager.Init(LogManager.LogType.File);
			commandsManager = new CommandsManager(LogManager);
			usersManager = new UsersManager(LogManager);
            businessRepsManager = new BusinessRepsManager(LogManager);
            productsManager = new ProductsManager(LogManager);
            nonProfitRepsManager = new NonProfitRepsManager(LogManager);
            campaignsManager = new CampaignsManager(LogManager);
            socialActivistsManager = new SocialActivistsManager(LogManager);
            tweetsManager = new TweetsManager(LogManager);
            campaignsList = new Dictionary<int, Campaign>();
            productsList = new Dictionary<int, Product>();
            deliveriesList = new List<Delivery>();
            LogManager.LogEvent("Program start up");
			LogManager.LogEvent("Main Manager initialized");
        }
        public static MainManager Instance
        {
            get
            {
                return _instance;
            }
        }
        public LogManager LogManager;
        public UsersManager usersManager;
        public BusinessRepsManager businessRepsManager;
        public ProductsManager productsManager;
        public NonProfitRepsManager nonProfitRepsManager;
        public CampaignsManager campaignsManager;
        public SocialActivistsManager socialActivistsManager;
        public TweetsManager tweetsManager;
		public CommandsManager commandsManager;
		public Dictionary<int, Campaign> campaignsList;
        public Dictionary<int,Product> productsList;
        public List<Delivery> deliveriesList;
        
	}

}

