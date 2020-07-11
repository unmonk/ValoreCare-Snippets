/* eslint-disable react/boolean-prop-naming */
import React from 'react';
import { FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import Files from '../files/Files';
//import ToggleFormik from '../utilities/ToggleFormik';
//import { SelectFormikV2 } from '../utilities/select-formik/SelectFormikV2';
//import { Field, ErrorMessage } from 'formik';
//import ImageUploadFormik from '../utilities/ImageUploadFormik';
import PropTypes from 'prop-types';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import CurrencyInput from 'react-currency-input-field';

export default function WizardPartEvent(props) {
  return (
    <>
      <h4>Add Event</h4>
      <FormGroup>
        <Label for="eventName">Event Name</Label>
        <Input
          type="text"
          name="eventName"
          id="eventName"
          placeholder="Event Name"
          invalid={props.formErrors.eventName}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
          value={props.formData.eventName}
          required
        />
        {props.formErrors.eventName && (
          <FormFeedback>{props.formErrorText.eventName}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventTypeId">Event Type</Label>
        <Select
          name="eventTypeId"
          id="eventTypeId"
          placeholder="Select Event Type"
          options={props.eventTypeOptions}
          invalid={props.formErrors.eventTypeId}
          onChange={props.onEventTypeChange}
        />
        {props.formErrors.eventTypeId && (
          <small className="error is-invalid">
            {props.formErrorText.eventTypeId}
          </small>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventSummary">Event Summary</Label>
        <Input
          type="text"
          name="eventSummary"
          id="eventSummary"
          placeholder="Brief Event Summary"
          invalid={props.formErrors.eventSummary}
          onChange={props.onStringInputchange}
          value={props.formData.eventSummary}
          onBlur={props.validateEvents}
          required
        />
        {props.formErrors.eventSummary && (
          <FormFeedback>{props.formErrorText.eventSummary}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventDescription">Event Description</Label>
        <Input
          type="textarea"
          name="eventDescription"
          id="eventDescription"
          placeholder="Event Description"
          invalid={props.formErrors.eventDescription}
          onChange={props.onStringInputchange}
          onBlur={props.validateEvents}
          value={props.formData.eventDescription}
          required
        />
        {props.formErrors.eventDescription && (
          <FormFeedback>{props.formErrorText.eventDescription}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="eventUrl">Event Url</Label>
        <Input
          type="url"
          name="eventUrl"
          id="eventUrl"
          placeholder="https://facebook.com"
          invalid={props.formErrors.eventUrl}
          onChange={props.onStringInputchange}
          value={props.formData.eventUrl}
          onBlur={props.validateEvents}
        />
        {props.formErrors.eventUrl && (
          <FormFeedback>{props.formErrorText.eventUrl}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Row>
          <Col xs={12} md={6}>
            <Label for="eventStartDate">Event Start</Label>
            <DatePicker
              name="eventStartDate"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MM/dd/yyyy h:mm aa"
              withPortal
              className={props.formErrors.eventStartDate && 'error is-invalid'}
              selected={
                (props.formData.eventStartDate &&
                  new Date(props.formData.eventStartDate)) ||
                null
              }
              value={props.formData.eventStartDate}
              onChange={(eventStartDate) =>
                props.onFieldChange('eventStartDate', eventStartDate)
              }
            />
            {props.formErrors.eventStartDate && (
              <small className="error is-invalid">
                {props.formErrorText.eventStartDate}
              </small>
            )}
          </Col>
          <Col xs={12} md={6}>
            <Label for="eventEndDate">Event End</Label>
            <DatePicker
              name="eventEndDate"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={15}
              className={props.formErrors.eventEndDate && 'error is-invalid'}
              timeCaption="time"
              dateFormat="MM/dd/yyyy h:mm aa"
              withPortal
              selected={
                (props.formData.eventEndDate &&
                  new Date(props.formData.eventEndDate)) ||
                null
              }
              value={props.formData.eventEndDate}
              onChange={(eventEndDate) =>
                props.onFieldChange('eventEndDate', eventEndDate)
              }
            />
            {props.formErrors.eventEndDate && (
              <small className="error is-invalid">
                {props.formErrorText.eventEndDate}
              </small>
            )}
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="eventImage">Event Image</Label>
        <div className="row justify-content-center">
          <Files awsUrls={props.onEventImageUpload} />
        </div>
      </FormGroup>
      <FormGroup className="justify-content-center d-flex">
        <Label for="eventIsFree">Free Event?</Label>
        <div className="ml-2">
          <Toggle
            name="eventIsFree"
            id="eventIsFree"
            onChange={props.onToggleInputchange}
            defaultChecked={props.formData.eventIsFree}
          />
        </div>
      </FormGroup>
      {props.formData.eventIsFree ? (
        ''
      ) : (
        <>
          <FormGroup>
            <Label for="eventPrice">Event Cost</Label>
            <div className="ml-3">
              <CurrencyInput
                id="eventPrice"
                name="eventPrice"
                placeholder="$20"
                defaultValue={0}
                datatype="currency"
                className={
                  props.formErrors.eventPrice
                    ? 'form-control error is-invalid'
                    : 'form-control'
                }
                min="0"
                allowDecimals={false}
                prefix="$"
                onBlur={props.validateEvents}
                value={props.formData.eventPrice}
                disabled={props.isUpdating}
                onChange={(value, name) => props.onPriceChange(value, name)}
              />

              {props.formErrors.eventPrice && (
                <small className="error is-invalid">
                  {props.formErrorText.eventPrice}
                </small>
              )}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="eventCapacity">Event Capacity</Label>
            <div className="ml-3">
              <Input
                type="number"
                name="eventCapacity"
                id="eventCapacity"
                placeholder="100"
                value={props.formData.eventCapacity}
                invalid={props.formErrors.eventCapacity}
                onChange={props.onNumberInputchange}
                onBlur={props.validateEvents}
              />
              {props.formErrors.eventCapacity && (
                <FormFeedback>{props.formErrorText.eventCapacity}</FormFeedback>
              )}
            </div>
          </FormGroup>
        </>
      )}
    </>
  );
}

WizardPartEvent.propTypes = {
  formData: PropTypes.shape({
    eventName: PropTypes.string,
    eventSummary: PropTypes.string,
    eventDescription: PropTypes.string,
    eventUrl: PropTypes.string,
    eventImage: PropTypes.string,
    eventStartDate: PropTypes.instanceOf(Date),
    eventEndDate: PropTypes.instanceOf(Date),
    eventIsFree: PropTypes.bool,
    eventTypeId: PropTypes.number,
    eventPrice: PropTypes.number,
    eventCapacity: PropTypes.number,
  }),
  formErrors: PropTypes.shape({
    eventName: PropTypes.bool,
    eventSummary: PropTypes.bool,
    eventDescription: PropTypes.bool,
    eventUrl: PropTypes.bool,
    eventImage: PropTypes.bool,
    eventStartDate: PropTypes.bool,
    eventEndDate: PropTypes.bool,
    eventIsFree: PropTypes.bool,
    eventTypeId: PropTypes.bool,
    eventPrice: PropTypes.bool,
    eventCapacity: PropTypes.bool,
  }),
  formErrorText: PropTypes.shape({
    eventName: PropTypes.string,
    eventSummary: PropTypes.string,
    eventDescription: PropTypes.string,
    eventUrl: PropTypes.string,
    eventImage: PropTypes.string,
    eventStartDate: PropTypes.string,
    eventEndDate: PropTypes.string,
    eventIsFree: PropTypes.string,
    eventTypeId: PropTypes.string,
    eventPrice: PropTypes.string,
    eventCapacity: PropTypes.string,
  }),
  eventTypeOptions: PropTypes.arrayOf(PropTypes.object),
  onImageUpload: PropTypes.func,
  onStringInputchange: PropTypes.func,
  onEventTypeChange: PropTypes.func,
  validateEvents: PropTypes.func,
  onFieldChange: PropTypes.func,
  onEventImageUpload: PropTypes.func,
  onToggleInputchange: PropTypes.func,
  onNumberInputchange: PropTypes.func,
  onPriceChange: PropTypes.func,
  isUpdating: PropTypes.bool,
};
