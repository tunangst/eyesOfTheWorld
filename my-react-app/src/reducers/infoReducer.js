import { SET_INFO, CLEAR_INFO } from '../actions/types';
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
    copyright: '',
};

const info = (state = initialInfo, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_INFO:
            return {
                ...state,
                latitude: payload.latitude,
                longitude: payload.longitude,
                camera: payload.camera,
                date: payload.date,
                width: payload.width,
                height: payload.height,
                aperture: payload.aperture,
                shutter: payload.shutter,
                iso: payload.iso,
                exposure: payload.exposure,
                light: payload.light,
                flash: payload.flash,
                flashStrength: payload.flashStrength,
                contrast: payload.contrast,
                saturation: payload.saturation,
                sharpness: payload.sharpness,
                brightness: payload.brightness,
                whiteBalance: payload.whiteBalance,
                zoom: payload.zoom,
                artist: payload.artist,
                software: payload.software,
                copyright: payload.copyright,
            };
        case CLEAR_INFO:
            return initialInfo;
        default:
            return state;
    }
};

export default info;
