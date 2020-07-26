import React from "react";
import ReactDOM from "react-dom";
import LoadingPage from "./components/LoadingPage"
import "normalize.css/normalize.css"
import "./styles/styles.scss";
import configureStore from "./store/configureStore";
import {Provider} from "react-redux";
import {startSetOptions} from "./actions/options";
import {login, logout } from "./actions/auth";
import { firebase } from "./firebase/firebase";
import AppRouter, {history} from "./routers/AppRouter";

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage/>, document.getElementById("app"));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const { uid } = user;
        store.dispatch(login(uid));
        store.dispatch(startSetOptions()).then(() => {
            renderApp();
            if (history.location.pathname === "/") {
                history.push("/app");
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push("/")
    }
});