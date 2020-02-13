import React, { Fragment } from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

import mapStyle from './mapStyle';

const MapWithAMarker = withScriptjs(
    withGoogleMap(({ info: { location, marker } }) => {
        let zoom;
        // console.log(marker ? (zoom = 8) : (zoom = 12));
        marker ? (zoom = 12) : (zoom = 2);

        return (
            <GoogleMap defaultZoom={zoom} defaultCenter={location}>
                {marker && <Marker position={location} />}
            </GoogleMap>
        );
    })
);

export default MapWithAMarker;
