import React from 'react';

import MapComponent from '../../extra/googleMaps/MapComponent';
import key from '../../extra/hiddenFolder/hiddenFile';

const mapSection = ({ eyeDataArr }) => {
    return (
        <section className='mapSection'>
            <MapComponent
                eyeDataArr={eyeDataArr}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key()}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
    );
};

export default mapSection;
