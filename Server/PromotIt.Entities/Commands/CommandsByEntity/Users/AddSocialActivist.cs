using PromotIt.Model;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Users
{
	public class AddSocialActivist : CommandsManager, ICommand
	{
		public AddSocialActivist(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[0] != null)
			{
				string newSocialActivist = param[0].ToString();
				SocialActivist socialActivist = System.Text.Json.JsonSerializer.Deserialize<SocialActivist>(newSocialActivist);
				MainManager.Instance.socialActivistsManager.AddSocialActivist(socialActivist);
				LogManager.LogEvent("AddSocialActivist.ExecuteCommand()" + "Finished successfully");
				return "Social Activist added successfully";

			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("AddSocialActivist.ExecuteCommand()" + "Failed to add Social Activist", ex);
				throw ex;
			}
		}
	}
}
