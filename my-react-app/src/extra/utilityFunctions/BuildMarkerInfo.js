import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { setName } from './utilities';
import { removeEye } from '../../actions/eyeAction';

const BuildMarkerInfo = ({ eye, redirect }) => {
    const filename = eye.pic.name;
    const name = setName(filename);

    const date = eye.uploadDate;
    const formatDate = moment(date).format('LLLL');

    const builtEye = (
        <div className='markerInfo'>
            <div className='window'>
                {
                    //<div className='xBlock'></div>
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
