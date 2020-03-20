import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import useAsyncEffect from 'use-async-effect';
import MapComponent from '../extra/googleMaps/MapComponent';
// import SuggestedEye from '../extra/utilityFunctions/SuggestedEye';
// import SuggestionBar from './SuggestionBar';
import key from '../extra/hiddenFolder/hiddenFile';

import { setThanks } from '../actions/statesAction';
import { getAllEyes } from '../actions/eyeAction';

const LandingPage = props => {
    const {
        eyes,
        getAllEyes,
        setThanks,
        states: { needThanks }
    } = props;
    const thankYouMessage =
        'Thank you author_id=216 @ flaticon.com for the icons useage  :^]';

    useEffect(() => {
        console.log('running useEffect in landingpage');
        needThanks === true && setThanks(thankYouMessage, 'success');
        eyes.length < 1 && getAllEyes();
    }, [eyes.length, getAllEyes]);

    return (
        <section className='landing'>
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
    eyes: state.eyes,
    states: state.states
});

export default connect(mapStateToProps, { getAllEyes, setThanks })(LandingPage);
