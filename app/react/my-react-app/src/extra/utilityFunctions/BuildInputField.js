import React from 'react';
import moment from 'moment';

// import { calculateLength } from './utilities';

const BuildInputField = ({ field, value, fieldHeight, valueHeight }) => {
    let inputField;
    let size;

    if (!value) return null;

    if (value && value !== '' && value !== undefined && value !== null) {
        if (typeof value === 'number') {
            size = value.toString().length;
        } else {
            size = value.length;
        }
    } else {
        size = null;
    }

    switch (field) {
        case 'latitude':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='latitude'>Latitude: </label>
                    <input
                        readOnly
                        id='latitude'
                        name='latitude'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'longitude':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='longitude'>Longitude: </label>
                    <input
                        readOnly
                        id='longitude'
                        name='longitude'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'camera':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='model'>Camera:</label>
                    <input
                        readOnly
                        id='model'
                        name='model'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'date':
            console.log(value);
            const timeStamp = moment(value, 'YYYY:MM:DD HH:mm:ss');
            const valueDate = timeStamp.toDate();
            let formattedDate = moment(valueDate).format('LLLL');
            if (formattedDate === 'Invalid date') {
                formattedDate = moment(value).format('LLLL');
            }

            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='date'>Date Taken: </label>
                    <input
                        readOnly
                        id='date'
                        name='date'
                        type='text'
                        value={formattedDate}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'width':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='dimension' id='dimension'>
                        Dimension:{' '}
                    </label>
                    <div>
                        <input
                            readOnly
                            id='dimension'
                            name='dimension'
                            type='string'
                            value={`${value} x ${valueHeight}`}
                            // style={calculateLength(size)}
                        />
                        {
                            // <span> x </span>
                            // <input
                            //     readOnly
                            //     id='height'
                            //     name='height'
                            //     type='number'
                            //     value={valueHeight}
                            //     style={calculateLength(
                            //         valueHeight.toString().length
                            //     )}
                            // />
                        }
                    </div>
                </fieldset>
            );
            break;
        case 'aperture':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='aperture'>Aperture: </label>
                    <input
                        readOnly
                        id='aperture'
                        name='aperture'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'shutter':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='shutter'>Shutter Speed: </label>
                    <input
                        readOnly
                        id='shutter'
                        name='shutter'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'iso':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='iso'>ISO Sensitivity: </label>
                    <input
                        readOnly
                        id='iso'
                        name='iso'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'exposure':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='exposure'>Exposure: </label>
                    <input
                        readOnly
                        id='exposure'
                        name='exposure'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'light':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='light'>Light Source: </label>
                    <input
                        readOnly
                        id='light'
                        name='light'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'flash':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='flash'>Flash: </label>
                    <input
                        readOnly
                        id='flash'
                        name='flash'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'flashStrength':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='energy'>Flash Strength: </label>
                    <input
                        readOnly
                        id='energy'
                        name='energy'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'contrast':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='contrast'>Contrast: </label>
                    <input
                        readOnly
                        id='contrast'
                        name='contrast'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'saturation':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='saturation'>Saturation: </label>
                    <input
                        readOnly
                        id='saturation'
                        name='saturation'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'sharpness':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='sharpness'>Sharpness: </label>
                    <input
                        readOnly
                        id='sharpness'
                        name='sharpness'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'brightness':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='brightness'>Brightness: </label>
                    <input
                        readOnly
                        id='brightness'
                        name='brightness'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'whiteBalance':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='whiteBalance'>WhiteBalance: </label>
                    <input
                        readOnly
                        id='whiteBalance'
                        name='whiteBalance'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'zoom':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='zoom'>Digital Zoom: </label>
                    <input
                        readOnly
                        id='zoom'
                        name='zoom'
                        type='float'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'artist':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='artist'>Artist: </label>
                    <input
                        readOnly
                        id='artist'
                        name='artist'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'software':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='software'>Software: </label>
                    <input
                        readOnly
                        id='software'
                        name='software'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'copyright':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label htmlFor='copyright'>Copyright: </label>
                    <input
                        readOnly
                        id='copyright'
                        name='copyright'
                        type='text'
                        value={value}
                        // style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        default:
            console.log(`no readable input`);
            return;
    }
    return inputField;
};
export default BuildInputField;

// element.style.width = `${element.value.length * 7.5}px`;
