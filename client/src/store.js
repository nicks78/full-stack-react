// redux store 
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';
import reducers from './reducers';
import {persistStore, autoRehydrate} from 'redux-persist'

const logger = (store) => (next) => (action) => {
    if(typeof action !== "function"){
        console.log('dispatching:', action);
    }
    return next(action);
}


const store = createStore(reducers,
    compose(
    applyMiddleware(logger, thunk),
    autoRehydrate()
    ,window.devToolsExtension ? window.devToolsExtension() : f => f
));

// begin periodically persisting the store
persistStore(store, { whitelist: ['authReducer'] })

export default store;