// import { connect } from 'react-redux';
import store from '../store';
// import axios from 'axios';
import EXIF from '../../node_modules/exif-js/exif';

import {
    calculateLatLong,
    getId,
    clearImgExifdataTag
} from '../extra/utilityFunctions/utilities';

import {
    // BUILD_EYE,
    // GET_ALL_EYES,
    // GET_EYE,
    SET_LOADING,
    CLEAR_INFO,
    SET_INFO,
    IMAGE_READY_NO,
    // IMAGE_READY_YES,
    GET_IMG_SRC,
    GET_IMG_ID,
    SUBMIT_READY_YES,
    SUBMIT_READY_NO
} from '../actions/types';

export const handleFileChange = targetFileLocation => async dispatch => {
    dispatch({
        type: SUBMIT_READY_NO,
        payload: false
    });
    dispatch({
        type: IMAGE_READY_NO,
        payload: false
    });
    dispatch({
        type: SET_LOADING,
        payload: true
    });
    dispatch({
        type: CLEAR_INFO
    });

    const newId = getId();
    const reader = new FileReader();
    reader.onload = function() {
        dispatch({
            type: GET_IMG_ID,
            payload: newId
        });
        dispatch({
            type: GET_IMG_SRC,
            payload: reader.result
        });
    };
    reader.readAsDataURL(targetFileLocation);
};

export const handleFindInfo = props => async dispatch => {
    const imgId = store.getState().states.imgId;

    dispatch({
        type: SET_LOADING,
        payload: true
    });
    const img1 = document.getElementById(imgId);
    let enterInfo;
    EXIF.getData(img1, async () => {
        let latitude;
        let longitude;
        const tags = EXIF.getAllTags(img1);
        //~~~~~~~~~~~~~~lat-lon start~~~~~~~~~~~~~~~~~~~~~~
        const lat = tags.GPSLatitude;
        const latDegree = lat[0].numerator / lat[0].denominator;
        const latMinute = lat[1].numerator / lat[1].denominator;
        const latSecond = lat[2].numerator / lat[2].denominator;
        const latDirection = tags.GPSLatitudeRef;
        const GPSLatitude = [latDegree, latMinute, latSecond, latDirection];

        const lon = tags.GPSLongitude;
        const lonDegree = lon[0].numerator / lon[0].denominator;
        const lonMinute = lon[1].numerator / lon[1].denominator;
        const lonSecond = lon[2].numerator / lon[2].denominator;
        const lonDirection = tags.GPSLongitudeRef;
        const GPSLongitude = [lonDegree, lonMinute, lonSecond, lonDirection];

        latitude = calculateLatLong(
            GPSLatitude[0],
            GPSLatitude[1],
            GPSLatitude[2],
            GPSLatitude[3]
        );
        longitude = calculateLatLong(
            GPSLongitude[0],
            GPSLongitude[1],
            GPSLongitude[2],
            GPSLongitude[3]
        );
        const zoom = tags.DigitalZoomRation;
        const zoomCalc = zoom.numerator / zoom.denominator;
        const aperture = tags.ApertureValue;
        const apertureCalc = aperture.numerator / aperture.denominator;
        const exposure = tags.ExposureTime;
        const exposureCalc = exposure.numerator / exposure.denominator;

        enterInfo = {
            latitude: latitude,
            longitude: longitude,
            camera: tags.Model,
            date: tags.DateTimeOriginal,
            width: tags.PixelXDimension,
            height: tags.PixelYDimension,
            aperture: apertureCalc,
            shutter: tags.ShutterSpeed,
            iso: tags.ISOSpeedRatings,
            exposure: exposureCalc,
            light: tags.LightSource,
            flash: tags.Flash,
            flashStrength: tags.FlashEnergy,
            contrast: tags.Contrast,
            saturation: tags.Saturation,
            sharpness: tags.Sharpness,
            brightness: tags.BrightnessValue,
            whiteBalance: tags.WhiteBalance,
            zoom: zoomCalc,
            artist: tags.Artist,
            software: tags.Software,
            copyright: tags.Copyright
        };
    });
    dispatch({
        type: SET_INFO,
        payload: enterInfo
    });
    dispatch({
        type: SUBMIT_READY_YES,
        payload: true
    });
    dispatch({
        type: SET_LOADING,
        payload: false
    });
    //clear exifdata obj attacked to img so new image data can be updated
    clearImgExifdataTag(img1);
};

export const handleFileDrop = event => {
    const fileInput = document.querySelector('#insertedImg');
    fileInput.files = event.dataTransfer.files;
    event.preventDefault();

    handleFileChange(fileInput.files[0]);
};
