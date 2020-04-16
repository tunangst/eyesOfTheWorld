import React, { useState } from 'react';

import { Marker, InfoWindow, InfoBox } from '@react-google-maps/api';
// import { Marker, InfoWindow } from 'react-google-maps';

import BuildMarkerInfo from './BuildMarkerInfo';
import iconSprite from '../images/icons.svg';
// const View = `${icons}#view`;
// console.log(Icons.view);
// console.log(View);

// const view = (
//     <svg>
//         <use xlinkHref={`${iconSprite}#view`} />
//     </svg>
// );

const initialInfoWindowState = false;

const MarkerWithInfoWindowComponent = ({
    enableInfoWindow,
    position,
    redirect,
    eye,
    clusterer,
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

    const test = clusterer.clusters.forEach((cluster) => {
        // console.log(cluster.markers.length);
    });

    return (
        <Marker
            // imageExtension={view}
            // icon={{
            //     url: '../images/view.png',
            // }}
            // animation={'DROP'}
            // options={{ style: { boxStyle: { padding: 0 } } }}
            clusterer={clusterer}
            defaultOpacity={0.75}
            position={position}
            clickable={true}
            onClick={() => {
                toggleInfoWindow('toggle');
                // console.log(infoWindow);
            }}
        >
            {enableInfoWindow && infoWindow && (
                <InfoWindow
                    onLoad={(infoWindow) => {
                        console.log(infoWindow, '  InfoWindow');
                    }}
                    onCloseClick={() => toggleInfoWindow(false)}
                    position={position}
                    options={{
                        pixelOffset: new window.google.maps.Size(0, -30),
                        styles: { padding: '0 !important' },
                    }}
                    // anchor={(position, 10)}
                >
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
