import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MapSection from './MapSection';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';

import { submitEye } from '../../actions/eyeAction';
import { setLoading } from '../../actions/statesAction';

import {
    handleFindInfo,
    // handleFileDrop,
    // handleFileChange
} from '../../actions/infoAction';
import // handleImageReady,
// handleSubmitReady
'../../actions/statesAction';

const AddPage = (props) => {
    const {
        info,
        user,
        states,
        handleFindInfo,
        handleFileDrop,
        handleFileChange,
        handleImageReady,
        setLoading,
        submitEye,
    } = props;

    useEffect(() => {
        console.log('running useEffect in AddPage');
        // const eye = {};
        states.imageReady && handleFindInfo();
    }, [states.imageReady, handleFindInfo]);

    let inputArr = [];
    states.submitReady && inputArr.push({ info: info });

    return (
        <main className='add'>
            <MapSection uploadEye={inputArr} />
            {
                // <MapSection eyesArr={inputArr} />
            }
            <ImageSection
            // states={states}
            // info={info}
            // submitEye={submitEye}
            // user={user}
            // latitude={info.latitude}
            // longitude={info.longitude}
            // submitReady={states.submitReady}
            // setLoading={setLoading}
            // handleFileChange={handleFileChange}
            // handleFileDrop={handleFileDrop}
            // handleImageReady={handleImageReady}
            />
            <InfoSection info={info.latitude === '' ? null : info} />
        </main>
    );
};

const mapStateToProps = (state) => ({
    states: state.states,
    info: state.info,
    eye: state.eye,
    eyes: state.eyes,
    user: state.user,
});

export default connect(mapStateToProps, {
    handleFindInfo,
    // handleFileDrop,
    // handleImageReady,
    // handleSubmitReady,
    // handleFileChange,
    setLoading,
    submitEye,
})(AddPage);
