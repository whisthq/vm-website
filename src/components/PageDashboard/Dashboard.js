import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import '../../static/App.css';

import Header from '../../shared_components/header.js'
import { logout, retrieveCustomer, vmCreating, cancelPlan, fetchDisks, sendFriendsEmail, fetchDiskStatus,
  emailSent, triggerSurvey, submitPurchaseFeedback, dashboardLoaded } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";
import { FaClone, FaTimes, FaCheck, FaUser, FaPlus, FaPlay, FaFastForward, FaPause, FaWindows, FaApple, FaUbuntu, FaAndroid, FaTag } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faCreditCard, faTag } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link';

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
import LinuxBin from '../../bin/Fractal.AppImage'
import Car from '../../assets/Car.jpg'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {width: 0, height: 0, modalShow: false, showPopup: false, day: 0, month: 0, year: 0, 
      created: '', billStart: '', billEnd: '', cancelling: false, hidePassword: true, exitSurvey: false,
      exitFeedback: '', emailShare: false, emails: [], friendsEmail: '', trialEnd: '',
      showEmailButton: false, emailBoxWidth: 45, sendingEmails: false, purchaseFeedback: '', waitlist: false, loaded: false,
      clipboardCopied: false}
    this.customWidth = React.createRef()
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.dispatch(dashboardLoaded(false))
    this.props.dispatch(fetchDisks(this.props.user))
    this.props.dispatch(retrieveCustomer())

    var today = new Date();
    this.setState({
      day: today.getDate(),
      month: this.monthConvert(today.getMonth()),
      year: today.getFullYear()
    }, function() {
      this.setState({loaded: true})
    })

    if(this.props.status_id && this.props.is_creating) {
      this.props.dispatch(fetchDiskStatus(this.props.status_id))
    }
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
      if(this.state.trialEnd === '' && this.props.payment.trial_end && this.props.payment.trial_end > 0) {
        this.setState({trialEnd: this.unixToDate(this.props.payment.trial_end)})
      }
    } else {
      if(this.state.created !== '') {
        this.setState({created: ''})
      }
      if(this.state.billStart !== '') {
        this.setState({billStart: ''})
      }
      if(this.state.billEnd !== '') {
        this.setState({billEnd: ''})
      }
      if(this.state.trialEnd !== '' && this.props.customer && Object.keys(this.props.customer).length === 0) {
        this.setState({trialEnd: ''})
      }
    }

    if(this.state.trialEnd === '' && this.props.customer && Object.keys(this.props.customer).length > 0) {
      this.setState({trialEnd: this.unixToDate(this.props.customer.trial_end)})
    }

    if(this.props.disks && this.props.disks.length !== prevProps.disks.length && this.state.cancelling) {
      console.log("DONE CANCELLING?")
      this.setState({cancelling: false})
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
    const humanDateFormat = dateObject.toLocaleString('en-US').split(',')[0]
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

  changePurchaseFeedback = (evt) => {
    this.setState({purchaseFeedback: evt.target.value})
  }

  submitPurchaseFeedback = (evt) => {
    this.props.dispatch(triggerSurvey(false))
    this.props.dispatch(submitPurchaseFeedback(this.state.purchaseFeedback))
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
      if(this.state.friendsEmail !== '') {
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

  copyToClipboard = (e) => {
    this.setState({clipboardCopied: true})
    navigator.clipboard.writeText('sudo apt-get install libavcodec-dev libavdevice-dev libx11-dev libxtst-dev xclip x11-xserver-utils -y')
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }

    if(this.state.waitlist) {
      return(
        <div style = {{backgroundColor: "white", minHeight: '100vh', overflowX: 'hidden !important', textAlign: 'center'}}>
          <Header color = "#333333" button = "#5ec3eb"/>
          <div style = {{paddingTop: 200, textAlign: 'center', maxWidth: 500, margin: 'auto', marginBottom: 60}}>
            {this.state.month} {this.state.day}, {this.state.year}: Fractal is currently undergoing a major update and will be back online within a few days.
            We apologize for the inconvenience!
          </div>
          <HashLink to = "/#top" style = {{outline: 'none', textDecoration: 'none'}}>
            <Button style = {{color: '#5ec3eb', border: 'none', fontWeight: 'bold', padding: '12px 25px', outline: 'none', background: "rgba(94, 195, 235,0.1)"}}>
              Back to Home
            </Button>
          </HashLink>
        </div>
      )
    } else if(!this.props.dashboard_loaded && this.props.user) {
      return(
        <div style = {{backgroundColor: "white", minHeight: '100vh', overflowX: 'hidden !important', textAlign: 'center'}}>
          <Header color = "#333333" button = "#5ec3eb"/>
          <div style = {{paddingTop: 250, textAlign: 'center', maxWidth: 500, margin: 'auto', marginBottom: 60, fontSize: 50}}>
            <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#111111"}}/>
          </div>
        </div>
      )
    } else {
    return (
      <div style = {{backgroundColor: "#F6F6F6", minHeight: '100vh', overflowX: 'hidden !important', justifyContent: 'center'}}>
      {
      !this.props.loggedIn || !this.props.email_verified
      ?
      <Redirect to = "/auth"/>
      :
      <div style = {{maxWidth: 1920, margin: 'auto'}}>
        <div>
        <Header color = "#111111" button = "#5ec3eb"/>
        {
        this.props.show_survey && this.state.width > 700
        ?
        <Popup
          open={true}
          contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 275, padding: '30px 50px', textAlign: "center"}}>
          <div className = "exit-survey">
            <div style = {{fontWeight: 'bold', fontSize: 22, margin: 'auto', width: '100%'}}><strong>Thank You For Creating a Cloud PC!</strong></div>
            <textarea onChange = {this.changePurchaseFeedback} rows = "4" cols = "52" placeholder = "We hope you love it. Please take a minute to tell us what you plan on using Fractal for (i.e. creative work, gaming, etc)."
              style = {{outline: 'none', resize: 'none', background: 'none', border: 'none', marginTop: 20, fontSize: 14, padding: 0}}>
            </textarea>
            <button onClick = {this.submitPurchaseFeedback} style = {{border: 'none', fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, padding: '10px 10px', color: '#5ec3eb', background: 'rgba(94, 195, 235,0.1)'}}>
              SUBMIT FEEDBACK
            </button> 
          </div>    
        </Popup>
        :
        <div>
        </div>
        }
        <div style = {{display: 'flex', overflowX: 'hidden', position: 'relative', bottom: 60}}>
          {
          this.state.width > 700
          ?
          <div style = {{width: 300, paddingLeft: 80, paddingTop: 120, backgroundColor: 'none', flex: '0 1 auto', zIndex: 0, position: 'sticky'}}>
            <div style = {{marginBottom: 20, fontWeight: 'bold', color: '#111111'}}>DASHBOARD</div>
            <div className = "sign-out-button" onClick = {() => this.props.dispatch(logout())}>SIGN OUT</div>
          </div>
          :
          <div></div>
          }
          <div style = {{paddingTop: 40, paddingLeft: this.state.width > 700 ? 25 : 40, paddingRight: this.state.width > 700 ? 0 : 40, paddingBottom: 50, width: this.state.width > 700 ? 'calc(100% - 400px)' : '100%'}}>
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
              <div style = {{display: this.state.width > 700 ? 'block' : 'block', float: this.state.width > 700 ? 'none' : 'none', marginTop: this.state.width > 700 ? 0 : 50}}>
                {this.state.month} {this.state.day}, {this.state.year}
              </div>
              {
              this.state.width > 700
              ?
              <Popup trigger = {
              <div style = {{display: 'inline', float: 'right', marginTop: 10}}>
                <Button style = {{marginLeft: 35, color: '#5ec3eb', border: 'none', fontWeight: 'bold', padding: '12px 25px', outline: 'none', background: "rgba(94, 195, 235,0.1)"}}>Get a Free Month</Button>
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
                    For every person that types in the following code at checkout, both your accounts will be credited an additional free month.
                  </div>
                  <div style = {{color: "#111111", marginTop: 75, fontSize: 40}}>
                    {this.props.promoCode}
                  </div>
                  <button onClick = {() => this.showEmailShare(true)} style = {{fontWeight: 'bold', marginTop: 75, outline: 'none', width: '100%', fontSize: 14, borderRadius: 3, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'none', background: 'rgba(94, 195, 235,0.1)'}}>
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
                    <input autoFocus defaultValue = {this.state.friendsEmail} type = "text" onChange = {this.changeFriendsEmail} style = {{color: '#666666', maxWidth: 'calc(100% - 20px)', height: 30, background: 'none', padding: 5, border: 'solid 1px #666666', borderRadius: '4px', width: `${ this.state.emailBoxWidth }px`}}/>
                  </div>
                  )
                  :
                  <textarea onChange = {this.changeFriendsEmail} rows = "4" cols = "56" placeholder = "Enter your friends' emails here, and we'll email them your referral code for you, along with a friendly message. When they create a cloud PC with this code, your account will automatically be accredited."
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
                  <button onClick = {() => this.sendEmails()} style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 3, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'none', background: 'rgba(94, 195, 235,0.1)'}}>
                    Send Emails
                  </button> 
                  :
                  <Button disabled = "true" style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'none', background: 'rgba(94, 195, 235,0.1)'}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#5ec3eb", marginRight: 7}}/> Sending
                  </Button> 
                  )
                  :
                  <Button disabled = "true" style = {{fontWeight: 'bold', marginTop: 25, outline: 'none', width: '100%', fontSize: 14, borderRadius: 3, float: 'right', display: 'inline', padding: '10px 10px', color: '#5ec3eb', border: 'none', background: 'rgba(94, 195, 235,0.1)'}}>
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
              :
              <div></div>
              }
            </div>
            <div style = {{fontSize: this.state.width > 700 ? 42 : 35, fontWeight: 'bold'}}>
              MY CLOUD PC
            </div>
            {
            this.props.disks === undefined || this.props.disks.length === 0 || this.props.is_creating
            ?
            (
            this.props.is_creating
            ?
            <div>
              {
              this.props.customer && this.props.customer.paid
              ?
              <Row style = {{marginTop: 30}}>
                <Col xs = {12}>
                  <div style = {{borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255,255,255,0.9)), url(" + Car + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", padding: '30px 50px', minHeight: 260, margin:'auto', width: '100%', marginBottom: 20}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#333333", height: 25, marginTop: 25}}/>
                    <div style = {{color: "#333333", fontSize: 24, marginTop: 20, fontWeight: 'bold'}}>Your Cloud PC Is Creating</div>
                    <div style = {{fontSize: 16, maxWidth: 500, margin: 'auto', marginTop: 15, color: "#111111"}}>
                      This should take no more than 20-30 minutes.
                      Once your cloud PC is ready, you'll be able to download our desktop application below to launch your cloud PC.
                    </div>
                    <div style = {{fontSize: 14, maxWidth: 500, margin: 'auto', marginTop: 25, color: "#333333"}}>
                      <span style = {{fontWeight: 'bold'}}>Current Status: </span>{this.props.disk_creation_message}
                    </div>
                  </div>
                </Col>
              </Row>
              :
              <Row style = {{marginTop: 30}}>
                <Col xs = {12} md = {8}>
                  <div style = {{borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255,255,255,0.9)), url(" + Car + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", padding: '30px 50px', minHeight: 260, margin:'auto', width: '100%', marginBottom: 20}}>
                    <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#333333", height: 25, marginTop: 15}}/>
                    <div style = {{color: "#333333", fontSize: 24, marginTop: 20, fontWeight: 'bold'}}>Your Cloud PC Is Creating</div>
                    <div style = {{fontSize: 16, maxWidth: 500, margin: 'auto', marginTop: 15, color: "#111111"}}>
                      This should take no more than 20-30 minutes.
                      Once your cloud PC is ready, you'll be able to download our desktop application below to launch your cloud PC.
                    </div>
                    <div style = {{fontSize: 14, maxWidth: 500, margin: 'auto', marginTop: 25, color: "#333333"}}>
                      <span style = {{fontWeight: 'bold'}}>Current Status: </span>{this.props.disk_creation_message}
                    </div>
                  </div>
                </Col>
                <Col xs = {12} md = {4}>
                  <Link to = "/card" style = {{textDecoration: 'none'}} className = "pointerOnHover">
                    <div style = {{background: '#0B172B', borderRadius: 5, textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', padding: '30px 50px', minHeight: 260, margin:'auto', width: '100%', marginBottom: 20}}>
                      <FontAwesomeIcon icon={faCreditCard} style = {{color: "white", height: 25, marginTop: 15}}/>
                      <div style = {{color: "white", fontSize: 22, marginTop: 20, fontWeight: 'bold'}}>Add Payment</div>
                      <div style = {{fontSize: 14, maxWidth: 400, margin: 'auto', marginTop: 15, color: "#D6D6D6"}}>
                        Your cloud PC is free until {this.state.trialEnd}.
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
              }
            </div>
            :
            <div>
              <Row style = {{marginTop: 30}}>
                <Col xs = {12}>
                  <Link style = {{textDecoration: 'none'}} to = "/purchase" className = "create-cloud-pc">
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255,255,255,0.9)), url(" + Car + ")", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", padding: '30px 50px', minHeight: this.state.width > 700 ? 260 : 340, margin:'auto', width: '100%', marginBottom: 20}}>
                      <FaPlus style = {{height: 25, marginTop: 25, color: "#333333"}}/>
                      <div style = {{color: "#333333", fontSize: 22, marginTop: 20, fontWeight: 'bold'}}>Create My Cloud Computer</div>
                      <div style = {{fontSize: 14, maxWidth: 450, margin: 'auto', marginTop: 10, color: '#333333'}}>
                        Transform your local device into a GPU-powered cloud computer. Setup in less than one minute, no credit card required.
                      </div>
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
            )
            :
            (
            this.props.customer && this.props.customer.paid && this.props.payment && Object.keys(this.props.payment).length > 0 && this.props.payment.plan && this.props.payment.plan.nickname
            ?
            <div>
            <Row style = {{marginTop: 30}}>
              <Col md = {7} xs = {12}>
                <Row>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {CPU} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>CPU</div>
                      <div style = {{color: "#555555", fontSize: 13}}>6 Core Intel Xeon E5</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {GPU} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>GPU</div>
                      <div style = {{color: "#555555", fontSize: 13}}>NVIDIA Tesla M60</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {RAM} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>RAM</div>
                      <div style = {{color: "#555555", fontSize: 13}}>56GB DDR4</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {SSD} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>SSD</div>
                      <div style = {{color: "#555555", fontSize: 13}}>120GB NVMe</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md = {5} xs = {12}>
                <Link style = {{textDecoration: 'none', color: 'white'}}>
                  <div style = {{borderRadius: 5, textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', padding: '30px 50px', height: 250, margin:'auto', width: '100%', marginBottom: 20, background: '#0B172B'}}>
                    <FontAwesomeIcon icon={faTag} style = {{color: "white", fontSize: 22, marginTop: 15}}/>
                    <div style = {{color: "white", fontSize: this.state.width > 700 ? 24 : 20, marginTop: 20, fontWeight: 'bold', marginBottom: 10}}>Change Plan</div>
                    {this.props.payment.plan.nickname === 'Fractal Hourly'
                    ?
                    <div style = {{fontSize: this.state.width > 700 ? 15 : 13, maxWidth: 400, margin: 'auto', marginTop: 15, color: "#D6D6D6"}}>
                      You are subscribed to the Hourly plan. Change plan feature coming soon.
                    </div>
                    :
                    (
                    this.props.payment.plan.nickname === 'Fractal Monthly'
                    ?
                    <div style = {{fontSize: this.state.width > 700 ? 15 : 13, maxWidth: 400, margin: 'auto', marginTop: 15, color: "#D6D6D6"}}>
                      You are subscribed to the Monthly plan. Change plan feature coming soon.
                    </div>
                    :
                    <div style = {{fontSize: this.state.width > 700 ? 15 : 13, maxWidth: 400, margin: 'auto', marginTop: 15, color: "#D6D6D6"}}>
                      You are subscribed to the Unlimited plan. Change plan feature coming soon.
                    </div>
                    )
                    }
  
                  </div>
                </Link>
              </Col>
            </Row>
            </div>
            :
            <div>
            <Row style = {{marginTop: 30}}>
              <Col xs = {12} md = {7}>
                <Row>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {CPU} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>CPU</div>
                      <div style = {{color: "#555555", fontSize: 13}}>6 Core Intel Xeon E5</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {GPU} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>GPU</div>
                      <div style = {{color: "#555555", fontSize: 13}}>NVIDIA Tesla M60</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {RAM} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>RAM</div>
                      <div style = {{color: "#555555", fontSize: 13}}>56GB DDR4</div>
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12}>
                    <div style = {{borderRadius: 5, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: 'white', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20}}>
                      <img src = {SSD} alt = "" style = {{textAlign: 'left', marginTop: 5, height: 45}}/>
                      <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 20}}>SSD</div>
                      <div style = {{color: "#555555", fontSize: 13}}>120GB NVMe</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs = {12} md = {5}>
                <Link to = "/card" style = {{textDecoration: 'none'}} className = "pointerOnHover">
                  <div style = {{borderRadius: 5, textAlign: 'center', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', padding: '30px 50px', height: 250, margin:'auto', width: '100%', marginBottom: 20, background: '#0B172B'}}>
                    <FontAwesomeIcon icon={faCreditCard} style = {{color: "white", height: 25, marginTop: 15}}/>
                    <div style = {{color: "white", fontSize: 22, marginTop: 20, fontWeight: 'bold'}}>Add Payment</div>
                    <div style = {{fontSize: 14, maxWidth: 400, margin: 'auto', marginTop: 15, color: "#D6D6D6"}}>
                      Your cloud PC is completely free to use until {this.state.trialEnd}.
                    </div>
                  </div>
                </Link>
              </Col>
            </Row>
            </div>
            )
            }
            <Row style = {{marginTop: 40}}>
              <Col sm = {6} xs = {12}>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, display: 'inline'}}>
                  Downloads
                </div>
                <div style = {{width: '100%'}}>
                  <div style = {{fontSize: 14, background: '#0B172B', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', borderRadius: 7, padding: '40px 15px', marginTop: 35, minHeight: 245}}>
                    <Row style = {{width: '100%', margin: 0}}>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                          <div style = {{float: 'left', color: 'white', display: 'inline', fontSize: 13}}>
                            <FaWindows style = {{fontSize: 16, position: 'relative', bottom: 1, paddingRight: 5, color: 'white'}}/> Windows 64-Bit
                          </div>
                        <div style = {{float: 'right', display: 'inline', color: 'white'}}>
                          {
                          this.props.disks === undefined || this.props.disks.length === 0 || this.props.is_creating
                          ?
                          <Popup trigger = {
                            <Button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</Button>
                          } modal
                            onClose = {() => this.showExitSurvey(false)} 
                            contentStyle = {{color: '#111111', width: this.state.width > 500 ? 500 : '95%', borderRadius: 5, backgroundColor: "white", border: "none", height: this.state.width > 700 ? 150 : 200, padding: '30px 50px', textAlign: "center"}}>
                            <div style = {{fontSize: 16, textAlign: 'left'}}>
                              Once your cloud PC is finished creating, you will be able to download our client application to access your cloud PC.
                            </div>
                          </Popup>
                          :
                          <a href = {WindowsBin} download = "Fractal.exe">
                            <Button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</Button>
                          </a>
                          }
                        </div>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                        <div style = {{float: 'left', color: 'white', display: 'inline', fontSize: 13}}>
                          <FaApple style = {{fontSize: 16, position: 'relative', bottom: 1, paddingRight: 5, color: 'white'}}/> macOS 10.13+
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: 'white'}}>
                          {
                          this.props.disks === undefined || this.props.disks.length === 0 || this.props.is_creating
                          ?
                          <Popup trigger = {
                            <Button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</Button>
                          } modal
                            onClose = {() => this.showExitSurvey(false)} 
                            contentStyle = {{color: '#111111', width: this.state.width > 500 ? 500 : '95%', borderRadius: 5, backgroundColor: "white", border: "none", height: this.state.width > 700 ? 150 : 200, padding: '30px 50px', textAlign: "center"}}>
                            <div style = {{fontSize: 16, textAlign: 'left'}}>
                              Once your cloud PC is finished creating, you will be able to download our client application to access your cloud PC.
                            </div>
                          </Popup>
                          :
                          <a href = {MacBin} download = "Fractal.dmg">
                            <Button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</Button>
                          </a>
                          }
                        </div>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                        <div style = {{float: 'left', color: 'white', display: 'inline', fontSize: 13}}>
                          <FaUbuntu style = {{fontSize: 18, position: 'relative', bottom: 1, paddingRight: 5, color: 'white'}}/> Linux Ubuntu
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: 'white'}}>
                          {
                          this.props.disks === undefined || this.props.disks.length === 0 || this.props.is_creating
                          ?
                          <Popup trigger = {
                            <Button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</Button>
                          } modal
                            onClose = {() => this.showExitSurvey(false)} 
                            contentStyle = {{color: '#111111', width: this.state.width > 500 ? 500 : '95%', borderRadius: 5, backgroundColor: "white", border: "none", height: this.state.width > 700 ? 150 : 200, padding: '30px 50px', textAlign: "center"}}>
                            <div style = {{fontSize: 16, textAlign: 'left'}}>
                              Once your cloud PC is finished creating, you will be able to download our client application to access your cloud PC.
                            </div>
                          </Popup>
                          :
                          <Popup trigger = {
                            <div onClick = {() => this.setState({clipboardCopied: false})} style = {{float: 'right', display: 'inline', color: 'white'}}>
                              <button style = {{background: 'rgba(94, 195, 235, 0.1)', border: 'solid 0.5px rgb(94, 195, 235)', fontSize: 12, borderRadius: 2, color: 'rgb(94, 195, 235)', fontWeight: 'bold', width: 90, padding: '5px 5px'}}>Download</button>
                            </div>
                          } modal
                            onClose = {() => this.showExitSurvey(false)} 
                            contentStyle = {{color: '#111111', width: this.state.width > 500 ? 500 : '95%', borderRadius: 5, backgroundColor: "white", border: "none", height: this.state.width > 700 ? 300 : 350, padding: '30px 50px', textAlign: "center"}}>
                            <div style = {{fontSize: 16, textAlign: 'left'}}>
                              <div>
                                Our Linux client application relies on a few system libraries. Before downloading our application, please
                                run the following command in a terminal.
                              </div>
                              <div style = {{padding: 20, background: '#0B172B', borderRadius: 4, textAlign: 'left', fontSize: 12, marginTop: 25, color: 'white'}}>
                                <div style = {{display: 'flex'}}>
                                  <div style = {{width: 310, marginRight: 25}}>
                                    sudo apt-get install libavcodec-dev libavdevice-dev libx11-dev libxtst-dev xclip x11-xserver-utils -y
                                  </div>
                                  <div style = {{width: 50, fontSize: 18, textAlign: 'right'}}>
                                    <FaClone className = "pointerOnHover" onClick = {this.copyToClipboard} style = {{color: this.state.clipboardCopied ? '#5ec3eb' : 'white'}}/>
                                  </div>
                                </div>
                              </div>
                              <a href = {LinuxBin} download = "Fractal.AppImage">
                                <Button disabled = {this.props.disks === undefined || this.props.disks.length === 0 || this.props.is_creating ? "true" : "false"} style = {{border: 'none', fontWeight: 'bold', padding: 10, marginTop: 20, width: '100%', background: 'rgba(94, 195, 235,0.1)', color: '#5ec3eb'}}>
                                  Download
                                </Button>
                              </a>
                            </div>
                          </Popup>
                          }
                        </div>
                      </Col>
                      <Col xs = {12} style = {{padding: '0px 20px'}}>
                        <div style = {{float: 'left', color: 'white', display: 'inline'}}>
                          <FaAndroid style = {{fontSize: 18, position: 'relative', bottom: 1, paddingRight: 5, color: 'white'}}/> Android
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: 'white'}}>
                          <button disabled = "true" style = {{background: 'none', border: 'none', fontSize: 12, borderRadius: 2, color: '#A9A9A9', width: 90, padding: '5px 5px'}}>Coming Soon</button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col sm = {6} xs = {12} style = {{marginTop: this.state.width > 700 ? 0 : 70}}>
                <div>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, float: 'left', display: 'inline'}}>
                  My Info
                </div>
                {
                this.state.created !== '' || (this.props.customer && Object.keys(this.props.customer).length > 0)
                ?
                (
                !this.state.cancelling
                ?
                  <Popup trigger = {
                  <button style = {{outline: 'none', fontSize: 12, borderRadius: 2, float: 'right', display: 'inline', padding: '6px 12px', border: 'none', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)', fontWeight: 'bold'}}>
                    Cancel Plan
                  </button>
                  } modal
                    onClose = {() => this.showExitSurvey(false)} 
                    contentStyle = {{width: this.state.width > 500 ? 500 : '95%', borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: this.state.width > 700 ? 275 : 325, padding: '30px 50px', textAlign: "center"}}>
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
                      <button onClick = {() => this.showExitSurvey(true)} style = {{fontWeight: 'bold', marginTop: 30, outline: 'none', width: '100%', fontSize: 12, borderRadius: 3, float: 'right', display: 'inline', padding: '10px 10px', border: 'none', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                        I UNDERSTAND, PROCEED
                      </button>
                    </div>
                    :
                    <div className = "exit-survey">
                      <div style = {{fontWeight: 'bold', fontSize: 22}}><strong>Your Feedback</strong></div>
                      <textarea onChange = {this.changeExitFeedback} rows = "4" cols = {this.state.width > 700 ? "52" : "30"} placeholder = "Please give us some feedback on why you're cancelling, so we can improve Fractal. Be brutally honest!"
                        style = {{outline: 'none', resize: 'none', background: 'none', border: 'none', marginTop: 20, fontSize: 14, padding: 0}}>
                      </textarea>
                      {
                      this.state.exitFeedback !== ''
                      ?
                      <button onClick = {this.cancelPlan} style = {{fontWeight: 'bold', marginTop: this.state.width > 700 ? 19 : 65, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', border: 'none', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                        CANCEL PLAN
                      </button>
                      :
                      <button style = {{opacity: 0.5, fontWeight: 'bold', marginTop: this.state.width > 700 ? 19 : 65, outline: 'none', width: '100%', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '10px 10px', border: 'none', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
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
              <div style = {{display: 'block', fontSize: 13, background: 'white', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', borderRadius: 7, marginTop: 40, padding: '40px 15px', minHeight: 200}}>
                <Row style = {{width: '100%', margin: 0, marginBottom: 10}}>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: this.state.width > 700 ? 'left' : 'none', display: this.state.width > 700 ? 'inline' : 'block', fontWeight: 'bold', color: '#555555'}}>
                      <FaUser style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Username
                    </div>
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', paddingLeft: this.state.width > 700 ? 0 : 17, color: '#555555'}}>
                      {this.props.user}
                    </div>
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: this.state.width > 700 ? 'left' : 'none', display: this.state.width > 700 ? 'inline' : 'block', fontWeight: 'bold', color: '#555555'}}>
                      <FaFastForward style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Current Period Start
                    </div>
                    {
                    this.state.billStart
                    ?
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', paddingLeft: this.state.width > 700 ? 0 : 17, color: '#555555'}}>
                      {this.state.billStart}
                    </div>
                    :
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', marginLeft: this.state.width > 700 ? 0 : 17, background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: this.state.width > 700 ? 'left' : 'none', display: this.state.width > 700 ? 'inline' : 'block', fontWeight: 'bold', color: '#555555'}}>
                      <FaPause style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Current Period End
                    </div>
                    {
                    this.state.billEnd
                    ?
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', paddingLeft: this.state.width > 700 ? 0 : 17, color: '#555555'}}>
                      {this.state.billEnd}
                    </div>
                    :
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', marginLeft: this.state.width > 700 ? 0 : 17, background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px', marginBottom: 15}}>
                    <div style = {{float: this.state.width > 700 ? 'left' : 'none', display: this.state.width > 700 ? 'inline' : 'block', fontWeight: 'bold', color: '#555555'}}>
                      <FaPlay style = {{height: 9, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Current Plan
                    </div>
                    {
                    this.props.payment && Object.keys(this.props.payment).length > 0 && this.props.payment.plan && this.props.payment.plan.nickname
                    ?
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', paddingLeft: this.state.width > 700 ? 0 : 17, color: '#555555'}}>
                      {this.props.payment.plan.nickname}
                    </div>
                    :
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', marginLeft: this.state.width > 700 ? 0 : 17, background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
                    </div>
                    }
                  </Col>
                  <Col xs = {12} style = {{padding: '0px 20px'}}>
                    <div style = {{float: this.state.width > 700 ? 'left' : 'none', display: this.state.width > 700 ? 'inline' : 'block', fontWeight: 'bold', color: '#555555'}}>
                      <FaTag style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Free Trial Ends
                    </div>
                    {
                    this.state.trialEnd
                    ?
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', paddingLeft: this.state.width > 700 ? 0 : 17, color: '#555555'}}>
                      {this.state.trialEnd}
                    </div>
                    :
                    <div style = {{float: this.state.width > 700 ? 'right' : 'none', display: this.state.width > 700 ? 'inline' : 'block', marginLeft: this.state.width > 700 ? 0 : 17, background: '#EBEBEB', width: 100, height: 6, borderRadius: 3, position: 'relative', top: 8}}>
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
      </div>
      }
      </div>
    );
  }
  }
}

function mapStateToProps(state) {
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    user: state.AccountReducer.user,
    disks: typeof state.AccountReducer.disks === 'undefined' ? [] : state.AccountReducer.disks,
    is_creating: state.AccountReducer.is_creating,
    id: state.AccountReducer.id,
    payment: state.AccountReducer.payment,
    emailStatus: state.AccountReducer.emailStatus,
    promoCode: state.AccountReducer.promoCode,
    credits: state.AccountReducer.credits,
    email_verified: state.AccountReducer.email_verified,
    show_survey: state.AccountReducer.show_survey,
    customer: state.AccountReducer.customer,
    dashboard_loaded: state.AccountReducer.dashboard_loaded,
    status_id: state.AccountReducer.status_id ? state.AccountReducer.status_id : null,
    disk_creation_message: state.AccountReducer.disk_creation_message ? state.AccountReducer.disk_creation_message : 'Create Cloud PC command sent to server.'
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))
