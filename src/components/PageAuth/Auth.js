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
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'
import { userLogin, userSignup, logout, changeTab, subscribeNewsletter } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import "react-tabs/style/react-tabs.css";
import '../../static/App.css';

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      emailLogin: '', passwordLogin: '', emailSignup: '', passwordSignup: '', passwordConfirmSignup: '',
      validEmail: false, tooShort: false, failed_login_attempt: false, processing: false,
      failed_signup_attempt: false, termsAccepted: false, subscribed: true, lock: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  handleLogin = (evt) => {
    this.setState({processing: true, failed_login_attempt: false})
    this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
  }

  handleSignup = (evt) => {
    this.setState({processing: true, failed_signup_attempt: false})
    this.props.dispatch(userSignup(this.state.emailSignup, this.state.passwordSignup, false))
    if(this.state.subscribed) {
      this.props.dispatch(subscribeNewsletter(this.state.emailSignup))
    }
  }

  changeEmailLogin = (evt) => {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  loginKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.emailLogin.length > 4 && this.state.passwordLogin.length > 6 && this.state.emailLogin.includes('@')){
      this.setState({processing: true, failed_login_attempt: false})
      this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
    }
  }

  signupKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.validEmail && !this.state.tooShort && this.state.matches && this.state.termsAccepted) {
      this.setState({processing: true, failed_signup_attempt: false})
      this.props.dispatch(userSignup(this.state.emailSignup, this.state.passwordSignup, false))
    }
  }

  changePasswordLogin = (evt) => {
    if(evt.key === 'Enter') {
      this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin, false));
    } else {
      this.setState({
        passwordLogin: evt.target.value
      });
    }
  }

  changeEmailSignup = (evt) => {
    this.setState({emailSignup: evt.target.value}, function () {
      if(this.state.emailSignup.includes('@')) {
        this.setState({ validEmail: true})
      } else {
        this.setState({ validEmail: false})
      }
    });
  }

  changePasswordSignup = (evt) => {
    this.setState({passwordSignup: evt.target.value}, function () {
      if(this.state.passwordSignup.length < 7 && this.state.passwordSignup.length > 0) {
        this.setState({ tooShort: true})
      } else {
        this.setState({ tooShort: false})
      }
    });
  }

  changePasswordConfirmSignup = (evt) => {
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
      this.setState({termsAccepted: true})
    } else {
      this.setState({termsAccepted: false})
    }
  }

  subscribe = (event) => {
    const target = event.target;
    if(target.checked) {
      this.setState({subscribed: true})
    } else {
      this.setState({subscribed: false})
    }
  }

  componentDidMount() {
    var token = this.props.location.search
    var token = token.substring(1,token.length)

    // if(token && token != '') {
    //   this.props.dispatch(verifyEmail(token))
    // }

    this.setState({'failures': this.props.failed_login_attempts})
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.dispatch(changeTab('auth'))
  }

  componentDidUpdate(prevProps) {
    if(prevProps.failed_login_attempts != this.props.failed_login_attempts && !this.state.failed_login_attempt) {
      this.setState({'failed_login_attempt': true, processing: false})
    }
    if(prevProps.failed_signup_attempts != this.props.failed_signup_attempts && !this.state.failed_signup_attempt) {
      this.setState({'failed_signup_attempt': true, processing: false})
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

    const signupWarning = () => {
      if(this.props.signupStatus === 400 && this.state.failed_signup_attempt) {
        return(
          <div style = {{textAlign: 'center', fontSize: 14, color: "#f9000b", background: "#fdf0f1", width: '100%', padding: 10, borderRadius: 5, fontWeight: 'bold', marginTop: 10}}>
            Email already taken
          </div>
        )
      } else {
        return(
          <div>
          </div>
        )
      }
    }

    return (
      <div>
        {
        this.props.loggedIn && this.props.email_verified
        ?
        <Redirect to = "/dashboard"/>
        :
        <div style = {{position: 'relative', margin: 'auto', maxWidth: 1920}}>
        <Header  color = "#333333" button = "#5ec3eb" homepage/>
        <div style = {{minHeight: '100vh', paddingTop: 50, backgroundColor: 'white', position: 'relative'}}>
            {
              this.state.lock
              ?
              <div style = {{zIndex: 3000, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, height: 350, border: 'solid 1px black', padding: '100px 50px', background: 'white'}}>
                April 11, 2020: Fractal is currently undergoing a major update, and will be back online in less than 48 hours. We apologize for the inconvenience; please check back again soon!
              </div>
              :
              <div>
              </div>
            }       
            <div style = {{backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 2, border: 'solid 1px white', padding: '40px 40px 60px 40px', maxWidth: 425, marginBottom: 80, margin: 'auto'}}>
              <Tabs>
                <TabList style = {{textAlign: 'center', border: 'none', border: 'none', fontWeight: 'bold', fontSize: 16}}>
                  <Tab>LOG IN</Tab>
                  <Tab>SIGN UP</Tab>
                </TabList>
                <TabPanel style = {{padding: '15px 30px'}}>
                  {
                  this.state.failed_login_attempt
                  ?
                  <div style = {{textAlign: 'center', fontSize: 14, color: "#f9000b", background: "#fdf0f1", width: '100%', padding: 10, borderRadius: 5, fontWeight: 'bold', marginTop: 10}}>
                    Invalid credentials
                  </div>
                  :
                  <div></div>
                  }
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      type = "email"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Email Address"
                      onChange = {this.changeEmailLogin}
                      onKeyPress = {this.loginKeyPress}
                      style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
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
                      style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
                    />
                  </InputGroup>
                  {
                  !this.state.processing
                  ?
                  (
                  this.state.emailLogin.length > 4 && this.state.passwordLogin.length > 6 && this.state.emailLogin.includes('@')
                  ?
                  <Button  onClick = {this.handleLogin} style = {{marginTop: 5, color: 'white', width: '100%', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>LOG IN</Button>
                  :
                  <Button  disabled = "true" style = {{marginTop: 5, color: 'white', width: '100%', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>LOG IN</Button>
                  )
                  :
                  <Button  disabled = "true" onClick = {this.handleLogin} style = {{marginTop: 5, color: 'white', width: '100%', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 14, marginRight: 5}}/> Processing
                  </Button>
                  }
                  <HashLink to = "/reset" style = {{textDecoration: 'none'}}><div style = {{color: '#94a8ed', textAlign: 'center', marginTop: 25, color: '#333333', textDecoration: 'none', fontSize: 13}}>Forgot Password?</div></HashLink>
                </TabPanel>
                <TabPanel style = {{padding: '15px 30px'}}>
                  {signupWarning()}
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      type = "email"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Email Address"
                      onChange = {this.changeEmailSignup}
                      onKeyPress = {this.signupKeyPress}
                      style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
                    />
                    {
                    !this.state.validEmail && this.state.emailSignup.length > 1
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 20, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative'}}/>
                    </div>
                    :
                    (
                    this.state.emailSignup.length > 1
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheck style = {{marginRight: 5, position: 'relative', top: 10, color: '#62CEE6'}}/>
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
                      onKeyPress = {this.signupKeyPress}
                      style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
                    />
                    {
                    this.state.tooShort
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 20, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative'}}/>
                    </div>
                    :
                    (
                    this.state.passwordSignup.length > 0
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheck style = {{marginRight: 5, position: 'relative', top: 10, color: '#62CEE6'}}/>
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
                      onKeyPress = {this.signupKeyPress}
                      style = {{borderRadius: 5, maxWidth: 600, backgroundColor: "#F4F4F4", border: "none", padding: "30px 20px"}}
                    />
                    {
                    !this.state.matches && this.state.passwordConfirmSignup.length > 0
                    ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 20, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative'}}/>
                    </div>
                    :
                    (
                    this.state.passwordConfirmSignup.length > 0
                    ?
                    <div style = {{color: 'green', marginLeft: 5, position: 'absolute', right: '5%', zIndex: 100, top: 9, fontSize: 14}}>
                      <FaCheck style = {{marginRight: 5, position: 'relative', top: 10, color: '#62CEE6'}}/>
                    </div>
                    :
                    <div></div>
                    )
                    }
                  </InputGroup>
                  {
                  !this.state.processing
                  ?
                  (
                  this.state.validEmail && !this.state.tooShort && this.state.matches && this.state.termsAccepted
                  ?
                  <Button onClick = {this.handleSignup} style = {{marginTop: 5, color: 'white', width: '100%', backgroundColor: '#94a8ed', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>SIGN UP</Button>
                  :
                  <Button disabled = "true" style = {{marginTop: 5, color: 'white', width: '100%', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>SIGN UP</Button>
                  )
                  :
                  <Button  disabled = "true" style = {{marginTop: 5, color: 'white', width: '100%', border: 'none', background: "#0B172B", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', fontWeight: 'bold', padding: 12}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 14, marginRight: 5}}/> Processing
                  </Button>
                  }
                  <div style = {{marginTop: 25, display: 'flex'}}>
                    <label className = "termsContainer">
                      <input
                        type="checkbox"
                        onChange={this.acceptTerms}
                        onKeyPress = {this.signupKeyPress}
                        /> 
                      <span className ="checkmark"></span>
                    </label>

                    <div style = {{fontSize: 12, position: 'relative', bottom: 4, color: "#333333"}}>
                      I accept the&nbsp; 
                      <Link to = "/termsofservice" style = {{textDecoration: 'none', color: '#5ec3eb'}}>
                        Terms of Service&nbsp;
                      </Link> 
                      and&nbsp;
                      <Link to = "/privacy" style = {{textDecoration: 'none', color: '#5ec3eb'}}>Privacy Policy</Link> 
                    </div>
                  </div>
                  <div style = {{marginTop: 25, display: 'flex'}}>
                    <label className = "termsContainer">
                      <input
                        defaultChecked
                        type="checkbox"
                        onChange={this.subscribe}
                        onKeyPress = {this.signupKeyPress}
                        /> 
                      <span className ="checkmark"></span>
                    </label>

                    <div style = {{fontSize: 12, position: 'relative', bottom: 4, color: "#333333"}}>
                      Subscribe to the Fractal newsletter and receive (infrequent) major updates
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
    failed_login_attempts: state.AccountReducer.failed_login_attempts,
    failed_signup_attempts: state.AccountReducer.failed_signup_attempts,
    signupStatus: state.AccountReducer.signupStatus,
    email_verified: state.AccountReducer.email_verified
  }
}


export default connect(mapStateToProps)(Auth);