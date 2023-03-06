create procedure GetUserDetails (@userID int) as begin

if exists(select * from [dbo].[Non-ProfitReps] where UserID = @userID)
begin
	select * from [dbo].[Non-ProfitReps] where UserID = @userID
end
else if exists(select * from [dbo].[BusinessReps] where UserID = @userID)
begin
	select * from [dbo].[BusinessReps] where UserID = @userID
end
else if exists(select * from [dbo].[SocialActivists] where UserID = @userID)
begin
	select * from [dbo].[SocialActivists] where UserID = @userID
end
else
begin
	select 'user not found'
end

end