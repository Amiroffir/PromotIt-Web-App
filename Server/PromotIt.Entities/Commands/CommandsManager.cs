using PromotIt.Entities.Commands.CommandsByEntity.Auth0;
using PromotIt.Entities.Commands.CommandsByEntity.BusinessReps;
using PromotIt.Entities.Commands.CommandsByEntity.Campaigns;
using PromotIt.Entities.Commands.CommandsByEntity.Products;
using PromotIt.Entities.Commands.CommandsByEntity.SocialActivists;
using PromotIt.Entities.Commands.CommandsByEntity.Tweets;
using PromotIt.Entities.Commands.CommandsByEntity.Users;
using System.Collections.Generic;
using Utilities;


namespace PromotIt.Entities.Commands
{
	public interface ICommand
	{
		object ExecuteCommand(params object[] param);
	}
	public class CommandsManager: BaseSystem
	{
		public CommandsManager(LogManager logManager) : base(logManager)
		{		
		}

		private Dictionary<string, ICommand> commandsList;

		public Dictionary<string, ICommand> CommandsList
		{
			get
			{
				if (commandsList == null) {
					InitCommands(); 
				}
				return commandsList;
			}
		}

		 private void InitCommands()
		{
			commandsList = new Dictionary<string, ICommand>()
			{
				// BusinessReps
				{"BusinessRep.GetDeliveries", new GetDeliveries(LogManager)},
				{"BusinessRep.UpdateDelivered", new UpdateDelivered(LogManager) },
				// Campaigns
				{"Campaigns.Add", new CommandsByEntity.Campaigns.Add(LogManager)},
				{"Campaigns.Update", new Update(LogManager)},
				{"Campaigns.Delete", new Delete(LogManager) },
				{"Campaigns.GetCampaignDetails", new GetCampaignDetails(LogManager) },
				{"Campaigns.GetMyCampaigns", new GetMyCampaigns(LogManager) },
				{"Campaigns.Get", new CommandsByEntity.Campaigns.Get(LogManager) },
				// Products 
				{"Products.Add", new CommandsByEntity.Products.Add(LogManager)},
				{"Products.UpdateBought", new UpdateBought(LogManager)},
				{"Products.Get", new CommandsByEntity.Products.Get(LogManager) },
				// Social Activists
				{"SocialActivists.GetWallet", new GetWallet(LogManager) },
				{"SocialActivists.UpdateWallet", new UpdateWallet(LogManager) },
				// Twitter 
				{"Tweets.PostTweet", new PostTweet(LogManager) },
				{"Tweets.GetTweetsReport", new GetTweetsReport(LogManager) },
				{"Tweets.GetTweetsFromDB", new GetTweetsFromDB(LogManager) },
				// Users 
				{"Users.checkFirstTime", new checkFirstTime(LogManager) },
				{"Users.AddBusiness Rep", new AddBusinessRep(LogManager) },
				{"Users.AddSocial Activist", new AddSocialActivist(LogManager) },
				{"Users.AddNon Profit Rep", new AddNonProfitRep(LogManager) },
				{"Users.Get", new CommandsByEntity.Users.Get(LogManager) },
				{"Users.GetUserDetails", new GetUserDetails(LogManager) },
				// Auth0
				{"Auth0.GetRoles", new GetRoles(LogManager) }
			 };
			LogManager.LogEvent("CommandsManager.InitCommands() - " + " commands loaded");
		}
	}
}

