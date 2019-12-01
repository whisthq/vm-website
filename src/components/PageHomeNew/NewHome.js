import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../../static/App.css';
import LandingTop from '../../assets/landingtop.svg'
import LandingLeft from '../../assets/landingleft.svg'
import CubeRender1 from '../../assets/cuberender.png'
import InfoBox from '../../assets/infobox.svg'
import PriceCompare from '../../assets/pricecompare.svg'
import PriceCompareSmall from '../../assets/pricecomparesmall.svg'
import Car from '../../assets/car.svg'
import Topography from '../../assets/topography.svg'
import Logo from '../../assets/logo.svg'
import CubeSection from './containers/cubesection.js'
import SignupBox from './containers/signupbox.js'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'


class PageHome extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.learnmore = this.learnmore.bind(this)
    this.joinbeta = this.joinbeta.bind(this)
  }

  learnmore() {
    this.refs.learnmore.scrollIntoView();
  }

  joinbeta() {
    this.refs.joinbeta.scrollIntoView();
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    // setTimeout(
    //   function() {
    //       this.setState({loaded: true});
    //   }
    //   .bind(this),
    //   2500
    // );
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
      <div className='App'>
        <Header  color = "#333333" button = "#94a8ed"/>
        <div style = {{minHeight: '100vh', paddingTop: 140}}>
          <Container>
            <Row>
              <Col md = {5} style = {{textAlign: 'left', paddingRight: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}>Transform any device into a <span className = "blue-gradient">supercomputer</span></div>
                <p style = {{textAlign: 'left', marginTop: 20}}>GPU-accelerated workstations in the cloud designed for <strong>creative professionals</strong></p>
                <Link to = '/vm'>
                  <Button style = {{marginTop: 25, paddingLeft: 50, paddingRight: 50, background: 'rgba(0,0,0,0.0)', border: 'solid 1px #4166E7', color: '#4166E7'}}>Get Started</Button>
                </Link>
              </Col>
              <Col md = {7} style = {{textAlign: 'right'}}>
                {
                this.state.width > 700
                ?
                <img src = {Car} style = {{width: "100%", maxWidth: 550}}/>
                :
                <img src = {Car} style = {{width: "100%", maxWidth: 550, marginTop: 50}}/>
                }
              </Col>
            </Row>
          </Container>
        </div>
        <div style = {{backgroundColor: "white", minHeight: '80vh'}}>
          <Container>
            <Row>
              <Col md = {5} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: 100}}>
                <div style = {{width: '100%', maxWidth: 350, height: 280, backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 35px', fontWeight: 'bold'}}>
                    Windows Instance
                  </div>
                  <div style = {{width: '100%', padding: 35, color: '#333333', fontSize: 13}}>
                    <Row>
                      <Col xs = {6}><strong>1</strong> NVIDIA Tesla T4</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>32 GB</strong> DDR4 RAM</Col>
                    </Row>
                    <Row style = {{marginTop: 5}}>
                      <Col xs = {6}><strong>8</strong> CPU cores, 3.2 GHz</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>1 TB</strong> NVMe SSD</Col>
                    </Row>
                    <Link to = "/vm">
                    <Button style = {{width: '100%', color: 'white', background: "linear-gradient(110.1deg, #D62424 0%, #E0871F 100%)", fontWeight: "bold", padding: 8, textAlign: 'center', borderRadius: 5, marginTop: 50, border: 'none', fontSize: 14}}>
                      LAUNCH
                    </Button>
                    </Link>
                  </div>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 7, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}><span className = "orange-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from your laptop with NVIDIA Tesla T4 GPUs in the cloud.</p>
              </Col>
              :
              <Col md = {{span: 7, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 100, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}><span className = "orange-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from your laptop with NVIDIA Tesla T4 GPUs in the cloud.</p>
              </Col>
              }
            </Row>
          </Container>
        </div>
        <div style = {{backgroundColor: "#f8f8f8", minHeight: "105vh"}}>
          <Container>
            <Row>
              <Col md={6} style = {{paddingTop: 120}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 200}}>
                  <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}>Fractal instances are <span className = "blue-gradient">fast</span></div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Experience <strong>60 frames per second</strong> without noticeable latency or input lag.</p>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md={6} style = {{paddingTop: 260}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 200}}>
                  <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}><span className = "blue-gradient">Really fast</span></div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Upload a 5GB video file to cloud storage in under <strong>three minutes</strong> (coming soon).</p>
                </div>
              </Col>
              :
              <Col md={6} style = {{paddingTop: 40, paddingBottom: 100}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 200}}>
                  <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left'}}><span className = "blue-gradient">Really fast</span></div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Upload a 5GB video file to cloud storage in under <strong>three minutes</strong> (coming soon).</p>
                </div>
              </Col>
              }
            </Row> 
          </Container>
        </div>
        <div style = {{backgroundColor: "#222222", minHeight: '100vh'}}>
          <Container style = {{paddingTop: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "white", textAlign: 'center'}}>And <span className = "orange-gradient">extremely affordable</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20, color: "#A9A9A9"}}>A small monthly (or hourly) fee, versus thousands of dollars upfront for an expensive PC.</p>
            </div>
            {
            this.state.width > 700
            ?
            <img src = {PriceCompare} style = {{width: '100%', margin: 'auto', maxWidth: 700, marginTop: 75}}/>
            :
            <img src = {PriceCompareSmall} style = {{width: '90%', margin: 'auto', maxWidth: 700, marginTop: 75}}/>
            }
          </Container>
        </div>
        <div style = {{backgroundColor: 'white', minHeight: '100vh'}}>
          <Container style = {{paddingTop: 100, paddingBottom: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'center'}}>Access your desktop <span className = "blue-gradient">anywhere</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20}}>
                Need to work in more than one location? Forgot to upload a file to the cloud, or to commit a change? Your Fractal instance is accessible from any Internet-connected device.
              </p>
            </div>
            <Row style = {{marginTop: 75}}>
              <Col md = {6}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 230}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Color Correction</div>
                  <div style = {{backgroundColor: "#4166E7", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 100, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Achieve near-100% RGB color accuracy with our build-to-lossless streaming technology.</p>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {6}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 230}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#94a8ed", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 100, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              :
              <Col md = {6} style = {{marginTop: 40}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", maxWidth: 400, margin: 'auto', minHeight: 230}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#94a8ed", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 100, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              }
            </Row>
          </Container>
        </div>
        <div style = {{backgroundColor: 'white', minHeight: '100vh'}}>
          <Container style = {{paddingTop: 50, paddingBottom: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'center'}}>Setup in under <span className = "orange-gradient">one minute</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20}}>
                Create an account, choose a configuration, and download the Fractal desktop app. That's it.
              </p>
            </div>
            <div style = {{margin: 'auto', width: 300, backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', height: 300, marginTop: 50, borderRadius: 5}}>
              <div style = {{textAlign: 'left', width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 35px', fontWeight: 'bold'}}>
                Your Info
              </div>
              <div style = {{padding: '8px 35px', marginTop: 40, display: 'flex'}}>
                <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                </div>
                <div style = {{width: '25%', height: 10, backgroundColor: '#94a8ed', borderRadius: 5, marginLeft: '5%'}}>
                </div>
              </div>
              <div style = {{padding: '8px 35px', display: 'flex'}}>
                <div style = {{width: '100%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                </div>
              </div>
              <div style = {{padding: '8px 35px', display: 'flex'}}>
                <div style = {{width: '25%', height: 10, backgroundColor: '#94a8ed', borderRadius: 5, marginRight: '5%'}}>
                </div>
                <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                </div>
              </div>
              <div style = {{width: '100%', padding: '0px 35px', textAlign: 'center', marginTop: 50}}>
              <Link to = "/vm">
              <Button style = {{border: 'none', padding: "8px", width: '100%', color: 'white', background: "linear-gradient(110.1deg, #D62424 0%, #E0871F 100%)", fontWeight: "bold", textAlign: 'center', borderRadius: 5, fontSize: 14}}>
                + New Instance
              </Button>
              </Link>
              </div>
            </div>
          </Container>
        </div>
        <div style = {{backgroundColor: "#222222", minHeight: '100vh'}} id = "beta">
          <Container style = {{paddingTop: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "white", textAlign: 'center'}}>Join Our <span className = "blue-gradient">Private Beta</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20, color: "#A9A9A9"}}>We are currently accepting 100 individuals for our private beta. If you’re interested in experiencing the next generation of personal computing,  please apply below.</p>
            </div>
            <SignupBox/>
          </Container>
        </div>
      </div>
    );
  }
}

export default PageHome;