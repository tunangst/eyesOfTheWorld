import React, { useState, useEffect } from 'react';
import useAsyncEffect from 'use-async-effect';
import MapComponent from '../extra/googleMaps/MapComponent';
import key from '../extra/hiddenFolder/hiddenFile';

import getAllEyes from '../extra/apiCalls/getAllEyes';

const initialState = [];
// import axios from 'axios'
const LandingPage = props => {
    const [eyeData, setEyeData] = useState(initialState);

    useAsyncEffect(async () => {
        const eyes = await getAllEyes();
        console.log(eyes);
        setEyeData(prevEyes => [...prevEyes, ...eyes]);
    }, []);

    return (
        <section className='landing'>
            <div className='recentImgs'>
                <button onClick={() => getAllEyes()}>get all eyes</button>
            </div>
            <div className='worldMap'>
                {eyeData.length > 0 && (
                    <MapComponent
                        eyeDataArr={eyeData}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key()}`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                    />
                )}
            </div>
        </section>
    );
};

export default LandingPage;
