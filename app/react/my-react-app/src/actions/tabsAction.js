import { TOGGLE_SUGGESTION } from './types';
export const toggleSuggestion = () => async dispatch => {
    dispatch({
        type: TOGGLE_SUGGESTION
    });
};
