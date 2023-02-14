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
	public static class BusinessReps
    {
        [FunctionName("BusinessReps")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post","put", Route = "BusinessReps/{action}/{extraParam?}")] HttpRequest req,
            ILogger log, string action, string extraParam)
        {
            string response = "";
			string dictionaryKey = $"BusinessRep.{action}";

			ICommand command = MainManager.Instance.commandsManager.CommandsList[dictionaryKey];


			if (command != null)
			{
				try
				{

                    response = (string)command.ExecuteCommand(extraParam);
					return new OkObjectResult(response);
				}
				catch (Exception ex)
				{
					response = ex.Message;
					MainManager.Instance.LogManager.LogException("BusinessReps.ExecuteCommand() - Failed", ex);
					return new BadRequestObjectResult(response);
				}
			}
			else
			{
				response = "Invalid command";
				MainManager.Instance.LogManager.LogException("BusinessReps.ExecuteCommand() - Failed", new Exception(response));
				return new BadRequestObjectResult(response);
			}
		}
	}
}