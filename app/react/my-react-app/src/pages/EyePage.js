import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import { findEye } from '../actions/eyeAction';
// import findEye from '../extra/apiCalls/findEye';
import findImage from '../extra/apiCalls/findImage';
import BuildInputField from '../extra/utilityFunctions/BuildInputField';

const initialState = {
    pic: {},
    info: {},
    image: {}
};
const EyePage = props => {
    // const [eyeData, setEyeData] = useState(initialState);
    const { eye, findEye } = props;

    const id = props.match.params.id;
    console.log(id);

    useEffect(() => {
        const foundEye = findEye(id);
        console.log(foundEye);
        // setEyeData({
        //     ...eyeData,
        //     pic: foundEye.pic,
        //     info: foundEye.info,
        //     image: foundEye.url
        // });
    }, []);

    let inputs = [];
    console.log(eye);
    if (eye.info) {
        inputs = Object.entries(eye.info).map(([key, value]) => {
            if (key === 'width' && value !== '???') {
                return (
                    <BuildInputField
                        key={key}
                        field={key}
                        value={eye.info[key]}
                        fieldHeight={'height'}
                        valueHeight={eye.info.height}
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
                    <BuildInputField
                        key={key}
                        field={key}
                        value={eye.info[key]}
                    />
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
                    <img src={eye.url}></img>
                </div>
                <div className='infoBox'>
                    <h1 className='title'>{eye.pic.name}</h1>
                    {inputs}
                </div>
            </main>
        </section>
    );
};

const mapStateToProps = state => ({
    eye: state.eye
});

export default connect(mapStateToProps, { findEye })(EyePage);
