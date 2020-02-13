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
        const label = document.querySelector('#imgLabel');
        label.classList.add('dragOver');
    };
    const handleFileDragLeave = event => {
        event.preventDefault();
        const label = document.querySelector('#imgLabel');
        label.classList.remove('dragOver');
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
        <section
            className='imageSection'
            onDragOver={event => {
                event.preventDefault();
                event.stopPropagation();
            }}
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
                    <label for='insertedImg' id='imgLabel' a>
                        Click to add image or drag and drop :^]
                    </label>
                </form>
            </div>
            <div className='imgBox'>{img}</div>
        </section>
    );
};

export default ImageSection;
