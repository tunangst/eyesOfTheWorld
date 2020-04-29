import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router';
import { setName } from '../utilityFunctions/utilities';
import ReactCSSTransitionGroup from 'react-transition-group';

import sprites from '../images/icons.svg';
const view = `${sprites}#view`;
// const down = `${sprites}#down`;
const CSSTransitionGroup = ReactCSSTransitionGroup.CSSTransitionGroup;

const Marker = ({ children }) => children;

const initialInfoWindowState = true;

const BuildMarker = ({ eyeCluster }) => {
    const [infoWindow, setInfoWindow] = useState(initialInfoWindowState);
    const toggleInfoWindow = (value) => {
        console.log('toggling info window');
        if (value === 'toggle') {
            setInfoWindow(!infoWindow);
        } else {
            setInfoWindow(value);
        }
    };
    // const handleRedirect = (eyeId) => {
    //     history.push(`/eyes/${eyeId}`);
    // };
    // const history = useHistory();

    let filename;
    let name;
    let eye;
    // let markerInfo;
    // let marker;
    if (eyeCluster.properties.upload === false) {
        eye = eyeCluster.properties.eye;

        filename = eye.pic.name;
        name = setName(filename);
    } else if (eyeCluster.properties.upload === true) {
        eye = eyeCluster.properties.eye;
        return (
            <Marker>
                <div className='marker'>
                    <div
                        className='markerImg'
                        onClick={() => toggleInfoWindow('toggle')}
                    >
                        <svg viewBox='0 0 100 100'>
                            <use xlinkHref={view}></use>
                        </svg>
                    </div>
                </div>
            </Marker>
        );
    }
    return (
        <Marker>
            {eye ? (
                <div className='marker'>
                    <CSSTransitionGroup
                        transitionName='markerAnimation'
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {infoWindow && (
                            <div className={`markerInfo marker~${name}`}>
                                <div className='window'>
                                    <div
                                        className='xBlock'
                                        onClick={() => toggleInfoWindow(false)}
                                    >
                                        x
                                    </div>

                                    <img
                                        src={eye.url}
                                        alt={`thumbnail of ${eye.pic.name}`}
                                    />
                                </div>
                                <h2 className='title'>{name}</h2>
                                <Link
                                    to={`/eyes/${eye._id}`}
                                    className='goto'
                                    // onClick={() => handleRedirect(eye._id)}
                                >
                                    go to Eye
                                </Link>
                                {
                                    // <a
                                    //     className='goto'
                                    //     onClick={() => handleRedirect(eye._id)}
                                    // >
                                    //     go to Eye
                                    // </a>
                                }
                            </div>
                        )}
                    </CSSTransitionGroup>

                    <div
                        className='markerImg'
                        onClick={() => toggleInfoWindow('toggle')}
                    >
                        <svg viewBox='0 0 100 100'>
                            <use xlinkHref={view}></use>
                        </svg>
                    </div>
                </div>
            ) : null}
        </Marker>
    );
    // if (eyeCluster.properties.upload === false) {
    //     eye = eyeCluster.properties.eye;

    //     filename = eye.pic.name;
    //     name = setName(filename);
    //     // // let notPostingEye = true;
    //     // // if (eyesArr.length <= 1) notPostingEye = false;
    //     if (infoWindow) {
    //         markerInfo = (
    //             <div className={`markerInfo marker~${name}`}>
    //                 <div className='window'>
    //                     <div
    //                         className='xBlock'
    //                         onClick={() => toggleInfoWindow(false)}
    //                     >
    //                         x
    //                     </div>

    //                     <img
    //                         src={eye.url}
    //                         alt={`thumbnail of ${eye.pic.name}`}
    //                     />
    //                 </div>
    //                 <h2 className='title'>{name}</h2>
    //                 <a className='goto' onClick={() => handleRedirect(eye._id)}>
    //                     go to Eye
    //                 </a>
    //             </div>
    //         );
    //     } else {
    //         markerInfo = null;
    //     }
    //     marker = (
    //         <Marker>
    //             <CSSTransitionGroup
    //                 transitionName='eyeAnimation'
    //                 transitionEnterTimeout={200}
    //                 transitionLeaveTimeout={200}
    //             >
    //                 {infoWindow && markerInfo}
    //             </CSSTransitionGroup>

    //             <div
    //                 className='marker'
    //                 onClick={() => toggleInfoWindow('toggle')}
    //             >
    //                 <svg viewBox='0 0 100 100'>
    //                     <use xlinkHref={view}></use>
    //                 </svg>
    //             </div>
    //         </Marker>
    //     );
    // } else if (
    //     eyeCluster.geometry.coordinates[0] !== 0 &&
    //     eyeCluster.geometry.coordinates[1] !== 0
    // ) {
    //     marker = (
    //         <Marker>
    //             <div className='marker'>
    //                 <svg viewBox='0 0 100 100'>
    //                     <use xlinkHref={view}></use>
    //                 </svg>
    //             </div>
    //         </Marker>
    //     );
    // } else {
    //     marker = null;
    // }

    // return marker;
};

export default BuildMarker;
