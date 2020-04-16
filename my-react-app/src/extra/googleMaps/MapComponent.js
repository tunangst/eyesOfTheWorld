import React from 'react';
import { useHistory } from 'react-router-dom';
import { LoadScript, MarkerClusterer, GoogleMap } from '@react-google-maps/api';
// import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
// import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import mapStyle from './mapStyle';
import MarkerWithInfoWindowComponent from './MarkerWithInfoWindowComponent';

import icons from '../images/icons.svg';
const incognito = `${icons}#incognito`;
// const incognito = icons#incognito;
//eyeDataArr = [{},{},{}]
//eyeDataArr[0]= {
// info: {},
// pic: {}
// }

const clusterStyle = {
    color: '#f0e2c9',
    backgroundColor: 'green',
};

console.log(MarkerClusterer);

const MapComponent = ({ eyesArr }) => {
    const history = useHistory();

    const handleRedirect = (eyeId) => {
        history.push(`/eyes/${eyeId}`);
    };

    const buildMarker = (eyeDataObj, clusterer) => {
        const position = {
            lat: Number(eyeDataObj.info.latitude),
            lng: Number(eyeDataObj.info.longitude),
        };

        let notPostingEye = true;
        if (eyesArr.length <= 1) notPostingEye = false;

        return (
            <MarkerWithInfoWindowComponent
                key={eyeDataObj._id || 'init'}
                enableInfoWindow={notPostingEye}
                position={position}
                redirect={handleRedirect}
                eye={eyeDataObj}
                clusterer={clusterer}
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
            eyesArr.forEach((eyeData) => {
                const eyeMarker = buildMarker(eyeData);
                markers.push(eyeMarker);
            });
        }
    } else {
        zoom = 3;
        initCenter = {
            latitude: 0,
            longitude: 0,
        };
    }

    let center = {
        lat: initCenter ? initCenter.latitude : eyesArr[0].info.latitude,
        lng: initCenter ? initCenter.longitude : eyesArr[0].info.longitude,
    };

    return (
        <LoadScript
            googleMapsApiKey={`AI${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div>insert spinning earth here</div>}
        >
            <GoogleMap
                id='worldMap'
                center={center}
                zoom={zoom}
                streetViewControl
                options={{
                    styles: mapStyle, // change default map styles
                    disableDefaultUI: true, // disable default map UI
                    draggable: true, // make map draggable
                    keyboardShortcuts: false, // disable keyboard shortcuts
                    scaleControl: false, // allow scale control
                    scrollwheel: true, // allow scroll wheel
                    styles: mapStyle, // change default map styles
                    streetViewControl: true,
                    zoomControl: false,
                    fullscreenControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                }}
            >
                <MarkerClusterer
                    averageCenter={true}
                    // ignoreHidden={true}
                    options={
                        {
                            // imag1ePath: incognito,
                        }
                    }
                    // imageExtension={'../images/view.png'}
                    // imagePath='../images/planet-earth.svg'
                    // styles={clusterStyle}
                    onClusteringBegin={false}
                >
                    {(clusterer) =>
                        eyesArr.map((eye) => buildMarker(eye, clusterer))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </LoadScript>
    );
};
// const MapComponent = withScriptjs(
//     withGoogleMap(({ eyesArr }) => {
//         const history = useHistory();

//         const handleRedirect = (eyeId) => {
//             history.push(`/eyes/${eyeId}`);
//         };

//         const buildMarker = (eyeDataObj) => {
//             const position = {
//                 lat: Number(eyeDataObj.info.latitude),
//                 lng: Number(eyeDataObj.info.longitude),
//             };

//             let notPostingEye = true;
//             if (eyesArr.length <= 1) notPostingEye = false;

//             return (
//                 <MarkerWithInfoWindowComponent
//                     key={eyeDataObj._id || 'init'}
//                     enableInfoWindow={notPostingEye}
//                     position={position}
//                     redirect={handleRedirect}
//                     eye={eyeDataObj}
//                 />
//             );
//         };

//         let zoom;
//         let markers = [];
//         let initCenter = null;

//         if (eyesArr && eyesArr.length > 0) {
//             if (eyesArr.length === 1) {
//                 zoom = 12;
//                 const eyeMarker = buildMarker(eyesArr[0]);
//                 markers.push(eyeMarker);
//             } else {
//                 zoom = 3;
//                 eyesArr.forEach((eyeData) => {
//                     const eyeMarker = buildMarker(eyeData);
//                     markers.push(eyeMarker);
//                 });
//             }
//         } else {
//             zoom = 3;
//             initCenter = {
//                 latitude: 0,
//                 longitude: 0,
//             };
//         }

//         let center = {
//             lat: initCenter ? initCenter.latitude : eyesArr[0].info.latitude,
//             lng: initCenter ? initCenter.longitude : eyesArr[0].info.longitude,
//         };
//         return (
//             <GoogleMap
//                 center={center}
//                 zoom={zoom}
//                 streetViewControl
//                 defaultOptions={{
//                     disableDefaultUI: true, // disable default map UI
//                     draggable: true, // make map draggable
//                     keyboardShortcuts: false, // disable keyboard shortcuts
//                     scaleControl: true, // allow scale control
//                     scrollwheel: true, // allow scroll wheel
//                     styles: mapStyle, // change default map styles
//                     streetViewControl: true,
//                 }}
//             >
//                 <MarkerClusterer averageCenter>{markers}</MarkerClusterer>
//             </GoogleMap>
//         );
//     })
// );

// const mapStateToProps = (state) => ({
//     eyesArr: state.eyes,
// });
export default MapComponent;
