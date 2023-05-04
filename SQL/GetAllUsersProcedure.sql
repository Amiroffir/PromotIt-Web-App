Create PROCEDURE GetAllUsers as BEGIN

CREATE TABLE #temp1 (
    UserType NVARCHAR(255),
UserID INT,
    FullName NVARCHAR(255),
    Email NVARCHAR(255),
);

INSERT INTO #temp1
SELECT UserType,UserID,FullName,Email
FROM Users
INNER JOIN SocialActivists ON Users.Id = SocialActivists.UserID


INSERT INTO #temp1
SELECT UserType,UserID,FullName,Email
FROM Users
INNER JOIN BusinessReps ON Users.Id = BusinessReps.UserID



INSERT INTO #temp1
SELECT UserType,UserID,FullName,Email
FROM Users
INNER JOIN [Non-ProfitReps] ON Users.Id = [Non-ProfitReps].UserID


SELECT * FROM #temp1


DROP TABLE #temp1;

END






