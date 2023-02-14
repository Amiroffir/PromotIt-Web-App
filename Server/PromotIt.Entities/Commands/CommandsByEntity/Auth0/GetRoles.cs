using LinqToTwitter;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using Utilities;

namespace PromotIt.Entities.Commands.CommandsByEntity.Auth0
{
	public class GetRoles : CommandsManager, ICommand
	{
		public GetRoles(LogManager logManager) : base(logManager)
		{
		}
		public object ExecuteCommand(params object[] param)
		{

			if (param[0] != null)
			{
				string userID = param[0].ToString();
				string Auth0End = Environment.GetEnvironmentVariable("Auth0End");
				string BearerAuth0 = Environment.GetEnvironmentVariable("BearerAuth0");

				var urlGetRoles = $"{Auth0End}/{userID}/roles";
				var client = new RestClient(urlGetRoles);
				var request = new RestRequest("", Method.Get);
				request.AddHeader("authorization", BearerAuth0);
				var response = client.Execute(request);
				LogManager.LogEvent("Request sent to Auth0");
				if (response.IsSuccessful)
				{
					LogManager.LogEvent("Request to Auth0 was successful");
					var json = JArray.Parse(response.Content);
					return json;
				}
				else
				{
					Exception ex = new Exception("Request to Auth0 failed");
					LogManager.LogException("Request to Auth0 was not successful",ex);
					throw ex;
				}
			}
			else
			{
				Exception ex = new Exception("Invalid parameters");
				LogManager.LogException("GetRoles.ExecuteCommand()" + "Failed", ex);
				throw ex;
			}
		}
	}
}
