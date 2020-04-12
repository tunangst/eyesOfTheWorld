import React, { useState } from 'react';

import { Marker, InfoWindow } from 'react-google-maps';

import BuildMarkerInfo from '../utilityFunctions/BuildMarkerInfo';

const initialInfoWindowState = true;

const MarkerWithInfoWindowComponent = ({
    enableInfoWindow,
    position,
    redirect,
    eye,
}) => {
    const [infoWindow, setInfoWindow] = useState(initialInfoWindowState);

    const toggleInfoWindow = (value) => {
        console.log('toggling info window');
        console.log(infoWindow);
        if (value === 'toggle') {
            setInfoWindow(!infoWindow);
        } else {
            setInfoWindow(value);
        }
        console.log(infoWindow);
    };

    return (
        <Marker
            defaultOpacity={0.75}
            position={position}
            clickable={true}
            onClick={() => {
                toggleInfoWindow('toggle');
                console.log(infoWindow);
            }}
        >
            {enableInfoWindow && infoWindow && (
                <InfoWindow onCloseClick={() => toggleInfoWindow(false)}>
                    <BuildMarkerInfo
                        eye={eye}
                        redirect={() => redirect(eye._id)}
                        toggleInfoWindow={toggleInfoWindow}
                    />
                </InfoWindow>
            )}
        </Marker>
    );
};

export default MarkerWithInfoWindowComponent;
