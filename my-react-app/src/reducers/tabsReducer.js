import { TOGGLE_SUGGESTION, TOGGLE_AVATAR_MENU } from '../actions/types';

const initialTab = {
    suggestions: false,
    avatarMenu: false,
};

const tabs = (state = initialTab, action) => {
    const { type, payload } = action;
    switch (type) {
        case TOGGLE_SUGGESTION:
            return {
                ...state,
                suggestions: !state.suggestions,
            };
        case TOGGLE_AVATAR_MENU:
            let onOff = payload;
            if (payload === 'toggle') {
                onOff = !state.avatarMenu;
            }
            return {
                ...state,
                avatarMenu: onOff,
            };

        default:
            return state;
    }
};

export default tabs;
