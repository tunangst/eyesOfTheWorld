import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { findEye } from '../actions/eyeAction';
import BuildInputField from '../extra/utilityFunctions/BuildInputField';

const EyePage = props => {
    const { eye, findEye } = props;

    const id = props.match.params.id;
    console.log(id);

    useEffect(() => {
        console.log('running useEffect in eyepage');
        findEye(id);
    }, [findEye, id]);

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
            <aside className='closeTo'></aside>
            <main className='eye'>
                <div className='picBox'>
                    <img src={eye.url} alt={eye.pic.name}></img>
                </div>
                <div className='infoBox'>
                    <h2 className='title'>{eye.pic.name}</h2>
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
