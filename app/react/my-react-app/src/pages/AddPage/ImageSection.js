import React, { useEffect } from 'react';

const ImageSection = props => {
    const {
        // handleFileDragOver,
        // handleFileDragLeave,
        handleFileDrop,
        handleFindData,
        handleFileChange,
        imgSrc,
        imgId
    } = props;
    const handleFileDragOver = event => {
        event.preventDefault();
        event.target.classList.add('dragOver');
    };
    const handleFileDragLeave = event => {
        event.preventDefault();
        event.target.classList.remove('dragOver');
    };

    let img = null;
    if (imgSrc) {
        img = (
            <img
                id={imgId}
                className='img1'
                alt='display of inserted image'
                src={imgSrc}
            />
        );
    }
    useEffect(() => {
        if (img) {
            handleFindData();
        }
    }, [imgSrc]);
    return (
        <section className='imageSection'>
            <div
                className='inputContainer'
                onDragOver={event => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
                onChange={event => handleFileChange(event.target.files[0])}
                onDrop={handleFileDrop}
            >
                <form
                    name='picsubmit'
                    onSubmit={() => console.log(`submitted`)}
                >
                    <input id='insertedImg' type='file' />
                    <label
                        for='insertedImg'
                        id='imgLabel'
                        onDragOver={handleFileDragOver}
                        onDragLeave={handleFileDragLeave}
                    >
                        Click to add image or drag and drop :^]
                    </label>
                </form>
            </div>
            <div className='imgBox'>{img}</div>
        </section>
    );
};

export default ImageSection;
