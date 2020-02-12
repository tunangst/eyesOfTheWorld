import React from 'react';

import { calculateLength } from './utilities';

const BuildInputField = ({ field, value, fieldHeight, valueHeight }) => {
    let inputField;
    let size;

    if (value && value !== '???' && value !== undefined) {
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
                    <label for='latitude'>Latitude: </label>
                    <input
                        id='latitude'
                        name='latitude'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'longitude':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='longitude'>Longitude: </label>
                    <input
                        id='longitude'
                        name='longitude'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'camera':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='model'>Camera:</label>
                    <input
                        id='model'
                        name='model'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'date':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='date'>Date Taken: </label>
                    <input
                        id='date'
                        name='date'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'width':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='width'>Dimension: </label>
                    <input
                        id='width'
                        name='width'
                        type='number'
                        value={value}
                        style={calculateLength(size)}
                    />
                    <span> x </span>
                    <input
                        id='height'
                        name='height'
                        type='number'
                        value={valueHeight}
                        style={calculateLength(valueHeight.toString().length)}
                    />
                </fieldset>
            );
            break;
        case 'aperture':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='aperture'>Aperture: </label>
                    <input
                        id='aperture'
                        name='aperture'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'shutter':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='shutter'>Shutter Speed: </label>
                    <input
                        id='shutter'
                        name='shutter'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'iso':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='iso'>ISO Sensitivity: </label>
                    <input
                        id='iso'
                        name='iso'
                        type='-'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'exposure':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='exposure'>Exposure: </label>
                    <input
                        id='exposure'
                        name='exposure'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'light':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='light'>Light Source: </label>
                    <input
                        id='light'
                        name='light'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'flash':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='flash'>Flash: </label>
                    <input
                        id='flash'
                        name='flash'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'flashStrength':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='energy'>Flash Strength: </label>
                    <input
                        id='energy'
                        name='energy'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'contrast':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='contrast'>Contrast: </label>
                    <input
                        id='contrast'
                        name='contrast'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'saturation':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='saturation'>Saturation: </label>
                    <input
                        id='saturation'
                        name='saturation'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'sharpness':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='sharpness'>Sharpness: </label>
                    <input
                        id='sharpness'
                        name='sharpness'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'brightness':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='brightness'>Brightness: </label>
                    <input
                        id='brightness'
                        name='brightness'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'whiteBalance':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='whiteBalance'>WhiteBalance: </label>
                    <input
                        id='whiteBalance'
                        name='whiteBalance'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'zoom':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='zoom'>Digital Zoom: </label>
                    <input
                        id='zoom'
                        name='zoom'
                        type='float'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'artist':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='artist'>Artist: </label>
                    <input
                        id='artist'
                        name='artist'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'software':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='software'>Software: </label>
                    <input
                        id='software'
                        name='software'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
                    />
                </fieldset>
            );
            break;
        case 'copyright':
            inputField = (
                <fieldset className='infoFieldset'>
                    <label for='copyright'>Copyright: </label>
                    <input
                        id='copyright'
                        name='copyright'
                        type='text'
                        value={value}
                        style={calculateLength(size)}
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
