import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';

import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import mapStyle from './mapStyle';

//eyeDataArr = [{},{},{}]
//eyeDataArr[0]= {
// info: {},
// pic: {}
// }

const MapComponent = withScriptjs(
    withGoogleMap(({ eyesArr }) => {
        const history = useHistory();
        const handleRedirect = eyeId => {
            history.push(`/eyes/${eyeId}`);
        };
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
                    // labelAnchor={new google.maps.Point(0, 0)}
                    // labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
                    onClick={() => handleRedirect(eyeDataObj._id)}
                />
            );
        };

        let zoom;
        let markers = [];
        let initCenter = null;

        if (eyesArr && eyesArr.length > 0) {
            if (eyesArr.length === 1) {
                zoom = 12;
                const eyeMarker = buildMarker(eyesArr[0]);
                markers.push(eyeMarker);
            } else {
                zoom = 3;
                eyesArr.map(eyeData => {
                    const eyeMarker = buildMarker(eyeData);
                    markers.push(eyeMarker);
                });
            }
        } else {
            zoom = 3;
            initCenter = {
                latitude: 0,
                longitude: 0
            };
        }

        let center = {
            lat: initCenter ? initCenter.latitude : eyesArr[0].info.latitude,
            lng: initCenter ? initCenter.longitude : eyesArr[0].info.longitude
        };
        return (
            <GoogleMap
                center={center}
                zoom={zoom}
                streetViewControl
                defaultOptions={{
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: true, // allow scale control
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle, // change default map styles
                    streetViewControl: true
                }}
            >
                <MarkerClusterer averageCenter>{markers}</MarkerClusterer>
            </GoogleMap>
        );
    })
);

export default MapComponent;
