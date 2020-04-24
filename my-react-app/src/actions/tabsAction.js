import { TOGGLE_SUGGESTION, TOGGLE_AVATAR_MENU } from './types';
export const toggleSuggestion = (suggest) => async (dispatch) => {
    dispatch({
        type: TOGGLE_SUGGESTION,
    });
};
export const toggleAvatarMenu = (onOff) => (dispatch) => {
    dispatch({
        type: TOGGLE_AVATAR_MENU,
        payload: onOff,
    });
};
