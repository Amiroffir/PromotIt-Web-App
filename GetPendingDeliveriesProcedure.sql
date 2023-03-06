

create procedure getPendingDeliveries (  @companyName nvarchar(255) ) as begin


SELECT [dbo].[Products].[id],[ProductID], [dbo].[SocialActivists].[FullName], [dbo].[SocialActivists].[Email], [Address],[Phone] FROM [dbo].[Products] INNER JOIN [dbo].[SocialActivists] ON [dbo].[Products].BuyerID = [dbo].[SocialActivists].id inner join [dbo].[BusinessReps] ON [dbo].[Products].[DonatedBy] = [dbo].[BusinessReps].id WHERE [CompanyName] = @companyName AND [IsDelivered] = 0

end



--drop procedure getPendingDeliveries