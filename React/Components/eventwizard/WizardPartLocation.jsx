/* eslint-disable react/boolean-prop-naming */
import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import LocationSearch from './EventInputs/LocationSearch';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default function WizardPartLocation(props) {
  return (
    <>
      <FormGroup>
        <Label for="locationTypeId">Location Type</Label>
        <Select
          name="locationTypeId"
          id="locationTypeId"
          placeholder="Select Location Type"
          options={props.locationTypeOptions}
          invalid={props.formErrors.locationTypeId}
          onChange={props.onLocationTypeChange}
        />

        {props.formErrors.locationTypeId && (
          <small className="error is-invalid">
            {props.formErrorText.locationTypeId}
          </small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <LocationSearch
          name="locationsearch"
          getAddress={props.onFullLocationChange}
        />

        {props.formErrors.locationLineOne && (
          <small className="error is-invalid">
            {props.formErrorText.locationLineOne}
          </small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="locationLineTwo">Address Line Two</Label>
        <Input
          type="text"
          name="locationLineTwo"
          id="locationLineTwo"
          placeholder="Apartment #, Building #, etc"
          invalid={props.formErrors.locationLineTwo}
          onChange={props.onStringInputchange}
          onBlur={props.validate}
        />
        {props.formErrors.locationLineTwo && (
          <FormFeedback>{props.formErrorText.locationLineTwo}</FormFeedback>
        )}
      </FormGroup>
    </>
  );
}

WizardPartLocation.propTypes = {
  formData: PropTypes.shape({
    locationLineOne: PropTypes.string,
    locationLineTwo: PropTypes.string,
    locationCity: PropTypes.string,
    locationStateId: PropTypes.number,
    locationZip: PropTypes.string,
    locationTypeId: PropTypes.number,
  }),
  formErrors: PropTypes.shape({
    locationLineOne: PropTypes.bool,
    locationLineTwo: PropTypes.bool,
    locationCity: PropTypes.bool,
    locationStateId: PropTypes.bool,
    locationZip: PropTypes.bool,
    locationTypeId: PropTypes.bool,
    address: PropTypes.bool,
  }),
  formErrorText: PropTypes.shape({
    locationLineOne: PropTypes.string,
    locationLineTwo: PropTypes.string,
    locationCity: PropTypes.string,
    locationStateId: PropTypes.string,
    locationZip: PropTypes.string,
    locationTypeId: PropTypes.string,
    address: PropTypes.string,
  }),
  stateOptions: PropTypes.arrayOf(PropTypes.object),
  onStateChange: PropTypes.func,
  locationTypeOptions: PropTypes.arrayOf(PropTypes.object),
  onStringInputchange: PropTypes.func,
  validate: PropTypes.func,
  onLocationChange: PropTypes.func,
  onFullLocationChange: PropTypes.func,
  onLocationTypeChange: PropTypes.func,
};
