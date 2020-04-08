import React from 'react';
import { connect } from 'react-redux';

import { submitEye } from '../../actions/eyeAction';
import { setLoading } from '../../actions/statesAction';

import { handleFileDrop, handleFileChange } from '../../actions/infoAction';
import { handleImageReady } from '../../actions/statesAction';

const ImageSection = props => {
    const {
        handleFileDrop,
        submitEye,
        handleFileChange,
        handleImageReady,
        info,
        states: { imgSrc, imgId, submitReady },
        user: { userObj },
        setLoading
        // latitude,
        // longitude
    } = props;
    // const userId = userObj._id;

    const handleFileDragOver = event => {
        event.preventDefault();
        event.stopPropagation();
        const label = document.querySelector('#imgLabel');
        label.classList.add('dragOver');
    };
    const handleFileDragLeave = event => {
        event.preventDefault();
        event.stopPropagation();
        const label = document.querySelector('#imgLabel');
        label.classList.remove('dragOver');
    };

    let img;
    if (imgSrc) {
        img = (
            <img
                id={imgId}
                className='img1'
                alt='this is what you are wanting to upload'
                src={imgSrc}
                onLoad={handleImageReady}
            />
        );
    }

    let submitBtn = (
        <input
            type='submit'
            className='submitImage submitBtn'
            value='Submit to Server'
            disabled
        />
    );
    if (submitReady) {
        // setLoading(false);
        submitBtn = (
            <input
                type='submit'
                className='submitImage submitBtn'
                value='Submit to Server'
            />
        );
    }

    return (
        <section
            className='imageSection'
            onDragOver={handleFileDragOver}
            onDragLeave={handleFileDragLeave}
            onChange={event => handleFileChange(event.target.files[0], imgSrc)}
            onDrop={handleFileDrop}
        >
            <div className='inputContainer'>
                <form
                    action='/api/image'
                    method='POST'
                    id='picForm'
                    name='picSubmit'
                    onSubmit={event =>
                        submitEye(event, userObj, info.latitude, info.longitude)
                    }
                    encType='multipart/form-data'
                >
                    <input id='insertedImg' name='insertedImg' type='file' />
                    <label htmlFor='insertedImg' id='imgLabel'>
                        Click to add image or drag and drop :^]
                    </label>
                    {submitBtn}
                </form>
            </div>
            <div className='imgBox'>{img}</div>
        </section>
    );
};

const mapStateToProps = state => ({
    states: state.states,
    info: state.info,
    // eye: state.eye,
    user: state.user
});

export default connect(mapStateToProps, {
    // handleFindInfo,
    handleFileDrop,
    handleImageReady,
    // handleSubmitReady,
    handleFileChange,
    setLoading,
    submitEye
})(ImageSection);

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

// const mapStateToProps = state => ({
//     states: state.states,
//     info: state.info,
//     eye: state.eye,
//     eyes: state.eyes,
//     user: state.user
// });

// export default connect(mapStateToProps, {
//     handleFindInfo,
//     handleFileDrop,
//     handleImageReady,
//     handleSubmitReady,
//     handleFileChange,
//     setLoading,
//     submitEye
// })(AddPage);
