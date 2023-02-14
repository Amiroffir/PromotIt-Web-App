using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using PromotIt.Entities;
using PromotIt.Entities.Commands;
using System;
using System.Threading.Tasks;

namespace PromotIt.MicroService
{
	public static class Auth0Services
	{
		[FunctionName("GetRoles")]
		public static async Task<IActionResult> GetRoles(
			[HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "roles/{userID}")] HttpRequest req, string userID)
		{
			string response = "";
			ICommand command = MainManager.Instance.commandsManager.CommandsList["Auth0.GetRoles"];

			if (command != null)
			{
				try
				{
					return new OkObjectResult(command.ExecuteCommand(userID));
				}
				catch (Exception ex)
				{
					response = ex.Message;
					MainManager.Instance.LogManager.LogException("Auth0.ExecuteCommand() - Failed", ex);
					return new NotFoundResult();
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("Auth0.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}
