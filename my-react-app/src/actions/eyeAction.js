import axios from 'axios';

import {
    GET_ALL_EYES,
    GET_EYE,
    SET_LOADING,
    BUILD_EYE,
    CLEAR_EYE,
    CLEAR_EYES,
    CLEAR_INFO,
    RESET_IMG,
    SUBMIT_READY_NO,
} from '../actions/types';

import { setAlert } from './statesAction';
import { getUserAndEyes, getUser } from './userAction';

export const getAllEyes = () => async (dispatch) => {
    try {
        const eyes = await axios.get('/api/eyes');
        //maybe put a sort method by uploadDate
        const eyesData = eyes.data;

        dispatch({
            type: GET_ALL_EYES,
            payload: eyesData,
        });
        // return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export const findEye = (eyeId) => async (dispatch) => {
    // console.log(`******** findEye function ***********`);
    try {
        const eye = await axios.get(`/api/eyes/${eyeId}`);
        // const image = await axios.get(`/api/images/${eyeId}`);
        const eyeData = eye.data;

        dispatch({
            type: GET_EYE,
            payload: eyeData,
        });
        // return eyeData;
    } catch (error) {
        console.error(error);
    }
};

export const buildEye = (eye) => async (dispatch) => {
    dispatch({
        type: BUILD_EYE,
    });
};
export const clearEye = () => async (dispatch) => {
    dispatch({
        type: CLEAR_EYE,
    });
};

export const submitEye = (event, userObj, lat, lon) => async (dispatch) => {
    if (
        window.confirm(
            'Your file name is the name of your Eye, be sure it describes it accurately'
        )
    ) {
        // console.log('userId ', userObj._id);
        // console.log('userEmail ', userObj.email);
        event.preventDefault();
        dispatch({
            type: SUBMIT_READY_NO,
            payload: false,
        });
        if (!userObj.email) {
            dispatch(setAlert('Not logged in', 'error'));
            return;
        }
        dispatch({
            type: SET_LOADING,
            payload: true,
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const findConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const infoForm = document.querySelector(`#infoForm`);
            let infoBody = new FormData(infoForm);

            const findBody = JSON.stringify({ lat: lat, lon: lon });
            // console.log(findBody);

            //|||||||||||||||||||||||||||| if already posted error will throw ||||||||
            await axios.post('/api/eyes/upload/check', findBody, findConfig);
            //|||||||||||||||||||||||||||| if already posted error will throw ||||||||
            const picForm = document.querySelector(`#picForm`);
            let imageBody = new FormData(picForm);

            const directoryName = userObj.email;
            imageBody.append('directoryName', directoryName);

            //||||||||||||||||||||||||||| send image post ||||||||||||||||||
            const img = await axios.post(
                `/api/image/${directoryName}`,
                imageBody,
                config
            );
            const imgUrl = img.data.imageUrl;
            // console.log(imgUrl);

            let picCollection = [...imageBody];
            const file = picCollection[0][1];
            const fileInfo = {
                name: file.name,
                size: file.size / (1024 * 1024),
                type: file.type,
            };

            infoBody.append('picName', fileInfo.name);
            infoBody.append('picSize', fileInfo.size);
            infoBody.append('picType', fileInfo.type);
            infoBody.append('url', imgUrl);
            infoBody.append('user', userObj._id);

            let arr = [...infoBody];
            console.log(arr);
            debugger;
            //|||||||||||||||||||||||||||||||| send eye post ||||||||||||||||
            await axios.post('/api/eyes/upload', infoBody, config);

            // console.log(eye.data);
            // clear info

            dispatch({
                type: CLEAR_INFO,
            });

            //submit not ready
            dispatch({
                type: RESET_IMG,
            });
            dispatch(setAlert('Thank you. Eye has been placed', 'success'));
        } catch (error) {
            console.log(error.response.data.msg);
            error.response.data.msg &&
                dispatch(setAlert(error.response.data.msg || 'Error', 'error'));
        }
        dispatch({
            type: CLEAR_EYES,
        });
        dispatch(getAllEyes());
    }
    dispatch({
        type: SET_LOADING,
        payload: false,
    });
};
export const removeEye = (id, url, userId) => async (dispatch) => {
    dispatch({
        type: SET_LOADING,
        payload: true,
    });
    if (window.confirm('Are you sure? This removal can NOT be undone!')) {
        try {
            const eyeResponse = await axios.delete(`/api/eyes/${id}`);
            eyeResponse && dispatch(setAlert(eyeResponse.data.msg, 'success'));

            const split = url.split('EyesOfTheWorld/')[1].split('/');
            // const email = split[0];
            const public_id = split[1].split('.jpg')[0];

            // console.log(public_id);

            //find user
            const userData = await dispatch(getUser(userId));
            // console.log(userData);
            // console.log('^^^^^^^^^^^^^^^^userData^^^^^^^^^^^^^^');

            const imgResponse = await axios.delete(
                `/api/image/${userData.email}/${public_id}`
            );

            imgResponse &&
                dispatch(setAlert(imgResponse.data.msg, imgResponse.data.type));
            dispatch(getUserAndEyes(userId));
        } catch (error) {
            console.log(error);
            console.log(error.message);
            dispatch(setAlert(error.message, 'error'));
        }
    }
    dispatch({
        type: SET_LOADING,
        payload: false,
    });
};
