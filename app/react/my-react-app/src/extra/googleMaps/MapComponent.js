import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { goToMapId } from '../../extra/utilityFunctions/utilities';
import mapStyle from './mapStyle';

const MapComponent = withScriptjs(
    withGoogleMap(({ eyeDataArr }) => {
        const buildMarker = eyeDataObj => {
            const key = eyeDataObj._id || 'init';
            const position = {
                lat: eyeDataObj.info.latitude,
                lng: eyeDataObj.info.longitude
            };

            return (
                <Marker
                    key={key}
                    defaultOpacity={0.75}
                    position={position}
                    clickable={true}
                    onClick={() => goToMapId(eyeDataObj._id)}
                />
            );
        };

        let zoom = 2;
        eyeDataArr.length > 0 && eyeDataArr.length === 1
            ? (zoom = 12)
            : (zoom = 2);

        return (
            <GoogleMap
                center={{
                    lat: (eyeDataArr.length > 0 && eyeDataArr[0].latitude) || 0,
                    lng: (eyeDataArr.length > 0 && eyeDataArr[0].longitude) || 0
                }}
                zoom={zoom}
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale control
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle // change default map styles
                }}
            >
                {eyeDataArr.length > 0 && (
                    <MarkerClusterer
                        onClick={
                            () => {}

                            // props.onMarkerClustererClick
                        }
                        averageCenter
                        defaultAverageCenter
                        enableRetinaIcons
                        gridSize={60}
                    >
                        {eyeDataArr.map(eyeData => buildMarker(eyeData))}
                    </MarkerClusterer>
                )}
            </GoogleMap>
        );
    })
);

export default MapComponent;
