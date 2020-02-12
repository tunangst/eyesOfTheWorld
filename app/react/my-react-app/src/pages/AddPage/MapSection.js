import React from 'react';

import MapComponent from '../../extra/googleMaps/MapComponent';

const mapSection = ({ coordinates, marker }) => {
    return (
        <section className='mapSection'>
            <MapComponent
                latitude={coordinates[0]}
                longitude={coordinates[1]}
                marker={marker}
            />

            <p>
                have getData run after file image loads, something like
                picture.load(function){' '}
            </p>
        </section>
    );
};

export default mapSection;
