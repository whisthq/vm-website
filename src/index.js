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
import HowItWorks from './components/PageHowItWorks/HowItWorks'
import NotFound from './components/PageNotFound/NotFound'
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
        </Router>
        <div style = {{width: '100%', height: 2, backgroundColor: 'black'}}></div>
        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', display: 'flex', fontSize: 15}}>
        <p style = {{margin: 0, width: '50%', textAlign: 'left'}}>Fractal, 2019</p>
        <a href = "mailto: hello@fractalcomputers.com" style = {{margin: 0, width: '50%', textAlign: 'right', color: 'black', fontWeight: 'bold'}}>
        Contact Us</a>
        </div>
    </PersistGate>
  </Provider>
)

ReactDOM.render(
  <Engine store={store} persistor={persistor} />,
  document.getElementById('root')
)

