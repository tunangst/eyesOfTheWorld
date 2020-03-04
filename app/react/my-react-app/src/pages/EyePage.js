import React, { useState, useEffect } from 'react';
import useAsyncEffect from 'use-async-effect';

import findEye from '../extra/apiCalls/findEye';
import findImage from '../extra/apiCalls/findImage';
import BuildInputField from '../extra/utilityFunctions/BuildInputField'

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
        console.log(foundEye);
        setEyeData({
            ...eyeData,
            pic: foundEye.pic,
            info: foundEye.info,
            image: foundEye.url
        });
    }, []);



    let inputs = [];
    if (eyeData.info) {
        inputs = Object.entries(eyeData.info).map(([key, value]) => {
            if (key === 'width' && value !== '???') {
                return (
                    <BuildInputField
                        key={key}
                        field={key}
                        value={eyeData.info[key]}
                        fieldHeight={'height'}
                        valueHeight={eyeData.info.height}
                    />
                );
            } else if (
                key === 'height' ||
                value === '???' ||
                value === undefined
            ) {
                return null;
            } else {
                return (
                    <BuildInputField key={key} field={key} value={eyeData.info[key]} />
                );
            }
        });
    }


    console.log(`in the eye's page`);
    return (
        <section className='eyeContainer'>
            <aside className='closeTo'>
                {
                    // <button onClick={() => getAllEyes()}>get all eyes</button>
                }
            </aside>
            <main className='eye'>
                
                <div className='picBox'>
                    <img src={eyeData.image}></img>
                </div>
                <div className='infoBox'>
                    <h1 className='title'>{eyeData.pic.name}</h1>
                    {inputs}
                </div>
            </main>
        </section>
    );
};

export default EyePage;
