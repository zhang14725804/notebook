import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

import Reducer from '../reducers/Reducer';

let middlewares = [];
if (process.env.NODE_ENV === `development`) {
    // const {logger} = require(`redux-logger`);
    // middlewares.push(logger);
}
middlewares.push(thunkMiddleware);

let store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middlewares));

export default store;