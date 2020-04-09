import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import useAsyncEffect from 'use-async-effect';
// import SuggestedEye from '../extra/utilityFunctions/SuggestedEye';
// import SuggestionBar from './SuggestionBar';
// import key from '../extra/hiddenFolder/hiddenFile';
import MapComponent from '../extra/googleMaps/MapComponent';

import { setThanks, setLocal } from '../actions/statesAction';
import { getAllEyes } from '../actions/eyeAction';

const LandingPage = (props) => {
    console.log(process.env);
    const {
        eyes,
        getAllEyes,
        setThanks,
        setLocal,
        states: { needThanks },
    } = props;
    const thankYouMessage =
        'Thank you author_id=216 @ flaticon.com for the icons useage  :^]';

    let value = null;
    useEffect(() => {
        console.log('running useEffect in landingpage');
        setLocal(false);
        needThanks === true && setThanks(thankYouMessage, 'success');
        eyes.length < 1 && getAllEyes();
        // getGoogle().then((link) => {
        //     value = link;
        // });
    }, [eyes.length, getAllEyes]);

    return (
        <section className='landing'>
            <MapComponent
                eyesArr={eyes || [{}]}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AI${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </section>
    );
};

const mapStateToProps = (state) => ({
    eyes: state.eyes,
    states: state.states,
});

export default connect(mapStateToProps, {
    getAllEyes,
    setThanks,
    setLocal,
})(LandingPage);
