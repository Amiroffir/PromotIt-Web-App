using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using PromotIt.Entities;
using PromotIt.Model;
using PromotIt.Entities.Commands;

namespace PromotIt.MicroService
{
    public static class Users
    {
		[FunctionName("Users")]
		public static async Task<IActionResult> Run(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "users/{action}/{extraParam?}")] HttpRequest req,
			ILogger log, string action, string extraParam)
		{


			string requestBody = null;
			string response = "";
			string dictionaryKey = $"Users.{action}";

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
					MainManager.Instance.LogManager.LogException("Users.ExecuteCommand() - Failed", ex);
					return new BadRequestObjectResult(response);
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("Users.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}
