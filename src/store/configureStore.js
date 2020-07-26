import {createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import optionReducer from "../reducers/option";
import authReducer from "../reducers/auth";

// Store creation

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            options: optionReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};