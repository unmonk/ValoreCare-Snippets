import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import * as venueService from '../../../services/venuesService';

export default class VenueSelectv2 extends Component {
  mapResponseToOptions = (response) => {
    let mappedOptions = [];
    if (response.item.pagedItems.length > 0) {
      mappedOptions = response.item.pagedItems.map((venue) => {
        return {
          value: venue.venueId,
          label: venue.name,
          venue: venue,
        };
      });
    }
    return mappedOptions;
  };

  onError = (error) => {
    if (error.response.status === 404) {
    } else {
      this.props.onError(error);
    }
  };

  loadOptions = (inputValue) => {
    if (inputValue.length >= 3) {
      const mappedOptions = venueService
        .searchV2(0, 10, inputValue)
        .then(this.mapResponseToOptions)
        .catch(this.onError);
      return mappedOptions;
    }
  };

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  onChange = (option) => {
    if (option) {
      this.props.onChange(option);
    }
  };

  render() {
    return (
      <AsyncSelect
        loadOptions={this.loadOptions}
        onChange={this.onChange}
        onInputChange={this.handleInputChange}
        escapeClearsValue
        placeholder="Search Venues"
        defaultValue
        isDisabled={this.props.isDisabled}
      />
    );
  }
}

VenueSelectv2.propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
