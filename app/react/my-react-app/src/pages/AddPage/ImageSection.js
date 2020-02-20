import React, { useEffect } from 'react';

const ImageSection = props => {
    const {
        handleFileDrop,
        handleFindData,
        handleFileChange,
        imgSrc,
        imgId
    } = props;
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
            />
        );
    }
    // useEffect(() => {
    //     if (img) {
    //         handleFindData();
    //     }
    // }, [imgSrc]);
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
                    name='picsubmit'
                    onSubmit={() => console.log(`submitted`)}
                >
                    <input id='insertedImg' type='file' />
                    <label htmlFor='insertedImg' id='imgLabel'>
                        Click to add image or drag and drop :^]
                    </label>
                    <input
                        type='submit'
                        className='submitImage'
                        value='Submit to Server'
                    />
                </form>
            </div>
            <div className='imgBox'>{img}</div>
        </section>
    );
};

export default ImageSection;
