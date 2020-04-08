import React from 'react';

import MapComponent from '../../extra/googleMaps/MapComponent';
// import key from '../../extra/hiddenFolder/hiddenFile';
const googleKey = process.env.googleKey;
const mapSection = ({ eyesArr }) => {
    return (
        <section className='mapSection'>
            <MapComponent
                eyesArr={eyesArr}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
    );
};

export default mapSection;
