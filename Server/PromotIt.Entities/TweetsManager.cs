
using LinqToTwitter;
using Newtonsoft.Json;
using PromotIt.Data.Sql;
using PromotIt.Model;
using RestSharp;
using System;
using System.Threading;
using System.Threading.Tasks;
using Utilities;

namespace PromotIt.Entities
{

	public class TweetsManager : BaseEntity
	{
		public TweetsManager(LogManager logManager) : base(logManager)
		{
			LogManager.LogEvent("Twitter Scan is started");
			Task.Run(GetTweetsMoney);
		}

		SingleUserAuthorizer myAuth = new SingleUserAuthorizer
		{
			CredentialStore = new SingleUserInMemoryCredentialStore
			{
				ConsumerKey = Environment.GetEnvironmentVariable("ConsumerKey"),
				ConsumerSecret = Environment.GetEnvironmentVariable("ConsumerSecret"),
				AccessToken = Environment.GetEnvironmentVariable("AccessToken"),
				AccessTokenSecret = Environment.GetEnvironmentVariable("AccessTokenSecret")
			}
		};

		string BearerTwitter = Environment.GetEnvironmentVariable("BearerTwitter");
		string query = Environment.GetEnvironmentVariable("TwitterSearchEnd");
		string searchTweets = Environment.GetEnvironmentVariable("TwitterSearchEnd");

		public void GetTweetsMoney()
		{
			while (true)
			{
				LogManager.LogEvent("Hourly Twitter Scan is started");
				MainManager.Instance.campaignsManager.GetCampaigns();
				DateTime lastSearch = GetLastSearchTime();

				foreach (var campaign in MainManager.Instance.campaignsList)
				{
					searchTweets += MainManager.Instance.tweetsManager.GetSearchQuery(campaign.Value.CampaignHash, campaign.Value.CampaignUrl, lastSearch);

					var response = GetTweetsData(searchTweets);
					if (response.IsSuccessful)
					{
						dynamic data = JsonConvert.DeserializeObject(response.Content);
						if (data.data != null)
						{
							MainManager.Instance.tweetsManager.AddTweetToDB(data);
							MainManager.Instance.socialActivistsManager.GetPaid(data);
						}
					}
					searchTweets = query;
				}
				LogManager.LogEvent("Hourly Twitter Scan is finished");
				// Work Every Hour
				Thread.Sleep(3600000);
			}
		}


		public string GetSearchQuery(string campaignHash, string campaignURL, DateTime lastSearchTime)
		{
			string query = "";
			query += campaignHash;
			query += " url:" + '"' + campaignURL + '"' + "";

			return $"?expansions=author_id&tweet.fields=entities&query={query}&start_time={lastSearchTime:yyyy-MM-ddTHH:mm:ssZ}";
		}

		private RestResponse GetTweetsData(string query)
		{
			try
			{
				RestClient client = new RestClient(query);
				RestRequest request = new RestRequest("", Method.Get);
				request.AddHeader("authorization", BearerTwitter);

				var response = client.Execute(request);
				LogManager.LogEvent("Twitter request is sent");
				return response;
			}
			catch (Exception ex)
			{
				LogManager.LogException("Twitter request is failed", ex);
				throw ex;
			}
		}

		public void AddTweet(string tweetID, int promotedCampaign, int userID)
		{
			try
			{
				TweetsSQL tweetsSQL = new TweetsSQL(LogManager);
				tweetsSQL.AddTweet(tweetID, promotedCampaign, userID);
			}
			catch (Exception ex)
			{
				LogManager.LogException("TweetsManager.AddTweet - Failed", ex);
				throw ex;
			}
		}

		public string GetTweetDetails(string pid)
		{
			try
			{
				TweetsSQL tweetsSQL = new TweetsSQL(LogManager);
				Product p = MainManager.Instance.productsManager.GetOneProduct(pid);
				string tweet = tweetsSQL.GetTweetDetails(p.DonatedBy, p.BuyerID);
				tweet += $"\nMore details: https://promotit.com/Products/Details/{pid}"; // Extra info to tweet & preventing an identical tweets
				return tweet;
			}
			catch (Exception ex)
			{
				LogManager.LogException("TweetsManager.GetTweetDetails - Failed", ex);
				throw ex;
			}
		}

		public bool PostTweet(string email)
		{
			try
			{
				string tweetToPost = GetTweetDetails(email);
				var twitterCtx = new TwitterContext(myAuth);
				var tweet = twitterCtx.TweetAsync(tweetToPost);
				if (tweet != null)
				{
					LogManager.LogEvent("Tweet is posted");
					return true;
				}
				else
				{
					LogManager.LogEvent("Tweet is not posted");
					return false;
				}
			}
			catch (Exception ex)
			{
				LogManager.LogException("Twitter request is failed", ex);
				return false;
			}
		}

		public DateTime GetLastSearchTime()
		{
			try
			{
				TweetsSQL tweetsSQL = new TweetsSQL(LogManager);
				DateTime LastSearch = tweetsSQL.GetLastSearchTime();

				// 7 days back it's the longest timespan for past tweets search
				if (DateTime.Now.AddDays(-7) < LastSearch)
				{
					return LastSearch;
				}
				else
				{
					return DateTime.Now.AddDays(-7);
				}
			}
			catch (Exception ex)
			{
				LogManager.LogException("TweetsManager.GetLastSearchTime - Failed", ex);
				throw ex;
			}
		}

		public void AddTweetToDB(dynamic data)
		{
			int promotedCampaign;
			string twitterHandle = data.includes.users[0].username.ToString();
			int userID = MainManager.Instance.socialActivistsManager.GetUserID(twitterHandle);

			foreach (var tweet in data.data)
			{
				foreach (var Hashtag in tweet.entities.hashtags)
				{
					promotedCampaign = MainManager.Instance.campaignsManager.GetCampaignByHash((string)Hashtag.tag);

					MainManager.Instance.tweetsManager.AddTweet((string)tweet.id, promotedCampaign, userID);
				}
			}
		}

		public object GetTweetsReport()
		{
			try
			{
				TweetsSQL tweetsSQL = new TweetsSQL(LogManager);
				return tweetsSQL.GetTweetsReport();
			}
			catch (Exception ex)
			{
				LogManager.LogException("TweetsManager.GetTweetsReport - Failed", ex);
				throw ex;
			}
		}

		public object GetTweetsReportFromDB()
		{
			try
			{
				TweetsSQL tweetsSQL = new TweetsSQL(LogManager);
				return tweetsSQL.GetTweetsReportFromDB();
			}
			catch (Exception ex)
			{
				LogManager.LogException("TweetsManager.GetTweetsReportFromDB - Failed", ex);
				throw ex;
			}
		}
	}
}

