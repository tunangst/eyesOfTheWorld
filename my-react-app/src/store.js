import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const compose = composeWithDevTools(applyMiddleware(...middleware));

console.log(rootReducer);
console.log(compose);

const store = createStore(rootReducer, initialState, compose);

export default store;
