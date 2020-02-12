import React, { useEffect } from 'react';

const ImageSection = props => {
    const {
        handleFileDragOver,
        handleFileDrop,
        handleFindData,
        handleFileChange,
        imgSrc,
        imgId
    } = props;

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
            <div className='inputContainer'>
                <form
                    name='picsubmit'
                    onSubmit={() => console.log(`submitted`)}
                    onDragOver={handleFileDragOver}
                    onDragLeave={() => console.log('ondragleave')}
                    onDrop={handleFileDrop}
                >
                    <input
                        id='insertedImg'
                        type='file'
                        onChange={handleFileChange}
                        onDrop={handleFileDrop}
                    />
                    <label for='insertedImg' id='imgLabel'>
                        Click to add image or drag and drop :^]
                    </label>
                </form>
            </div>
            <div className='imgBox'>{img}</div>
        </section>
    );
};

export default ImageSection;
