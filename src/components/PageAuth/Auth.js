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
import { userLogin } from '../../actions/index.js';
import "react-tabs/style/react-tabs.css";


class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, 
      emailLogin: '', passwordLogin: '', emailSignup: '', passwordSignup: '', passwordConfirmSignup: ''}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeEmailLogin = this.changeEmailLogin.bind(this)
    this.changePasswordLogin = this.changePasswordLogin.bind(this)
    this.changeEmailSignup = this.changeEmailSignup.bind(this)
    this.changePasswordSignup = this.changePasswordSignup.bind(this)
    this.changePasswordConfirmSignup = this.changePasswordConfirmSignup.bind(this) 
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
        <div className = "Homepage-Top" style = {{minHeight: '100vh', paddingTop: 120}}>
          {
          this.state.width > 700
          ?
          <Container style = {{margin: 'auto', maxWidth: 900, position: 'relative', top: 50, color: 'white', padding: 0}}>
            <div style = {{backgroundColor: '#94a8ed', padding: 40, borderRadius: 2}}>
            <Row style = {{maxHeight: 250}}>
              <Col md = {5}>
                <div style = {{fontWeight: 'bold', fontSize: 25}}>Experience the next generation of personal computing.</div>
                <div style = {{color: '#f1f1f1', marginTop: 20}}>Create an account to access your personal portal, where you
                can order a Cube or log in to your virtual desktop from any device (if you've purchased a Cube).</div>
              </Col>
              <Col md = {7} style = {{paddingLeft: 30, paddingRight: 30}}>
                <div style = {{backgroundColor: 'white', height: 440, position: 'relative', borderRadius: 2, bottom: 90, padding: 20}}>
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
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          onChange = {this.changePasswordLogin}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
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
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          onChange = {this.changePasswordSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          type = "password"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Confirm Password"
                          onChange = {this.changePasswordConfirmSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <Button style = {{marginTop: 40, color: 'white', width: '100%', fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none'}}>Sign Up</Button>
                    </TabPanel>
                  </Tabs>
                </div>
              </Col>
            </Row>
            </div>
            </Container>
            :
            <Container style = {{paddingBottom: 50}}>
            <div style = {{backgroundColor: '#94a8ed', color: 'white', margin: '0px 4px 4px 0px', borderRadius: 2, padding: 35, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 25}}>Experience the next generation of personal computing.</div>
                <div style = {{color: '#f1f1f1', marginTop: 20}}>Create an account to access your personal portal, where you
                can order a Cube or log in to your virtual desktop from any device (if you've purchased a Cube).</div>
            </div>
            <div style = {{width: '100%', margin: 0}}>
                <div style = {{backgroundColor: 'white', borderRadius: 2, padding: 20}}>
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
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          type = "password"
                          placeholder = "Password"
                          onChange = {this.changePasswordLogin}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <div style = {{color: '#94a8ed', textAlign: 'center', marginTop: 30, color: '#007bff'}}>Forgot Password?</div>
                      <Button onClick = {this.handleLogin} style = {{marginTop: 40, color: 'white', width: '100%', fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none'}}>
                        Log In
                      </Button>
                    </TabPanel>
                    <TabPanel style = {{padding: '15px 30px'}}>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Email Address"
                          onChange = {this.changeEmailSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder = "Password"
                          type = "password"
                          onChange = {this.changePasswordSignup}
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <InputGroup className="mb-3" style = {{marginTop: 30}}>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          type = "password"
                          onChange = {this.changePasswordConfirmSignup}
                          placeholder = "Confirm Password"
                          style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                        /><br/>
                      </InputGroup>
                      <Button style = {{marginTop: 40, color: 'white', width: '100%', fontWeight: 'bold', backgroundColor: '#94a8ed', border: 'none'}}>
                        Sign Up
                      </Button>
                    </TabPanel>
                  </Tabs>
                </div>
            </div>
            </Container>
            }
            </div>
        </div>
    );
  }
}



export default connect()(Auth);