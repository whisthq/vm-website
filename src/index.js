import React from "react";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "store/reducers";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import ReduxPromise from "redux-promise";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "store/sagas";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import history from "utils/history";
import "static/Shared.css";
import { config } from "utils/constants.js";

import Purchase from "pages/PagePurchase/Purchase";
import Product from "pages/PageProduct/Product";
import Auth from "pages/PageAuth/Auth";
import Landing from "pages/PageLanding/Landing";
import Dashboard from "pages/PageDashboard/Dashboard";
import Reset from "pages/PageReset/Reset";
import Privacy from "pages/PageLegal/Privacy";
import Cookie from "pages/PageLegal/CookiePolicy";
import TermsOfService from "pages/PageLegal/TermsOfService";
import EmailVerification from "pages/PageAuth/EmailVerification";
import CreditCard from "pages/PagePurchase/CreditCard";
import About from "pages/PageAbout/About";
import Plan from "pages/PagePurchase/Plan";
import Storage from "pages/PagePurchase/Storage";
import Careers from "pages/PageCareers/Careers";
import NotFound from "pages/Page404/NotFound";
import Changelog from "pages/PageChangelog/Changelog";

import * as Sentry from "@sentry/react";

Sentry.init({
    dsn:
        "https://9a25b78ce37b4f7db2ff1a4952c1e3a8@o400459.ingest.sentry.io/5394481",
    environment: config.sentry_env,
    release: "website@" + process.env.REACT_APP_VERSION,
});

const sentryReduxEnhancer = Sentry.createReduxEnhancer({});

const persistConfig = {
    key: "rootKey",
    storage,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

let middleware = [routerMiddleware(history), ReduxPromise, sagaMiddleware];

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware), sentryReduxEnhancer)
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/product" component={Product} />
                    <Route exact path="/purchase" component={Purchase} />
                    <Route exact path="/auth" component={Auth} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/home" component={Landing} />
                    <Route exact path="/reset" component={Reset} />
                    <Route exact path="/privacy" component={Privacy} />
                    <Route
                        exact
                        path="/termsofservice"
                        component={TermsOfService}
                    />
                    <Route exact path="/cookie" component={Cookie} />
                    <Route path="/verify" component={EmailVerification} />
                    <Route exact path="/card" component={CreditCard} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/careers" component={Careers} />
                    <Route exact path="/changelog" component={Changelog} />
                    <Route exact path="/plan" component={Plan} />
                    <Route exact path="/storage" component={Storage} />
                    <Route component={NotFound} />
                </Switch>
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById("root")
);
