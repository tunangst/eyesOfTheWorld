import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
// import Supercluster from 'supercluster';

import mapStyle from './mapStyle';
import BuildMarker from './BuildMarker';
import BuildCluster from './BuildCluster';

const mapOptions = {
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
};
const initialCenter = { lat: 0, lng: 0 };
const MapComponent = ({ uploadEye, eyes }) => {
    const mapRef = useRef();
    const [zoom, setZoom] = useState(3);
    const [bounds, setBounds] = useState(null);
    const [center, setCenter] = useState(initialCenter);

    let initialized = false;
    let markers = [];
    let clusterArr = [];
    let points;
    // check for inserted point from upload or eyesArr.length === 1
    const init = () => {
        initialized = true;
        console.log(eyes);
        if (uploadEye) {
            setZoom(12);
            setCenter({
                lat: uploadEye.info.latitude,
                lng: uploadEye.info.longitude,
            });
        } else if (eyes.length > 0) {
            // debugger;
            console.log('not uploadEye running');
            setZoom(3);
            setCenter({
                lat: eyes[0].info.latitude,
                lng: eyes[0].info.longitude,
            });
        }
    };
    points = eyes.map((eye) => ({
        type: 'Feature',
        properties: {
            cluster: false,
            clusterId: `cluster#${eye._id}`,
            eye: { eye },
        },
        geometry: {
            type: 'Point',
            coordinates: [eye.info.longitude, eye.info.latitude],
        },
    }));
    const { clusters } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 80, maxZoom: 40 },
    });
    useEffect(() => {
        console.log('running useEffect in mapcomponent2');
        !initialized && init();
        initialized = true;
    }, []);
    console.log(center);
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: `AI${process.env.REACT_APP_GOOGLE_KEY}` }}
            defaultCenter={center}
            defaultZoom={3}
            options={mapOptions}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
                mapRef.current = map;
            }}
            onChange={({ zoom, bounds }) => {
                console.log(zoom);
                console.log(bounds);
                setZoom(zoom);
                setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat,
                ]);
            }}
        >
            {
                clusters.length > 0 &&
                    clusters.map((cluster) => {
                        console.log(cluster);
                        const [
                            longitude,
                            latitude,
                        ] = cluster.geometry.coordinates;
                        const {
                            cluster: isCluster,
                            point_count: pointCount,
                        } = cluster.properties;

                        if (isCluster) {
                            const size = {
                                width: `${pointCount / 10 + 2}rem`,
                                height: `${pointCount / 10 + 2}rem`,
                            };
                            return (
                                <BuildCluster
                                    key={
                                        cluster.id || `Cluster#${Math.random()}`
                                    }
                                    lat={latitude}
                                    lng={longitude}
                                    size={size}
                                    pointCount={pointCount}
                                    eyeCluster={cluster}
                                />
                            );
                        } else {
                            console.log(cluster);
                            console.log('cluster');
                            return (
                                <BuildMarker
                                    lat={latitude}
                                    lng={longitude}
                                    // marker={Marker}
                                    eyeCluster={cluster}
                                />
                            );
                        }
                    })
                // markers
                // eyes.map((eye) => markers.push(<BuildMarker eye={eye} />))
            }
        </GoogleMapReact>
    );
};

const mapStateToProps = (state) => ({
    eyes: state.eyes,
});
export default connect(mapStateToProps, null)(MapComponent);
