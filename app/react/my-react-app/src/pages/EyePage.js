import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { findEye } from '../actions/eyeAction';
import BuildInputField from '../extra/utilityFunctions/BuildInputField';
import SuggestionBar from '../layout/SuggestionBar';
import { setName } from '../extra/utilityFunctions/utilities';

const EyePage = props => {
    const { eye, eyes, findEye } = props;

    const id = props.match.params.id;
    console.log(id);

    let slicedEyes = null;
    if (eyes.length > 0) {
        const sliceSize = 3;
        slicedEyes = eyes.slice(0, sliceSize);
    }

    useEffect(() => {
        console.log('running useEffect in eyepage');
        findEye(id);
    }, [findEye, id]);

    const filename = eye.pic.name;
    const name = setName(filename);

    let inputs = [];
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

    return (
        <section className='eyeContainer'>
            <main className='eye'>
                <div className='picBox'>
                    <img src={eye.url} alt={eye.pic.name}></img>
                </div>
                <div className='infoBox'>
                    <h2 className='title'>{name}</h2>
                    {inputs}
                </div>
            </main>
        </section>
    );
};

const mapStateToProps = state => ({
    eye: state.eye,
    eyes: state.eyes
});

export default connect(mapStateToProps, { findEye })(EyePage);
