import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import MapComponent from '../extra/googleMaps/MapComponent';
import key from '../extra/hiddenFolder/hiddenFile';

import getAllEyes from '../extra/apiCalls/getAllEyes';

const initialState = {
    location: {
        lat: 0,
        lng: 0
    },
    markers: []
};
// import axios from 'axios'
const LandingPage = props => {
    const [state, setState] = useState(initialState);

    useAsyncEffect(async () => {
        const eyes = await getAllEyes();
        console.log(eyes);
        setState({
            ...state,
            markers: eyes
        });
    }, []);
    console.log(state);

    return (
        <section className='landing'>
            <div className='recentImgs'>
                <button onClick={() => getAllEyes()}>get all eyes</button>
            </div>
            <div className='worldMap'>
                <MapComponent
                    info={state}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key()}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </section>
    );
};

export default LandingPage;
