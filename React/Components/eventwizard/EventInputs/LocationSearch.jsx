/*global google*/
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
} from 'react-places-autocomplete';
import logger from 'sabio-debug';
import PropTypes from 'prop-types';
import { Input, ListGroupItem, ListGroupItemText, ListGroup } from 'reactstrap';
import Spinner from '../../../layouts/layout-components/spinner/Spinner';

const _logger = logger.extend('App');

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = (address) => {
    this.setState({ address });
    return address;
  };

  handleSelect = (address) => {
    _logger(address, 'handle select');
    this.setState({ address: address });
    geocodeByAddress(address)
      .then((results) => {
        this.props.getAddress({
          addressObject: [...results[0].address_components],
          addressLat: results[0].geometry.location.lat(),
          addressLong: results[0].geometry.location.lng(),
        });
      })
      .catch((error) => _logger('Error', error));
  };

  searchOptions = {
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(34, -116),
      new google.maps.LatLng(44, -69)
    ),
    types: ['address'],
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={this.searchOptions}
        highlightFirstSuggestion
        shouldFetchSuggestions
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="form-group">
            <Input
              {...getInputProps({
                placeholder: 'Type an Address',
                className: 'form-control select',
              })}
            ></Input>

            <ListGroup>
              {loading && (
                <ListGroupItem>
                  <Spinner />
                </ListGroupItem>
              )}
              {suggestions.map((suggestion, index) => {
                return (
                  <ListGroupItem
                    {...getSuggestionItemProps(suggestion)}
                    key={index}
                    action
                    tag="button"
                  >
                    <ListGroupItemText>
                      {suggestion.description}
                    </ListGroupItemText>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
LocationSearch.propTypes = {
  getAddress: PropTypes.func,
};

export default LocationSearch;
