import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import rootReducer from './reducers';
import { combineReducers, applyMiddleware, createStore } from 'redux'
import { createBrowserHistory } from 'history'
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
import HowItWorks from './components/PageHowItWorks/HowItWorks'
import NotFound from './components/PageNotFound/NotFound'
import Checkout from './components/PageCheckout/Checkout'
import CheckoutMessage from './components/PageCheckoutMessage/CheckoutMessage'
import rootSaga from './sagas';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'

const persistConfig = {
  key: 'rootKey',
  storage,
}

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(persistConfig, rootReducer)

let middleware = [routerMiddleware(history), ReduxPromise, sagaMiddleware]

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

const Engine = ({ store, history, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Helmet>
        <title>Fractal</title>
      </Helmet>
      <Router>
            <Route exact path="/" component={App} />
            <Route exact path="/purchase" component={Purchase}  />
            <Route exact path="/auth" component={Auth} />
            <Route exact path="/story" component={Story} />
            <Route exact path="/howitworks" component={HowItWorks} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkedout" component={CheckoutMessage} />
            <Route exact path="/vm" component={VM}  />
        </Router>
        <div style = {{width: '100%', backgroundColor: '#111111', paddingTop: 35, paddingBottom: 35, fontSize: 15}}>
          <div style = {{maxWidth: 1000, display: 'flex', margin: 'auto', paddingLeft: 20, paddingRight: 20}}>
            <p style = {{margin: 0, width: '50%', textAlign: 'left', color: 'white'}}>Fractal, 2019</p>
            <a href = "mailto: hello@fractalcomputers.com" style = {{margin: 0, width: '50%', textAlign: 'right', color: 'white', fontWeight: 'bold'}}>
            Contact Us</a>
          </div>
        </div>
    </PersistGate>
  </Provider>
)

ReactDOM.render(
  <Engine store={store} persistor={persistor} />,
  document.getElementById('root')
)

