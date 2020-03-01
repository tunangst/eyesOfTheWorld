import React, { useState, useEffect } from 'react';
import useAsyncEffect from 'use-async-effect';

import findEye from '../extra/apiCalls/findEye';
import findImage from '../extra/apiCalls/findImage';

const initialState = {
    pic: {},
    info: {},
    image: {}
};
const EyePage = props => {
    const [eyeData, setEyeData] = useState(initialState);
    const id = props.match.params.id;
    console.log(id);

    useAsyncEffect(async () => {
        const foundEye = await findEye(id);
        const foundImage = await findImage(foundEye.pic.filename);
        console.log(foundEye);
        console.log(foundImage);
        setEyeData({
            ...eyeData,
            pic: foundEye.pic,
            info: foundEye.info,
            image: foundImage
        });
    }, []);

    console.log(`in the eye's page`);
    return (
        <section className='eyeContainer'>
            <aside className='closeTo'>
                {
                    // <button onClick={() => getAllEyes()}>get all eyes</button>
                }
            </aside>
            <main className='eye'>
                <h1 className='title'>{eyeData.pic.originalname}</h1>
                <div className='picBox'>{}</div>
            </main>
        </section>
    );
};

export default EyePage;
