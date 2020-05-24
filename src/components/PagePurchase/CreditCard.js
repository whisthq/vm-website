import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import { FaAngleUp, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements';
import { FaArrowRight } from 'react-icons/fa'

import Header from '../../shared_components/header.js'
import CheckoutForm from '../../shared_components/checkoutform.js'
import { config } from '../../constants.js'
import '../../static/App.css';
import StripeBadge from '../../assets/powered_by_stripe.svg'
import PriceBox from './containers/priceBox.js'

class CreditCard extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, continue: false, exit: false, location: '', step: 1, plan: '' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  handleClick1 = () => {
    this.setState({step: 2})
  }

  handleKeyPress1 = (event) => {
    if(event.key === 'Enter') {
      this.handleClick1()
    }
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

    const renderLeftMenu = () => {
      if(this.state.width > 700) {
        if(this.state.step === 1) {
          return(
            <div>
              <div style = {{paddingBottom: 20}}>
                <div style = {{fontWeight: 'bold', color: '#111111'}}>Plan</div>  
                <div style = {{color: '#B9B9B9', fontSize: 12}}>
                  {this.state.plan}
                </div>
              </div>
              <div style = {{paddingBottom: 20}}>
                <div style = {{color: '#B9B9B9'}}>Payment</div>  
              </div>
            </div>
          )
        } else{
          return(
            <div>
              <div style = {{paddingBottom: 20}}>
                <div style = {{color: '#B9B9B9'}}>Plan</div>  
                <div style = {{color: '#B9B9B9', fontSize: 12}}>
                  {this.state.plan}
                </div>
              </div>
              <div style = {{paddingBottom: 20}}>
                <div style = {{fontWeight: 'bold', color: '#111111'}}>Payment</div>  
              </div>
            </div>
          )
        }
    } else {
      return(<div></div>)
    }
    }

    const renderPrice = () => {
      if(this.state.plan === '') {
        return(
          <Row style = {{marginTop: 50, paddingLeft: this.state.width > 700 ? 39 : 15}}>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Hourly'})} className = "pointerOnHover">
              <PriceBox color = "white" subText="Starts with free trial" name = "Hourly" price = "5" details = "+$0.70 / hr of usage"/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Monthly'})} className = "pointerOnHover">
              <PriceBox color = "white" subText="Starts with free trial" name = "Monthly" price = "39" details = {<div>6 hr / day<br/>+$0.50 per extra hr</div>}/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Unlimited'})} className = "pointerOnHover">
              <PriceBox color = "white" subText="Starts with free trial" name = "Unlimited" price = "99" details = "Unlimited daily usage"/>
            </Col>
          </Row>
        )
      } else if(this.state.plan === 'Hourly') {
        return(
          <Row style = {{marginTop: 50, paddingLeft: this.state.width > 700 ? 39 : 15}}>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Hourly'})} className = "pointerOnHover">
              <PriceBox color = "rgba(94, 195, 235, 0.1)" subText="Starts with free trial" name = "Hourly" price = "5" details = "+$0.70 / hr of usage" checked/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Monthly'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Monthly" subText="Starts with free trial" price = "39" details = {<div>6 hr / day<br/>+$0.50 per extra hr</div>}/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Unlimited'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Unlimited" subText="Starts with free trial" price = "99" details = "Unlimited daily usage"/>
            </Col>
          </Row>
        )
      }  else if(this.state.plan === 'Monthly') {
        return(
          <Row style = {{marginTop: 50, paddingLeft: this.state.width > 700 ? 39 : 15}}>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Hourly'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Hourly" subText="Starts with free trial" price = "5" details = "+$0.70 / hr of usage"/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Monthly'})} className = "pointerOnHover">
              <PriceBox color = "rgba(94, 195, 235, 0.1)" subText="Starts with free trial" name = "Monthly" price = "39" details = {<div>6 hr / day<br/>+$0.50 per extra hr</div>} checked/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Unlimited'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Unlimited" subText="Starts with free trial" price = "99" details = "Unlimited daily usage"/>
            </Col>
          </Row>
        )
      } else {
        return(
          <Row style = {{marginTop: 50, paddingLeft: this.state.width > 700 ? 39 : 15}}>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Hourly'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Hourly" subText="Starts with free trial" price = "5" details = "+$0.70 / hr of usage"/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Monthly'})} className = "pointerOnHover">
              <PriceBox color = "white" name = "Monthly" subText="Starts with free trial" price = "39" details = {<div>6 hr / day<br/>+$0.50 per extra hr</div>}/>
            </Col>
            <Col md = {4} style = {{paddingLeft: 0}} onClick = {() => this.setState({plan: 'Unlimited'})} className = "pointerOnHover">
              <PriceBox color = "rgba(94, 195, 235, 0.1)" subText="Starts with free trial" name = "Unlimited" price = "99" details = "Unlimited daily usage" checked/>
            </Col>
          </Row>
        )
      }
    }

    const renderSurvey = () => {
      if(this.state.step === 1) {
        return(
          <div tabIndex="0" onKeyDown={(e) => this.handleKeyPress1(e)} style = {{outline: 'none', paddingTop: 100, paddingLeft: this.state.width > 700 ? 0 : 40, paddingRight: this.state.width > 700 ? 0 : 40, width: this.state.width > 700 ? 'calc(100% - 400px)' : '95%', overflowX: 'hidden !important'}}>
            <div>
              {
              this.state.width > 700
              ?
              <span style = {{position: 'relative', bottom: 2}}>
                1 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
              </span>
              :
              <div></div>
              }
              <span style = {{fontSize: 22, paddingLeft: this.state.width > 700 ? 10 : 0}}>Choose Your Plan</span>
              <div style = {{marginTop: 5, color: '#333333', paddingLeft: this.state.width > 700 ? 39 : 0, fontSize: 16, maxWidth: 1200}}>
                No payment is required until your free trial has ended. You can change or cancel your plan at any time.
              </div>
            </div>
            {renderPrice()}
            {
            this.state.plan !== ''
            ?
            <div style = {{display: 'flex', justifyContent: 'space-between', width: 285, marginTop: 20, paddingLeft: this.state.width > 700 ? 25 : 0}}>
              <Button  onClick = {this.handleClick1} style = {{background: '#111111', border: 'none', padding: '10px 45px', display: 'inline'}}>Continue</Button>
              {
              this.state.width > 700
              ?
              <div style = {{fontSize: 14, color: '#555555', position: 'relative', top: 12}}>
                <FaArrowRight style = {{marginRight: 6, height: 8, width: 15, position: 'relative', bottom: 1}}/>
                Press Enter
              </div>
              :
              <div></div>
              }
            </div>
            :
            <div style = {{marginTop: 20, paddingLeft: this.state.width > 700 ? 25 : 0}}>
              <Button disabled = "true" style = {{background: '#111111', border: 'none', padding: '10px 45px', display: 'inline'}}>Continue</Button>
            </div>
            }
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
        )
      } else {
        return(
          <div style = {{paddingTop: 100, paddingLeft: this.state.width > 700 ? 0 : 40, paddingRight: this.state.width > 700 ? 0 : 40,  width: this.state.width > 700 ? 'calc(100% - 400px)' : '95%', overflowX: 'hidden !important'}}>
            <img src = {StripeBadge} alt = "" style = {{width: 125, position: 'absolute', bottom: 30, marginLeft: this.state.width > 700 ? 40 : 0}}/>
            <div>
              {
              this.state.width > 700
              ?
              <span style = {{position: 'relative', bottom: 2}}>
                2 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
              </span>
              :
              <div></div>
              }
              <span style = {{fontSize: 22, paddingLeft: this.state.width > 700 ? 10 : 0}}>Submit Payment Details</span>
              {
              this.props.credits && this.props.credits > 0
              ?
              (
              this.props.credits === 1
              ?
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: this.state.width > 700 ? 39 : 0, fontSize: 16, maxWidth: 1200}}>
                Your first month is free, and you can cancel anytime. Get an additional free month for every
                friend who enters your referral code.
              </div>
              :
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: this.state.width > 700 ? 39 : 0, fontSize: 16, maxWidth: 1200}}>
                Your first {this.props.credits} months are free, and you can cancel anytime. Get an additional free 
                month for every friend who enters your referral code.
              </div>
              )
              :
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: this.state.width > 700 ? 39 : 0, fontSize: 16, maxWidth: 1200}}>
                Your first seven days are free, and you can cancel anytime. Get an additional free month for every
                friend who enters your referral code.
              </div>
              }
              <div style = {{marginTop: 40, marginLeft: this.state.width > 700 ? 39 : 0}}>
                <StripeProvider apiKey={public_key}>
                  <div className="example"> 
                    <Elements fonts = {fonts}>
                      <CheckoutForm plan = {this.state.plan}/>
                    </Elements>
                  </div>
                </StripeProvider>
              </div>
              <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
                <div onClick = {() => this.setState({step: 1})} style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
                  <FaAngleUp className = "typeform-up" style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
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
    }

    return (
      <div style = {{minHeight: '100vh', height: '100%', background: '#F6F6F6'}}>
        <div style = {{maxWidth: 1920, margin: 'auto'}}>
          <Header color = "#333333" button = "#5ec3eb"/>
          <div style = {{display: 'flex', overflowX: 'hidden', position: 'relative', bottom: 60}}>
            <div style = {{width: this.state.width > 700 ? 300 : 0, paddingLeft: this.state.width > 700 ? 80 : 0, paddingTop: 120, backgroundColor: 'none', height: '100%', minHeight: '100vh', zIndex: 0}}>
              {renderLeftMenu()}         
            </div>
            {renderSurvey()}
          </div>
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
