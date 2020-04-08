import { GET_EYE, BUILD_EYE, CLEAR_EYE } from '../actions/types';

const initialInfo = {
    latitude: '',
    longitude: '',
    camera: '',
    date: '',
    width: '',
    height: '',
    aperture: '',
    shutter: '',
    iso: '',
    exposure: '',
    light: '',
    flash: '',
    flashStrength: '',
    contrast: '',
    saturation: '',
    sharpness: '',
    brightness: '',
    whiteBalance: '',
    zoom: '',
    artist: '',
    software: '',
    copyright: ''
};
const initialEye = {
    url: '',
    user: '',
    uploadDate: '',
    pic: {
        name: '',
        size: '',
        type: ''
    },
    info: initialInfo
};

const eye = (state = initialEye, action) => {
    const { type, payload } = action;
    // console.log(payload);
    switch (type) {
        case GET_EYE:
            return {
                ...state,
                url: payload.url,
                user: payload.user,
                uploadDate: payload.uploadDate,
                pic: payload.pic,
                info: payload.info
            };
        case CLEAR_EYE:
            return initialEye;
        case BUILD_EYE:
            return {
                ...state,
                url: payload.url,
                pic: {
                    name: payload.pic.name,
                    size: payload.pic.size,
                    type: payload.pic.type
                },
                info: {
                    latitude: payload.info.latitude,
                    longitude: payload.info.longitude,
                    camera: payload.info.camera,
                    date: payload.info.date,
                    width: payload.info.width,
                    height: payload.info.height,
                    aperture: payload.info.aperture,
                    shutter: payload.info.shutter,
                    iso: payload.info.iso,
                    exposure: payload.info.exposure,
                    light: payload.info.light,
                    flash: payload.info.flash,
                    flashStrength: payload.info.flashStrength,
                    contrast: payload.info.contrast,
                    saturation: payload.info.saturation,
                    sharpness: payload.info.sharpness,
                    brightness: payload.info.brightness,
                    whiteBalance: payload.info.whiteBalance,
                    zoom: payload.info.zoom,
                    artist: payload.info.artist,
                    software: payload.info.software,
                    copyright: payload.info.copyright
                }
            };
        default:
            return state;
    }
};

export default eye;
