import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
// import Supercluster from 'supercluster';

import mapStyle from './mapStyle';
import BuildMarker from './BuildMarker';
import BuildCluster from './BuildCluster';

const rotateWorld = (oldPointCenterObj) => {
    let { lat, lng } = oldPointCenterObj;
    console.log(lng);
    lng = Math.ceil(lng + 1);
    console.log(lng);
    if (lng > 180) lng -= 360;
    console.log(lng);
    return { lat: lat, lng: lng };
};

const initialCenter = { lat: 0, lng: 0 };
const MapComponent = ({ uploadEye, eyes }) => {
    const mapRef = useRef();
    const [zoom, setZoom] = useState(3);
    const [rotate, setRotate] = useState(false);
    const [rotateNum, setRotateNum] = useState({ lat: 50, lng: 0 });
    const [bounds, setBounds] = useState(null);
    const [center, setCenter] = useState(initialCenter);

    const handleClusterClick = (id, pan) => {
        const expansionZoom = Math.min(
            supercluster.getClusterExpansionZoom(id),
            20
        );
        mapRef.current.setZoom(expansionZoom);
        mapRef.current.panTo(pan);
    };
    const handlePan = (pan) => {
        mapRef.current.panTo(pan);
    };
    const init = () => {
        if (uploadEye) {
            setZoom(12);
            setCenter({
                lat: uploadEye.lat,
                lng: uploadEye.lng,
            });
        } else if (eyes.length > 0) {
            setZoom(3);
            setCenter({
                lat: eyes[0].info.latitude,
                lng: eyes[0].info.longitude,
            });
        }
    };
    const mapOptions = {
        styles: mapStyle, // change default map styles
        disableDefaultUI: true, // disable default map UI
        draggable: true, // make map draggable
        keyboardShortcuts: false, // disable keyboard shortcuts
        scaleControl: false, // allow scale control
        scrollwheel: true, // allow scroll wheel
        streetViewControl: true,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        minZoom: 3,
        maxZoom: 20,
    };

    // let initialized = false;

    let points;
    // check for inserted point from upload or eyesArr.length === 1
    if (uploadEye) {
        // console.log(uploadEye, 'uploadEye');
        points = [
            {
                properties: {
                    upload: true,
                    eye: uploadEye,
                },
                geometry: {
                    type: 'Point',
                    coordinates: [uploadEye.lng, uploadEye.lat],
                },
            },
        ];
        // console.log(points, ' points');
    } else {
        points = eyes.map((eye) => ({
            type: 'Feature',
            properties: {
                cluster: false,
                clusterId: `cluster#${eye._id}`,
                upload: false,
                eye: eye,
            },
            geometry: {
                type: 'Point',
                coordinates: [eye.info.longitude, eye.info.latitude],
            },
        }));
    }
    const { clusters, supercluster } = useSupercluster(
        {
            points,
            bounds,
            zoom,
            options: { radius: 80 },
        },
        [points]
    );
    useEffect(() => {
        console.log('running useEffect in mapcomponent2');
        init();
    }, [eyes, uploadEye]);

    rotate &&
        setTimeout(() => {
            console.log('rotating');
            const rotateLocation = rotateWorld(rotateNum);
            console.log(rotateLocation);
            setRotateNum({
                ...rotateNum,
                lat: rotateLocation.lat,
                lng: rotateLocation.lng,
            });
            handlePan(rotateNum);

            //     ...center,
            //     lat: rotateLocation.lat,
            //     lng: rotateLocation.lng,
            // });
            // ...center
            // lat: rotateLocation.lat,
            // (lng = rotateLocation.lng)
        }, 50);

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: `AI${process.env.REACT_APP_GOOGLE_KEY}` }}
            defaultCenter={{ lat: 0, lng: 0 }}
            // defaultCenter={center}
            defaultZoom={zoom}
            options={mapOptions}
            center={center}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
                mapRef.current = map;
                mapRef.current.panTo(center);
                setRotate(false);
            }}
            onChange={({ zoom, bounds }) => {
                // console.log(zoom);
                // console.log(bounds);
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
                clusters.length > 1
                    ? clusters.map((cluster) => {
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
                                          cluster.id ||
                                          `Cluster#${Math.random()}`
                                      }
                                      handleClusterClick={handleClusterClick}
                                      lat={latitude}
                                      lng={longitude}
                                      size={size}
                                      pointCount={pointCount}
                                      eyeCluster={cluster}
                                  />
                              );
                          } else {
                              //   console.log(clusters);
                              //   console.log('cluster');
                              return (
                                  <BuildMarker
                                      key={
                                          clusters.id ||
                                          `Marker#${Math.random()}`
                                      }
                                      lat={latitude}
                                      lng={longitude}
                                      // marker={Marker}
                                      eyeCluster={cluster}
                                  />
                              );
                          }
                      })
                    : clusters.length === 1
                    ? clusters.map((cluster) => {
                          const [
                              longitude,
                              latitude,
                          ] = cluster.geometry.coordinates;
                          //   console.log(cluster);
                          if (latitude === 0 && longitude === 0) return null;
                          return (
                              <BuildMarker
                                  key={`Marker#${Math.random()}`}
                                  lat={latitude}
                                  lng={longitude}
                                  // marker={Marker}
                                  eyeCluster={cluster}
                              />
                          );
                      })
                    : null
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
