import {
    SET_LOADING,
    IMAGE_READY_NO,
    IMAGE_READY_YES,
    SUBMIT_READY_YES,
    SUBMIT_READY_NO,
    GET_IMG_SRC,
    GET_IMG_ID,
    SET_ALERT,
    REMOVE_ALERT,
    RESET_IMG,
    CLOSE_THANKS,
    SUGGEST_LOCAL_TRUE,
    SUGGEST_LOCAL_FALSE
} from '../actions/types';

const initialStates = {
    imgSrc: '',
    imgId: '',
    imageReady: false,
    submitReady: false,
    loading: false,
    alerts: [],
    suggestLocal: false,
    needThanks: true
};

const states = (state = initialStates, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            };
        case RESET_IMG:
            return {
                ...state,
                imgSrc: initialStates.imgSrc,
                imgId: initialStates.imgId,
                imageReady: initialStates.imageReady,
                submitReady: initialStates.submitReady
            };
        case IMAGE_READY_NO:
        case IMAGE_READY_YES:
            return {
                ...state,
                imageReady: payload
            };
        case SUBMIT_READY_NO:
        case SUBMIT_READY_YES:
            return {
                ...state,
                submitReady: payload
            };
        case GET_IMG_SRC:
            return {
                ...state,
                imgSrc: payload
            };
        case GET_IMG_ID:
            return {
                ...state,
                imgId: payload
            };
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, payload]
            };
        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== payload)
            };
        case CLOSE_THANKS:
            return {
                ...state,
                needThanks: false
            };
        case SUGGEST_LOCAL_TRUE:
            return {
                ...state,
                suggestLocal: true
            };
        case SUGGEST_LOCAL_FALSE:
            return {
                ...state,
                suggestLocal: false
            };
        default:
            return state;
    }
};

export default states;
