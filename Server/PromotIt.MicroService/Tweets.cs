using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using PromotIt.Entities;
using PromotIt.Entities.Commands;
using System;
using System.Threading.Tasks;

namespace PromotIt.MicroService
{
    public static class Tweets
    {
		[FunctionName("Tweets")]

		public static async Task<IActionResult> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "put", Route = "twitter/{action}/{extraParam?}")] HttpRequest req,
			ILogger log, string action, string extraParam)
		{
			string response = "";
			string dictionaryKey = $"Tweets.{action}";

			ICommand command = MainManager.Instance.commandsManager.CommandsList[dictionaryKey];

			if (command != null)
			{
				try
				{
					return new OkObjectResult(command.ExecuteCommand(extraParam));
				}
				catch (Exception ex)
				{
					response = ex.Message;
					MainManager.Instance.LogManager.LogException("Tweets.ExecuteCommand() - Failed", ex);
					return new BadRequestObjectResult(response);
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("Tweets.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}

