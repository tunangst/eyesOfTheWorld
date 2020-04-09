import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FIND_USER,
    FIND_USER_EYES,
} from '../actions/types';

const initialUser = {
    userId: '',
    userToken: localStorage.getItem('userToken'),
    isAuthenticated: false,
    userObj: {},
    selectedUserEyes: [],
    selectedUserObj: {},
};

const user = (state = initialUser, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                userObj: payload,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('userToken', payload.token);
            return {
                ...state,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('userToken');
            return {
                ...state,
                userToken: null,
                isAuthenticated: false,
                userObj: initialUser.userObj,
            };
        case FIND_USER:
            return {
                ...state,
                selectedUserObj: payload,
            };
        case FIND_USER_EYES:
            return {
                ...state,
                selectedUserEyes: payload,
            };
        default:
            return state;
    }
};

export default user;
