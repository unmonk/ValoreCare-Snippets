
ALTER PROC [dbo].[Events_SearchPaginated_V2]
    @PageIndex INT,
    @PageSize  INT,
    @UserId INT,
    @Query     NVARCHAR(100)

/*
		DECLARE
		@_pageIndex int = 0
		,@_pageSize int = 20
		,@_userId int = 58
		,@_query nvarchar(100) = 'w'

		Execute [dbo].[Events_SearchPaginated_V2]
			@_pageIndex  
			,@_pageSize 
			,@_userId
			,@_query

*/

AS
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
    WHERE(E.[EventStatusId] = 1
        AND (E.[Name] LIKE '%' + @Query + '%'
        OR E.[Summary] LIKE '%' + @Query + '%'
        OR E.[ShortDescription] LIKE '%' + @Query + '%'
        OR V.[Name] LIKE '%' + @Query + '%'
        OR V.[Description] LIKE '%' + @Query + '%'
        OR L.[City] LIKE '%' + @Query + '%'
        OR L.[Zip] LIKE '%' + @Query + '%'
        OR ET.[Name] LIKE '%' + @Query + '%'))
    ORDER BY [DateStart] ASC
        OFFSET(@PageIndex) * (@PageSize) ROWS FETCH NEXT @PageSize ROWS ONLY;
END;