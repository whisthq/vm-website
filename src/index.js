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
import { Route } from "react-router-dom";
import { Router } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import history from "utils/history";
import "static/Shared.css";

import Purchase from "pages/PagePurchase/Purchase";
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
import Changelog from "pages/PageChangelog/Changelog";

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

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Route exact path="/" component={Landing} />
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
                <Route exact path="/verify" component={EmailVerification} />
                <Route exact path="/card" component={CreditCard} />
                <Route exact path="/about" component={About} />
                <Route path="/careers" component={Careers} />
                <Route path="/changelog" component={Changelog} />
                <Route exact path="/plan" component={Plan} />
                <Route exact path="/storage" component={Storage} />
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById("root")
);
