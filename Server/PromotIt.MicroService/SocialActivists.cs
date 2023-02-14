using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using PromotIt.Entities;
using PromotIt.Entities.Commands;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PromotIt.MicroService
{
    public static class SocialActivists
    {
		[FunctionName("SocialActivists")]
		public static async Task<IActionResult> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "put", Route = "SocialActivists/{action}/{extraParam?}")] HttpRequest req,
			ILogger log, string action, string extraParam)
		{
			string requestBody = null;
			string response = "";
			string dictionaryKey = $"SocialActivists.{action}";

			ICommand command = MainManager.Instance.commandsManager.CommandsList[dictionaryKey];

			if (command != null)
			{
				try
				{
					if (req.Body != null)
					{
						requestBody = await new StreamReader(req.Body).ReadToEndAsync();
					}

					return new OkObjectResult(command.ExecuteCommand(requestBody, extraParam));
				}
				catch (Exception ex)
				{
					response = ex.Message;
					MainManager.Instance.LogManager.LogException("SocialActivists.ExecuteCommand() - Failed", ex);
					return new BadRequestObjectResult(response);
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("SocialActivists.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}
