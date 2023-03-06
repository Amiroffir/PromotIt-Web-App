-- query that check if user details is in the database by email

--create procedure checkUserExistByEmail ( @email varchar(50) ) as begin
--declare @answer varchar(50)
--if exists(select SocialActivists.Email from Users inner join SocialActivists on Users.Id = SocialActivists.UserID where Email = @email)
--begin 
--	set @answer = 'true'
--end
--else if exists(select BusinessReps.Email from Users inner join BusinessReps on Users.Id = BusinessReps.UserID where Email = @email)
--begin 
--	set @answer = 'true'
--end
--else if exists(select [Non-ProfitReps].Email from Users inner join [Non-ProfitReps] on Users.Id = [Non-ProfitReps].UserID where Email = @email)
--begin 
--	set @answer = 'true'
--end
--else
--begin
--	set @answer = 'false'
--end
--select @answer
--end


-- call to check if user exist by email stored procedure

--checkUserExistByEmail @email = 'aaa'