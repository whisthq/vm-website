import React from 'react';
import ReactDOM from 'react-dom';
import './static/index.css';
import App from './pages/App';
import Story from './pages/story';
import HowItWorks from './pages/howitworks'
import * as serviceWorker from './pages/serviceWorker';
import Banner from './pages/banner.js';
import SignupBox from './pages/signupbox.js'
import Header from './pages/header.js'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <div className = 'App'>
	  <Banner object = {<SignupBox/>}/>
	  <Router>
	    <div>
	      <Header/>
	      <Route exact path="/" component={App} />
	      <Route path="/story" component={Story} />
	      <Route path="/howitworks" component={HowItWorks} />
	        <div style = {{width: '100%', height: 2, backgroundColor: 'black'}}></div>
	        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', display: 'flex', fontSize: 15}}>
	          <p style = {{margin: 0, width: '60%'}}>Fractal, 2019</p>
	        </div>
	    </div>
	  </Router>
	</div>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
