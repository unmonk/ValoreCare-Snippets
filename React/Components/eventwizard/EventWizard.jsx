import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { getType } from '../../services/lookUpService';
import { toastError } from '../../services/utilityService';
import {
  addEventWizard,
  getDetailsById,
  updateEvent,
} from '../../services/eventService';
import EventStepper from './EventStepper';
import WizardPartEvent from './WizardPartEvent';
import WizardPartVenue from './WizardPartVenue';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';

import {
  wizardPartEventSchema,
  wizardPartVenueSchema,
} from '../../schemas/eventWizardSchema';

import EventPreview from './eventpreview/EventPreview';

import './EventWizard.css';

export default class EventWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wizardStep: 0,
      locationTypeOptions: [],
      stateOptions: [],
      eventTypeOptions: [],
      eventValidated: false,
      venueValidated: false,
      formData: {
        eventId: 0,
        eventName: '',
        eventDescription: '',
        eventSummary: '',
        eventUrl: '',
        eventStartDate: new Date(),
        eventEndDate: new Date(),
        eventIsFree: true,
        eventTypeId: 0,
        eventTypeString: '',
        eventImage: '',
        eventPrice: 0,
        eventCapacity: 0,
        venueId: 0,
        venueName: '',
        venueDescription: '',
        venueLocationId: 0,
        venueUrl: '',
        locationLineOne: '',
        locationLineTwo: '',
        locationCity: '',
        locationStateId: 0,
        locationStateName: '',
        locationZip: '',
        locationTypeId: 0,
        locationLat: 0.0,
        locationLong: 0.0,
        address: false,
      },
      formErrors: {},
      formErrorText: {},
      isAddingVenue: false,
      isAddingLocation: false,
      showSuccess: false,
      isUpdating: false,
    };
  }

  componentDidMount = () => {
    this.getSelectOptions().then(this.checkIfUpdating).catch(toastError);
  };

  checkIfUpdating = () => {
    const locationSplit = this.props.location.pathname.split('/');
    const id = locationSplit[3];
    if (this.props.location.state && !this.state.isUpdating) {
      this.mapEventToFormData(this.props.location.state);
    } else if (id !== '') {
      this.selectEventFromUrlParams(id);
    }
  };

  mapEventToFormData = (event) => {
    console.log(event);
    this.setState((prevState) => {
      return {
        ...prevState,
        isUpdating: true,
        venueValidated: true,
        eventValidated: true,
        wizardStep: 2,
        isAddingVenue: true,
        isAddingLocation: true,
        formData: {
          id: event.id ? event.id : 0,
          eventId: event.id ? event.id : 0,
          eventName: event.name ? event.name : '',
          eventDescription: event.shortDescription
            ? event.shortDescription
            : '',
          eventSummary: event.summary ? event.summary : '',
          eventUrl: event.externalSiteUrl ? event.externalSiteUrl : '',
          eventStartDate: event.dateStart
            ? new Date(event.dateStart)
            : new Date(),
          eventEndDate: event.dateEnd ? new Date(event.dateEnd) : new Date(),
          eventIsFree: event.isFree,
          eventTypeId: event.eventType ? event.eventType.id : 0,
          eventTypeString: event.eventType ? event.eventType.name : '',
          eventImage: event.imageUrl ? event.imageUrl : '',
          eventPrice: event.price ? event.price : 0,
          eventCapacity: event.capacity ? event.capacity : 0,
          venueId: event.venueV2 ? event.venueV2.id : 0,
          venueName: event.venueV2 ? event.venueV2.name : '',
          venueDescription: event.venueV2 ? event.venueV2.description : '',
          venueLocationId: event.venueV2.location
            ? event.venueV2.location.id
            : '',
          venueUrl: event.venueV2 ? event.venueV2.url : '',
          locationLineOne: event.venueV2 ? event.venueV2.location.lineOne : '',
          locationLineTwo: event.venueV2 ? event.venueV2.location.lineTwo : '',
          locationCity: event.venueV2 ? event.venueV2.location.city : '',
          locationStateId: event.venueV2 ? event.venueV2.location.state.id : '',
          locationStateName: event.venueV2
            ? event.venueV2.location.state.name
            : '',
          locationZip: event.venueV2 ? event.venueV2.location.zip : '',
          locationTypeId: event.venueV2
            ? event.venueV2.location.locationType.id
            : '',
          locationLat: event.venueV2 ? event.venueV2.location.latitude : '',
          locationLong: event.venueV2 ? event.venueV2.location.longitude : '',
          address: true,
        },
      };
    });
  };

  selectEventFromUrlParams = (id) => {
    getDetailsById(id)
      .then((res) => this.mapEventToFormData(res.item))
      .catch((err) => toastError(err.toString()));
  };

  onAddVenueClicked = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isAddingVenue: !this.state.isAddingVenue,
        venueValidated: false,
        formData: {
          ...prevState.formData,
          venueId: 0,
          venueName: '',
          venueDescription: '',
          venueLocationId: 0,
          venueUrl: '',
          locationLineOne: '',
          locationLineTwo: '',
          locationCity: '',
          locationStateId: 0,
          locationStateName: '',
          locationZip: '',
          locationTypeId: 0,
          locationLat: 0.0,
          locationLong: 0.0,
          address: false,
        },
        formErrors: {},
        formErrorText: {},
      };
    });
  };
  onAddLocationClicked = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isAddingLocation: !this.state.isAddingLocation,
        venueValidated: false,
        formData: {
          ...prevState.formData,
          venueLocationId: 0,
          locationLineOne: '',
          locationLineTwo: '',
          locationCity: '',
          locationStateId: 0,
          locationZip: '',
          locationTypeId: 0,
          address: false,
        },
        formErrors: {},
        formErrorText: {},
      };
    });
  };

  onStringInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      };
    });
  };

  onNumberInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: parseFloat(value),
        },
      };
    });
  };

  onPriceChange = (value, name) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: value,
        },
      };
    });
  };

  onToggleInputchange = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          [name]: value,
          eventPrice: 0.0,
        },
      };
    });
  };

  onFieldChange = (name, value) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            [name]: value,
          },
        };
      },
      () => this.validate()
    );
  };

  onEventImageUpload = (urlArray) => {
    if (urlArray[0]) {
      this.setState((prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            eventImage: urlArray[0],
          },
        };
      });
    }
  };

  onEventTypeChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            eventTypeId: parseInt(e.value),
            eventTypeString: e.label,
          },
        };
      },
      () => this.validate()
    );
  };

  onLocationTypeChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            locationTypeId: parseInt(e.value),
          },
        };
      },
      () => this.validate()
    );
  };
  onStateChange = (e) => {
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            locationStateId: parseInt(e.value),
            locationStateName: e.label,
          },
        };
      },
      () => this.validate()
    );
  };

  onVenueChange = (e) => {
    if (e.venue) {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              venueId: parseInt(e.venue.id),
              venueName: e.venue.name,
              venueUrl: e.venue.url,
              venueDescription: e.venue.description,
              venueLocationId: e.venue.location.id,
              locationLineOne: e.venue.location.lineOne,
              locationLineTwo: e.venue.location.lineTwo,
              locationCity: e.venue.location.city,
              locationStateId: e.venue.location.state.id,
              locationStateName: e.venue.location.state.name,
              locationZip: e.venue.location.zip,
              locationTypeId: e.venue.location.locationType.id,
              locationLong: e.venue.location.longitude,
              locationLat: e.venue.location.latitude,
            },
          };
        },
        () => this.validate()
      );
    }
  };

  getStateId = (stateApprev) => {
    const stateList = [...this.state.stateOptions];
    const stateObj = stateList.find((state) => {
      return state.label === stateApprev;
    });
    return stateObj.value;
  };

  onFullLocationChange = (locationObject) => {
    if (locationObject) {
      const locationStateName = locationObject.addressObject.find(
        (x) => x.types[0] === 'administrative_area_level_1'
      ).long_name;

      const route = locationObject.addressObject.find(
        (x) => x.types[0] === 'route'
      ).long_name;

      const streetNumber = locationObject.addressObject.find(
        (x) => x.types[0] === 'street_number'
      ).long_name;
      const city = locationObject.addressObject.find(
        (x) => x.types[0] === 'locality'
      ).long_name;

      const zip = locationObject.addressObject.find(
        (x) => x.types[0] === 'postal_code'
      ).long_name;

      const lineOne = `${streetNumber} ${route}`;
      const locationStateId = this.getStateId(locationStateName);

      const locationLong = locationObject.addressLong;
      const locationLat = locationObject.addressLat;

      this.setState(
        (prevState) => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              venueLocationId: 0,
              locationLineOne: lineOne,
              locationCity: city,
              locationStateId: locationStateId,
              locationStateName: locationStateName,
              locationZip: zip,
              locationLong: locationLong,
              locationLat: locationLat,
              address: true,
            },
          };
        },
        () => this.validate()
      );
    }
  };

  onLocationChange = (e) => {
    if (e.location) {
      this.setState(
        (prevState) => {
          return {
            ...prevState,
            formData: {
              ...prevState.formData,
              venueLocationId: e.location.id,
              locationLineOne: e.location.lineOne,
              locationLineTwo: e.location.lineTwo,
              locationCity: e.location.city,
              locationStateId: e.location.state.id,
              locationStateName: e.location.state.name,
              locationZip: e.location.zip,
              locationTypeId: e.location.locationType.id,
              locationLong: e.location.longitude,
              locationLat: e.location.latitude,
              address: true,
            },
          };
        },
        () => this.validate()
      );
    }
  };

  validate = () => {
    const wizardStep = this.state.wizardStep;
    switch (wizardStep) {
      case 1: {
        wizardPartEventSchema
          .validate(this.state.formData, { abortEarly: false })
          .then(this.onValidationSuccess)
          .catch(this.onValidationFail);
        break;
      }
      case 2: {
        break;
      }
      default: {
        wizardPartVenueSchema
          .validate(this.state.formData, { abortEarly: false })
          .then(this.onValidationSuccess)
          .catch(this.onValidationFail);
        break;
      }
    }
  };

  onValidationFail = (errors) => {
    if (errors.inner.length > 0) {
      let formErrors = {};
      let formErrorText = {};
      let whichValidated =
        this.state.wizardStep === 0 ? 'venueValidated' : 'eventValidated';
      errors.inner.forEach((error) => {
        const field = error.path;
        const errorText = error.message;
        formErrors[field] = true;
        formErrorText[field] = errorText;
      });
      this.setState((prevState) => {
        return {
          ...prevState,
          formErrors: formErrors,
          formErrorText: formErrorText,
          [whichValidated]: false,
          address: false,
        };
      });
    }
  };

  onValidationSuccess = () => {
    let whichValidated =
      this.state.wizardStep === 0 ? 'venueValidated' : 'eventValidated';
    this.setState((prevState) => {
      return {
        ...prevState,
        [whichValidated]: true,
        address: true,
        formErrors: {},
        formErrorText: {},
      };
    });
  };

  getEventTypeForId = (id) => {
    let eventTypeOptions = [...this.state.eventTypeOptions];
    let result = eventTypeOptions.find(({ value }) => value === id);
    return result.label;
  };

  determinePage = (wizardStep) => {
    switch (wizardStep) {
      case 1: {
        return (
          <WizardPartEvent
            {...this.props}
            formData={this.state.formData}
            formErrors={this.state.formErrors}
            formErrorText={this.state.formErrorText}
            eventTypeOptions={this.state.eventTypeOptions}
            onImageUpload={this.onImageUpload}
            onStringInputchange={this.onStringInputchange}
            onNumberInputchange={this.onNumberInputchange}
            onEventTypeChange={this.onEventTypeChange}
            validateEvents={this.validate}
            onFieldChange={this.onFieldChange}
            onEventImageUpload={this.onEventImageUpload}
            onToggleInputchange={this.onToggleInputchange}
            onPriceChange={this.onPriceChange}
          />
        );
      }
      case 0: {
        return (
          <WizardPartVenue
            {...this.props}
            formData={this.state.formData}
            formErrors={this.state.formErrors}
            formErrorText={this.state.formErrorText}
            stateOptions={this.state.stateOptions}
            locationTypeOptions={this.state.locationTypeOptions}
            validate={this.validate}
            onVenueChange={this.onVenueChange}
            onLocationChange={this.onLocationChange}
            onFullLocationChange={this.onFullLocationChange}
            toastError={toastError}
            onStringInputchange={this.onStringInputchange}
            isAddingVenue={this.state.isAddingVenue}
            isAddingLocation={this.state.isAddingLocation}
            onAddLocationClicked={this.onAddLocationClicked}
            onAddVenueClicked={this.onAddVenueClicked}
            onStateChange={this.onStateChange}
            onLocationTypeChange={this.onLocationTypeChange}
          />
        );
      }
      case 2: {
        return (
          <div className="full-height">
            <h3>Confirm this event?</h3>
          </div>
        );
      }
      default: {
        return (
          <WizardPartEvent
            {...this.props}
            formData={this.state.formData}
            formErrors={this.state.formErrors}
            formErrorText={this.state.formErrorText}
            eventTypeOptions={this.state.eventTypeOptions}
            onImageUpload={this.onImageUpload}
            onStringInputchange={this.onStringInputchange}
            onNumberInputchange={this.onNumberInputchange}
            onEventTypeChange={this.onEventTypeChange}
            validateEvents={this.validate}
            onFieldChange={this.onFieldChange}
            onEventImageUpload={this.onEventImageUpload}
            onToggleInputchange={this.onToggleInputchange}
            isUpdating={this.state.isUpdating}
          />
        );
      }
    }
  };

  onImageUpload = (url) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formDate,
          eventImage: url,
        },
      };
    });
  };

  onSubmitSuccess = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        showSuccess: true,
      };
    });
  };

  onConfirm = () => {
    this.props.history.push('/events');
  };

  submitEvent = () => {
    const payload = this.generatePayload();
    if (this.state.isUpdating) {
      updateEvent(payload).then(this.onSubmitSuccess).catch(toastError);
    } else {
      addEventWizard(payload).then(this.onSubmitSuccess).catch(toastError);
    }
    return payload;
  };

  generatePayload = () => {
    const payload = {
      id: parseInt(this.state.formData.eventId),
      eventId: this.state.formData.eventId,
      name: this.state.formData.eventName,
      summary: this.state.formData.eventSummary,
      shortDescription: this.state.formData.eventDescription,
      eventTypeId: this.state.formData.eventTypeId,
      imageUrl: this.state.formData.eventImage,
      externalSiteUrl: this.state.formData.eventUrl,
      isFree: this.state.formData.eventIsFree,
      DateStart: this.state.formData.eventStartDate,
      DateEnd: this.state.formData.eventEndDate,
      VenueId: this.state.formData.venueId,
      Capacity: this.state.formData.eventCapacity,
      Price: this.state.formData.eventPrice,

      EventStatusId: 1,
      //Venue
      VenueName: this.state.formData.venueName,
      VenueDescription: this.state.formData.venueDescription,
      VenueLocationId: this.state.formData.venueLocationId,
      VenueUrl: this.state.formData.venueUrl,
      //Location
      LocationTypeId: this.state.formData.locationTypeId,
      LocationLineOne: this.state.formData.locationLineOne,
      LocationLineTwo: this.state.formData.locationLineTwo,
      LocationCity: this.state.formData.locationCity,
      LocationZip: this.state.formData.locationZip,
      LocationStateId: this.state.formData.locationStateId,
      LocationLatitude: this.state.formData.locationLat,
      LocationLongitude: this.state.formData.locationLong,
    };
    return payload;
  };

  onNextClicked = () => {
    if (
      (this.state.wizardStep === 0 && this.state.venueValidated) ||
      (this.state.wizardStep === 1 && this.state.eventValidated)
    ) {
      this.setState({ wizardStep: this.state.wizardStep + 1 });
    } else if (
      this.state.wizardStep === 2 &&
      this.state.venueValidated &&
      this.state.eventValidated
    ) {
      this.submitEvent();
    } else {
      this.validate();
    }
  };

  onBackClicked = () => {
    this.setState({ wizardStep: this.state.wizardStep - 1 });
  };

  onGetEventTypes = (res) => {
    if (res.items) {
      let eventTypes = res.items.map((eventType) => {
        return {
          value: eventType.id,
          label: eventType.name,
        };
      });
      this.setState({ eventTypeOptions: eventTypes });
    }
  };

  onGetStateTypes = (res) => {
    if (res.items) {
      let stateTypes = res.items.map((stateType) => {
        return {
          value: stateType.id,
          label: stateType.name,
        };
      });
      this.setState({ stateOptions: stateTypes });
    }
  };

  onGetLocationTypes = (res) => {
    if (res.items) {
      let locationTypes = res.items.map((locationType) => {
        return {
          value: locationType.id,
          label: locationType.name,
        };
      });
      this.setState({ locationTypeOptions: locationTypes });
    }
  };

  getSelectOptions = () => {
    return Promise.all([
      getType('EventTypes').then(this.onGetEventTypes),
      getType('States').then(this.onGetStateTypes),
      getType('LocationTypes').then(this.onGetLocationTypes),
    ]);
  };

  render() {
    return (
      <div className="card h-100 mh-100">
        <Row className="mb-2">
          <Col sm={12}>
            <div className="step-progress">
              <div className="multi-step">
                <EventStepper wizardStep={this.state.wizardStep} />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="h-100 mh-100">
          <Col xs={12} md={6}>
            <div className="step-progress">
              <div className="multi-step">
                <div className="step mt-5">
                  <Row className="justify-content-center h-100 mh-100">
                    <Col lg={10} xs={11}>
                      {this.determinePage(this.state.wizardStep)}
                    </Col>
                  </Row>
                  <Row className="justify-content-center h-100 mh-100">
                    <div className="mr-auto ml-3">
                      {this.state.wizardStep === 0 ? (
                        ''
                      ) : (
                        <Button
                          type="button"
                          color="primary"
                          id="prev-button"
                          onClick={this.onBackClicked}
                        >
                          <i className="fas fa-arrow-left"></i> Previous
                        </Button>
                      )}
                    </div>

                    <div className="ml-auto mr-3">
                      <Button
                        type="button"
                        color={
                          this.state.wizardStep === 2 ? 'success' : 'primary'
                        }
                        id="next-button"
                        onClick={this.onNextClicked}
                        className="mr-auto"
                      >
                        {this.state.wizardStep === 2 ? 'Submit' : 'Next'}{' '}
                        <i className="fas fa-arrow-right"></i>
                      </Button>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <EventPreview
              values={this.state.formData}
              getEventTypeForId={this.getEventTypeForId}
              eventValidated={this.state.eventValidated}
            />
          </Col>
        </Row>
        {this.state.showSuccess && (
          <SweetAlert
            success
            title="Event Created"
            onConfirm={this.onConfirm}
            timeout={2000}
          >
            Event Created! Redirecting to Events page.
          </SweetAlert>
        )}
      </div>
    );
  }
}

EventWizard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
    path: PropTypes.string,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};
