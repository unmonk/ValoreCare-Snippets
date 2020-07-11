import React from 'react';
import PropTypes from 'prop-types';

export default function EventRegisterDescription(props) {
  const paidText = `This is a paid event and costs $${props.values.price}, please proceed to payment with Stripe. `;
  const freeText =
    'This is a free event, you are able to register without fee. Please confirm you wish to register for this event.';
  return (
    <>
      <p>{props.values.isFree ? freeText : paidText}</p>
      {props.values.isFree ? (
        ''
      ) : (
        <b className="text-danger mb-2">This Event is Non-Refundable</b>
      )}
      <h4>Time:</h4>
      <div>
        {props.values.dateStart
          ? new Date(props.values.dateStart).toLocaleString()
          : ''}
        <b> TO </b>
        {props.values.dateEnd
          ? new Date(props.values.dateEnd).toLocaleString()
          : ''}
      </div>
      <h4>Location:</h4>
      <div>
        <address>
          {props.values.venueV2 && props.values.venueV2.location.lineOne} <br />
          {props.values.venueV2 && props.values.venueV2.location.lineTwo}
          {props.values.venueV2 && props.values.venueV2.location.lineTwo ? (
            <br />
          ) : (
            ''
          )}
          {props.values.venueV2 && props.values.venueV2.location.city},{' '}
          {props.values.venueV2 && props.values.venueV2.location.state.name},{' '}
          {props.values.venueV2 && props.values.venueV2.location.zip}
        </address>
      </div>
      <h4>Cost:</h4>
      <p>{props.values.isFree ? 'FREE' : `$${props.values.price}`}</p>
    </>
  );
}

EventRegisterDescription.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    summary: PropTypes.string,
    shortDescription: PropTypes.string,
    externalSiteUrl: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    capacity: PropTypes.number,
    isFree: PropTypes.bool,
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    venueV2: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      location: PropTypes.shape({
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        city: PropTypes.string,
        zip: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        state: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  }),
};
