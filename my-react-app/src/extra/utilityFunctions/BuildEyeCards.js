import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { setName } from './utilities';
import { removeEye } from '../../actions/eyeAction';

const BuildEyeCards = ({ eye, removeEye }) => {
    const filename = eye.pic.name;
    const name = setName(filename);

    const date = eye.uploadDate;
    const formatDate = moment(date).format('LLLL');

    const builtEye = (
        <div className='card'>
            <div className='window'>
                <p
                    className='remove'
                    onClick={() => removeEye(eye._id, eye.url, eye.user)}
                >
                    x
                </p>
                <img src={eye.url} alt={`thumbnail of ${eye.pic.name}`} />
            </div>
            <div className='info'>
                <h2 className='name'>{name}</h2>
                <p className='date'>{formatDate}</p>
                <h2>Latitude</h2>
                <p className='card_latitude_number'>{eye.info.latitude}</p>
                <h2>Longitude</h2>
                <p>{eye.info.longitude}</p>
            </div>
        </div>
    );
    return builtEye;
};

export default connect(null, { removeEye })(BuildEyeCards);
