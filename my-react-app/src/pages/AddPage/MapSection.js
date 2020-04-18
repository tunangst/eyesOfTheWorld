import React from 'react';

// import MapComponent from '../../extra/googleMaps/MapComponent';
import MapComponent2 from '../../extra/googleMaps/MapComponent2';
// import key from '../../extra/hiddenFolder/hiddenFile';
const mapSection = ({ uploadEye }) => {
    return (
        <section className='mapSection'>
            <MapComponent2 uploadEye={uploadEye} />
            {
                // <MapComponent
                //     eyesArr={eyesArr}
                //     googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AI${process.env.REACT_APP_GOOGLE_KEY}`}
                //     loadingElement={<div style={{ height: `100%` }} />}
                //     containerElement={<div style={{ height: `100%` }} />}
                //     mapElement={<div style={{ height: `100%` }} />}
                // />
            }
        </section>
    );
};

export default mapSection;
