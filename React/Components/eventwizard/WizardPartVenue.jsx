/* eslint-disable react/boolean-prop-naming */
import React from 'react';
import {
  FormGroup,
  Label,
  Button,
  Input,
  Row,
  Col,
  FormFeedback,
} from 'reactstrap';
import PropTypes from 'prop-types';
import WizardPartLocation from './WizardPartLocation';
import VenueSelectv2 from './EventInputs/VenueSelectv2';
import LocationSelect from './EventInputs/LocationSelect';

export default function WizardPartVenue(props) {
  return (
    <>
      <h4>Add Venue</h4>
      <p>Select a venue, or create one.</p>
      <FormGroup>
        <Row className="input-group">
          <Col lg={11} xs={6} md={9}>
            <VenueSelectv2
              onError={props.toastError}
              onChange={props.onVenueChange}
              isDisabled={props.isAddingVenue}
            />
          </Col>
          <Col lg={1} xs={6} md={3}>
            <Button
              color="primary"
              className="input-group-button"
              onClick={props.onAddVenueClicked}
            >
              <i
                className={
                  props.isAddingVenue ? 'fas fa-times-circle' : 'fas fa-plus'
                }
              ></i>{' '}
              {props.isAddingVenue ? 'Stop Adding' : 'New Venue'}
            </Button>
          </Col>
        </Row>
        {props.formData.venueId === 0 && props.isAddingVenue === false && (
          <small className="error is-invalid">
            Must create or select a venue
          </small>
        )}
      </FormGroup>
      {props.isAddingVenue && (
        <>
          <FormGroup>
            <Label for="venueName">Venue Name</Label>
            <Input
              type="text"
              name="venueName"
              id="venueName"
              placeholder="Venue Name"
              invalid={props.formErrors.venueName}
              onChange={props.onStringInputchange}
              onBlur={props.validate}
              value={props.formData.venueName}
            />
            {props.formErrors.venueName && (
              <FormFeedback>{props.formErrorText.venueName}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="venueDescription">Venue Description</Label>
            <Input
              type="text"
              name="venueDescription"
              id="venueDescription"
              placeholder="Venue Description"
              invalid={props.formErrors.venueDescription}
              onChange={props.onStringInputchange}
              onBlur={props.validate}
              value={props.formData.venueDescription}
            />
            {props.formErrors.venueDescription && (
              <FormFeedback>
                {props.formErrorText.venueDescription}
              </FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="venueUrl">Venue Website</Label>
            <Input
              type="url"
              name="venueUrl"
              id="venueUrl"
              placeholder="https://google.com"
              invalid={props.formErrors.venueUrl}
              value={props.formData.venueUrl}
              onChange={props.onStringInputchange}
              onBlur={props.validate}
            />
            {props.formErrors.venueUrl && (
              <FormFeedback>{props.formErrorText.venueUrl}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="venueLocationId">Location</Label>
            <Row className="input-group">
              <Col lg={11} xs={6} md={9}>
                <LocationSelect
                  name="venueLocationId"
                  id="venueLocationId"
                  onError={props.toastError}
                  onChange={props.onLocationChange}
                  isDisabled={props.isAddingLocation}
                />
              </Col>
              <Col lg={1} xs={6} md={3}>
                <Button
                  color="primary"
                  className="input-group-button"
                  onClick={props.onAddLocationClicked}
                >
                  <i
                    className={
                      props.isAddingLocation
                        ? 'fas fa-times-circle'
                        : 'fas fa-plus'
                    }
                  ></i>{' '}
                  {props.isAddingLocation ? 'Stop Adding' : 'New Location'}
                </Button>
              </Col>
              {props.formData.venueLocationId === 0 &&
                props.isAddingLocation === false && (
                  <small className="error is-invalid">
                    Must create or select a location
                  </small>
                )}
            </Row>
          </FormGroup>
          {props.isAddingLocation && <WizardPartLocation {...props} />}
        </>
      )}
    </>
  );
}

WizardPartVenue.propTypes = {
  formData: PropTypes.shape({
    venueId: PropTypes.number,
    venueName: PropTypes.string,
    venueLocationId: PropTypes.number,
    venueDescription: PropTypes.string,
    venueUrl: PropTypes.string,
  }),
  formErrors: PropTypes.shape({
    venueId: PropTypes.bool,
    venueName: PropTypes.bool,
    venueLocationId: PropTypes.bool,
    venueDescription: PropTypes.bool,
    venueUrl: PropTypes.bool,
  }),
  formErrorText: PropTypes.shape({
    venueId: PropTypes.string,
    venueName: PropTypes.string,
    venueLocationId: PropTypes.string,
    venueDescription: PropTypes.string,
    venueUrl: PropTypes.string,
  }),
  onVenueChange: PropTypes.func,
  onLocationChange: PropTypes.func,
  onFullLocationChange: PropTypes.func,
  toastError: PropTypes.func,
  isAddingLocation: PropTypes.bool,
  isAddingVenue: PropTypes.bool,
  onAddVenueClicked: PropTypes.func,
  onAddLocationClicked: PropTypes.func,
  validate: PropTypes.func,
  onStringInputchange: PropTypes.func,
};
