import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { userLogin, userSignup, logout } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import "react-tabs/style/react-tabs.css";
import '../../static/App.css';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      emailLogin: '', passwordLogin: '', emailSignup: '', passwordSignup: '', passwordConfirmSignup: '',
      validEmail: false, tooShort: false, failed_attempt: false, processing: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeEmailLogin = this.changeEmailLogin.bind(this)
    this.changePasswordLogin = this.changePasswordLogin.bind(this)
    this.changeEmailSignup = this.changeEmailSignup.bind(this)
    this.changePasswordSignup = this.changePasswordSignup.bind(this)
    this.changePasswordConfirmSignup = this.changePasswordConfirmSignup.bind(this) 
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin(evt) {
    this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
  }

  handleSignup(evt) {
    this.props.dispatch(userSignup(this.state.emailSignup, this.state.passwordSignup, false))
  }

  changeEmailLogin(evt) {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  loginKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
    }
  }

  signupKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.dispatch(userSignup(this.state.emailSignup, this.state.passwordSignup, false))
    }
  }

  changePasswordLogin(evt) {
    if(evt.key === 'Enter') {
      this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
    } else {
      this.setState({
        passwordLogin: evt.target.value
      });
    }
  }

  changeEmailSignup(evt) {
    this.setState({emailSignup: evt.target.value}, function () {
      if(this.state.emailSignup.includes('@')) {
        this.setState({ validEmail: true})
      } else {
        this.setState({ validEmail: false})
      }
    });
  }

  changePasswordSignup(evt) {
    this.setState({passwordSignup: evt.target.value}, function () {
      if(this.state.passwordSignup.length < 7 && this.state.passwordSignup.length > 0) {
        this.setState({ tooShort: true})
      } else {
        this.setState({ tooShort: false})
      }
    });
  }

  changePasswordConfirmSignup(evt) {
    this.setState({passwordConfirmSignup: evt.target.value}, function () {
      if(this.state.passwordSignup === this.state.passwordConfirmSignup) {
        this.setState({ matches: true})
      } else {
        this.setState({ matches: false})
      }
    });
  }

  acceptTerms = (event) => {
    const target = event.target;
    if(target.checked) {
      console.log("accepted")
    } else {
      console.log("not accepted")
    }
  }

  componentDidMount() {
    this.setState({'failures': this.props.failed_attempts})
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.failed_attempts != this.props.failed_attempts && !this.state.failed_attempt) {
      this.setState({'failed_attempt': true})
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div>
        {
        this.props.loggedIn
        ?
        <Redirect to = "/dashboard"/>
        :
        <div>
        <Header  color = "#333333" button = "#5ec3eb"/>
        <div style = {{minHeight: '100vh', paddingTop: 90, backgroundColor: 'white'}}>
            <div style = {{backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 2, border: 'solid 1px white', padding: '40px 40px 60px 40px', maxWidth: 425, marginBottom: 80, margin: 'auto'}}>
              <Tabs>
                <TabList style = {{textAlign: 'center', border: 'none', border: 'none', fontWeight: 'bold', fontSize: 16}}>
                  <Tab>LOG IN</Tab>
                  <Tab>SIGN UP</Tab>
                </TabList>
                <TabPanel style = {{padding: '15px 30px'}}>
                  <InputGroup className="mb-3" style = {{marginTop: 30}}>
                    <FormControl
                      type = "email"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Email Address"
                      onChange = {this.changeEmailLogin}
                      onKeyPress = {this.loginKeyPress}
                      style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                    /><br/>
                  </InputGroup>
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      aria-label="Default"
                      type = "password"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Password"
                      onChange = {this.changePasswordLogin}
                      onKeyPress = {this.loginKeyPress}
                      style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                    />
                  </InputGroup>
                  {
                  this.state.failed_attempt
                  ?
                  <div style = {{textAlign: 'center', fontSize: 14, color: "#a62121"}}>Invalid credentials</div>
                  :
                  <div style = {{height: 20}}></div>
                  }
                  <Button  onClick = {this.handleLogin} style = {{marginTop: 50, color: 'white', width: '100%', border: 'none', background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold'}}>LOG IN</Button>
                  <HashLink to = "/reset" style = {{textDecoration: 'none'}}><div style = {{color: '#94a8ed', textAlign: 'center', marginTop: 50, color: '#888', textDecoration: 'none'}}>Forgot Password?</div></HashLink>
                </TabPanel>
                <TabPanel style = {{padding: '15px 30px'}}>
                  <InputGroup className="mb-3" style = {{marginTop: 30}}>
                    <FormControl
                      type = "email"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Email Address"
                      onChange = {this.changeEmailSignup}
                      style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                    />
                    {
                    !this.state.validEmail && this.state.emailSignup.length > 1
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Invalid Email
                    </div>
                    :
                    (
                    this.state.emailSignup.length > 1
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                    </div>
                    :
                    <div></div>
                    )
                    }
                  </InputGroup>
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      aria-label="Default"
                      type = "password"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Password"
                      onChange = {this.changePasswordSignup}
                      style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                    />
                    {
                    this.state.tooShort
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Too Short
                    </div>
                    :
                    (
                    this.state.passwordSignup.length > 0
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                    </div>
                    :
                    <div></div>
                    )
                    }
                  </InputGroup>
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      aria-label="Default"
                      type = "password"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Confirm Password"
                      onChange = {this.changePasswordConfirmSignup}
                      style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                    />
                    {
                    !this.state.matches && this.state.passwordConfirmSignup.length > 0
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Doesn't Match
                    </div>
                    :
                    (
                    this.state.passwordConfirmSignup.length > 0
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheckCircle style = {{marginRight: 5, position: 'relative', bottom: 2, color: '#62CEE6'}}/>
                    </div>
                    :
                    <div></div>
                    )
                    }
                  </InputGroup>
                  <Button onClick = {this.handleSignup} style = {{marginTop: 40, color: 'white', width: '100%', backgroundColor: '#94a8ed', border: 'none', background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold'}}>SIGN UP</Button>
                  <div style = {{marginTop: 25, display: 'flex'}}>
                    <label className = "termsContainer">
                      <input
                        type="checkbox"
                        onChange={this.acceptTerms} /> 
                      <span className ="checkmark"></span>
                    </label>

                    <div style = {{fontSize: 12}}>
                      I accept the Terms of Service and Privacy Policy
                    </div>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
        </div>
      </div>
      }
    </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    failed_attempts: state.AccountReducer.failed_attempts
  }
}


export default connect(mapStateToProps)(Auth);