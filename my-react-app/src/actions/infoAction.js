// import { connect } from 'react-redux';
import store from '../store';
// import axios from 'axios';
import EXIF from '../../node_modules/exif-js/exif';

import { setAlert } from './statesAction';

import {
    calculateLatLong,
    getId,
    clearImgExifdataTag,
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
    SUBMIT_READY_NO,
} from '../actions/types';

export const handleFileChange = (targetFileLocation, imgSrc) => async (
    dispatch
) => {
    // console.log(targetFileLocation === imgSrc);
    dispatch({
        type: SUBMIT_READY_NO,
        payload: false,
    });
    dispatch({
        type: IMAGE_READY_NO,
        payload: false,
    });
    dispatch({
        type: SET_LOADING,
        payload: true,
    });
    dispatch({
        type: CLEAR_INFO,
    });

    const newId = getId();
    const reader = new FileReader();
    reader.onload = function () {
        dispatch({
            type: GET_IMG_ID,
            payload: newId,
        });
        dispatch({
            type: GET_IMG_SRC,
            payload: reader.result,
        });
        if (reader.result === imgSrc) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            dispatch(handleFindInfo());
        }
        // console.log(reader.result === imgSrc);
    };
    reader.readAsDataURL(targetFileLocation);
};

const failed = (msg) => (dispatch) => {
    dispatch(setAlert(msg, 'error'));
    dispatch({
        type: SET_LOADING,
        payload: false,
    });
    dispatch({
        type: SUBMIT_READY_NO,
        payload: false,
    });
    dispatch({
        type: IMAGE_READY_NO,
        payload: false,
    });
};
export const handleFindInfo = (props) => async (dispatch) => {
    // console.log('handleFindInfo run');
    const imgId = store.getState().states.imgId;

    dispatch({
        type: SET_LOADING,
        payload: true,
    });
    const img1 = document.getElementById(imgId);
    let enterInfo;
    EXIF.getData(img1, async () => {
        let latitude;
        let longitude;
        const tags = EXIF.getAllTags(img1);
        // console.log(tags);
        if (tags.PixelXDimension < 200 || tags.PixelYDimension < 200) {
            dispatch(
                failed('Eye X or Y dimensions are too small, minimum of 200px')
            );
            return;
        }
        if (!tags.GPSLatitude || !tags.GPSLatitude) {
            dispatch(failed('Eyes require a GPS location to submit'));
            return;
        }
        // debugger;
        //~~~~~~~~~~~~~~lat-lon start~~~~~~~~~~~~~~~~~~~~~~
        const lat = tags.GPSLatitude;
        const latDegree = lat[0].numerator / lat[0].denominator;
        const latMinute = lat[1].numerator / lat[1].denominator;
        const latSecond = lat[2].numerator / lat[2].denominator;
        // const latSecond = lat[2].numerator / lat[2].denominator;
        const latDirection = tags.GPSLatitudeRef;
        const GPSLatitude = [latDegree, latMinute, latSecond, latDirection];

        const lon = tags.GPSLongitude;
        const lonDegree = lon[0].numerator / lon[0].denominator;
        const lonMinute = lon[1].numerator / lon[1].denominator;
        const lonSecond = lon[2].numerator / lon[2].denominator;
        // const lonSecond = lon[2].numerator / lon[2].denominator;
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
        const zoom = tags.DigitalZoomRation || null;
        const zoomCalc = zoom ? zoom.numerator / zoom.denominator : null;
        const fNumber = tags.FNumber || null;
        const apertureCalc = fNumber
            ? `f/${fNumber.numerator / fNumber.denominator}`
            : null;
        const exposure = tags.ExposureTime || null;
        const exposureCalc = exposure
            ? exposure.numerator / exposure.denominator
            : null;
        const altitude = tags.GPSAltitude || null;
        const altitudeCalc = altitude
            ? altitude.numerator / altitude.denominator
            : null;

        enterInfo = {
            latitude: latitude,
            longitude: longitude,
            altitude: altitudeCalc,
            camera: tags.Model && tags.Model,
            date: tags.DateTimeOriginal && tags.DateTimeOriginal,
            width: tags.PixelXDimension && tags.PixelXDimension,
            height: tags.PixelYDimension && tags.PixelYDimension,
            aperture: apertureCalc && apertureCalc,
            shutter: tags.ShutterSpeed && tags.ShutterSpeed,
            iso: tags.ISOSpeedRatings && tags.ISOSpeedRatings,
            exposure: exposureCalc && exposureCalc,
            light: tags.LightSource && tags.LightSource,
            flash: tags.Flash && tags.Flash,
            flashStrength: tags.FlashEnergy && tags.FlashEnergy,
            contrast: tags.Contrast && tags.Contrast,
            saturation: tags.Saturation && tags.Saturation,
            sharpness: tags.Sharpness && tags.Sharpness,
            brightness: tags.BrightnessValue && tags.BrightnessValue,
            whiteBalance: tags.WhiteBalance && tags.WhiteBalance,
            zoom: zoomCalc && zoomCalc,
            artist: tags.Artist && tags.Artist,
            software: tags.Software && tags.Software,
            copyright: tags.Copyright && tags.Copyright,
        };
        // console.log(zoom, 'zoom');
        // console.log(zoomCalc, 'zoomCalc');
        // console.log(enterInfo);
        dispatch({
            type: SET_INFO,
            payload: enterInfo,
        });
        dispatch({
            type: SUBMIT_READY_YES,
            payload: true,
        });
    });
    dispatch({
        type: SET_LOADING,
        payload: false,
    });
    //clear exifdata obj attacked to img so new image data can be updated
    clearImgExifdataTag(img1);
};

export const handleFileDrop = (event) => async (dispatch) => {
    event.preventDefault();
    const fileInput = document.querySelector('#insertedImg');
    const dT = event.dataTransfer.files[0];
    const fI = fileInput.files[0];
    if (
        dT &&
        fI &&
        dT.name === fI.name &&
        dT.lastModified === fI.lastModified &&
        dT.size === fI.size &&
        dT.type === fI.type
    ) {
        dispatch(setAlert('This is the same image, silly :^]', 'error'));
    } else {
        fileInput.files = event.dataTransfer.files;
        dispatch(handleFileChange(fileInput.files[0]));
    }
};
