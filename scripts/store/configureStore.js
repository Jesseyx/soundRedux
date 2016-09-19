import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/index';

// const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
    // const store = createStoreWithMiddleware(rootReducer, initialState);
    // this is an other way to create store
    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunkMiddleware, loggerMiddleware()))
    )

    return store;
}
