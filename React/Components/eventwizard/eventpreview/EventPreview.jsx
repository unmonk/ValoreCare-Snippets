/* eslint-disable react/boolean-prop-naming */
import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, CardImg } from 'reactstrap';
import PreviewMap from './PreviewMap';
import PropTypes from 'prop-types';

export default function EventPreview(props) {
  const location = {
    latitude: props.values.locationLat,
    longitude: props.values.locationLong,
  };
  return (
    <Card className="m-3 border text-center">
      <CardHeader className="border">
        <h3>{props.values.eventName}</h3>
      </CardHeader>
      {props.values.eventImage ? (
        <CardImg
          top
          width="100%"
          height="300px"
          className="event-preview-image"
          src={props.values.eventImage}
          alt={props.values.eventName}
        />
      ) : (
        ''
      )}
      <CardBody className="">
        <h4>
          {props.values.eventTypeId
            ? props.getEventTypeForId(props.values.eventTypeId)
            : ''}
        </h4>
        {props.eventValidated && (
          <div>
            {props.values.eventStartDate
              ? props.values.eventStartDate.toLocaleString()
              : ''}
            <b> TO </b>
            {props.values.eventEndDate
              ? props.values.eventEndDate.toLocaleString()
              : ''}
          </div>
        )}

        <p className="text-success">{props.values.eventSummary}</p>
        <small>{props.values.eventDescription}</small>
        <p>
          {props.values.eventUrl ? (
            <>
              Visit for more details:{' '}
              <a href={props.values.eventUrl.toString()}>Click Here</a>
            </>
          ) : (
            ''
          )}
        </p>
      </CardBody>
      <h3>{props.values.venueId !== 0 ? '@' : ''}</h3>
      <CardBody>
        <h4>{props.values.venueName}</h4>
        <p className="text-overflow small">{props.values.venueDescription} </p>
        <address>
          {props.values.locationLineOne} <br />
          {props.values.locationLineTwo} <br />
          {props.values.locationCity}, {props.values.locationStateName},{' '}
          {props.values.locationZip}
        </address>
      </CardBody>

      <CardBody>
        <div className="preview-map">
          {props.values.locationLat !== 0.0 && (
            <PreviewMap location={location} key={props.values.locationLat} />
          )}
        </div>
      </CardBody>

      <CardFooter className="border">
        {props.values.eventIsFree
          ? 'FREE EVENT'
          : `$${props.values.eventPrice ? props.values.eventPrice : 0}`}
      </CardFooter>
    </Card>
  );
}
EventPreview.propTypes = {
  values: PropTypes.shape({
    eventName: PropTypes.string,
    eventSummary: PropTypes.string,
    eventDescription: PropTypes.string,
    eventUrl: PropTypes.string,
    eventStartDate: PropTypes.instanceOf(Date),
    eventEndDate: PropTypes.instanceOf(Date),
    eventIsFree: PropTypes.bool,
    eventTypeId: PropTypes.number,
    eventImage: PropTypes.string,
    eventPrice: PropTypes.number,
    venueId: PropTypes.number,
    venueName: PropTypes.string,
    venueDescription: PropTypes.string,
    locationLineOne: PropTypes.string,
    locationLineTwo: PropTypes.string,
    locationCity: PropTypes.string,
    locationStateId: PropTypes.number,
    locationStateName: PropTypes.string,
    locationZip: PropTypes.string,
    locationTypeId: PropTypes.number,
    locationLat: PropTypes.number,
    locationLong: PropTypes.number,
  }),
  getEventTypeForId: PropTypes.func,
  eventValidated: PropTypes.bool,
};
