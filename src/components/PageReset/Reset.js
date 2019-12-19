import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import '../../static/App.css';
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { forgotPassword, validateToken, tokenStatus, resetPassword } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      email: '', validEmail: false, forgot_password: 0, passwordSignup: '', 
      passwordConfirmSignup: '', tooShort: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }


  handleKeyPress= (evt) => {
    if(evt.key === 'Enter'){
      this.props.dispatch(forgotPassword(this.state.email))
    }
  }

  handlePasswordReset = () => {
    this.props.dispatch(resetPassword(this.props.forgot_email, this.state.passwordSignup))
  }

  resetEmail = () => {
    this.props.dispatch(tokenStatus('invalid'))
    this.setState({validEmail: false})
  }

  handleButton = (evt) => {
    this.props.dispatch(forgotPassword(this.state.email))
  }


  changeEmail = (evt) => {
    this.setState({email: evt.target.value})
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

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    var token = this.props.location.search
    var token = token.substring(1,token.length)
    this.props.dispatch(validateToken(token))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.forgot_password > this.props.forgot_password) {
      this.setState({'validEmail': true})
    } else if(prevProps.forgot_password < this.props.forgot_password)  {
      this.setState({'validEmail': false})
      this.setState({'forgot_password': this.state.forgot_password + 1})
    }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    if(this.props.token_status === 'verified') {
      return (
        <div style = {{minHeight: '100vh'}}>
        <Header  color = "#333333" button = "#94a8ed"/>
        <div style = {{maxWidth: 350, margin: 'auto', paddingTop: 150}}>
          <div style = {{color: '#333333', textAlign: 'center', fontWeight: 'bold', marginBottom: 50, fontSize: 20}}>
            Reset Your Password
          </div>
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
          <Button onClick = {this.handlePasswordReset} style = {{marginTop: 40, color: 'white', width: '100%', backgroundColor: '#94a8ed', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>RESET</Button>
        </div>
        </div>
      )
    } else if(this.props.token_status === 'expired') {
      return (
        <div>
        <Header  color = "#333333" button = "#94a8ed"/>
        <div style = {{minHeight: '100vh', paddingTop: 90, backgroundColor: 'white', fontSize: 20}}>
          <div style = {{margin: 'auto', maxWidth: 500}}>
            <div style = {{color: '#333333', textAlign: 'center', fontWeight: 'bold', marginTop: 50}}>
              Your Session Has Expired
            </div>
            <div style =  {{color: '#333333', textAlign: 'center', marginTop: 15, fontSize: 14}}>
              For your security, this password link has expired. You can request a new password reset link <a onClick = {this.resetEmail} style = {{color: '#94A8ED', textDecoration: 'none', cursor: 'pointer'}}>here</a>.
            </div>
            <HashLink to = "/auth">
              <Button style = {{color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', marginTop: 40}}>BACK TO LOGIN</Button>
            </HashLink>
          </div>
        </div>
        </div>
      )
    } else {
      if(!this.state.validEmail) {
        return (
          <div>
          <Header  color = "#333333" button = "#94a8ed"/>
          <div style = {{minHeight: '100vh', paddingTop: 90, backgroundColor: 'white', fontSize: 20}}>
            <div style = {{color: '#333333', textAlign: 'center', fontWeight: 'bold', marginTop: 50}}>
              Forgot Your Password?
            </div>
            <div style =  {{color: '#333333', textAlign: 'center', marginTop: 15, fontSize: 14}}>
              Enter your email below to receive a password reset email.
            </div>
            <div style = {{backgroundColor: 'rgba(0,0,0,0.0)', borderRadius: 2, border: 'solid 1px white', padding: '40px 40px 60px 40px', maxWidth: 500, marginBottom: 80, margin: 'auto'}}>
              <InputGroup className="mb-3" style = {{marginTop: 30}}>
                <FormControl
                  type = "email"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder = "Email Address"
                  onChange = {this.changeEmail}
                  onKeyPress = {this.handleKeyPress}
                  style = {{borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)", border: "solid 1px #F8F8F8"}}
                /><br/>
              </InputGroup>
              {
              this.state.forgot_password > 0 && !this.state.validEmail
              ?
              <div style = {{textAlign: 'center', fontSize: 14, color: "#a62121"}}>Email does not exist</div>
              :
              <div style = {{height: 20}}></div>
              }
              <Button  onClick = {this.handleButton} style = {{color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', marginTop: 20}}>SEND EMAIL</Button>
          </div>
        </div>
        </div>
        ) 
      } else {
        return (
          <div>
          <Header  color = "#333333" button = "#94a8ed"/>
          <div style = {{minHeight: '100vh', paddingTop: 90, backgroundColor: 'white', fontSize: 20}}>
          <div style = {{margin: 'auto', maxWidth: 500}}>
            <div style = {{color: '#333333', textAlign: 'center', fontWeight: 'bold', marginTop: 50}}>
              Check Your Inbox
            </div>
            <div style =  {{color: '#333333', textAlign: 'center', marginTop: 15, fontSize: 14}}>
              An email with a password reset link has been sent the email address that you specified. For security,
              the link will expire in ten minutes.
            </div>
            <HashLink to = "/auth">
              <Button style = {{color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', marginTop: 40}}>BACK TO LOGIN</Button>
            </HashLink>
          </div>
        </div></div>
        )
      }
    }
  }
}


function mapStateToProps(state) {
  return { 
    forgot_password: state.AccountReducer.forgot_password,
    token_status: state.AccountReducer.token_status,
    forgot_email: state.AccountReducer.forgot_email
  }
}


export default connect(mapStateToProps)(Reset);