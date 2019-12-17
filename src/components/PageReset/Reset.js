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
import { forgotPassword } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class Reset extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      email: '', validEmail: false, forgot_password: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }


  handleKeyPress= (evt) => {
    if(evt.key === 'Enter'){
      this.props.dispatch(forgotPassword(this.state.email));
    }
  }

  handleButton = (evt) => {
    console.log("dispatch")
    this.props.dispatch(forgotPassword(this.state.email));
  }


  changeEmail = (evt) => {
    this.setState({email: evt.target.value})
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.forgot_password > this.props.forgot_password) {
      console.log("correct")
      this.setState({'validEmail': true})
    } else if(prevProps.forgot_password < this.props.forgot_password)  {
      console.log("incorrect")
      this.setState({'validEmail': false})
      this.setState({'forgot_password': this.state.forgot_password + 1})
    }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div>
        <Header  color = "#333333" button = "#94a8ed"/>
        {
        !this.state.validEmail
        ?
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
        :
        <div style = {{minHeight: '100vh', paddingTop: 90, backgroundColor: 'white', fontSize: 20}}>
          <div style = {{margin: 'auto', maxWidth: 500}}>
            <div style = {{color: '#333333', textAlign: 'center', fontWeight: 'bold', marginTop: 50}}>
              Check Your Inbox
            </div>
            <div style =  {{color: '#333333', textAlign: 'center', marginTop: 15, fontSize: 14}}>
              An email with a password reset link has been sent the email address that you specified. For security,
              this link will expire in ten minutes.
            </div>
            <HashLink to = "/auth">
              <Button style = {{color: 'white', width: '100%', border: 'none', background: 'linear-gradient(258.54deg, #2BF7DE 0%, #94A8ED 100%)', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', marginTop: 40}}>BACK TO LOGIN</Button>
            </HashLink>
          </div>
        </div>
        }
    </div>
    );
  }
}


function mapStateToProps(state) {
  return { 
    forgot_password: state.AccountReducer.forgot_password,
  }
}


export default connect(mapStateToProps)(Reset);