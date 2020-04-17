import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { setName } from '../utilityFunctions/utilities';
import { removeEye } from '../../actions/eyeAction';

const BuildMarkerInfo = ({ eye, redirect, toggleInfoWindow }) => {
    const filename = eye.pic.name;
    const name = setName(filename);

    // console.log('parentx7');
    const builtEye = (
        <div className={`markerInfo marker~${eye.pic.name}`}>
            <div className='window'>
                {
                    // <div className='xBlock' onClick={() => toggleInfoWindow(false)}>
                    // x
                    // </div>
                }

                <img src={eye.url} alt={`thumbnail of ${eye.pic.name}`} />
            </div>
            <h2 className='title'>{name}</h2>
            <a className='goto' onClick={() => redirect(eye._id)}>
                go to Eye
            </a>
        </div>
    );
    return builtEye;
};

export default connect(null, { removeEye })(BuildMarkerInfo);
