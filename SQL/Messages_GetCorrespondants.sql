
ALTER proc [dbo].[Messages_Select_Correspondents]
    @userId int
as
/*
--Scott Weaver
Declare @Id int = 5
Execute [dbo].[Messages_Select_Correspondents] @Id

*/
BEGIN
            SELECT DISTINCT Sender.[UserId]
	  , Sender.[FirstName] 
	  , Sender.[LastName]
	  , Sender.[Mi]
	  , Sender.[AvatarUrl]
        FROM [dbo].[Messages] as M
            JOIN [dbo].[UserProfiles] as Sender ON Sender.[UserId] = M.[SenderId]
        WHERE M.[RecipientId] = @userId
            AND M.[DateSent] IS NOT NULL
    UNION
        SELECT DISTINCT Recipient.[UserId]
	  , Recipient.[FirstName]
	  , Recipient.[LastName]
	  , Recipient.[Mi]
	  , Recipient.[AvatarUrl]
        FROM [dbo].[Messages] as M
            JOIN [dbo].[UserProfiles] as Recipient ON Recipient.[UserId] = M.[RecipientId]
        WHERE M.[SenderId] = @userId
            AND M.[DateSent] IS NOT NULL
END