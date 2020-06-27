import { GET_ALL_EYES, FILTER_EYES, CLEAR_EYES } from '../actions/types';

const initialEyes = [];

const eyes = (state = initialEyes, action) => {
    const { type, payload } = action;
    switch (type) {
        case CLEAR_EYES:
            return initialEyes;
        case GET_ALL_EYES:
            return [...state, ...payload];
        case FILTER_EYES:
            return [...payload];
        default:
            return state;
    }
};

export default eyes;
