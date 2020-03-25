import React from 'react';

// import submitImage from '../../extra/apiCalls/submitImage';

const ImageSection = props => {
    const {
        handleFileDrop,
        submitEye,
        handleFileChange,
        handleImageReady,
        states: { imgSrc, imgId },
        user: { userObj },
        submitReady,
        latitude,
        longitude
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
            onChange={event => handleFileChange(event.target.files[0])}
            onDrop={handleFileDrop}
        >
            <div className='inputContainer'>
                <form
                    action='/api/image'
                    method='POST'
                    id='picForm'
                    name='picSubmit'
                    onSubmit={event =>
                        submitEye(event, userObj, latitude, longitude)
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

export default ImageSection;
