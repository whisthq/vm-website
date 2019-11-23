import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Server1 from '../../assets/server1.svg'
import Server2 from '../../assets/server2.svg'
import Server3 from '../../assets/server3.svg'
import { connect } from 'react-redux';
import '../../static/App.css';
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { userLogin } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";


class VM extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      emailLogin: '', passwordLogin: '', emailSignup: '', passwordSignup: '', passwordConfirmSignup: '', 
      loggedIn: false, baseColor: '#d6d6d6', enhancedColor: 'white', powerColor: '#d6d6d6',
      baseSize: 1, enhancedSize: 1.03, powerSize: 1}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeEmailLogin = this.changeEmailLogin.bind(this)
    this.changePasswordLogin = this.changePasswordLogin.bind(this)
    this.changeEmailSignup = this.changeEmailSignup.bind(this)
    this.changePasswordSignup = this.changePasswordSignup.bind(this)
    this.changePasswordConfirmSignup = this.changePasswordConfirmSignup.bind(this) 
    this.changeToBase = this.changeToBase.bind(this)
    this.changeToEnhanced = this.changeToEnhanced.bind(this)
    this.changeToPower = this.changeToPower.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(evt) {
    this.props.dispatch(userLogin(this.state.emailLogin, this.state.passwordLogin))
  }

  changeEmailLogin(evt) {
    this.setState({
      emailLogin: evt.target.value
    });
  }

  changePasswordLogin(evt) {
    this.setState({
      passwordLogin: evt.target.value
    });
  }

  changeEmailSignup(evt) {
    this.setState({
      emailSignup: evt.target.value
    });
  }

  changePasswordSignup(evt) {
    this.setState({
      passwordSignup: evt.target.value
    });
  }

  changePasswordConfirmSignup(evt) {
    this.setState({
      passwordConfirmSignup: evt.target.value
    });
  }

  changeToBase(evt) {
    this.setState({
      baseColor: 'white',
      enhancedColor: '#d6d6d6',
      powerColor: '#d6d6d6',
      baseSize: 1.03,
      enhancedSize: 1,
      powerSize: 1
    });
  }

  changeToEnhanced(evt) {
    this.setState({
      baseColor: '#d6d6d6',
      enhancedColor: 'white',
      powerColor: '#d6d6d6',
      baseSize: 1,
      enhancedSize: 1.03,
      powerSize: 1
    });
  }

  changeToPower(evt) {
    this.setState({
      baseColor: '#d6d6d6',
      enhancedColor: '#d6d6d6',
      powerColor: "white",
      baseSize: 1,
      enhancedSize: 1,
      powerSize: 1.03
    });
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

  render() {
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    return (
      <div>
        <Header/>
        <div style = {{minHeight: '100vh', backgroundColor: "#222222", paddingTop: 150}}>
          <Container>
            <Row>
              <Col xs = {4} style = {{lineHeight: 3, fontWeight: 'bold', borderRight: 'solid 1px #C9C9C9', minHeight: '100vh'}}>
              {
                this.state.loggedIn
                ?
                (
                <div>
                  <div style = {{color: "#94a8ed", fontWeight: 'bold', fontSize: 110, lineHeight: 1.7}}>
                    02
                    <span style = {{color: "#585858", fontSize: 30}}>/02</span>
                  </div>
                  <div style = {{color: "#B0B0B0"}}>GET STARTED</div>
                  <div style = {{color: 'white'}}>CREATE A COMPUTER</div>
                </div>    
                )
                :
                (
                <div>
                  <div style = {{color: "#94a8ed", fontWeight: 'bold', fontSize: 110, lineHeight: 1.7}}>
                    01
                    <span style = {{color: "#585858", fontSize: 30}}>/02</span>
                  </div>
                  <div style = {{color: "white"}}>GET STARTED</div>
                  <div style = {{color: "#585858"}}>CREATE A COMPUTER</div>
                </div>
                )
              }
              </Col>
              {
              this.state.loggedIn
              ?
              <Col xs = {8} style = {{paddingLeft: 80}}>
                <div style = {{fontWeight: 'bold', fontSize: 50, color: 'white', marginBottom: 30}}>
                  Let's Create Your Cloud Computer.
                </div>
                <div style = {{color: "#a9a9a9", marginBottom: 50, fontSize: 20}}>
                  Achieve workstation-grade performance from any device — even your laptop — for a fraction of 
                  the cost.
                </div>
                <Row>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToBase}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.baseColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.baseSize })`}}>
                        <div style = {{backgroundColor: `${ this.state.baseColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
                          Base Instance
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$15</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P2000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>2</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>8 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>256 GB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToEnhanced}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.enhancedColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.enhancedSize })`}}>
                        <div style = {{backgroundColor: `${ this.state.enhancedColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
                          Enhanced Instance
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$25</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P4000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>12 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>512 GB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                    <Col md = {4} style = {{padding: 10}} onClick = {this.changeToPower}>
                      <div style = {{padding: 0, borderRadius: 6, backgroundColor: `${ this.state.powerColor }`, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', transform: `scale(${ this.state.powerSize })`}}>
                        <div style = {{backgroundColor: `${ this.state.powerColor }`, width: '100%', borderRadius: '6px 6px 0px 0px', padding: '8px 25px', fontWeight: 'bold', color: '#222222', borderBottom: 'solid 1px #222222'}}>
                          Power Instance
                        </div>
                        <div style = {{padding: 25}}>
                          <div style = {{fontWeight: 'bold', fontSize: 14, color: "#585858"}}>
                            <span style = {{color: "#111111", fontWeight: 'bold', fontSize: 32}}>$35</span> / mo
                          </div>
                          <table style = {{width: '100%', marginTop: 10, fontSize: 14}}>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 10}}><span style = {{color: "#222222", fontWeight: "bold"}}>1</span> NVIDIA P5000 GPU</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>4</span> 3.2 GHz CPU Cores</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>16 GB</span> RAM</td>
                            </tr>
                            <tr style = {{width: '100%'}}>
                              <td style = {{width: '100%', paddingTop: 5}}><span style = {{color: "#222222", fontWeight: "bold"}}>1 TB</span> SSD</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </Col>
                </Row>
                <Button style = {{color: 'white', marginTop: 75, paddingLeft: 75, paddingRight: 75, fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none', borderRadius: 20, float: 'right'}}>
                  Next
                </Button>
              </Col>
              :
              (
              <Col xs = {8} style = {{paddingLeft: 80}}>
                <div style = {{fontWeight: 'bold', fontSize: 50, color: 'white', marginBottom: 30}}>
                  Let's Get Started.
                </div>
                <div style = {{color: "#a9a9a9", marginBottom: 60, fontSize: 20}}>
                  Log in or sign up to unlock a Fractal cloud computer.
                </div>
                <div style = {{backgroundColor: '#e8e8e8', borderRadius: 10, padding: 50, maxWidth: 450}}>
                  <Tabs>
                    <TabList style = {{textAlign: 'center', border: 'none'}}>
                      <Tab style = {{color: '#444444', border: 'none', fontWeight: 'bold'}}>Log In</Tab>
                      <Tab style = {{color: '#444444', border: 'none', fontWeight: 'bold'}}>Sign Up</Tab>
                    </TabList>
                    <TabPanel style = {{padding: '15px 30px'}}>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Email Address"
                          onChange = {this.changeEmailLogin}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)"}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 20}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          onChange = {this.changePasswordLogin}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)"}}
                        /><br/>
                      </InputGroup>
                      <div style = {{color: '#94a8ed', textAlign: 'center', marginTop: 30, color: '#007bff'}}>Forgot Password?</div>
                      <Button  onClick = {this.handleLogin} style = {{marginTop: 40, color: 'white', width: '100%', fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none'}}>Log In</Button>
                    </TabPanel>
                    <TabPanel style = {{padding: '15px 30px'}}>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Email Address"
                          onChange = {this.changeEmailSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)"}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 20}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          onChange = {this.changePasswordSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)"}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 20}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Confirm Password"
                          onChange = {this.changePasswordConfirmSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600, backgroundColor: "rgba(0,0,0,0.0)"}}
                        /><br/>
                      </InputGroup>
                      <Button style = {{marginTop: 40, color: 'white', width: '100%', fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none'}}>Sign Up</Button>
                    </TabPanel>
                  </Tabs>
                </div>
              </Col>
              )
            }
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}



export default connect()(VM);