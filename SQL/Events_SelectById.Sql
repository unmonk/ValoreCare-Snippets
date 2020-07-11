
ALTER PROC [dbo].[Events_SelectDetails_ById_V3]

    @Id INT,
    @UserId INT

AS

/* 

DECLARE @_Id int = 13
EXEC [dbo].[Events_SelectDetails_ById_V3]
	@_Id

*/

    BEGIN
    SELECT E.[Id],
        E.[Name],
        E.[Summary],
        E.[ShortDescription],
        E.[ImageUrl],
        E.[ExternalSiteUrl],
        E.[IsFree],
        E.[DateCreated],
        E.[DateModified],
        E.[DateStart],
        E.[DateEnd],
        E.[Capacity],
        EP.[Price],
        EP.[StripeProductId],
        EP.[StripePriceId],
        EPP.[UserId] as ParticipantUserId,
        ET.[Id] AS EventTypeId,
        ET.[Name] AS EventTypeName,
        V.Id AS VenueId,
        V.[Name] AS VenueName,
        V.[Description] AS VenueDescription,
        V.[Url] AS VenueUrl,
        L.[Id],
        L.[LineOne],
        L.[LineTwo],
        L.[City],
        L.[Zip],
        L.[StateId],
        S.[Name] AS StateName,
        L.[Latitude],
        L.[Longitude],
        L.[LocationTypeId],
        TotalCount = COUNT(1) OVER()
    FROM [dbo].[Events] AS E
        JOIN dbo.EventTypes AS ET ON ET.Id = E.EventTypeId
        JOIN dbo.Venues AS V ON V.Id = E.VenueId
        JOIN dbo.Locations AS L ON V.LocationId = L.Id
        JOIN dbo.LocationTypes AS Lt ON L.LocationTypeId = Lt.Id
        LEFT JOIN dbo.EventPrices AS EP ON EP.EventId = E.Id
        LEFT JOIN dbo.EventParticipants AS EPP ON EPP.EventId = E.Id AND EPP.UserId = @UserId
        JOIN dbo.States AS S ON S.Id = L.StateId
    WHERE E.[Id] = @Id
END;