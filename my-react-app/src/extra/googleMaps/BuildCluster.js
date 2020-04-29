import React from 'react';
// import { useHistory } from 'react-router-dom';

import sprites from '../images/icons.svg';
const incognito = `${sprites}#incognito`;

const Cluster = ({ children }) => children;

const BuildCluster = ({ eyeCluster, pointCount, size, handleClusterClick }) => {
    // const handleRedirect = (eyeId) => {
    //     history.push(`/eyes/${eyeId}`);
    // };
    // const history = useHistory();

    // let notPostingEye = true;
    // if (eyesArr.length <= 1) notPostingEye = false;
    // console.log(size, 'size');
    const panTo = {
        lat: eyeCluster.geometry.coordinates[1],
        lng: eyeCluster.geometry.coordinates[0],
    };
    return (
        <Cluster>
            <div
                className='cluster'
                onClick={() => handleClusterClick(eyeCluster.id, panTo)}
            >
                <p>{pointCount}</p>
                <svg viewBox='0 0 100 100'>
                    <use xlinkHref={incognito}></use>
                </svg>
            </div>
        </Cluster>
    );
};

export default BuildCluster;
