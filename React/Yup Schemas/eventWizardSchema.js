import * as Yup from 'yup';

const shortInput = 'Your input is too short';
const longInput = 'Your input is too long';
const requirementError = 'This field is required';
const urlError = 'Please enter a valid URL';
const dateBeforeNow = `Date must be in the future`;
const dateBeforeStartDate = 'Date must be after the start date';
const selectEvent = 'Must select an event type.';
const eventCost = 'Must have a price';
const eventCapacity = 'Paid events must have a capacity';
const locationType = ' Must select a location type';

const wizardPartEventSchema = Yup.object().shape({
  eventName: Yup.string()
    .min(3, shortInput)
    .max(255, longInput)
    .required(requirementError),
  eventTypeId: Yup.number().min(1, selectEvent).required(requirementError),
  eventSummary: Yup.string()
    .min(3, shortInput)
    .max(255, longInput)
    .required(requirementError),
  eventDescription: Yup.string()
    .min(3, shortInput)
    .max(4000, longInput)
    .required(requirementError),
  eventUrl: Yup.string().url(urlError),
  eventStartDate: Yup.date()
    .min(new Date(), dateBeforeNow)
    .max(new Date('01-01-2999'))
    .required(requirementError),
  eventEndDate: Yup.date()
    .min(new Date(), dateBeforeNow)
    .max(new Date('01-01-2999'))
    .when(
      'eventStartDate',
      (eventStartDate, schema) =>
        eventStartDate && schema.min(eventStartDate, dateBeforeStartDate)
    )
    .required(requirementError),
  eventIsFree: Yup.bool(),
  eventPrice: Yup.number().when('eventIsFree', {
    is: false,
    then: Yup.number().required(requirementError).min(1, eventCost),
    otherwise: Yup.number(),
  }),
  eventCapacity: Yup.number().when('eventIsFree', {
    is: false,
    then: Yup.number().required(requirementError).min(1, eventCapacity),
    otherwise: Yup.number(),
  }),
});

const wizardPartVenueSchema = Yup.object().shape({
  venueId: Yup.number(),
  venueName: Yup.string().when('venueId', {
    is: (venueId) => venueId !== 0,
    then: Yup.string(),
    otherwise: Yup.string()
      .min(3, shortInput)
      .max(255, longInput)
      .required(requirementError),
  }),
  venueDescription: Yup.string().when('venueId', {
    is: (venueId) => venueId !== 0,
    then: Yup.string(),
    otherwise: Yup.string()
      .min(3, shortInput)
      .max(4000, longInput)
      .required(requirementError),
  }),
  venueLocationId: Yup.number(),
  venueUrl: Yup.string().when('venueId', {
    is: (venueId) => venueId !== 0,
    then: Yup.string(),
    otherwise: Yup.string().url(urlError),
  }),
  //LOCATION
  locationLineOne: Yup.string().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.string(),
    otherwise: Yup.string().min(3, shortInput).required(requirementError),
  }),
  locationLineTwo: Yup.string().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.string(),
    otherwise: Yup.string().max(255, longInput),
  }),
  locationCity: Yup.string().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.string(),
    otherwise: Yup.string()
      .min(3, shortInput)
      .max(255, longInput)
      .required(requirementError),
  }),
  locationStateId: Yup.number().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.number(),
    otherwise: Yup.number().required(requirementError),
  }),
  locationZip: Yup.string().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.string(),
    otherwise: Yup.string().min(5, shortInput).required(requirementError),
  }),
  locationTypeId: Yup.number().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.number(),
    otherwise: Yup.number().min(1, locationType).required(requirementError),
  }),
  address: Yup.bool().when('venueLocationId', {
    is: (venueLocationId) => venueLocationId !== 0,
    then: Yup.bool(),
    otherwise: Yup.bool().oneOf([true], requirementError),
  }),
});

export { wizardPartEventSchema, wizardPartVenueSchema };
