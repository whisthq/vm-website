import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import '../../static/App.css';
import WhiteCube from '../../assets/whitecube.svg'
import BaseSpec from '../../assets/basespec.svg'
import EnhancedSpec from '../../assets/enhancedspec.svg'
import PowerSpec from '../../assets/powerspec.svg'
import SpecBox from './containers/specBox.js'
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Autofill from '../../shared_components/autofill.js'
import TypeformButton from '../../shared_components/typeformbutton.js'
import CheckoutForm from '../../shared_components/checkoutform.js'
import { FaTrashAlt, FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements';
import { HashLink } from 'react-router-hash-link';

class Purchase extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, continue: false, step: 1.0, exit: false, location: '' }
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


  goBack = () => {
    this.setState({step: this.state.step - 1})
  }

  goForward = () => {
    this.setState({step: this.state.step + 1})
  }

  handleClick1 = (supported) => {
    if(supported) {
      this.setState({step: 2, exit: false})
    } else {
      this.setState({step: 2, exit: true})
    }
  }

  handleClick2 = (location) => {
    this.setState({step: 3, location: location})
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }

    const renderSurvey = () => {
      if(this.state.step === 1) {
        return(
          <div style = {{paddingTop: 150, paddingLeft: 100, width: 'calc(100% - 400px)', overflowX: 'hidden !important'}}>
            <div>
              <span style = {{position: 'relative', bottom: 2}}>
                1 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
              </span>
              <span style = {{fontSize: 22, paddingLeft: 10}}>Do you live in the United States or Canada?</span>
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16}}>
                Currently, Fractal only has servers in certain geographic locations.
              </div>
              <div style = {{marginTop: 20}}>
                <div onClick = {() => this.handleClick1(true)}>
                  <TypeformButton buttonLabel = "Y" buttonText = "YES"/>
                </div>
                <div onClick = {() => this.handleClick1(false)}>
                  <TypeformButton buttonLabel = "N" buttonText = "NO" onClick = {() => this.handleClick1(false)}/>
                </div>
              </div>
              <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
                <Link to = "/dashboard">
                <div style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
                  <FaAngleUp style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
                </div>
                </Link>
                <div style = {{display: 'inline', borderRadius: '0px 5px 5px 0px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px'}}>
                  <FaAngleDown style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b', opacity: 0.2}}/>
                </div>
              </div>
            </div>
          </div>
        )
      } else if(this.state.step === 2 && this.state.exit) {
        return(
        <div style = {{paddingTop: 150, paddingLeft: 100, width: 'calc(100% - 400px)', overflowX: 'hidden !important'}}>
          <div style = {{fontSize: 18, maxWidth: 600, lineHeight: 1.7}}>
            Currently, Fractal is only available in the United States and Canada due to the locations of our servers. We are 
            quickly expanding; if you'd like to be notified when Fractal is available outside the US and Canada, please join
            our wait list!
          </div>
          <HashLink to = "/#beta" style = {{textDecoration: 'none'}}>
            <Button style = {{display: 'inline', marginTop: 50, padding: "12px 50px", background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)'}}>Join Wait List</Button>
          </HashLink>
          <div style = {{display: 'inline', fontSize: 12, marginTop: 40, color: '#333333', marginLeft: 25, position: 'relative', top: 24}}>
              press <strong>Enter</strong>
              <FaArrowRight style = {{height: 9, position: 'relative', bottom: 1, left: 4}}/>
          </div>
          <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
            <div onClick = {this.goBack} style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
              <FaAngleUp style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
            </div>
            <div style = {{display: 'inline', borderRadius: '0px 5px 5px 0px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px'}}>
              <FaAngleDown style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b', opacity: 0.2}}/>
            </div>
          </div>
        </div>
        )
      } else if(this.state.step === 2 && !this.state.exit) {
        return(
          <div style = {{paddingTop: 150, paddingLeft: 100, width: 'calc(100% - 400px)'}}>
            <div>
              <span style = {{position: 'relative', bottom: 2}}>
                2 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
              </span>
              <span style = {{fontSize: 22, paddingLeft: 10}}>What state do you live in?</span>
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16}}>
                So we can find servers closest to you.
              </div>
              <div style = {{marginTop: 20, overflowY: 'scroll', maxHeight: 'calc(100vh - 300px)'}}>
                  <div onClick = {() => this.handleClick2("AL")}>
                    <TypeformButton buttonLabel = "A" buttonText = "AL"/>
                  </div>
                  <div onClick = {() => this.handleClick2("AK")}>
                    <TypeformButton buttonLabel = "B" buttonText = "AK"/>
                  </div>
                  <div onClick = {() => this.handleClick2("AZ")}>
                    <TypeformButton buttonLabel = "C" buttonText = "AZ"/>
                  </div>
                  <div onClick = {() => this.handleClick2("AR")}>
                    <TypeformButton buttonLabel = "D" buttonText = "AR"/>
                  </div>
                  <div onClick = {() => this.handleClick2("CA")}>
                    <TypeformButton buttonLabel = "E" buttonText = "CA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("CO")}>
                    <TypeformButton buttonLabel = "F" buttonText = "CO"/>
                  </div>
                  <div onClick = {() => this.handleClick2("CT")}>         
                    <TypeformButton buttonLabel = "G" buttonText = "CT"/>
                  </div>
                  <div onClick = {() => this.handleClick2("DE")}> 
                    <TypeformButton buttonLabel = "H" buttonText = "DE"/>
                  </div>
                  <div onClick = {() => this.handleClick2("FL")}> 
                    <TypeformButton buttonLabel = "I" buttonText = "FL"/>
                  </div>
                  <div onClick = {() => this.handleClick2("GA")}> 
                    <TypeformButton buttonLabel = "J" buttonText = "GA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("HI")}> 
                    <TypeformButton buttonLabel = "K" buttonText = "HI"/>
                  </div>
                  <div onClick = {() => this.handleClick2("ID")}> 
                    <TypeformButton buttonLabel = "L" buttonText = "ID"/>
                  </div>
                  <div onClick = {() => this.handleClick2("IL")}> 
                    <TypeformButton buttonLabel = "M" buttonText = "IL"/>
                  </div>
                  <div onClick = {() => this.handleClick2("IN")}> 
                    <TypeformButton buttonLabel = "N" buttonText = "IN"/>
                  </div>
                  <div onClick = {() => this.handleClick2("IA")}> 
                    <TypeformButton buttonLabel = "O" buttonText = "IA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("KS")}> 
                    <TypeformButton buttonLabel = "P" buttonText = "KS"/>
                  </div>
                  <div onClick = {() => this.handleClick2("KY")}> 
                    <TypeformButton buttonLabel = "Q" buttonText = "KY"/>
                  </div>
                  <div onClick = {() => this.handleClick2("LA")}> 
                    <TypeformButton buttonLabel = "R" buttonText = "LA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("ME")}> 
                    <TypeformButton buttonLabel = "S" buttonText = "ME"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MD")}> 
                    <TypeformButton buttonLabel = "T" buttonText = "MD"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MA")}> 
                    <TypeformButton buttonLabel = "U" buttonText = "MA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MI")}> 
                    <TypeformButton buttonLabel = "V" buttonText = "MI"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MN")}> 
                    <TypeformButton buttonLabel = "W" buttonText = "MN"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MS")}> 
                    <TypeformButton buttonLabel = "X" buttonText = "MS"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MO")}> 
                    <TypeformButton buttonLabel = "Y" buttonText = "MO"/>
                  </div>
                  <div onClick = {() => this.handleClick2("MT")}> 
                    <TypeformButton buttonLabel = "Z" buttonText = "MT"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NE")}> 
                    <TypeformButton buttonLabel = "AA" buttonText = "NE"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NV")}> 
                    <TypeformButton buttonLabel = "BB" buttonText = "NV"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NH")}> 
                    <TypeformButton buttonLabel = "CC" buttonText = "NH"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NJ")}> 
                    <TypeformButton buttonLabel = "DD" buttonText = "NJ"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NM")}> 
                    <TypeformButton buttonLabel = "EE" buttonText = "NM"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NY")}> 
                    <TypeformButton buttonLabel = "FF" buttonText = "NY"/>
                  </div>
                  <div onClick = {() => this.handleClick2("NC")}> 
                    <TypeformButton buttonLabel = "GG" buttonText = "NC"/>
                  </div>
                  <div onClick = {() => this.handleClick2("ND")}> 
                    <TypeformButton buttonLabel = "HH" buttonText = "ND"/>
                  </div>
                  <div onClick = {() => this.handleClick2("OH")}> 
                    <TypeformButton buttonLabel = "II" buttonText = "OH"/>
                  </div>
                  <div onClick = {() => this.handleClick2("OK")}> 
                    <TypeformButton buttonLabel = "JJ" buttonText = "OK"/>
                  </div>
                  <div onClick = {() => this.handleClick2("OR")}> 
                    <TypeformButton buttonLabel = "KK" buttonText = "OR"/>
                  </div>
                  <div onClick = {() => this.handleClick2("PA")}> 
                    <TypeformButton buttonLabel = "LL" buttonText = "PA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("RI")}> 
                    <TypeformButton buttonLabel = "MM" buttonText = "RI"/>
                  </div>
                  <div onClick = {() => this.handleClick2("SC")}> 
                    <TypeformButton buttonLabel = "NN" buttonText = "SC"/>
                  </div>
                  <div onClick = {() => this.handleClick2("SD")}> 
                    <TypeformButton buttonLabel = "OO" buttonText = "SD"/>
                  </div>
                  <div onClick = {() => this.handleClick2("TN")}> 
                    <TypeformButton buttonLabel = "PP" buttonText = "TN"/>
                  </div>
                  <div onClick = {() => this.handleClick2("TX")}> 
                    <TypeformButton buttonLabel = "QQ" buttonText = "TX"/>
                  </div>
                  <div onClick = {() => this.handleClick2("UT")}> 
                    <TypeformButton buttonLabel = "RR" buttonText = "UT"/>
                  </div>
                  <div onClick = {() => this.handleClick2("VT")}> 
                    <TypeformButton buttonLabel = "SS" buttonText = "VT"/>
                  </div>
                  <div onClick = {() => this.handleClick2("VA")}> 
                    <TypeformButton buttonLabel = "TT" buttonText = "VA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("WA")}> 
                    <TypeformButton buttonLabel = "UU" buttonText = "WA"/>
                  </div>
                  <div onClick = {() => this.handleClick2("WV")}> 
                    <TypeformButton buttonLabel = "VV" buttonText = "WV"/>
                  </div>
                  <div onClick = {() => this.handleClick2("WI")}> 
                    <TypeformButton buttonLabel = "WW" buttonText = "WI"/>
                  </div>
                  <div onClick = {() => this.handleClick2("WY")}> 
                    <TypeformButton buttonLabel = "XX" buttonText = "WY"/>
                  </div>
              </div>
              <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
                <div onClick = {this.goBack} style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
                  <FaAngleUp style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
                </div>
                <div style = {{display: 'inline', borderRadius: '0px 5px 5px 0px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px'}}>
                  <FaAngleDown style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b', opacity: 0.2}}/>
                </div>
              </div>
            </div>
          </div>
        )
      } else if(this.state.step === 3) {
        return(
          <div style = {{paddingTop: 150, paddingLeft: 100, width: 'calc(100% - 400px)', overflowX: 'hidden !important'}}>
            <div>
              <span style = {{position: 'relative', bottom: 2}}>
                3 <FaArrowRight style = {{height: 10, position: 'relative', bottom: 2}}/> 
              </span>
              <span style = {{fontSize: 22, paddingLeft: 10}}>Create My Cloud Computer</span>
              <div style = {{marginTop: 5, color: '#555555', paddingLeft: 39, fontSize: 16}}>
                Your first seven days are free, and you can cancel anytime.
              </div>
              <div style = {{marginTop: 40, marginLeft: 39}}>
                <StripeProvider apiKey="pk_live_XLjiiZB93KN0EjY8hwCxvKmB00whKEIj3U">
                  <div className="example">
                    <Elements>
                      <CheckoutForm location = {this.state.location}/>
                    </Elements>
                  </div>
                </StripeProvider>
              </div>
              <div style = {{position: 'absolute', bottom: 25, right: 40, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)'}}>
                <div onClick = {this.goBack} style = {{display: 'inline', borderRadius: '5px 0px 0px 5px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px', borderRight: 'solid 0.5px #0b172b'}}>
                  <FaAngleUp style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b'}}/>
                </div>
                <div style = {{display: 'inline', borderRadius: '0px 5px 5px 0px', backgroundColor: '#5ec3eb', color: 'white', padding: '5px 10px'}}>
                  <FaAngleDown style = {{height: 20, position: 'relative', bottom: 2, color: '#0b172b', opacity: 0.2}}/>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div style = {{minHeight: '100vh', height: '100%', background: 'white'}}>
        <Header color = "#333333" button = "#5ec3eb"/>
        <div style = {{display: 'flex', width: '100vw', overflowX: 'hidden'}}>
          <div style = {{width: 300, paddingLeft: 135, paddingTop: 120, backgroundColor: 'rgba(216,216,233,.2)', height: '100%', minHeight: '100vh', zIndex: 0}}>
            {
            this.state.step < 3
            ?
            <div>
              <div style = {{marginBottom: 20, fontWeight: 'bold', color: '#111111'}}>Quick Survey</div>
              <div style = {{marginBottom: 20, color: '#B9B9B9', fontSize: 14}}>Cloud PC Setup</div>
            </div>
            :
            <div>
              <div style = {{marginBottom: 20, color: '#B9B9B9'}}>Quick Survey</div>
              <div style = {{marginBottom: 20, fontWeight: 'bold', fontSize: 14, color: '#111111'}}>Cloud PC Setup</div>
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
    id: state.AccountReducer.id}
}

export default connect(mapStateToProps)(Purchase)