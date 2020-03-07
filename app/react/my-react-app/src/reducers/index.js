import { combineReducers } from 'redux';

import statesReducer from './statesReducer';
import userReducer from './userReducer';
import infoReducer from './infoReducer';
import eyeReducer from './eyeReducer';
import eyesReducer from './eyesReducer';

export default combineReducers({
    user: userReducer,
    states: statesReducer,
    info: infoReducer,
    eye: eyeReducer,
    eyes: eyesReducer
});

// {
//     user: {
//         username: '';
//     },
//     states: {
//         imgSrc: '',
//         imgId: '',
//         // dataReady: true,
//         submitReady: false,
//         loading: false
//     },
//     info: {
//         latitude: '',
//         longitude: '',
//         camera: '',
//         date: '',
//         width: '',
//         height: '',
//         aperture: '',
//         shutter: '',
//         iso: '',
//         exposure: '',
//         light: '',
//         flash: '',
//         flashStrength: '',
//         contrast: '',
//         saturation: '',
//         sharpness: '',
//         brightness: '',
//         whiteBalance: '',
//         zoom: '',
//         artist: '',
//         software: '',
//         copyright: ''
//     },
//     eye: {
//         url: '',
//         pic: {
//             name: '',
//             size: '',
//             type: ''
//         },
//         image: this.info
//     },
//     eyes: []
// }
