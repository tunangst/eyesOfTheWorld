// import axios from 'axios';
import { getId } from '../extra/utilityFunctions/utilities';

import {
    SET_LOADING,
    SUBMIT_READY_YES,
    SUBMIT_READY_NO,
    IMAGE_READY_YES,
    IMAGE_READY_NO,
    SET_ALERT,
    REMOVE_ALERT,
    CLOSE_THANKS,
    SUGGEST_LOCAL_TRUE,
    SUGGEST_LOCAL_FALSE
} from './types';

export const setLoading = toggle => async dispatch => {
    dispatch({
        type: SET_LOADING,
        payload: toggle
    });
};

export const handleSubmitReady = toggle => async dispatch => {
    console.log(`calling handleSubmitReady`);
    if (toggle) {
        dispatch(setLoading(false));
        dispatch({
            type: SUBMIT_READY_YES,
            payload: true
        });
    } else {
        dispatch({
            type: SUBMIT_READY_NO,
            payload: false
        });
    }
};

export const handleImageReady = toggle => async dispatch => {
    toggle
        ? dispatch({
              type: IMAGE_READY_YES,
              payload: true
          })
        : dispatch({
              type: IMAGE_READY_NO,
              payload: false
          });
};

export const setAlert = (msg, alertType, timeout = 5000) => async dispatch => {
    const id = getId();
    console.log('msg', msg);
    console.log('alertType', alertType);
    dispatch({
        type: SET_ALERT,
        payload: { msg: msg, alertType: alertType, id: id }
    });
    setTimeout(
        () =>
            dispatch({
                type: REMOVE_ALERT,
                payload: id
            }),
        timeout
    );
};

export const removeAlert = id => async dispatch => {
    dispatch({
        type: REMOVE_ALERT,
        payload: id
    });
};

export const setThanks = (msg, alertType) => async dispatch => {
    dispatch(setAlert(msg, alertType));
    dispatch({
        type: CLOSE_THANKS
    });
};

export const setLocal = trueOrFalse => async dispatch => {
    trueOrFalse
        ? dispatch({
              type: SUGGEST_LOCAL_TRUE
          })
        : dispatch({
              type: SUGGEST_LOCAL_FALSE
          });
};
