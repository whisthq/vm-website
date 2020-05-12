import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import Header from '../../shared_components/header.js'
import { verifyToken, sendVerificationEmail } from '../../actions/index.js';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import "react-tabs/style/react-tabs.css";
import '../../static/App.css';

class EmailVerification extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, isRedirect: false, isSending: false, sent: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  sendVerificationEmail = () => {
    this.setState({isSending: true, sent: false})
    this.props.dispatch(sendVerificationEmail(this.props.user, this.props.verificationToken))
  }

  componentDidMount() {
    var token = this.props.location.search
    token = token.substring(1,token.length)
    if(token && token !== '') {
      this.setState({isRedirect: true})
      this.props.dispatch(verifyToken(token))
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.verificationEmailsSent !== this.props.verificationEmailsSent && this.state.isSending) {
      this.setState({isSending: false, sent: true})
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

    if(!this.props.verificationToken || this.props.verificationToken === '' || !this.props.user || this.props.user === '') {
      return (
        <div>
          <div style = {{maxWidth: 1920, margin: 'auto'}}>
          <Header color = "#111111" button = "#5ec3eb" homepage/>
          <div style = {{margin: 'auto', paddingTop: 170, maxWidth: 600, lineHeight: 1.7, textAlign: 'center'}}>
            <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#333333", height: 25., marginBottom: 20}}/> 
            <div style = {{fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: "#333333"}}>
              Please Log In
            </div>
            <div style = {{marginBottom: 50}}>
              Your account has been signed out. To verify your email, please log in to re-send a verification email.
            </div>
            <Link to = "/auth">
              <Button style = {{background: '#0B172B', padding: "12px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', fontSize: 14, minWidth: 225, marginBottom: 10}}>
                LOG IN
              </Button>
            </Link>
          </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {
          this.props.email_verified
          ?
          <Redirect to = "/dashboard"/>
          :
            (
            this.state.isRedirect
            ?
            <div style = {{maxWidth: 1920, margin: 'auto'}}>
              <Header color = "#111111" button = "#5ec3eb" homepage/>
              <div style = {{margin: 'auto', paddingTop: 170, maxWidth: 600, lineHeight: 1.7, textAlign: 'center'}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#333333", height: 25., marginBottom: 20}}/> 
                <div style = {{fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: "#333333"}}>
                  Verifying Email
                </div>
                <div style = {{marginBottom: 50}}>
                  Once your email is verified, you will automatically be redirected. If you are not redirected within 10 seconds,
                  try resending.
                </div>
                {
                !this.state.isSending
                ?
                <Button onClick = {this.sendVerificationEmail} style = {{background: '#0B172B', padding: "12px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', fontSize: 14, minWidth: 225, marginBottom: 10}}>
                  RESEND EMAIL
                </Button>
                :
                <Button disabled = "true" style = {{background: '#0B172B', padding: "12px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', fontSize: 14, minWidth: 225, marginBottom: 10}}>
                  <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 13, marginRight: 5}}/> Sending
                </Button>
                }
                {
                this.state.sent
                ?
                <div style = {{marginTop: 20, color: '#5ac475'}}>
                  <FontAwesomeIcon icon = {faCheck} style = {{padding: 0, width: 12, marginRight: 7}}/>
                  Sent
                </div>
                :
                <div></div>
                }
              </div>
            </div>
            :
            <div style = {{position: 'relative', maxWidth: 1920, margin: 'auto'}}>
              <Header color = "#111111" button = "#5ec3eb" homepage/>
              <div style = {{margin: 'auto', paddingTop: 180, maxWidth: 600, lineHeight: 1.7, textAlign: 'center'}}>
                <div style = {{fontSize: 26, fontWeight: 'bold', marginBottom: 25}}>
                  Please Verify Your Email
                </div>
                <div style = {{marginBottom: 50}}>
                  An email has been sent to <strong>{this.props.user}</strong>. Please find the email in your inbox and 
                  select the "Verify Email" button at the bottom of the email. If you do not see the email, make sure that your email
                  address is spelled correctly, and check your Spam/All Mail folder. 
                </div>
                <div>
                {
                !this.state.isSending
                ?
                <Button onClick = {this.sendVerificationEmail} style = {{background: '#0B172B', padding: "12px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', fontSize: 14, minWidth: 225, marginBottom: 10}}>
                  RESEND EMAIL
                </Button>
                :
                <Button disabled = "true" style = {{background: '#0B172B', padding: "12px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', fontSize: 14, minWidth: 225, marginBottom: 10}}>
                  <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 13, marginRight: 5}}/> Sending
                </Button>
                }
                {
                this.state.sent 
                ?
                <div style = {{marginTop: 20, color: '#5ac475'}}>
                  <FontAwesomeIcon icon = {faCheck} style = {{padding: 0, width: 12, marginRight: 7}}/>
                  Sent
                </div>
                :
                <div></div>
                }
                </div>
              </div>
            </div>
            )
          }
          }
      </div>
      );
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { 
    email_verified: state.AccountReducer.email_verified,
    user: state.AccountReducer.user,
    verificationToken: state.AccountReducer.verificationToken,
    verificationEmailsSent: state.AccountReducer.verificationEmailsSent
  }
}

export default connect(mapStateToProps)(EmailVerification);
