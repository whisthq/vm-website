import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import '../../static/App.css';
import history from "../../history";

import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { logout, getVMStatus, retrieveCustomer, vmCreating, cancelPlan, fetchVMs, sendFriendsEmail, emailSent } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCircle, FaTimes, FaEye, FaEyeSlash, FaCheckCircle, FaCheck, FaUser, FaLock, FaDollarSign, 
  FaArrowRight, FaPlus, FaPlay, FaFastForward, FaPause, FaWindows, FaApple, FaUbuntu, FaAndroid, FaTag } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import Popup from "reactjs-popup";

import CPU from '../../assets/cpu.svg'
import GPU from '../../assets/gpu.svg'
import RAM from '../../assets/ram.svg'
import SSD from '../../assets/hard-drive-icon.svg'
import WindowsBin from '../../bin/Fractal.exe'
import MacBin from '../../bin/Fractal.dmg'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {width: 0, height: 0, modalShow: false, showPopup: false, day: 0, month: 0, year: 0, 
      created: '', billStart: '', billEnd: '', cancelling: false, hidePassword: true, exitSurvey: false,
      exitFeedback: '', emailShare: false, emails: [], friendsEmail: '', trialEnd: '',
      showEmailButton: false, emailBoxWidth: 45, sendingEmails: false}
    this.customWidth = React.createRef()
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)

    this.props.dispatch(fetchVMs(this.props.user))
    this.props.dispatch(retrieveCustomer())

    var today = new Date();
    this.setState({
      day: today.getDate(),
      month: this.monthConvert(today.getMonth()),
      year: today.getFullYear()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate(prevProps) {
    if(this.props.payment && Object.keys(this.props.payment).length > 0) {
      if(this.state.created === '' && this.props.payment.created) {
        this.setState({created: this.unixToDate(this.props.payment.created)})
      }
      if(this.state.billStart === '' && this.props.payment.current_period_start) {
        this.setState({billStart: this.unixToDate(this.props.payment.current_period_start)})
      }
      if(this.state.billEnd === '' && this.props.payment.current_period_end) {
        this.setState({billEnd: this.unixToDate(this.props.payment.current_period_end)})
      }
      if(this.state.trialEnd === '' && this.props.payment.trial_end) {
        this.setState({trialEnd: this.unixToDate(this.props.payment.trial_end)})
      }
    } else {
      if(this.state.created != '') {
        this.setState({created: '', cancelling: false})
      }
      if(this.state.billStart != '') {
        this.setState({billStart: '', cancelling: false})
      }
      if(this.state.billEnd != '') {
        this.setState({billEnd: '', cancelling: false})
      }
      if(this.state.trialEnd != '') {
        this.setState({trialEnd: '', cancelling: false})
      }
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  cancelPlan = () => {
    this.setState({cancelling: true})
    this.props.dispatch(vmCreating(false))
    this.props.dispatch(cancelPlan(this.state.exitFeedback))
  }

  monthConvert = (month) => {
    var months = [ "January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December" ];
    var selectedMonthName = months[month];
    return selectedMonthName;
  }

  unixToDate = (unix) => {
    const milliseconds = unix * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString().split(',')[0]
    var dateArr = humanDateFormat.split('/')
    const month = this.monthConvert(dateArr[0] - 1)
    var finalDate = month + " " + dateArr[1].toString() + ", " + dateArr[2].toString()
    return finalDate
  }

  showPassword = (show) => {
    this.setState({hidePassword: !show})
  }

  showExitSurvey = (show) => {
    this.setState({exitSurvey: show})
  }

  changeExitFeedback = (evt) => {
    this.setState({exitFeedback: evt.target.value})
  }

  showEmailShare = (show) => {
    this.setState({emailShare: show})
    if(!show) {
      this.setState({sendingEmails: false, emails: [], emailBoxWidth: 45})
      this.props.dispatch(emailSent(0))
    }
  }

  changeFriendsEmail = (evt) => {
    let component = this
    this.setState({friendsEmail: evt.target.value}, function() {
      if(this.state.friendsEmail != '') {
        this.setState({showEmailButton: true, emailBoxWidth: 7.1 * component.state.friendsEmail.length + 45})
      } else {
        this.setState({showEmailButton: false, emailBoxWidth: 45})
      }
    })
  }

  addEmailToList = () => {
    var new_list = [...this.state.emails, this.state.friendsEmail]
    if(this.state.friendsEmail.length > 40) {
      new_list = [...this.state.emails, this.state.friendsEmail.substring(0, 40)]
    }
    this.setState({emails: new_list, friendsEmail: '', emailBoxWidth: 45})
  }


  addEmailToListPress = (evt) => {
    if(evt.key === 'Enter') {
      var new_list = [...this.state.emails, this.state.friendsEmail]
      if(this.state.friendsEmail.length > 40) {
        new_list = [...this.state.emails, this.state.friendsEmail.substring(0, 40)]
      }
      this.setState({emails: new_list, friendsEmail: '', emailBoxWidth: 45})
    }
  }

  removeEmail = (value) => {
    var new_list = this.state.emails.filter(function(e) { return e !== value })
    this.setState({emails: new_list})
  }

  sendEmails = () => {
    this.setState({sendingEmails: true})
    this.props.dispatch(sendFriendsEmail(this.state.emails, this.props.promoCode))
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }

    return (
      <div>
      {
      !this.props.loggedIn && this.props.email_verified
      ?
      <Redirect to = "/auth"/>
      :
      <div style = {{backgroundColor: "white", minHeight: '100vh', overflowX: 'hidden !important'}}>
        <Header color = "#333333" button = "#5ec3eb"/>
        <div style = {{display: 'flex', width: '100vw', overflowX: 'hidden'}}>
          <div style = {{width: 300, paddingLeft: 135, paddingTop: 120, backgroundColor: 'rgba(216,216,233,.2)', flex: '0 1 auto', zIndex: 0, position: 'sticky'}}>
            <div style = {{marginBottom: 20, fontWeight: 'bold', color: '#111111'}}>DASHBOARD</div>
            <div className = "sign-out-button" onClick = {() => this.props.dispatch(logout())}>Sign Out</div>
          </div>
          <div style = {{paddingTop: 60, paddingLeft: 100, paddingBottom: 100, width: 'calc(100% - 400px)'}}>
            {
            this.props.credits && this.props.credits > 0
            ?
            (
            this.props.credits > 1
            ?
            <div style = {{width: '100%', padding: '15px 25px', backgroundColor: '#edfae6', color: '#555555', borderRadius: 5, marginBottom: 30, fontSize: 14}}>
              Someone redeemed your promo code! Create a cloud PC to redeem a free subscription for {this.props.credits} months.
            </div>
            :
            <div style = {{width: '100%', padding: '15px 25px', backgroundColor: '#edfae6', color: '#555555', borderRadius: 5, marginBottom: 30, fontSize: 14}}>
              Someone redeemed your promo code! Create a cloud PC to redeem a free subscription for {this.props.credits} month.
            </div>
            )
            :
            <div></div>
            }
            <div>
              <div style = {{display: 'inline', float: 'left'}}>
                {this.state.month} {this.state.day}, {this.state.year}
              </div>
              <Popup trigger = {
              <div style = {{display: 'inline', float: 'right'}}>
                <Button style = {{marginLeft: 35, color: '#5ec3eb', border: 'solid 1px #5ec3eb', fontWeight: 'bold', paddingLeft: 20, paddingRight: 20,background: "rgba(94, 195, 235,0.1)"}}>Get a Free Month</Button>
              </div>
              } modal
                onClose = {() => this.showEmailShare(false)} 
                contentStyle = {{width: 550, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 400, padding: '30px 50px', textAlign: "center"}}>
                {
                !this.state.emailShare
                ?
                <div>
                  <div style = {{fontWeight: 'bold', fontSize: 22}}><strong>Share Fractal with a Friend</strong></div>
                  <div style = {{fontSize: 14, color: "#333333", marginTop: 20}}>
                    For every person that types in the following code at checkout, your account will be credited an additional free month.
                  </div>
                  <div style = {{color: "#111111", marginTop: 75, fontSize: 40}}>
                    {this.props.promoCode}
                  </div>
                  <button onClick = {() => this.showEmailShare(true)} style = {{fontWeight: 'bold', marginTop: 75, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'solid 1px #5ec3eb', background: 'rgba(94, 195, 235,0.1)'}}>
                    Start Sharing
                  </button> 
                </div> 
                :
                (
                this.props.emailStatus === 0
                ?
                <div className = "referral-code">
                  <div style = {{fontWeight: 'bold', fontSize: 22}}><strong>Send Them A Message</strong></div>
                  {
                  this.state.emailBoxWidth > 45
                  ?
                  (
                  this.state.friendsEmail.length > 4 && this.state.friendsEmail.includes('@') && this.state.friendsEmail.includes('.') && !this.state.emails.includes(this.state.friendsEmail) && this.state.emails.length < 50
                  ?
                  <div ref={this.customWidth} style = {{textAlign: 'left', display: 'flex', marginTop: 20, height: 89}}>
                    <input autoFocus defaultValue = {this.state.friendsEmail} type = "text" onChange = {this.changeFriendsEmail} onKeyPress = {this.addEmailToListPress} style = {{color: '#5ac475', maxWidth: 'calc(100% - 20px)', height: 30, border: 'none', background: 'none', padding: 0, borderRadius: '4px 0px 0px 4px', width: `${ this.state.emailBoxWidth }px`}}/>
                    <FaCheck className = "pointerOnHover" onClick = {this.addEmailToList} style = {{border: 'none', padding: 0, borderLeft: 'none', width: 20, position: 'relative', top: 7, color: '#5ac475'}}/>
                  </div>
                  :
                  <div ref={this.customWidth} style = {{textAlign: 'left', display: 'flex', marginTop: 20, height: 89}}>
                    <input autoFocus defaultValue = {this.state.friendsEmail} type = "text" onChange = {this.changeFriendsEmail} style = {{color: '#666666', maxWidth: 'calc(100% - 20px)', height: 30, border: 'none', background: 'none', padding: 5, border: 'solid 1px #666666', borderRadius: '4px', width: `${ this.state.emailBoxWidth }px`}}/>
                  </div>
                  )
                  :
                  <textarea onChange = {this.changeFriendsEmail} rows = "4" cols = "60" placeholder = "Enter your friends' emails here, and we'll email them your referral code for you, along with a friendly message. When they create a cloud PC with this code, your account will automatically be accredited."
                    style = {{outline: 'none', resize: 'none', background: 'none', border: 'none', marginTop: 20, fontSize: 14, padding: 0}}>
                  </textarea>
                  }
                  <div style = {{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                  {
                    this.state.emails.length === 0
                    ?
                    <div style = {{height: 138}}></div>
                    :
                    <div></div>
                  }
                  <div style = {{height: 138, overflowY: 'scroll', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start', fontSize: 12}}>
                    {this.state.emails.map((value, index) => {
                      return (
                        <div style = {{display: 'flex', maxWidth: '100%', height: 22, marginRight: 5, border: 'solid 1px #333333', paddingRight: 5, borderRadius: 4, marginBottom: 5, overflowX: 'hidden'}}>
                          <FaTimes className = "pointerOnHover" onClick = {() => this.removeEmail(value)} style = {{width: 22, height: 9, position: 'relative', top: 5.5}}/>
                          <div>
                            {value} 
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  </div>
                  {
                  this.state.emails.length > 0
                  ?
                  (
                  !this.state.sendingEmails
                  ?
                  <button onClick = {() => this.sendEmails()} style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'solid 1px #5ec3eb', background: 'rgba(94, 195, 235,0.1)'}}>
                    Send Emails
                  </button> 
                  :
                  <Button disabled = "true" style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'solid 1px #5ec3eb', background: 'rgba(94, 195, 235,0.1)'}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#5ec3eb", marginRight: 7}}/> Sending
                  </Button> 
                  )
                  :
                  <Button disabled = "true" style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'solid 1px #5ec3eb', background: 'rgba(94, 195, 235,0.1)'}}>
                    Send Emails
                  </Button> 
                  }
                </div> 
                :
                <div>
                  {
                    this.props.emailStatus === 200
                    ?
                    <div style = {{marginTop: 100}}>
                      <FaCheck style = {{color: '#5ac475', width: 125}}/>
                      <div style = {{marginTop: 30, fontSize: 18, fontWeight: 'bold'}}>
                        Success! Emails sent.
                      </div>
                      <div style = {{marginTop: 10, fontSize: 14, color: "#666666"}}>
                        On behalf of Fractal, thank you for telling your friends about us! 
                        We've sent them a customized email on your behalf.
                      </div>
                    </div>
                    :
                    <div style = {{marginTop: 150}}>
                      <FaTimes style = {{color: '#e34d4d', width: 125}}/>
                      <div style = {{marginTop: 30, fontSize: 16, fontWeight: 'bold'}}>
                        Oops! Something went wrong.
                      </div>
                      <div style = {{marginTop: 10, fontSize: 14, color: "#666666"}}>
                        If this issue persists, please contact support@fractalcomputers.com.
                        In the meantime, we'd really appreciate you referring Fractal to your friends! 
                      </div>
                    </div>
                  }
                </div>
                )
                }
              </Popup>
            </div><br/>
            <div style = {{fontSize: 42, fontWeight: 'bold'}}>
              MY CLOUD PC
            </div>
            {
            this.props.vms === undefined || this.props.vms.length == 0
            ?
            (
            this.props.is_creating || (this.state.created != '')
            ?
            <div>
              <Row style = {{marginTop: 30}}>
                <Col xs = {12}>
                  <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#333333", height: 25}}/>
                    <div style = {{color: "#333333", fontSize: 16, marginTop: 20, fontWeight: 'bold'}}>Your Cloud PC Is Creating</div>
                    <div style = {{fontSize: 12, maxWidth: 400, margin: 'auto', marginTop: 10}}>
                      Our engineers are currently setting up and testing your cloud PC. Once it's ready within 24 hours, you will receive an email.
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            :
            <div>
              <Row style = {{marginTop: 30}}>
                <Col xs = {12}>
                  <Link style = {{textDecoration: 'none'}} to = "/purchase" className = "create-cloud-pc">
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, paddingBottom: 40, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <FaPlus style = {{height: 25, marginTop: 10, color: "#333333"}}/>
                      <div style = {{color: "#333333", fontSize: 20, marginTop: 20, fontWeight: 'bold'}}>Create My Cloud Computer</div>
                      <div style = {{fontSize: 14, maxWidth: 450, margin: 'auto', marginTop: 10, color: '#333333'}}>
                        Transform your local device into a GPU-powered cloud computer. Setup in less than one minute, and start with a free trial.
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
            )
            :
            <div>
            <Row style = {{marginTop: 30}}>
              <Col md = {3} sm = {6} xs = {12}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {CPU} style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>CPU</div>
                  <div style = {{color: "#555555", fontSize: 13}}>Intel Xeon E5</div>
                </div>
              </Col>
              <Col md = {3} sm = {6} xs = {12}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {GPU} style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>GPU</div>
                  <div style = {{color: "#555555", fontSize: 13}}>NVIDIA Tesla M60</div>
                </div>
              </Col>
              <Col md = {3} sm = {6} xs = {12}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {RAM} style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>RAM</div>
                  <div style = {{color: "#555555", fontSize: 13}}>56GB DDR4</div>
                </div>
              </Col>
              <Col md = {3} sm = {6} xs = {12}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {SSD} style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>SSD</div>
                  <div style = {{color: "#555555", fontSize: 13}}>120GB NVMe</div>
                </div>
              </Col>
            </Row>
            </div>
            }
            <Row style = {{marginTop: 40}}>
              <Col sm = {6} xs = {12}>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, display: 'inline'}}>
                  Downloads
                </div>
                <div style = {{width: '100%'}}>
                  <div style = {{fontSize: 14, backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: 7, padding: '30px 10px', marginTop: 35, minHeight: 200}}>
                    <Row style = {{width: '100%', margin: 0}}>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                          <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                            <FaWindows style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> Windows 64-Bit
                          </div>
                        <a href = {WindowsBin} download = "Fractal.exe">
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button style = {{background: 'rgba(0,0,0,0.1)', border: 'solid 1px #555555', fontSize: 12, borderRadius: 5, color: '#333333', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</button>
                        </div>
                        </a>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                        <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                          <FaApple style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> macOS
                        </div>
                        <a href = {MacBin} download = "Fractal.dmg">
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button style = {{background: 'rgba(0,0,0,0.1)', border: 'solid 1px #555555', fontSize: 12, borderRadius: 5, color: '#333333', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</button>
                        </div>
                        </a>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                        <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                          <FaUbuntu style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> Ubuntu 18.04
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button disabled = "true" style = {{background: 'none', border: 'solid 0.5px #A9A9A9', fontSize: 12, borderRadius: 5, color: '#A9A9A9', width: 90, padding: '5px 5px'}}>Coming Soon</button>
                        </div>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px'}}>
                        <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                          <FaAndroid style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> Android
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button disabled = "true" style = {{background: 'none', border: 'solid 0.5px #A9A9A9', fontSize: 12, borderRadius: 5, color: '#A9A9A9', width: 90, padding: '5px 5px'}}>Coming Soon</button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm = {6} xs = {12}>
                <div>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, float: 'left', display: 'inline'}}>
                  My Info
                </div>
                {
                this.state.created != ''
                ?
                (
                !this.state.cancelling
                ?
                  <Popup trigger = {
                  <button style = {{outline: 'none', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '5px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                    Cancel Plan
                  </button>
                  } modal
                    onClose = {() => this.showExitSurvey(false)} 
                    contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 275, padding: '30px 50px', textAlign: "center"}}>
                    <div>
                    {
                    !this.state.exitSurvey 
                    ?
                    <div>
                      <div style = {{fontWeight: 'bold', fontSize: 22}}><strong>Are You Sure?</strong></div>
                      <div style = {{fontSize: 14, color: "#333333", marginTop: 20}}>
                        If you cancel, all the data, files, and applications on stored on cloud PC will be <strong>permanently</strong> lost. Please 
                        make sure that you have transferred everything you need from your cloud PC to another device before cancelling.
                      </div>
                      <button onClick = {() => this.showExitSurvey(true)} style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                        I UNDERSTAND, PROCEED
                      </button>
                    </div>
                    :
                    <div className = "exit-survey">
                      <div style = {{fontWeight: 'bold', fontSize: 22}}><strong>Your Feedback</strong></div>
                      <textarea onChange = {this.changeExitFeedback} rows = "4" cols = "52" placeholder = "Please give us some feedback on why you're cancelling, so we can improve Fractal for others. Be brutally honest!"
                        style = {{outline: 'none', resize: 'none', background: 'none', border: 'none', marginTop: 20, fontSize: 14, padding: 0}}>
                      </textarea>
                      {
                      this.state.exitFeedback != ''
                      ?
                      <button onClick = {this.cancelPlan} style = {{fontWeight: 'bold', marginTop: 19, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                        CANCEL PLAN
                      </button>
                      :
                      <button style = {{opacity: 0.5, fontWeight: 'bold', marginTop: 19, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                        CANCEL PLAN
                      </button>
                      }
                    </div>
                    }   
                    </div> 
                  </Popup>
                :
                  <div style = {{float: 'right', display: 'inline', fontSize: 13}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{height: 12, marginRight: 4}}/> Cancelling 
                  </div>
                )
                :
                <div>
                </div>
                }
              </div><br/>
              <div style = {{display: 'block', fontSize: 13, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: 7, marginTop: 40, padding: '30px 10px', minHeight: 200}}>
                <Row style = {{width: '100%', margin: 0, marginBottom: 10}}>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: 'left', fontWeight: 'bold', color: '#555555', display: 'inline'}}>
                      <FaUser style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Username
                    </div>
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.props.user}
                    </div>
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: 'left', display: 'inline', fontWeight: 'bold', color: '#555555'}}>
                      <FaFastForward style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Current Period Start
                    </div>
                    {
                    this.state.billStart
                    ?
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.state.billStart}
                    </div>
                    :
                    <div style = {{float: 'right', display: 'inline', background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: 'left', display: 'inline', fontWeight: 'bold', color: '#555555'}}>
                      <FaPause style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Current Period End
                    </div>
                    {
                    this.state.billEnd
                    ?
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.state.billEnd}
                    </div>
                    :
                    <div style = {{float: 'right', display: 'inline', background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: 'left', fontWeight: 'bold', color: '#555555', display: 'inline'}}>
                      <FaPlay style = {{height: 9, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Plan Created
                    </div>
                    {
                    this.state.created != ''
                    ?
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.state.created}
                    </div>
                    :
                    <div style = {{float: 'right', display: 'inline', background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px'}}>
                    <div style = {{float: 'left', display: 'inline', fontWeight: 'bold', color: '#555555'}}>
                      <FaTag style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Free Trial Ends
                    </div>
                    {
                    this.state.trialEnd
                    ?
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.state.trialEnd}
                    </div>
                    :
                    <div style = {{float: 'right', display: 'inline', background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                </Row>
              </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    user: state.AccountReducer.user,
    vms: typeof state.AccountReducer.vm_credentials === undefined ? [] : state.AccountReducer.vm_credentials,
    is_creating: state.AccountReducer.is_creating,
    id: state.AccountReducer.id,
    payment: state.AccountReducer.payment,
    emailStatus: state.AccountReducer.emailStatus,
    promoCode: state.AccountReducer.promoCode,
    credits: state.AccountReducer.credits,
    email_verified: state.AccountReducer.email_verified
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))