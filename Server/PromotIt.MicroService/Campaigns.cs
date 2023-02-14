using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using PromotIt.Entities;
using PromotIt.Entities.Commands;
using PromotIt.Model;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PromotIt.MicroService
{
    public static class Campaigns
    {
		[FunctionName("Campaigns")]
		public static async Task<IActionResult> Run(
			 [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "put", "delete", Route = "Campaigns/{action}/{extraParam?}")] HttpRequest req,
			 ILogger log, string action, string extraParam)

		{
			string requestBody = null;
			string response = "";
			string dictionaryKey = $"Campaigns.{action}";

			ICommand command = MainManager.Instance.commandsManager.CommandsList[dictionaryKey];

			if (command != null)
			{
				try
				{
					if (req.Body != null)
					{
						requestBody = await new StreamReader(req.Body).ReadToEndAsync();
					}
					response = (string)command.ExecuteCommand(requestBody, extraParam);
					return new OkObjectResult(response);
				}
				catch (Exception ex)
				{
					response = ex.Message;
					MainManager.Instance.LogManager.LogException("Campaigns.ExecuteCommand() - Failed", ex);
					return new BadRequestObjectResult(response);
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("Campaigns.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}
