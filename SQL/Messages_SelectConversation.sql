
ALTER proc [dbo].[Messages_Select_Conversation]
    @SenderId int,
    @RecipientId int
as
/*
--Scott Weaver
Declare @Id int = 3
Declare @RecipId int = 2

Execute [dbo].[Messages_Select_Conversation] @Id, @RecipId

*/
BEGIN

    SELECT M.[Id]
      , M.[Message]
      , M.[Subject]
	  , M.[DateSent]
      , M.[DateRead]
	  , M.[DateCreated]
      , M.[DateModified]
	  , Sender.[UserId] as SenderId
	  , Sender.[FirstName] as SenderFirstName
	  , Sender.[LastName] as SenderLastName
	  , Sender.[Mi] as SenderMi
	  , Sender.[AvatarUrl] as SenderAvatarUrl
	  , Recipient.[UserId] as RecipientId
	  , Recipient.[FirstName] as RecipientFirstName
	  , Recipient.[LastName] as RecipientLastName
	  , Recipient.[Mi] as RecipientMi
	  , Recipient.[AvatarUrl] as RecipientAvatarUrl
    FROM [dbo].[Messages] as M
        JOIN [dbo].[UserProfiles] as Sender ON Sender.[UserId] = M.[SenderId]
        JOIN [dbo].[UserProfiles] as Recipient ON Recipient.[UserId] = M.[RecipientId]
    WHERE  (M.[SenderId] = @SenderId
        AND M.[RecipientId] = @RecipientId
        AND M.[DateSent] IS NOT NULL)
        OR(M.SenderId = @RecipientId
        AND m.RecipientId = @SenderId
        AND M.[DateSent] IS NOT NULL)
    GROUP BY M.[Id]
      ,M.[Message]
      ,M.[Subject]
	  ,M.[DateSent]
      ,M.[DateRead]
	  ,M.[DateCreated]
      ,M.[DateModified]
	  ,Sender.[UserId]
	  ,Sender.[FirstName] 
	  ,Sender.[LastName]
	  ,Sender.[Mi] 
	  ,Sender.[AvatarUrl] 
	  ,Recipient.[UserId]
	  ,Recipient.[FirstName] 
	  ,Recipient.[LastName] 
	  ,Recipient.[Mi]
	  ,Recipient.[AvatarUrl]
    ORDER BY M.[DateSent] ASC


END