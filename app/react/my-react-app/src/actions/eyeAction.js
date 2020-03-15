import axios from 'axios';

import {
    GET_ALL_EYES,
    GET_EYE,
    SET_LOADING,
    BUILD_EYE,
    CLEAR_EYE,
    CLEAR_INFO,
    SUBMIT_READY_NO,
    IMAGE_READY_NO,
    SET_ALERT
} from '../actions/types';

import { removeImg } from '../extra/utilityFunctions/utilities';
import { setAlert } from './statesAction';

export const getAllEyes = () => async dispatch => {
    try {
        const eyes = await axios.get('/api/eyes');
        //maybe put a sort method by uploadDate
        const eyesData = eyes.data;

        dispatch({
            type: GET_ALL_EYES,
            payload: eyesData
        });
        // return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export const findEye = eyeId => async dispatch => {
    console.log(`******** findEye function ***********`);
    try {
        const eye = await axios.get(`/api/eyes/${eyeId}`);
        // const image = await axios.get(`/api/images/${eyeId}`);
        const eyeData = eye.data;
        // console.log(eye);
        // console.log(eyeData);
        dispatch({
            type: GET_EYE,
            payload: eyeData
        });
        // return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export const buildEye = eye => async dispatch => {
    dispatch({
        type: BUILD_EYE
    });
};
export const clearEye = () => async dispatch => {
    dispatch({
        type: CLEAR_EYE
    });
};

export const submitEye = (event, userId) => async dispatch => {
    event.preventDefault();
    dispatch({
        type: SET_LOADING,
        payload: true
    });

    // console.log(file);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: event => {
            console.log(event.loaded, event.total);
        }
    };

    try {
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
        const picForm = document.querySelector(`#picForm`);
        let imageBody = new FormData(picForm);
        const img = await axios.post('/api/image', imageBody, config);
        // console.log(
        //     `888888888888888888888img  ${img} gmi888888888888888888888`
        // );
        const imgUrl = img.data.imageUrl;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~image thing
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~eye thing

        let picCollection = [...imageBody];
        const file = picCollection[0][1];
        const fileInfo = {
            name: file.name,
            size: file.size / (1024 * 1024),
            type: file.type
        };

        // console.log(fileInfo);

        const infoForm = document.querySelector(`#infoForm`);
        let infoBody = new FormData(infoForm);
        infoBody.append('picName', fileInfo.name);
        infoBody.append('picSize', fileInfo.size);
        infoBody.append('picType', fileInfo.type);

        infoBody.append('url', imgUrl);
        infoBody.append('user', userId);

        const eye = await axios.post('/api/eyes/upload', infoBody, config);
        console.log(eye);
        // clear info
        dispatch({
            type: CLEAR_INFO
        });
        //remove img
        removeImg();
        //submit not ready
        dispatch({
            type: IMAGE_READY_NO,
            payload: false
        });
        dispatch({
            type: SUBMIT_READY_NO,
            payload: false
        });
    } catch (error) {
        // alert(error);
        error.response.data.msg &&
            dispatch(setAlert(error.response.data.msg, 'error'));
    }
    dispatch({
        type: SET_LOADING,
        payload: false
    });
};
