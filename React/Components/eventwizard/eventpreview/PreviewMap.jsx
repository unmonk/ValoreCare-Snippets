import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../../locations/MarkerPin';
import PropTypes from 'prop-types';

const PreviewMap = (props) => {
  const getMapOptions = () => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'on' }],
        },
      ],
    };
  };
  //useState allows for use of state in a functional component
  const [center] = useState({
    lat: props.location.latitude,
    lng: props.location.longitude,
  });

  let updateCenter = {
    lat: props.location.latitude,
    lng: props.location.longitude,
  };

  const [zoom] = useState(11);
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyASUgxNOHFzT1QVWeL-2YVAu4kYTxnaTco' }}
        defaultCenter={center}
        center={updateCenter}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        <Marker
          lat={props.location.latitude}
          lng={props.location.longitude}
          name="Venue"
          color="blue"
        />
      </GoogleMapReact>
    </>
  );
};
PreviewMap.propTypes = {
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
};
export default PreviewMap;
