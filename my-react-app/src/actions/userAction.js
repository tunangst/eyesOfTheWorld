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
} from './types';
import setAuthToken from '../extra/utilityFunctions/setAuthToken';
import { setAlert } from './statesAction';
import { set } from 'mongoose';

export const loadUser = () => async (dispatch) => {
    if (localStorage.userToken) {
        setAuthToken(localStorage.userToken);
    }
    try {
        const response = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
export const register = (userObj, imgState) => async (dispatch) => {
    const { username, email, password } = userObj;
    let { avatar } = userObj;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // if !imgState ? get default picture link and implrement it

    if (!imgState) {
        const avatarResponse = await axios.get('/api/image/avatar');
        const avatarPool = avatarResponse.data;
        const randomIndex = Math.floor(Math.random() * avatarPool.length);
        avatar = avatarPool[randomIndex];
    }

    try {
        const body = JSON.stringify({ username, email, password, avatar });
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
            payload: response.data,
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error);
        dispatch(setAlert(error.response.data.msg, 'error'));

        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    console.log('in login function');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    try {
        const response = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
        dispatch(loadUser());
    } catch (error) {
        console.log(error.response.data.msg);
        dispatch(setAlert(error.response.data.msg, 'error'));
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
export const editProfile = (updatedUser, id) => async (dispatch) => {
    console.log('in editProfile function');
    // console.log(updatedUser);
    // const userId = updatedUser.id;
    // console.log(userId);
    console.log(updatedUser, 'updated user');
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const body = JSON.stringify(updatedUser);
        const response = await axios.put(`/api/user/${id}`, body, config);
        console.log('in userAction');
        console.log(response);
        console.log('in userAction');

        dispatch(setAlert(response.data.msg, 'success'));
    } catch (error) {
        console.log(error.message);
        // console.log(error.response.data.msg);
        dispatch(setAlert('error', 'error'));
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const getUserAndEyes = (userId) => async (dispatch) => {
    const foundUser = await axios.get(`/api/user/${userId}`);
    const foundUserEyes = await axios.get(`/api/eyes/user/${userId}`);
    dispatch({
        type: FIND_USER,
        payload: foundUser.data,
    });
    dispatch({
        type: FIND_USER_EYES,
        payload: foundUserEyes.data,
    });
};
export const getUser = (userId) => async (dispatch) => {
    const foundUser = await axios.get(`/api/user/${userId}`);
    dispatch({
        type: FIND_USER,
        payload: foundUser.data,
    });
    return foundUser.data;
};

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
