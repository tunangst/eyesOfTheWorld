import React from 'react';
import BuildInputField from '../../extra/utilityFunctions/BuildInputField';

const InfoSection = props => {
    const { info } = props;

    let inputs = [];

    const getInputs = () => {
        for (let key in info) {
            let field;

            if (key === 'width' && info[key] !== '???') {
                field = (
                    <BuildInputField
                        key={key}
                        field={key}
                        value={info[key]}
                        fieldHeight={'height'}
                        valueHeight={info.height}
                    />
                );
            } else if (
                key === 'height' ||
                info[key] === '???' ||
                info[key] === undefined
            ) {
                field = null;
            } else {
                field = (
                    <BuildInputField key={key} field={key} value={info[key]} />
                );
            }
            if (field) {
                inputs.push(field);
            }
            field = null;
        }
    };

    if (info.latitude !== '???') {
        getInputs();
    }
    return (
        <section className='infoSection'>
            <form id='infoForm'>{inputs}</form>
        </section>
    );
};

export default InfoSection;
