import {
    SET_LOADING,
    IMAGE_READY_NO,
    IMAGE_READY_YES,
    SUBMIT_READY_YES,
    SUBMIT_READY_NO,
    GET_IMG_SRC,
    GET_IMG_ID
} from '../actions/types';

const initialStates = {
    imgSrc: '',
    imgId: '',
    imageReady: false,
    submitReady: false,
    loading: false
};

const states = (state = initialStates, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
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
        default:
            return state;
    }
};

export default states;
