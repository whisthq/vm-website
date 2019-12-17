import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../../static/App.css';
import LandingTop from '../../assets/landingtop.svg'
import LandingLeft from '../../assets/landingleft.svg'
import WhiteBackground from '../../assets/whitebackground.svg'
import SpaceShip from '../../assets/spaceship.svg'
import InfoBox from '../../assets/infobox.svg'
import PriceCompare from '../../assets/pricecompare.svg'
import PriceCompareSmall from '../../assets/pricecomparesmall.svg'
import Car from '../../assets/caribou.svg'
import Topography from '../../assets/topography.svg'
import Logo from '../../assets/logo.svg'
import CubeSection from './containers/cubesection.js'
import SignupBox from './containers/signupbox.js'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

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
      <div className='App' style = {{backgroundColor: '#20254a'}}>
        <Header  color = "white" button = "#4B89E5"/>
        <div style = {{paddingTop: 100}}>
          <div className = "fractal-container" style = {{paddingBottom: 50}}>
            <Row>
              <Col md = {6} xs = {{order: 2, span: 12}} style = {{textAlign: 'left', paddingTop: 50}}>
                <div style = {{marginBottom: 30, color: "white", height: 40}}>
                  <span style = {{backgroundColor: '#4B89E5', padding: '5px 15px', color: 'white', fontWeight: 'bold', fontSize: 14, borderRadius: 10, marginRight: 20}}>NEW</span>
                  Our <HashLink to = '/#beta' style = {{textDecoration: 'none', fontWeight: 'bold', color: 'white'}}>private beta</HashLink> is now open.
                </div>
                <div style = {{color: '#FFFFFF', fontSize: 35, lineHeight: 1.4, fontWeight: 'bold'}}>Transform any device into a supercomputer</div>
                <p style = {{textAlign: 'left', marginTop: 25, color: '#D1D1D1', marginBottom: 40, fontSize: 16}}>Fractal streams GPU-powered, Windows 10 desktops to any macOS, iOS, or Windows device</p>
                <HashLink to = '/vm#top'>
                  <Button style = {{background: "linear-gradient(258.54deg, #4B89E5 0%, #d023eb 100%)", marginTop: 25, padding: "8px 25px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.65)', fontSize: 14}}>GET STARTED</Button>
                </HashLink>
                <HashLink to = '/#beta'>
                <Button style = {{background: '#4B89E5', marginTop: 25, padding: "8px 25px", border: 'none', color: 'white', fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.65)', marginLeft: 30}}>JOIN BETA</Button>
                </HashLink>
              </Col>
              <Col md = {6} xs = {{order: 1, span: 12}} style = {{textAlign: 'right'}}>
                {
                this.state.width > 700
                ?
                <img src = {Car} style = {{width: "95%", position: 'relative', maxWidth: 1200, paddingTop: 25}}/>
                :
                <img src = {Car} style = {{width: "100%"}}/>
                }
              </Col>
            </Row>
          </div>
        </div>
        <div style = {{background: 'white', backgroundSize: '100% auto'}}>
          <div className = "fractal-container">
            <Row>
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: 100}}>
                <div style = {{width: '85%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, margin: "auto", maxWidth: 600}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 35px', fontWeight: 'bold'}}>
                    Windows Instance
                  </div>
                  {
                  this.state.width > 700
                  ?
                  <div style = {{width: '100%', padding: 35, color: '#333333', fontSize: 16}}>
                    <Row>
                      <Col xs = {6}><strong>1</strong> NVIDIA Tesla T4</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>32 GB</strong> DDR4 RAM</Col>
                    </Row>
                    <Row style = {{marginTop: 5}}>
                      <Col xs = {6}><strong>8</strong> CPU cores, 3.2 GHz</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>1 TB</strong> NVMe SSD</Col>
                    </Row>
                    <HashLink to = "/vm#top">
                    <Button style = {{width: '100%', color: 'white', background: "linear-gradient(110.1deg, #4B89E5 0%, #d023eb 100%)", fontWeight: "bold", padding: 12, textAlign: 'center', borderRadius: 5, marginTop: 50, border: 'none', fontSize: 14}}>
                      LAUNCH
                    </Button>
                    </HashLink>
                  </div>
                  :
                  <div style = {{width: '100%', padding: 35, color: '#333333', fontSize: 14}}>
                    <Row>
                      <Col xs = {6}><strong>1</strong> NVIDIA Tesla T4</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>32 GB</strong> DDR4 RAM</Col>
                    </Row>
                    <Row style = {{marginTop: 5}}>
                      <Col xs = {6}><strong>8</strong> CPU cores, 3.2 GHz</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>1 TB</strong> NVMe SSD</Col>
                    </Row>
                    <HashLink to = "/vm#top">
                    <Button style = {{width: '100%', color: 'white', background: "linear-gradient(110.1deg, #4B89E5 0%, #d023eb 100%)", fontWeight: "bold", padding: 12, textAlign: 'center', borderRadius: 5, marginTop: 50, border: 'none', fontSize: 14}}>
                      LAUNCH
                    </Button>
                    </HashLink>
                  </div>
                  }
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}><span className = "blue-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from your any Windows or Apple laptop, tablet, or console with NVIDIA Tesla T4 GPUs in the cloud.</p>
              </Col>
              :
              <Col md = {{span: 6, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 100, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}><span className = "blue-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from your laptop with NVIDIA Tesla T4 GPUs in the cloud.</p>
              </Col>
              }
            </Row>
          </div>
        </div>
        {
        this.state.width > 700
        ?
        <div style = {{backgroundColor: 'white', paddingTop: "66.68%", width: '100%', position: 'relative'}}>
          <div style = {{backgroundImage: `url(${SpaceShip})`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <div className = "fractal-container" style = {{color: 'white', paddingTop: "42%", textAlign: 'center', fontWeight: 'bold', fontSize: 40, paddingBottom: 40}}>
              Fractal Cloud Computers Are <br/>Fast
            </div>
            <div style = {{color: "#D1D1D1", maxWidth: 600, margin: 'auto', zIndex: 100,  paddingLeft: 50, paddingRight: 50}}>
              Experience <span style = {{color: 'white', fontWeight: 'bold'}}>60 frames per second</span> without latency or input lag. Upload a 5GB video file to cloud storage in under three minutes (coming soon).
            </div>
             <HashLink to = "/vm#top">
              <Button style = {{zIndex: 100, marginTop: 45, padding: "12px 50px", background: "linear-gradient(110.1deg, #4B89E5 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.65)'}}>GET STARTED</Button>
            </HashLink>
          </div>
        </div>
        :
        <div style = {{backgroundColor: 'white', paddingTop: "66.68%", width: '100%', position: 'relative'}}>
          <div style = {{backgroundImage: `url(${SpaceShip})`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100}}>
            <div className = "fractal-container" style = {{color: 'white', paddingTop: "55%", textAlign: 'center', fontWeight: 'bold', fontSize: 35, paddingBottom: 40}}>
              Fractal Cloud Computers Are <br/>Fast
            </div>
            <div style = {{color: "#D1D1D1", maxWidth: 600, margin: 'auto', zIndex: 100,  paddingLeft: 50, paddingRight: 50}}>
              Experience <span style = {{color: 'white', fontWeight: 'bold'}}>60 frames per second</span> without latency or input lag. Upload a 5GB video file to cloud storage in under three minutes (coming soon).
            </div>
             <HashLink to = "/vm#top">
              <Button style = {{zIndex: 100, marginTop: 45, padding: "12px 50px", background: "linear-gradient(110.1deg, #4B89E5 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.65)'}}>GET STARTED</Button>
            </HashLink>
          </div>
        </div>
        }
        {
        this.state.width > 700
        ?
        <div></div>
        :
        <div style = {{backgroundColor: "#20254a", height: 250, zIndex: -1}}></div>
        }
        <div  style = {{backgroundColor: "#20254a", paddingBottom: 150, paddingTop: 150, position: 'relative', bottom: 2}}>
        <div className = "fractal-container">
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "white", textAlign: 'center'}}>And extremely affordable</div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20, color: "#A9A9A9"}}>A small monthly (or hourly) fee, versus thousands of dollars upfront for an expensive PC.</p>
            </div>
            {
            this.state.width > 700
            ?
            <img src = {PriceCompare} style = {{width: '100%', margin: 'auto', maxWidth: 800, marginTop: 75}}/>
            :
            <img src = {PriceCompareSmall} style = {{width: '90%', margin: 'auto', maxWidth: 800, marginTop: 75}}/>
            }
        </div>
        </div>
        <div style = {{backgroundColor: 'white'}}>
          <div className = "fractal-container" style = {{paddingTop: 100, paddingBottom: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'center'}}>Access your desktop <span className = "blue-gradient">anywhere</span></div>
            <div style = {{margin: 'auto'}}>
              <p style = {{textAlign: 'center', maxWidth: 750, margin: 'auto',  marginTop: 20 }}>
                Need to work in more than one location? Forgot to upload a file to the cloud, or to commit a change? Your Fractal instance is accessible from any Internet-connected device.
              </p>
            </div>
            <Row style = {{margin: 'auto', marginTop: 75, maxWidth: 1500}}>
              {
              this.state.width > 700
              ?
              <Col md = {6}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", minHeight: 210, margin:'auto', width: '90%', marginBottom: 20}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Color Correction</div>
                  <div style = {{backgroundColor: "#4B89E5", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Achieve near-100% RGB color accuracy with our build-to-lossless streaming technology.</p>
                </div>
              </Col>
              :
              <Col md = {6} style = {{marginTop: 40}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", margin: 'auto', minHeight: 210}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Color Correction</div>
                  <div style = {{backgroundColor: "#4B89E5", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Achieve near-100% RGB color accuracy with our build-to-lossless streaming technology.</p>
                </div>
              </Col>
              }
              {
              this.state.width > 700
              ?
              <Col md = {6}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", minHeight: 210, margin:'auto', width: '90%'}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#4B89E5", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              :
              <Col md = {6} style = {{marginTop: 40}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", margin: 'auto', minHeight: 210}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#4B89E5", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div style = {{backgroundColor: 'white'}}>
          <div className = "fractal-container">
            <Row>
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: 100}}>
                <div style = {{width: '85%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, margin: "auto", maxWidth: 600}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 40px', fontWeight: 'bold'}}>
                    Your Info
                  </div>
                  <div style = {{width: '100%', padding: 20, color: '#333333', fontSize: 16}}>
                  <div style = {{padding: '8px 20px', marginTop: 10, display: 'flex'}}>
                    <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                    <div style = {{width: '25%', height: 10, backgroundColor: '#94a8ed', borderRadius: 5, marginLeft: '5%'}}>
                    </div>
                  </div>
                  <div style = {{padding: '8px 20px', display: 'flex'}}>
                    <div style = {{width: '100%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                  </div>
                  <div style = {{padding: '8px 20px', display: 'flex'}}>
                    <div style = {{width: '25%', height: 10, backgroundColor: '#94a8ed', borderRadius: 5, marginRight: '5%'}}>
                    </div>
                    <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                  </div>
                   <div style = {{padding: '8px 20px'}}>
                  <HashLink to = "/vm#top" style = {{textAlign: 'center'}}>
                    <Button style = {{padding: 15, width: '100%', margin: 'auto', color: 'white', background: "linear-gradient(110.1deg, #4B89E5 0%, #d023eb 100%)", fontWeight: "bold", textAlign: 'center', borderRadius: 5, marginTop: 20, border: 'none', fontSize: 14}}>
                      + NEW INSTANCE
                    </Button>
                  </HashLink>
                  </div>
                  </div>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}>Setup in less than <br/><span className = "blue-gradient">one minute</span></div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from your any Windows or Apple laptop, tablet, or console with NVIDIA Tesla T4 GPUs in the cloud.</p>
              </Col>
              :
              <Col md = {{span: 6, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 100, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}><span className = "blue-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Create an account, choose a configuration, and download the Fractal desktop app. That's it.</p>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div style = {{backgroundColor: "#20254a", paddingLeft: 40, paddingRight: 40}} id = "beta">
          <Container style = {{paddingTop: 100, paddingBottom: 100}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "white", textAlign: 'center'}}>Join Our <span className = "blue-gradient">Private Beta</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20, color: '#D1D1D1'}}>We are currently accepting 100 individuals for our private beta. If you’re interested in experiencing the next generation of personal computing,  please apply below.</p>
            </div>
            <SignupBox/>
          </Container>
        </div>
      </div>
    );
  }
}

export default PageHome;