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
import { userLogin, userSignup, changeStage, logout, getVMStatus } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";
import { FaExclamationTriangle } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'
import { withRouter } from "react-router";
import { fetchVMs } from '../../actions/index.js';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, page: 1, percentage: 40}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    if(this.props.is_creating) {
      this.props.dispatch(getVMStatus(this.props.id))
    }
    this.props.dispatch(fetchVMs(this.props.user))
    this.props.dispatch(changeStage(1))
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
    return (
      <div>
      {
      !this.props.loggedIn
      ?
      <Redirect to = "/auth"/>
      :
      <div style = {{backgroundColor: "#222222", paddingBottom: 75}}>
        <Header color = "white" button = "rgba(0,0,0,0.0)"/>
        <Container style = {{paddingTop: 120}}>
          <Row>
          <Col md = {3} style = {{paddingRight: 15}}>
            <div style = {{padding: 30}}>
              {
              this.state.page === 1
              ?
              <div style = {{fontWeight: 'bold'}}>
                <div style = {{color: '#E0871F', marginBottom: 30}}>DASHBOARD</div>
                <div style = {{color: '#555555', marginBottom: 30}}>SETTINGS</div>
                <div style = {{color: '#555555', marginBottom: 30}}>MY ACCOUNT</div>
                <div style = {{color: '#555555', marginBottom: 30}}>SUPPORT</div>
                <Link style = {{textDecoration: 'none'}}><div style = {{color: '#555555', marginBottom: 30}} onClick = {() => this.props.dispatch(logout())}>LOG OUT</div></Link>
              </div>
              :
              <div style = {{fontWeight: 'bold'}}>
                <div style = {{color: '#555555', marginBottom: 30}}>DASHBOARD</div>
                <div style = {{color: '#E0871F', marginBottom: 30}}>SETTINGS</div>
                <div style = {{color: '#555555', marginBottom: 30}}>MY ACCOUNT</div>
                <div style = {{color: '#555555', marginBottom: 30}}>SUPPORT</div>
                <div style = {{color: '#555555', marginBottom: 30}} onClick = {() => this.props.dispatch(logout())}>LOG OUT</div>
                <Link style = {{textDecoration: 'none'}}><div style = {{color: '#555555', marginBottom: 30}} onClick = {() => this.props.dispatch(logout())}>LOG OUT</div></Link>
              </div>
              }
            </div>
          </Col>
          <Col md = {9}>
              <Row style = {{marginBottom: 35}}>
                <Col>
                  <div style = {{backgroundColor: '#191E23', padding: "30px 50px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)"}}>
                    <div style = {{fontSize: 35, color: 'white', fontWeight: 'bold'}}>
                    Instances
                    </div>
                    <div style = {{color: "#A9A9A9", marginTop: 25}}>
                      Download the Fractal desktop app. Then, log into your virtual computer with your provided username and password.
                    </div>
                    <div style = {{marginTop: 45}}>
                      <Button style = {{backgroundColor: "rgba(0,0,0,0.0)", border: "solid 2px #D62424", color: "#D62424", padding: "7px 30px", fontSize: 14}}>LAUNCH APP</Button>
                      <Link to = "/vm">
                      <Button style = {{background: "linear-gradient(110.1deg, #D62424 0%, #E0871F 100%)", border: "0px", color: "white", padding: "9px 40px", marginLeft: 20, fontSize: 14}}>NEW INSTANCE</Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row key = {this.props.vms}>
                {
                this.props.is_creating
                ?
                 <Col xs = {6} style = {{marginBottom: 30}}>
                  <div style = {{backgroundColor: '#222429', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", height: 175}}>
                    <div style = {{textAlign: 'center', paddingTop: 20, color: '#c9c9c9', fontSize: 14, fontWeight: 'bold'}}>
                      <div style = {{paddingTop: 40, paddingBottom: 20, width: '75%', margin: 'auto', display: 'flex'}}>
                        <div style = {{width: `${this.props.percentage}%`}}>
                          <div style = {{width: '100%', background: "linear-gradient(110.1deg, #D62424 0%, #E0871F 100%)", height: 12, borderRadius: "6px 0px 0px 6px"}}>
                          </div>
                        </div>
                        <div style = {{width: `${100 - this.props.percentage}%`}}>
                          <div style = {{width: '100%', background: "#333333", height: 12, borderRadius: "0px 6px 6px 0px"}}>
                          </div>
                        </div>
                      </div>
                      Creating New Instance
                    </div>
                  </div>
                </Col>
                :
                <div></div>
                }
                {
                  this.props.vms.map((vm) => (
                    <Col xs = {6} style = {{marginBottom: 30}}>
                      <div style = {{backgroundColor: '#222429', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", height: 175}}>
                        <div style = {{backgroundColor: '#191E23', padding: '15px 30px', color: 'white'}}>
                          Windows Instance
                        </div>
                        <div style = {{padding: 35, fontSize: 14}}>
                          <Row>
                            <Col xs = {4} style = {{color: '#888888'}}>Username</Col>
                            <Col xs = {8} style = {{color: '#c9c9c9', textAlign: 'right'}}>{vm.vm_username}</Col>
                          </Row>
                          <Row>
                            <Col xs = {4} style = {{color: '#888888'}}>Password</Col>
                            <Col xs = {8} style = {{color: '#c9c9c9', textAlign: 'right'}}>{vm.vm_password}</Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            </Col>
          </Row>
        </Container>
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
    vms: typeof state.AccountReducer.vm_credentials == "undefined" ? [] : state.AccountReducer.vm_credentials,
    is_creating: state.AccountReducer.is_creating,
    percentage: state.AccountReducer.progress,
    id: state.AccountReducer.id}
}

export default withRouter(connect(mapStateToProps)(Dashboard))