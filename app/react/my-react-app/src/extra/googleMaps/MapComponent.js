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
        console.log(location);
        console.log(marker);
        let zoom;
        // console.log(marker ? (zoom = 8) : (zoom = 12));
        marker ? (zoom = 12) : (zoom = 2);

        return (
            <GoogleMap
                center={location}
                zoom={zoom}
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle // change default map styles
                }}
            >
                {marker && <Marker position={location} />}
            </GoogleMap>
        );
    })
);

export default MapWithAMarker;
