import React from 'react';
import { useHistory } from 'react-router-dom';

const SuggestedEye = ({ eye }) => {
    const history = useHistory();
    const handleRedirect = eyeId => {
        history.push(`/eyes/${eyeId}`);
    };
    return (
        <div className='suggestedEye'>
            <img
                src={eye.url}
                alt='suggested Eye'
                onClick={() => handleRedirect(eye._id)}
            />
        </div>
    );
};

export default SuggestedEye;
