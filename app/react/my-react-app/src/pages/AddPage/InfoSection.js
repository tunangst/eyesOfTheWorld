import React from 'react';
import BuildInputField from '../../extra/utilityFunctions/BuildInputField';

const InfoSection = props => {
    const { info } = props;
    let inputs = [];
    if (info) {
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

    return (
        <section className='infoSection'>
            <form
                id='infoForm'
                name='infoSubmit'
                encType='multipart/form-data'
                action='/api/eyes/upload'
                method='POST'

                // onSubmit={submitImage}
            >
                {inputs}
            </form>
        </section>
    );
};

export default InfoSection;
