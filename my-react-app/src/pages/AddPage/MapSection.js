import React from 'react';
import config from 'config';

import MapComponent from '../../extra/googleMaps/MapComponent';
// import key from '../../extra/hiddenFolder/hiddenFile';
const mapSection = ({ eyesArr }) => {
    const googleKey = config.get('googleKey');
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
