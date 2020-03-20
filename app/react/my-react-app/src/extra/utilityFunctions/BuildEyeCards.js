import React from 'react';
import moment from 'moment';

import { setName } from './utilities';

const BuildEyeCards = ({ eye }) => {
    const filename = eye.pic.name;
    const name = setName(filename);

    const date = eye.info.date;
    const formatDate = moment(date).format('LLLL');

    const builtEye = (
        <div className='card'>
            <div className='window'>
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

export default BuildEyeCards;
