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
import App from './components/PageHome/App';
import Purchase from './components/PageCubePurchase/Purchase'
import Auth from './components/PageAuth/Auth'
import Story from './components/PageStory/Story'
import VM from './components/PageVirtualMachine/VM'
import NewHome from './components/PageHomeNew/NewHome'
import Dashboard from './components/PageDashboard/Dashboard'
import HowItWorks from './components/PageHowItWorks/HowItWorks'
import NotFound from './components/PageNotFound/NotFound'
import Checkout from './components/PageCheckout/Checkout'
import CheckoutMessage from './components/PageCheckoutMessage/CheckoutMessage'
import Reset from './components/PageReset/Reset'
import rootSaga from './sagas';
import { Route, Switch, Link, HashRouter } from 'react-router-dom';
import { Router } from 'react-router';
import { Helmet } from 'react-helmet'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import history from "./history";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { HashLink } from 'react-router-hash-link'
import './static/App.css';
import Footer from './shared_components/footer'

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

ReactDOM.render(
    <Router history = {history}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Helmet>
            <title>Fractal</title>
          </Helmet>
              <Route exact path="/" component={NewHome} />
              <Route exact path="/purchase" component={Purchase}  />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/story" component={Story} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/checkedout" component={CheckoutMessage} />
              <Route exact path="/vm" component={VM}  />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/home" component={NewHome} />
              <Route exact path="/reset" component={Reset} />
          </PersistGate>
          </Provider>
      </Router>,
  document.getElementById('root')
)

