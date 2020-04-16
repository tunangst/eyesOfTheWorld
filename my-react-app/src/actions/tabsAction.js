import { TOGGLE_SUGGESTION } from './types';
export const toggleSuggestion = (suggest) => async (dispatch) => {
    dispatch({
        type: TOGGLE_SUGGESTION,
    });
};
