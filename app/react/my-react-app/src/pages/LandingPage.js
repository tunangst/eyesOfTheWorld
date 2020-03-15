import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import useAsyncEffect from 'use-async-effect';
import MapComponent from '../extra/googleMaps/MapComponent';
import SuggestedEye from '../extra/utilityFunctions/SuggestedEye';
import key from '../extra/hiddenFolder/hiddenFile';

import { getAllEyes } from '../actions/eyeAction';

const LandingPage = props => {
    let suggestions = [];
    const { eyes, getAllEyes } = props;

    useEffect(() => {
        console.log('running useEffect in landingpage');
        eyes.length < 1 && getAllEyes();
    }, [eyes.length, getAllEyes]);

    if (eyes.length > 0) {
        if (eyes.length < 10) {
            for (let i = 0; i < eyes.length; i++) {
                suggestions.push(<SuggestedEye key={i} eye={eyes[i]} />);
            }
        } else {
            for (let i = 0; i < 10; i++) {
                suggestions.push(<SuggestedEye key={i} eye={eyes[i]} />);
            }
        }
    }

    return (
        <section className='landing'>
            <div className='suggestionContainer'>{suggestions}</div>
            <div className='worldMap'>
                <MapComponent
                    eyesArr={eyes || [{}]}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key()}`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        </section>
    );
};

const mapStateToProps = state => ({
    eyes: state.eyes
});

export default connect(mapStateToProps, { getAllEyes })(LandingPage);
