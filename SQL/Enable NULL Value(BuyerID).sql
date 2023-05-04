


	ALTER TABLE Products
DROP CONSTRAINT "products_buyerid_foreign"

ALTER TABLE Products
ADD FOREIGN KEY ("BuyerId") REFERENCES "SocialActivists"("id")
ON DELETE SET NULL;
