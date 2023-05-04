CREATE TABLE "Products"(
    "id" INT NOT NULL identity,
    "ProductID" INT NOT NULL,
    "ProductName" NVARCHAR(255) NOT NULL,
    "Price" DECIMAL(8, 2) NOT NULL,
    "DonatedBy" int NOT NULL,
    "DonatedTo" int NOT NULL,
    "IsBought" BIT NOT NULL,
    "BuyerID" INT
);
ALTER TABLE
    "Products" ADD CONSTRAINT "products_id_primary" PRIMARY KEY("id");
CREATE TABLE "Campaigns"(
    "id" INT NOT NULL identity,
    "CampaignName" NVARCHAR(255) NOT NULL,
    "CampaignDesc" NVARCHAR(255) NOT NULL,
    "CampaignHash" NVARCHAR(255) NOT NULL,
    "CampaignUrl" NVARCHAR(255) NOT NULL,
    "DonationsAmount" DECIMAL(8, 2) NOT NULL,
    "NonProfitRepID" INT NOT NULL
);
ALTER TABLE
    "Campaigns" ADD CONSTRAINT "campaigns_id_primary" PRIMARY KEY("id");
CREATE TABLE "Non-ProfitReps"(
    "id" INT NOT NULL identity,
    "UserID" INT NOT NULL,
    "FullName" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "OrganizationUrl" NVARCHAR(255) NOT NULL,
    "OrganizationName" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Non-ProfitReps" ADD CONSTRAINT "non_profitreps_id_primary" PRIMARY KEY("id");
CREATE TABLE "BusinessReps"(
    "id" INT NOT NULL identity,
    "UserID" INT NOT NULL,
    "FullName" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "CompanyName" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "BusinessReps" ADD CONSTRAINT "businessreps_id_primary" PRIMARY KEY("id");
CREATE TABLE "SocialActivists"(
    "id" INT NOT NULL identity,
    "UserID" INT NOT NULL,
    "FullName" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "Address" NVARCHAR(255) NOT NULL,
    "Phone" NVARCHAR(255) NOT NULL,
    "EarningStatus" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "SocialActivists" ADD CONSTRAINT "socialactivists_id_primary" PRIMARY KEY("id");
CREATE TABLE "Users"(
    "id" INT NOT NULL identity,
    "UserType" NVARCHAR(255) NOT NULL
);
ALTER TABLE
    "Users" ADD CONSTRAINT "users_id_primary" PRIMARY KEY("id");

ALTER TABLE
    "Products" ADD CONSTRAINT "products_donatedby_foreign" FOREIGN KEY("DonatedBy") REFERENCES "BusinessReps"("id");
ALTER TABLE
    "Products" ADD CONSTRAINT "products_donatedto_foreign" FOREIGN KEY("DonatedTo") REFERENCES "Campaigns"("id");
ALTER TABLE
    "Products" ADD CONSTRAINT "products_buyerid_foreign" FOREIGN KEY("BuyerID") REFERENCES "SocialActivists"("id");
ALTER TABLE
    "Campaigns" ADD CONSTRAINT "campaigns_nonprofitrepid_foreign" FOREIGN KEY("NonProfitRepID") REFERENCES "Non-ProfitReps"("id");
ALTER TABLE
    "Non-ProfitReps" ADD CONSTRAINT "Non-ProfitReps_usertype_foreign" FOREIGN KEY("UserID") REFERENCES "Users"("id");
ALTER TABLE
    "BusinessReps" ADD CONSTRAINT "BusinessReps_usertype_foreign" FOREIGN KEY("UserID") REFERENCES "Users"("id");
ALTER TABLE
    "SocialActivists" ADD CONSTRAINT "SocialActivists_usertype_foreign" FOREIGN KEY("UserID") REFERENCES "Users"("id");







	--drop table [dbo].[BusinessReps]
	--drop table [dbo].[Campaigns]
	--drop table [dbo].[Non-ProfitReps]
	--drop table [dbo].[Products]
	--drop table [dbo].[SocialActivists]
	--drop table [dbo].[Users]