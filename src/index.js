import React from "react";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import ReduxPromise from "redux-promise";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "./sagas";
import { Route } from "react-router-dom";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import history from "./history";
import "./static/App.css";

import Purchase from "./components/PagePurchase/Purchase";
import Auth from "./components/PageAuth/Auth";
import NewHome from "./components/PageHomeNew/NewHome";
import Dashboard from "./components/PageDashboard/Dashboard";
import Reset from "./components/PageReset/Reset";
import Privacy from "./components/PageLegal/Privacy";
import Cookie from "./components/PageLegal/CookiePolicy";
import TermsOfService from "./components/PageLegal/TermsOfService";
import EmailVerification from "./components/PageAuth/EmailVerification";
import CreditCard from "./components/PagePurchase/CreditCard";
import About from "./components/PageAbout/About";

const persistConfig = {
    key: "rootKey",
    storage,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [routerMiddleware(history), ReduxPromise, sagaMiddleware];

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

console.log(process.env.NODE_ENV);

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Route exact path="/" component={NewHome} />
                <Route exact path="/purchase" component={Purchase} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/home" component={NewHome} />
                <Route exact path="/reset" component={Reset} />
                <Route exact path="/privacy" component={Privacy} />
                <Route
                    exact
                    path="/termsofservice"
                    component={TermsOfService}
                />
                <Route exact path="/cookie" component={Cookie} />
                <Route exact path="/verify" component={EmailVerification} />
                <Route exact path="/card" component={CreditCard} />
                <Route exact path="/about" component={About} />
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById("root")
);
