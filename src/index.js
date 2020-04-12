/**/import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import rootReducer from './reducers';
import { combineReducers, applyMiddleware, createStore } from 'redux'
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import ReduxPromise from 'redux-promise'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from './sagas';
import { Route, Switch, Link, HashRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { Helmet } from 'react-helmet'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import history from "./history";
import { HashLink } from 'react-router-hash-link'
import './static/App.css';
import Footer from './shared_components/footer'
import MetaTags from 'react-meta-tags';

import Purchase from './components/PageCubePurchase/Purchase'
import Auth from './components/PageAuth/Auth'
import NewHome from './components/PageHomeNew/NewHome'
import HomeStudios from './components/PageHomeStudios/HomeStudios'
import Dashboard from './components/PageDashboard/Dashboard'
import Reset from './components/PageReset/Reset'
import Privacy from './components/PageLegal/Privacy'
import TermsOfService from './components/PageLegal/TermsOfService'
import EmailVerification from './components/PageAuth/EmailVerification'
import CreditCard from './components/PageCubePurchase/CreditCard'
import About from './components/PageAbout/About'

const persistConfig = {
  key: 'rootKey',
  storage,
}


const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware = [routerMiddleware(history), ReduxPromise, sagaMiddleware]

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

console.log(process.env.NODE_ENV)

ReactDOM.render(
    <Router history = {history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MetaTags>
            <title>Fractal</title>
            <meta name="description" content="Fractal streams a powerful computer to any deivce." />
            <meta property="og:title" content="Fractal" />
            <meta property="og:image" content="./assets/datacenter.svg" />
          </MetaTags>
              <Route exact path="/" component={NewHome} />
              <Route exact path="/purchase" component={Purchase}  />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/home" component={NewHome} />
              <Route exact path="/studios" component = {HomeStudios} />
              <Route exact path="/reset" component={Reset} />
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/termsofservice" component={TermsOfService} />
              <Route exact path="/verify" component={EmailVerification} />
              <Route exact path="/card" component={CreditCard} />
              <Route exact path="/about" component={About}/>
          </PersistGate>
          </Provider>
      </Router>,
  document.getElementById('root')
)

