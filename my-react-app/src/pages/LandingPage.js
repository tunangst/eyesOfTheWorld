import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// import MapComponent from '../extra/googleMaps/MapComponent';
import MapComponent2 from '../extra/googleMaps/MapComponent2';

import { setThanks, setLocal } from '../actions/statesAction';
import { getAllEyes } from '../actions/eyeAction';

const LandingPage = (props) => {
    const {
        eyes,
        getAllEyes,
        setThanks,
        setLocal,
        states: { needThanks },
    } = props;
    const thankYouMessage =
        'Thank you author_id=216 @flaticon.com and https://www.pexels.com/collections/eyesoftheworld-p4f1cws/ :^]';

    useEffect(() => {
        console.log('running useEffect in landingpage');
        setLocal(false);
        needThanks === true && setThanks(thankYouMessage, 'success');
        eyes.length < 1 && getAllEyes();
    }, [eyes.length, getAllEyes]);

    return (
        <section className='landing'>
            <MapComponent2 />
            {
                // <MapComponent
                //     eyesArr={eyes || [{}]}
                //     googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AI${process.env.REACT_APP_GOOGLE_KEY}`}
                //     loadingElement={<div style={{ height: `100%` }} />}
                //     containerElement={<div style={{ height: `100%` }} />}
                //     mapElement={<div style={{ height: `100%` }} />}
                // />
            }
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
