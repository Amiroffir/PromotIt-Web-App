CREATE PROCEDURE GetTweetsReport 
  as begin
 SELECT [dbo].[SocialActivists].[TwitterHandle] as Handle, COUNT(*) AS TweetsCount, 'Activist' AS Type
FROM Tweets
INNER JOIN [dbo].[SocialActivists]
    ON [dbo].[SocialActivists].id = [dbo].[Tweets].TweetedBy
INNER JOIN [dbo].[Campaigns]
    ON [dbo].[Campaigns].id = [dbo].[Tweets].PromotedCampaign
GROUP BY [dbo].[SocialActivists].[TwitterHandle]
UNION 
SELECT CampaignName as Handle, COUNT(*) AS TweetsCount, 'Campaign' AS Type
FROM Tweets
INNER JOIN [dbo].[SocialActivists]
    ON [dbo].[SocialActivists].id = [dbo].[Tweets].TweetedBy
INNER JOIN [dbo].[Campaigns]
    ON [dbo].[Campaigns].id = [dbo].[Tweets].PromotedCampaign
GROUP BY CampaignName
UNION 
SELECT CONCAT(TwitterHandle, ' & ',CampaignName) as Handle, COUNT(*) AS TweetsCount, 'Activist&Campaign' AS Type
FROM Tweets
INNER JOIN [dbo].[SocialActivists]
    ON [dbo].[SocialActivists].id = [dbo].[Tweets].TweetedBy
INNER JOIN [dbo].[Campaigns]
    ON [dbo].[Campaigns].id = [dbo].[Tweets].PromotedCampaign
GROUP BY TwitterHandle, CampaignName

end


--drop procedure GetTweetsReport