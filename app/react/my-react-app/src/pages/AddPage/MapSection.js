import React from 'react';

import MapWithAMarker from '../../extra/googleMaps/MapComponent';
import key from '../../extra/hiddenFolder/hiddenFile';

const mapSection = ({ coordinates, marker }) => {
    // console.log(key());
    const info = {
        location: {
            lat: coordinates[0],
            lng: coordinates[1]
        },
        marker: marker
    };
    return (
        <section className='mapSection'>
            <MapWithAMarker
                info={info}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key()}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />

            <p>
                have getData run after file image loads, something like
                picture.load(function){' '}
            </p>
        </section>
    );
};

export default mapSection;
