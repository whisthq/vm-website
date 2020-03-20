import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import '../../static/App.css';

import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { logout, getVMStatus, retrieveCustomer, vmCreating, cancelPlan, fetchVMs } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCheckCircle, FaUser, FaLock, FaDollarSign, FaArrowRight, FaPlus, FaPlay, FaFastForward, FaPause, FaWindows, FaApple, FaUbuntu } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

import CPU from '../../assets/cpu.svg'
import GPU from '../../assets/gpu.svg'
import RAM from '../../assets/ram.svg'
import SSD from '../../assets/hard-drive-icon.svg'
import WindowsBin from '../../bin/Fractal.exe'
import MacBin from '../../bin/Fractal.dmg'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {width: 0, height: 0, modalShow: false, showPopup: false, day: 0, month: 0, year: 0, created: '', billStart: '', billEnd: '', cancelling: false}
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
    console.log(this.props.payment)
    if(Object.keys(this.props.payment).length > 0) {
      console.log("PAYMENT FOUND")
      if(this.state.created === '' && this.props.payment.created) {
        this.setState({created: this.unixToDate(this.props.payment.created)})
      }
      if(this.state.billStart === '' && this.props.payment.current_period_start) {
        this.setState({billStart: this.unixToDate(this.props.payment.current_period_start)})
      }
      if(this.state.billEnd === '' && this.props.payment.current_period_end) {
        this.setState({billEnd: this.unixToDate(this.props.payment.current_period_end)})
      }
    } else {
      console.log("NO PAYMENT")
      if(this.state.created != '') {
        this.setState({created: '', cancelling: false})
      }
      if(this.state.billStart != '') {
        this.setState({billStart: '', cancelling: false})
      }
      if(this.state.billEnd != '') {
        this.setState({billEnd: '', cancelling: false})
      }
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  cancelPlan = () => {
    this.setState({cancelling: true})
    this.props.dispatch(vmCreating(false))
    this.props.dispatch(cancelPlan())
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

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div>
      {
      !this.props.loggedIn
      ?
      <Redirect to = "/auth"/>
      :
      <div style = {{backgroundColor: "white", paddingBottom: 75, minHeight: '100vh', overflowX: 'hidden !important'}}>
        <Header color = "#333333" button = "#5ec3eb"/>
        <div style = {{display: 'flex', width: '100vw', overflowX: 'hidden'}}>
          <div style = {{width: 300, paddingLeft: 135, paddingTop: 120, backgroundColor: 'rgba(216,216,233,.2)', flex: '0 1 auto', zIndex: 0}}>
            <div style = {{marginBottom: 20, fontWeight: 'bold', color: '#111111'}}>DASHBOARD</div>
            <div className = "sign-out-button" onClick = {() => this.props.dispatch(logout())}>Sign Out</div>
          </div>
          <div style = {{paddingTop: 100, paddingLeft: 100, paddingBottom: 100, width: 'calc(100% - 400px)'}}>
            <div>
              {this.state.month} {this.state.day}, {this.state.year}
            </div>
            <div style = {{fontSize: 40, fontWeight: 'bold'}}>
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
                <Col md = {3} sm = {6} xs = {12}>
                  <Link style = {{textDecoration: 'none'}} to = "/purchase" className = "create-cloud-pc">
                  <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 160, margin:'auto', width: '100%', marginBottom: 20, width: 175}}>
                    <FaPlus style = {{height: 25, marginTop: 10, color: "#333333"}}/>
                    <div style = {{color: "#555555", fontSize: 13, marginTop: 20}}>Create Cloud Computer</div>
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
            <div style = {{marginTop: 40}}>
              <div style = {{display: 'block'}}>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, display: 'inline'}}>
                  Downloads
                </div>
                <div style = {{width: '100%'}}>
                  <div style = {{fontSize: 14, backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: 7, padding: 30, marginTop: 30}}>
                    <Row style = {{width: '100%', marginBottom: 10}}>
                      <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
                          <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                            <FaWindows style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> Windows 64-Bit
                          </div>
                        <a href = {WindowsBin} download = "Fractal.exe">
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button style = {{background: 'none', border: 'solid 0.5px #0b172b', fontSize: 12, borderRadius: 5, color: '#0b172b', width: 90}}>Download</button>
                        </div>
                        </a>
                      </Col>
                      <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
                        <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                          <FaApple style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> macOS
                        </div>
                        <a href = {MacBin} download = "Fractal.dmg">
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button style = {{background: 'none', border: 'solid 0.5px #0b172b', fontSize: 12, borderRadius: 5, color: '#0b172b', width: 90}}>Download</button>
                        </div>
                        </a>
                      </Col>
                    </Row>
                    <Row style = {{width: '100%', marginBottom: 10}}>
                      <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
                        <div style = {{float: 'left', fontWeight: 'bold', color: '#333333', display: 'inline'}}>
                          <FaUbuntu style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#666666'}}/> Ubuntu 18.04
                        </div>
                        <div style = {{float: 'right', display: 'inline', color: '#333333'}}>
                          <button disabled = "true" style = {{background: 'none', border: 'solid 0.5px #A9A9A9', fontSize: 12, borderRadius: 5, color: '#A9A9A9', width: 90}}>Coming Soon</button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            <div style = {{marginTop: 60}}>
              <div style = {{display: 'block'}}>
                <div style = {{fontSize: 20, fontWeight: 'bold', marginBottom: 20, float: 'left', display: 'inline'}}>
                  My Info
                </div>
                {
                this.state.created != ''
                ?
                (
                !this.state.cancelling
                ?
                  <button onClick = {this.cancelPlan} style = {{outline: 'none !important', fontSize: 12, borderRadius: 5, float: 'right', display: 'inline', padding: '5px 10px', border: 'solid 1px #e34d4d', color: '#e34d4d', backgroundColor: 'rgba(227, 77, 77, 0.05)'}}>
                    Cancel Plan
                  </button>
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
              <div style = {{display: 'block', width: 'calc(100vw - 500px)', fontSize: 14, background: 'white', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: 7, marginTop: 40, padding: 30}}>
                <Row style = {{width: '100%', marginBottom: 10}}>
                  <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
                    <div style = {{float: 'left', fontWeight: 'bold', color: '#555555', display: 'inline'}}>
                      <FaUser style = {{height: 11, position: 'relative', bottom: 1, paddingRight: 5, color: '#DDDDDD'}}/> Username
                    </div>
                    <div style = {{float: 'right', display: 'inline', color: '#555555'}}>
                      {this.props.user}
                    </div>
                  </Col>
                  <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
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
                </Row>
                <Row style = {{width: '100%'}}>
                  <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
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
                  <Col sm = {6} xs = {12} style = {{padding: '0px 30px'}}>
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
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.AccountReducer)
  return { 
    loggedIn: state.AccountReducer.loggedIn,
    user: state.AccountReducer.user,
    vms: typeof state.AccountReducer.vm_credentials == "undefined" ? [] : state.AccountReducer.vm_credentials,
    is_creating: state.AccountReducer.is_creating,
    percentage: typeof state.AccountReducer.progress == "undefined" ? 1 : state.AccountReducer.progress,
    id: state.AccountReducer.id,
    payment: state.AccountReducer.payment
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard))