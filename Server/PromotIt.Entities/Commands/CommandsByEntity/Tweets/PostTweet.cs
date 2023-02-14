using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Tweets
{
	public class PostTweet : CommandsManager, ICommand
	{
		public PostTweet(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[0] != null)
			{
				string email = param[0].ToString();
				bool tweetPosted = MainManager.Instance.tweetsManager.PostTweet(email);
				if (tweetPosted)
				{
					LogManager.LogEvent("PostTweet.ExecuteCommand()" + "Finished successfully");
					return "Tweet posted successfully";
				}
				else
				{
					Exception ex = new Exception("Failed to post tweet");
					LogManager.LogException("PostTweet.ExecuteCommand()" + "Failed to post tweet",ex);
					throw ex;
				}
			
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("PostTweet.ExecuteCommand()" + "Email is null", ex);
				throw ex;
			}
		}
	}
}
