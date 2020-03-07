import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MapSection from './MapSection';
import ImageSection from './ImageSection';
import InfoSection from './InfoSection';

import { submitEye } from '../../actions/eyeAction';

import {
    handleFindInfo,
    handleFileDrop,
    handleFileChange
} from '../../actions/infoAction';
import {
    handleImageReady,
    handleSubmitReady
} from '../../actions/statesAction';

const AddPage = props => {
    const {
        info,
        states,
        eye,
        eyes,
        handleFindInfo,
        handleFileDrop,
        handleFileChange,
        handleImageReady,
        handleSubmitReady,
        submitEye
    } = props;

    // useEffect(() => {
    //     state.ready && handleFindInfo();
    // }, [state.ready]);

    // let submitPage = false;
    // if (state.info.latitude === '???' || state.info.longitude === '???') {
    //     submitPage = true;
    // } else {
    //     submitPage = false;
    // }
    // states.imageReady && handleFindInfo();
    useEffect(() => {
        // const eye = {};
        states.imageReady && handleFindInfo();
    }, [states.imageReady]);

    let inputArr = [];
    states.submitReady && inputArr.push({ info: info });

    return (
        <main className='add'>
            <MapSection eyesArr={inputArr} />

            <ImageSection
                states={states}
                info={info}
                submitEye={submitEye}
                /* imgId={states.imgId} */
                /* imgSrc={states.imgSrc} */
                submitReady={states.submitReady}
                handleFileChange={handleFileChange}
                /* handleFindInfo={handleFindInfo} */
                handleFileDrop={handleFileDrop}
                handleImageReady={handleImageReady}
            />
            <InfoSection info={info.latitude === '' ? null : info} />
        </main>
    );
};

const mapStateToProps = state => ({
    states: state.states,
    info: state.info,
    eye: state.eye,
    eyes: state.eyes
});

export default connect(mapStateToProps, {
    handleFindInfo,
    handleFileDrop,
    handleImageReady,
    handleSubmitReady,
    handleFileChange,
    submitEye
})(AddPage);
