import { combineReducers } from 'redux';

import statesReducer from './statesReducer';
import userReducer from './userReducer';
import infoReducer from './infoReducer';
import eyeReducer from './eyeReducer';
import eyesReducer from './eyesReducer';
import tabsReducer from './tabsReducer';

export default combineReducers({
    user: userReducer,
    states: statesReducer,
    info: infoReducer,
    eye: eyeReducer,
    eyes: eyesReducer,
    tabs: tabsReducer
});

// {
//     user: {
//          userId: '',
//          userToken: localStorage.getItem('userToken'),
//          isAuthenticated: false,
//          userObj: {},
//          selectedUserEyes: [],
//          selectedUserObj: {}
//      },
//     states: {
//         imgSrc: '',
//         imgId: '',
//         dataReady: true,
//         submitReady: false,
//         loading: false,
//         alerts: [],
//         thanks: false
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
//     eyes: [],
//     tabs: {
//          suggestions: false,
//     }
// }
