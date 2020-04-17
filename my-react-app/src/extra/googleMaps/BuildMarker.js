import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { setName } from '../utilityFunctions/utilities';

import sprites from '../images/icons.svg';
const view = `${sprites}#view`;
const down = `${sprites}#down`;

const Marker = ({ children }) => children;

const initialInfoWindowState = true;

const BuildMarker = ({ eyeCluster }) => {
    const [infoWindow, setInfoWindow] = useState(initialInfoWindowState);

    const toggleInfoWindow = (value) => {
        console.log('toggling info window');
        console.log(infoWindow);
        if (value === 'toggle') {
            setInfoWindow(!infoWindow);
        } else {
            setInfoWindow(value);
        }
        console.log(infoWindow);
    };
    const handleRedirect = (eyeId) => {
        history.push(`/eyes/${eyeId}`);
    };

    const { eye } = eyeCluster.properties.eye;
    const history = useHistory();

    const filename = eye.pic.name;
    const name = setName(filename);
    // // let notPostingEye = true;
    // // if (eyesArr.length <= 1) notPostingEye = false;

    let markerInfo = (
        <div className={`markerInfo marker~${eye.pic.name}`}>
            <div className='window'>
                <div className='xBlock' onClick={() => toggleInfoWindow(false)}>
                    x
                </div>

                <img src={eye.url} alt={`thumbnail of ${eye.pic.name}`} />
            </div>
            <h2 className='title'>{name}</h2>
            <a className='goto' onClick={() => handleRedirect(eye._id)}>
                go to Eye
            </a>
        </div>
    );
    if (!infoWindow) {
        markerInfo = null;
    }

    return (
        <Marker key={eye._id || `Marker#${Math.random()}`}>
            {infoWindow && markerInfo}
            <div className='marker' onClick={() => toggleInfoWindow('toggle')}>
                <svg viewBox='0 0 100 100'>
                    <use xlinkHref={view}></use>
                </svg>
            </div>
        </Marker>
    );
};

export default BuildMarker;
