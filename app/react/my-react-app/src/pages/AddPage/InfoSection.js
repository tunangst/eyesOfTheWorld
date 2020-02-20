import React from 'react';
import BuildInputField from '../../extra/utilityFunctions/BuildInputField';

const InfoSection = props => {
    const { info, handleSubmitReady } = props;
    console.log(info);
    let inputs = [];
    if (info !== null) {
        inputs = Object.entries(info).map(([key, value]) => {
            if (key === 'width' && value !== '???') {
                return (
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
                value === '???' ||
                value === undefined
            ) {
                return null;
            } else {
                return (
                    <BuildInputField key={key} field={key} value={info[key]} />
                );
            }
        });
    }
    console.log(inputs);
    console.log(props);
    inputs.length > 0 && handleSubmitReady && handleSubmitReady();

    return (
        <section className='infoSection'>
            <form id='infoForm'>{inputs}</form>
        </section>
    );
};

export default InfoSection;
