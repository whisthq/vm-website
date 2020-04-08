import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { FaTrashAlt, FaAngleUp, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements';
import { HashLink } from 'react-router-hash-link';
import { FaArrowRight } from 'react-icons/fa'

import Header from '../../shared_components/header.js'
import TypeformButton from '../../shared_components/typeformbutton.js'
import CheckoutForm from '../../shared_components/checkoutform.js'
import { config } from '../../constants.js'
import '../../static/App.css';
import StripeBadge from '../../assets/powered_by_stripe.svg'

class CreditCard extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, continue: false, exit: false, location: '' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }


  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    if(this.props.enhanced > 0 || this.props.base > 0 || this.props.power > 0) {
      this.setState({ continue: true })
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

    const fonts = [{ cssSrc: "https://fonts.googleapis.com/css?family=Maven+Pro" }]
    var public_key = config.stripe.PUBLIC_KEY

    const renderSurvey = () => {
      return(
        <div style = {{paddingTop: 100, paddingLeft: 100, width: 'calc(100% - 400px)', overflowX: 'hidden !important'}}>
          <img src = {StripeBadge} style = {{width: 125, position: 'absolute', bottom: 30, marginLeft: 40}}/>
          <div>
            <span style = {{position: 'relative', bottom: 2}}>
              1 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
            </span>
            <span style = {{fontSize: 22, paddingLeft: 10}}>Submit Payment Details</span>
            {
            this.props.credits && this.props.credits > 0
            ?
            (
            this.props.credits === 1
            ?
            <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16, maxWidth: 650}}>
              Your first month is free, and you can cancel anytime. Get an additional free month for every
              friend who enters your referral code.
            </div>
            :
            <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16, maxWidth: 650}}>
              Your first {this.props.credits} months are free, and you can cancel anytime. Get an additional free 
              month for every friend who enters your referral code.
            </div>
            )
            :
            <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16, maxWidth: 650}}>
              Your first seven days are free, and you can cancel anytime. Get an additional free month for every
              friend who enters your referral code.
            </div>
            }
            <div style = {{marginTop: 40, marginLeft: 39}}>
              <StripeProvider apiKey={public_key}>
                <div className="example"> 
                  <Elements fonts = {fonts}>
                    <CheckoutForm location = {this.state.location} finalPayment/>
                  </Elements>
                </div>
              </StripeProvider>
            </div>
            <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
              <div style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
                <FaAngleUp className = "typeform-up" style = {{opacity: 0.5, height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
              </div>
              <Link to = "/dashboard">
              <div style = {{display: 'inline', borderRadius: '0px 5px 5px 0px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px'}}>
                <FaTimes style = {{height: 15, position: 'relative', bottom: 2, color: '#0b172b'}}/>
              </div>
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div style = {{minHeight: '100vh', height: '100%', background: 'white'}}>
        <Header color = "#333333" button = "#5ec3eb"/>
        <div style = {{display: 'flex', width: '100vw', overflowX: 'hidden'}}>
          <div style = {{width: 300, paddingLeft: 135, paddingTop: 120, backgroundColor: 'none', height: '100%', minHeight: '100vh', zIndex: 0}}>
            {
            this.state.step < 3
            ?
            <div>
              <div style = {{marginBottom: 20, fontWeight: 'bold', color: '#111111'}}>YOUR INFO</div>
              <div style = {{marginBottom: 20, color: '#B9B9B9', fontSize: 14}}>PAYMENT</div>
            </div>
            :
            <div>
              <div style = {{marginBottom: 20, color: '#B9B9B9'}}>YOUR INFO</div>
              <div style = {{marginBottom: 20, fontWeight: 'bold', fontSize: 14, color: '#111111'}}>PAYMENT</div>
            </div>
            }         
          </div>
          {renderSurvey()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    user: state.AccountReducer.user,
    vms: typeof state.AccountReducer.vm_credentials == "undefined" ? [] : state.AccountReducer.vm_credentials,
    percentage: typeof state.AccountReducer.progress == "undefined" ? 1 : state.AccountReducer.progress,
    id: state.AccountReducer.id,
    credits: state.AccountReducer.credits
  }
}

export default connect(mapStateToProps)(CreditCard)