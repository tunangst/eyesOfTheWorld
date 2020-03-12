import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const initialUser = {
    userToken: localStorage.getItem('userToken'),
    isAuthenticated: false,
    user: null
};

const user = (state = initialUser, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            console.log(type);
            console.log(payload);
            localStorage.setItem('userToken', payload.token);
            return {
                ...state,
                isAuthenticated: true
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('userToken');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default user;
