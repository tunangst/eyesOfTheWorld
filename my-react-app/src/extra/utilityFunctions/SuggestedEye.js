import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setName } from '../utilityFunctions/utilities';

const SuggestedEye = ({ eye }) => {
    const [showName, setShowName] = useState(false);
    const history = useHistory();
    const filename = eye.pic.name;
    const name = setName(filename);
    const handleRedirect = (eyeId) => {
        history.push(`/eyes/${eyeId}`);
    };
    return (
        <div
            className='suggestedEye'
            onClick={() => handleRedirect(eye._id)}
            onMouseEnter={() => setShowName(true)}
            onMouseLeave={() => setShowName(false)}
        >
            <img src={eye.url} alt='suggested Eye' />
            {showName && <p className='eyeName'>{name}</p>}
        </div>
    );
};

export default SuggestedEye;
