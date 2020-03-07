import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import useAsyncEffect from 'use-async-effect';
import MapComponent from '../extra/googleMaps/MapComponent';
import key from '../extra/hiddenFolder/hiddenFile';

import { getAllEyes } from '../actions/eyeAction';
// import getAllEyes from '../extra/apiCalls/getAllEyes';

const initialState = [];
// import axios from 'axios'
const LandingPage = props => {
    const { eyes, getAllEyes } = props;
    // const [eyeData, setEyeData] = useState(initialState);

    useEffect(() => {
        getAllEyes();
    }, []);

    return (
        <section className='landing'>
            <div className='recentImgs'>
                <button onClick={() => getAllEyes()}>get all eyes</button>
            </div>
            <div className='worldMap'>
                {eyes.length > 0 && (
                    <MapComponent
                        eyesArr={eyes}
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

const mapStateToProps = state => ({
    eyes: state.eyes
});

export default connect(mapStateToProps, { getAllEyes })(LandingPage);
