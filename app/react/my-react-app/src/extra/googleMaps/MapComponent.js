import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
// const {
//     MarkerClusterer
// } = require('react-google-maps/lib/components/addons/MarkerClusterer');
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import { goToMapId } from '../../extra/utilityFunctions/utilities';
import mapStyle from './mapStyle';

const MapComponent = withScriptjs(
    withGoogleMap(props => {
        const { info } = props;
        const { location, markers } = info;
        const value = markers.value;
        console.log(markers);
        console.log(value);
        console.log(info);

        const buildMarker = markObj => {
            const key = markObj._id;
            const position = {
                lat: markObj.latitude,
                lng: markObj.longitude
            };
            console.log(markObj);

            // for marker
            // icon={'no icon yet'}
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
        // markers.length < 2 ? (zoom = 2) : (zoom = 12);
        console.log(markers.length);

        return (
            <GoogleMap
                defaultCenter={location}
                zoom={zoom}
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale controle
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle // change default map styles
                }}
            >
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
                    {markers && markers.map(mark => buildMarker(mark))}
                </MarkerClusterer>
            </GoogleMap>
        );
    })
);

export default MapComponent;
