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
    withGoogleMap(({ markers }) => {
        const buildMarker = markObj => {
            const key = markObj._id || Math.random();
            const position = {
                lat: markObj.latitude,
                lng: markObj.longitude
            };
            console.log(markObj);

            return (
                <Marker
                    key={key}
                    defaultOpacity={0.75}
                    position={position}
                    clickable={true}
                    onClick={() => goToMapId(markObj._id)}
                />
            );
        };

        let zoom = 2;
        markers && markers.length === 1 ? (zoom = 12) : (zoom = 2);
        // console.log(markers.length);
        // console.log(markers);
        // debugger;

        return (
            <GoogleMap
                center={{
                    lat: (markers.length > 0 && markers[0].latitude) || 0,
                    lng: (markers.length > 0 && markers[0].longitude) || 0
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
                {markers && (
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
                        {markers.map(mark => buildMarker(mark))}
                    </MarkerClusterer>
                )}
            </GoogleMap>
        );
    })
);

export default MapComponent;
