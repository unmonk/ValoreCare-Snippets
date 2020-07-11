
ALTER proc [dbo].[EventWizard_Insert]
    @EventTypeId      INT,
    @Name        NVARCHAR(255),
    @Summary          NVARCHAR(255),
    @ShortDescription NVARCHAR(4000),
    @EventStatusId    INT,
    @ImageUrl         NVARCHAR(400),
    @ExternalSiteUrl  NVARCHAR(400),
    @IsFree           BIT,
    @DateStart        DATETIME2(7),
    @DateEnd          DATETIME2(7),
    @Price			decimal(6, 2),
    @Capacity			INT,
    --Location Params
    @LocationTypeId   INT,
    @LocationLineOne          NVARCHAR(255),
    @LocationLineTwo          NVARCHAR(255),
    @LocationCity             NVARCHAR(255),
    @LocationZip              NVARCHAR(255),
    @LocationStateId          INT,
    @LocationLatitude         FLOAT,
    @LocationLongitude        FLOAT,
    --Venue Params
    @VenueId          INT,
    @VenueName        NVARCHAR(255),
    @VenueDescription NVARCHAR(4000),
    @VenueLocationId INT,
    @VenueUrl         NVARCHAR(255),
    --User Params
    @UserId           INT,
    --Stripe Params
    @StripeProductId NVARCHAR(MAX) = null,
    @StripePriceId NVARCHAR(MAX) = null,
    --final output eventId
    @OutputId         INT OUTPUT


AS

/* 
	Declare @EventTypeId      INT = 7, 
	@Name        NVARCHAR(255) = 'ValoreCare Meetup', 
	@Summary          NVARCHAR(255) = 'Weekly ValoreCare Meetup' , 
	@ShortDescription NVARCHAR(4000) = 'Meetup with your favorite providers and network.', 
	@EventStatusId    INT = 1, 
	@ImageUrl         NVARCHAR(400) = 'https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg', 
	@ExternalSiteUrl  NVARCHAR(400) = 'https://google.com', 
	@IsFree           BIT = 1,
	@DateStart        DATETIME2(7) = GETUTCDATE(), 
	@DateEnd          DATETIME2(7) = GETUTCDATE(),
	@Price			decimal(6, 2) = 0,
	@Capacity			INT = NULL,
	--Location Params
	@LocationTypeId   INT = 2, 
	@LocationLineOne          NVARCHAR(255) = '23285 pleasant valley road',
	@LocationLineTwo          NVARCHAR(255) = '', 
	@LocationCity             NVARCHAR(255) = 'creal springs',
	@LocationZip              NVARCHAR(255) = '62922',
	@LocationStateId          INT = 14, 
	@LocationLatitude         FLOAT = 37.6145, 
	@LocationLongitude        FLOAT = -88.731084,
	--Venue Params
    @VenueId          INT = 0,
	@VenueName        NVARCHAR(255) = 'Scotts House', 
	@VenueDescription NVARCHAR(4000) = 'Its a happening place', 
	@VenueLocationId INT = 0,
	@VenueUrl         NVARCHAR(255) = 'https://google.com',
	--User Params
	@UserId           INT = 8,
		--Stripe Params
	@StripeProductId NVARCHAR(MAX) = 'ValoreEvents_test',
	@StripePriceId NVARCHAR(MAX) = 'test123',
		--final output eventId
	@OutputId         INT

	
			

EXEC [dbo].[EventWizard_Insert]
	@EventTypeId, 
	@Name, 
	@Summary, 
	@ShortDescription, 
	@EventStatusId, 
	@ImageUrl, 
	@ExternalSiteUrl, 
	@IsFree, 
	@DateStart, 
	@DateEnd,
	@Price,
	@Capacity,
	--Location Params
	@LocationTypeId, 
	@LocationLineOne, 
	@LocationLineTwo, 
	@LocationCity, 
	@LocationZip, 
	@LocationStateId, 
	@LocationLatitude, 
	@LocationLongitude,
	--Venue Params
    @VenueId,
	@VenueName, 
	@VenueDescription, 
	@VenueLocationId,
	@VenueUrl,
	--User Params
	@UserId,
	-- Stripe Params
	@StripeProductId,
	@StripePriceId,
		--final output eventId
	@OutputId OUTPUT
			
			

EXEC [dbo].[Events_SelectDetails_ById_V3]
	@OutputId

*/

BEGIN
    SET XACT_ABORT ON
    Declare @Tran nvarchar(50)  = '_eventWizardInsertTx'

    /*1)Declare Table Variable. INSERT INTO Table Variable( Select by Id)
2) IF(Table variable IS NULL) BEGIN  END  ELSE BEGIN END*/

    BEGIN TRY

BEGIN Transaction @Tran
	
		IF(@VenueLocationId = 0)	
		BEGIN
        EXEC [dbo].[Locations_Insert] 
             @VenueLocationId OUTPUT, 
             @LocationTypeId, 
             @LocationLineOne, 
             @LocationLineTwo, 
             @LocationCity, 
             @LocationZip, 
             @LocationStateId, 
             @LocationLatitude, 
             @LocationLongitude, 
             @UserId;
    END

		IF(@VenueId = 0)
		BEGIN
        EXEC [dbo].[Venues_Insert] 
             @VenueName, 
             @VenueDescription, 
             @VenueLocationId, 
             @VenueUrl, 
             @UserId, 
             @UserId, 
             @VenueId OUTPUT;
    END

		IF(@VenueId != 0 AND @VenueLocationId != 0)
		BEGIN
        EXEC [dbo].[Events_InsertV3] 
			   @EventTypeId, 
             @Name, 
             @Summary, 
             @ShortDescription, 
             @VenueId, 
             @EventStatusId, 
             @ImageUrl, 
             @ExternalSiteUrl, 
             @IsFree, 
             @DateStart, 
             @DateEnd, 
			 @Capacity,
             @OutputId OUTPUT;
    END

		IF(@Price > 0)
		BEGIN
        EXEC [dbo].[EventPrices_Insert]
			@OutputId,
			2,
			@Price,
			@StripeProductId,
			@StripePriceId
    END


Commit Transaction @Tran

END TRY
BEGIN Catch



    IF (XACT_STATE()) = -1
    BEGIN
        PRINT 'The transaction is in an uncommittable state.' +
              ' Rolling back transaction.'
        ROLLBACK TRANSACTION @Tran;;
    END;

    -- Test whether the transaction is active and valid.
    IF (XACT_STATE()) = 1
    BEGIN
        PRINT 'The transaction is committable.' +
              ' Committing transaction.'
        COMMIT TRANSACTION @Tran;;
    END;

        -- If you want to see error info
       -- SELECT
        --ERROR_NUMBER() AS ErrorNumber,
        --ERROR_SEVERITY() AS ErrorSeverity,
        --ERROR_STATE() AS ErrorState,
       -- ERROR_PROCEDURE() AS ErrorProcedure,
       -- ERROR_LINE() AS ErrorLine,
       -- ERROR_MESSAGE() AS ErrorMessage

-- to just get the error thrown and see the bad news as an exception
    THROW

End Catch




    SET XACT_ABORT OFF
END