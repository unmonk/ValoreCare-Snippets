import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import * as locationService from '../../../services/locationService';

export default class LocationSelect extends Component {
  mapResponseToOptions = (response) => {
    let mappedOptions = [];
    if (response.item.pagedItems.length > 0) {
      mappedOptions = response.item.pagedItems.map((location) => {
        return {
          value: location.id,
          label: `${location.lineOne}, ${location.city}, ${location.state.name} `,
          location: location,
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
      const mappedOptions = locationService
        .search(0, 10, inputValue)
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
        name="venueId"
        cacheOptions
        loadOptions={this.loadOptions}
        isClearable
        onChange={this.onChange}
        defaultOptions={false}
        isSearchable
        onInputChange={this.handleInputChange}
        escapeClearsValue
        placeholder="Search Locations"
        defaultValue
        isDisabled={this.props.isDisabled}
      />
    );
  }
}

LocationSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};
