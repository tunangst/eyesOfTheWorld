import { TOGGLE_SUGGESTION } from '../actions/types';

const initialTab = {
    suggestions: false,
};

const tabs = (state = initialTab, action) => {
    const { type, payload } = action;
    switch (type) {
        case TOGGLE_SUGGESTION:
            return {
                ...state,
                suggestions: !state.suggestions,
            };
        default:
            return state;
    }
};

export default tabs;
