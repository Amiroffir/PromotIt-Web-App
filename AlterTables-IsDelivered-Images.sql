--ALTER TABLE [dbo].[Products]
--ADD [IsDelivered] BIT DEFAULT 0;

ALTER TABLE [dbo].[Campaigns]
ADD  [Image] nvarchar(max)

ALTER TABLE [dbo].[Products]
ADD  [Image] nvarchar(max)

ALTER TABLE [dbo].[SocialActivists]
ADD [TwitterHandle] nvarchar(max)

ALTER TABLE [dbo].[SocialActivists]
ADD [LastEarningsUpdate] DateTime

ALTER TABLE [dbo].[SocialActivists]
ADD [LastEarningsUpdate] DateTime DEFAULT DATEADD(hour, -2, GETDATE())


CREATE TABLE "Tweets"(
    "id" INT NOT NULL identity,
    "TweetID" NVARCHAR(255) NOT NULL,
    "PromotedCampaign" INT NOT NULL,
    "TweetedBy" INT NOT NULL,
);
ALTER TABLE
    "Tweets" ADD CONSTRAINT "tweets_id_primary" PRIMARY KEY("id");

	ALTER TABLE
    "Tweets" ADD CONSTRAINT "tweets_promotedcampaign_foreign" FOREIGN KEY("PromotedCampaign") REFERENCES "Campaigns"("id");
	ALTER TABLE
    "Tweets" ADD CONSTRAINT "tweets_twittedby_foreign" FOREIGN KEY("TweetedBy") REFERENCES "SocialActivists"("id");



	drop table Tweets