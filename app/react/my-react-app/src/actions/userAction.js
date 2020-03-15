import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    FIND_USER,
    FIND_USER_EYES,
    SET_ALERT
    // GET_PROFILE
} from './types';
import setAuthToken from '../extra/utilityFunctions/setAuthToken';
import { setAlert } from './statesAction';

// import {
//     GET_ALL_EYES,
//     GET_EYE,
//     SET_LOADING,
//     BUILD_EYE,
//     CLEAR_EYE
// } from '../actions/types';
export const loadUser = () => async dispatch => {
    if (localStorage.userToken) {
        console.log('local storage token found, setting auth token');
        setAuthToken(localStorage.userToken);
    }
    try {
        const response = await axios.get('/api/auth');
        // console.log(response);
        dispatch({
            type: USER_LOADED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};
export const register = userObj => async dispatch => {
    const { username, email, password } = userObj;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const body = JSON.stringify({ username, email, password });
        console.log(body);
        const response = await axios.post('/api/user', body, config);
        // {
        //     user: {
        //       username: "ImANewUser",
        //       avatar: "https://robohash.org/imanewuser.png",
        //       bio: "A new user to the app."
        //     },
        //     jwt: "aaaaaaa.bbbbbbbb.ccccccc"
        //   }
        dispatch(setAlert('Welcome to the world :^]', 'success'));
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error);
        dispatch(setAlert(error.response.data.msg, 'error'));

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const response = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setAlert(error.response.data.msg, 'error'));
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const getUserAndEyes = userId => async dispatch => {
    // console.log(userId)
    const foundUser = await axios.get(`/api/user/${userId}`);
    const foundUserEyes = await axios.get(`/api/eyes/user/${userId}`);
    dispatch({
        type: FIND_USER,
        payload: foundUser.data
    });
    dispatch({
        type: FIND_USER_EYES,
        payload: foundUserEyes.data
    });
};

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
// export const login = (email, password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     const body = JSON.stringify({ email, password });
//     try {
//         const response = await axios.post('/api/auth', body, config);
//         dispatch({
//             LOGIN_SUCCESS,
//             payload: response.data
//         });
//         dispatch(loadUser());
//     } catch (error) {
//         console.log(error);
//     }
// };

// export const findUserEyes = userId => async dispatch => {
//     console.log('||||findUserEyes||||');
//     console.log(userId);
//     const foundUserEyes = await axios.get(`/api/eyes/user/${userId}`);
//     console.log(foundUserEyes);
//     console.log('^^^^findUserEyes^^^^');
// };
// export const findUser = userId => async dispatch => {
//     console.log('||||findUser||||');
//     const foundUser = await axios.get(`/api/user/${userId}`);
//     console.log(foundUser);
//     console.log('^^^^findUser^^^^');
// };
