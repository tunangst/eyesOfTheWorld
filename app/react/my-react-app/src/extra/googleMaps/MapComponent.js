import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import mapStyle from './mapStyle';
import key from '../hiddenFolder/hiddenFile';

const MapComponent = ({ latitude, longitude, google, marker }) => {
    console.log(`map component build map`);
    const cssStyling = {
        width: '100%',
        height: '100%',
        position: 'relative'
    };
    const stats = {
        zoom: marker ? 12 : 2,
        center: { lat: latitude, lng: longitude }
    };
    console.log(stats);
    let mark;
    if (marker) {
        mark = (
            <Marker
                position={stats.center}
                name={`Your image will insert here :^]`}
            />
        );
    }

    // console.log(key());
    return (
        <Map
            google={google}
            zoom={stats.zoom}
            style={cssStyling}
            initialCenter={stats.center}
            center={stats.center}
        >
            {mark}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: key(),
    style: mapStyle
})(MapComponent);
