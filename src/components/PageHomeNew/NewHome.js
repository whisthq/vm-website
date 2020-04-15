import React, { Component } from 'react'
import { connect } from 'react-redux';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import '../../static/App.css';
import LandingTop from '../../assets/landingtop.svg'
import LandingLeft from '../../assets/landingleft.svg'
import WhiteBackground from '../../assets/whitebackground.svg'
import SpaceShip from '../../assets/spaceship.svg'
import InfoBox from '../../assets/infobox.svg'
import PriceCompare from '../../assets/pricecompare.svg'
import PriceCompareSmall from '../../assets/pricecomparesmall.svg'
import Cloud from '../../assets/cloud-computing.svg'
import Topography from '../../assets/topography.svg'
import Software from '../../assets/software.svg'
import Gaming from '../../assets/gaming.svg'
import Creative from '../../assets/creative.svg'
import Art from '../../assets/art.svg'
import Process from '../../assets/process.svg'
import RGBIcon from '../../assets/rgb-icon.svg'
import HardDriveIcon from '../../assets/hard-drive-icon.svg'
import FileIcon from '../../assets/file-icon.svg'
import WindowsBin from '../../bin/Fractal.exe'
import MacBin from '../../bin/Fractal.dmg'
import Logo from '../../assets/logo.svg'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import Footer from '../../shared_components/footer.js'
import { changeTab } from '../../actions/index.js';
import ImageFadeIn from 'react-image-fade-in'

class PageHome extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false, version: "Windows"}
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

  openForm = () => {
    this.typeformEmbed.typeform.open();
  }

  changeVersion = (version) => {
    if(version === "Windows") {
      this.setState({version: "Windows"});
    } else if (version === "Mac") {
      this.setState({version: "Mac"});
    }
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.dispatch(changeTab('personal'))
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
      <div className='App' style = {{backgroundColor: 'white'}} id = 'top'>
        <Header color = "#111111" button = "#5ec3eb" homepage/>
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url="https://fractalcomputers.typeform.com/to/kVelwx"
          hideHeaders
          hideFooter
          buttonText="Request Access"
          ref={tf => {
            this.typeformEmbed = tf;
          }}
          style = {{zIndex: -100}}
        />
        <div style = {{paddingTop: 100}}>
          <div className = "fractal-container" style = {{paddingBottom: 50}}>
            <Row>
              <Col md = {{span: 5, order: 1}} xs = {{order: 2, span: 12}} style = {{textAlign: 'left', paddingTop: 50}}>
                {
                this.state.width > 700
                ?
                <div style = {{color: '#111111', fontSize: 50, lineHeight: 1.3, fontWeight: 'bold', marginTop: 30}}>Transform your laptop into a <span className = "blue-gradient">supercomputer</span></div>
                :
                <div style = {{color: '#111111', fontSize: 35, lineHeight: 1.3, fontWeight: 'bold', marginTop: 30}}>Transform your laptop into a <span className = "blue-gradient">supercomputer</span></div>
                }
                <p style = {{textAlign: 'left', marginTop: 25, color: '#111111', marginBottom: 40, fontSize: 17}}>Fractal streams powerful Windows desktops to any computer.</p>
                <Link to = "/dashboard">
                  <Button style = {{boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.20)', display: 'inline', float: 'left', backgroundColor: '#111111', padding: '15px 30px', fontWeight: 'bold', borderRadius: 5, border: 'none', marginRight: 20}}>
                    GET STARTED <span style = {{color: '#D6D6D6', fontWeight: 'normal'}}> — it's free</span>
                  </Button>
                </Link>
              </Col>
              <Col md = {{span: 7, order: 2}} xs = {{order: 1, span: 12}} style = {{textAlign: 'right'}}>
                {
                this.state.width > 700
                ?
                <ImageFadeIn src = {Cloud} style = {{width: "90%", position: 'relative', maxWidth: 1200, paddingTop: 25}}/>
                :
                <ImageFadeIn src = {Cloud} style = {{width: "100%"}}/>
                }
              </Col>
            </Row>
          </div>
        </div>
        <div style = {{background: '#F9F9F9', backgroundSize: '100% auto'}}>
          <div className = "fractal-container">
            <Row>
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: '10%'}}>
                <div style = {{width: '100%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, width: '100%', maxWidth: 500}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 35px', fontWeight: 'bold'}}>
                    My Cloud PC
                  </div>
                  {
                  this.state.width > 700
                  ?
                  <div style = {{width: '100%', padding: 35, color: '#333333', fontSize: 16}}>
                    <Row>
                      <Col xs = {6}>NVIDIA Tesla M60 GPU</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>16 GB+</strong> DDR4 RAM</Col>
                    </Row>
                    <Row style = {{marginTop: 5}}>
                      <Col xs = {6}><strong>6+</strong> CPU cores</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>512 GB</strong> NVMe SSD</Col>
                    </Row>
                    <Link to = "/dashboard">
                      <Button style = {{width: '100%', color: '#0980b0', background: "rgba(94, 195, 235, 0.2)", border: "none", fontWeight: "bold", padding: 12, textAlign: 'center', borderRadius: 5, marginTop: 50,fontSize: 16}}>
                        LAUNCH
                      </Button>
                    </Link>
                  </div>
                  :
                  <div style = {{width: '100%', padding: 35, color: '#333333', fontSize: 14}}>
                    <Row>
                      <Col xs = {6}>Tesla M60 GPU</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>16 GB+</strong> RAM</Col>
                    </Row>
                    <Row style = {{marginTop: 5}}>
                      <Col xs = {6}><strong>6+</strong> CPU cores</Col>
                      <Col xs = {6} style = {{textAlign: 'right'}}><strong>512 GB</strong> SSD</Col>
                    </Row>
                    <Link to = "/dashboard">
                      <Button style = {{width: '100%', color: '#0980b0', background: "rgba(94, 195, 235, 0.2)", border: "none", fontWeight: "bold", padding: 12, textAlign: 'center', borderRadius: 5, marginTop: 50,fontSize: 16}}>
                        LAUNCH
                      </Button>
                    </Link>
                  </div>
                  }
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#111111", textAlign: 'left'}}>Graphics power<br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20, fontSize: 18}}>Edit, render, and play at insane speeds from any Windows or Apple computer with cloud GPU, RAM, and CPUs.</p>
              </Col>
              :
              <Col md = {{span: 6, order: 1}} xs = {{order: 1, span: 12}} style = {{width: '100%', marginTop: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, color: "#111111", textAlign: 'left', lineHeight: 1.4}}>Graphics power<br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Edit, render, and play at insane speeds from any Windows or Apple computer with cloud GPU, RAM, and CPUs.</p>
              </Col>
              }
            </Row>
          </div>
        </div>
        {
        this.state.width > 700
        ?
        <div></div>
        :
        <div style = {{height: 50, background: '#F9F9F9'}}></div>
        }
        <div style = {{width: '100vw', minHeight: 390, backgroundImage: 'linear-gradient(121.2deg, #D7F5F5 2.24%, #F2DEF8 100%)'}}>
          <div className = "fractal-container" style = {{paddingTop: 40, paddingBottom: 20}}>
            <Row>
              <Col md = {4} style = {{textAlign: 'left', width: '100%', marginBottom: 20}}>
                <div style = {{textAlign: 'center', width: '100%'}}>
                  <img src = {Software} style = {{height: '100%', maxHeight: 260, border: 'solid 10px white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)'}}/>
                  <div style = {{color: 'white', background: 'rgba(0,0,0,0.9)', borderRadius: 15, height: 30, fontSize: 14, padding: '4px', textAlign: 'center', fontWeight: 'bold', width: 100, margin: 'auto', marginTop: 20}}>
                    Productivity
                  </div>
                </div>
              </Col>
              <Col md = {4} style = {{textAlign: 'center', width: '100%', marginBottom: 20}}>
                <div style = {{textAlign: 'center', width: '100%'}}>
                  <img src = {Gaming} style = {{height: '100%', maxHeight: 260, border: 'solid 10px white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)'}}/>
                  <div style = {{color: 'white', background: 'rgba(0,0,0,0.9)', borderRadius: 15, height: 30, fontSize: 14, padding: '4px', textAlign: 'center', fontWeight: 'bold', width: 75, margin: 'auto', marginTop: 20}}>
                    Gaming
                  </div>
                </div>
              </Col>
              <Col md = {4} style = {{textAlign: 'right', width: '100%', marginBottom: 20}}>
                <div style = {{textAlign: 'center', width: '100%'}}>
                  <img src = {Creative} style = {{height: '100%', maxHeight: 260, border: 'solid 10px white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)'}}/>
                  <div style = {{color: 'white', background: 'rgba(0,0,0,0.9)', borderRadius: 15, height: 30, fontSize: 14, padding: '4px', textAlign: 'center', fontWeight: 'bold', width: 75, margin: 'auto', marginTop: 20}}>
                    Graphics
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {
        this.state.width > 700
        ?
        <div style = {{background: '#F9F9F9', backgroundSize: '100% auto', paddingTop: 75}}>
          <div className = "fractal-container">
            <Row style = {{marginBottom: 10, paddingTop: 30}}>
              <Col md = {4} xs = {{order: 3}} style = {{textAlign: 'left', paddingBottom: 100, paddingLeft: 20}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', padding: 30, height: 250, background: 'white'}}>
                  <img src = {Process} style = {{width: 50}}/>
                  <div style = {{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
                    Sub-9ms Software Latency
                  </div>
                  <div style = {{marginTop: 10}}>
                    Achieve an immersive, native desktop experience.
                  </div>
                </div>
              </Col>
              <Col md = {4} xs = {{order: 2}} style = {{textAlign: 'left', paddingBottom: 100, paddingLeft: 20}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', padding: 30, height: 250, background: 'white'}}>
                  <img src = {Art} style = {{width: 50}}/>
                  <div style = {{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
                    60+ Frames per Second
                  </div>
                  <div style = {{marginTop: 10}}>
                    Scrub through videos or play games effortlessly.
                  </div>
                </div>
              </Col>
              <Col md = {{span: 4, order: 1}} xs = {{order: 1, span: 12}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#111111", textAlign: 'left'}}>Fractal cloud computers are <br/><span className = "blue-gradient">fast</span></div>
              </Col>
            </Row>
          </div>
        </div>
        :
        <div style = {{background: 'white', backgroundSize: '100% auto'}}>
          <div className = "fractal-container" style = {{paddingTop: 50, paddingBottom: 50}}>
            <Row style = {{marginBottom: 30}}>
              <Col md = {12} xs = {{order: 3}} style = {{textAlign: 'left'}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', padding: 30, height: 250, background: 'white'}}>
                  <img src = {Process} style = {{width: 50}}/>
                  <div style = {{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
                    Sub-9ms Software Latency
                  </div>
                  <div style = {{marginTop: 10}}>
                    Achieve an immersive, native desktop experience.
                  </div>
                </div>
              </Col>
              <Col md = {12} xs = {{order: 2}} style = {{textAlign: 'left', paddingBottom: 20}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.20)', padding: 30, height: 250, background: 'white'}}>
                  <img src = {Art} style = {{width: 50}}/>
                  <div style = {{marginTop: 30, fontWeight: 'bold', fontSize: 20}}>
                    60+ Frames per Second
                  </div>
                  <div style = {{marginTop: 10}}>
                    Scrub through videos or play games effortlessly.
                  </div>
                </div>
              </Col>
              <Col md = {{span: 4, order: 1}} xs = {{order: 1, span: 12}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, lineHeight: 1.4, color: "#111111", textAlign: 'left', marginBottom: 50}}>Fractal cloud computers are <br/><span className = "blue-gradient">fast</span></div>
              </Col>
            </Row>
          </div>
        </div>
        }
        <div style = {{background: 'linear-gradient(180deg, #F9F9F9 61.47%, #FFFFFF 100%)', paddingTop: 75}}>
          <div className = "fractal-container" style = {{paddingBottom: 20}}>
            {
            this.state.width > 700
            ?
            <div style = {{fontWeight: 'bold', fontSize: 40, color: "#111111", textAlign: 'center', marginBottom: 20}}>Access your desktop <span className = "blue-gradient">anywhere</span></div>
            :
            <div style = {{fontWeight: 'bold', fontSize: 35, lineHeight: 1.4, color: "#111111", textAlign: 'left', marginBottom: 20}}>Access your desktop <span className = "blue-gradient">anywhere</span></div>
            }
            {
            this.state.width > 700
            ?
            <div style = {{margin: 'auto'}}>
              <p style = {{textAlign: 'center', maxWidth: 750, margin: 'auto',  marginTop: 20, fontSize: 18, marginBottom: 75}}>
                Need to work in more than one location? Forgot to upload a file to the cloud, or to commit a change? Your Fractal cloud PC is accessible from any Internet-connected device.
              </p>
            </div>
            :
            <div style = {{margin: 'auto'}}>
              <p style = {{textAlign: 'left', marginTop: 20, marginBottom: 50}}>
                Need to work in more than one location? Forgot to upload a file to the cloud, or to commit a change? Your Fractal cloud PC is accessible from any Internet-connected device.
              </p>
            </div>
            }
            <Row style = {{margin: 'auto'}}>
              {
              this.state.width > 700
              ?
              <Col md = {4} style = {{paddingLeft: 0, paddingRight: 40}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, width: '100%', marginBottom: 20}}>
                  <img src = {RGBIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Color Accuracy</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Achieve visually lossless frames with our color-accurate streaming technology.</p>
                </div>
              </Col>
              :
              <Col md = {4} style = {{padding: 0}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, width: '100%', marginBottom: 20}}>
                  <img src = {RGBIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Color Accuracy</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Achieve visually lossless frames with our color-accurate streaming technology.</p>
                </div>
              </Col>
              }
              {
              this.state.width > 700
              ?
              <Col md = {4}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {HardDriveIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Hard Drive Upload</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Clone your entire hard drive to your cloud PC at the click of a button.</p>
                </div>
              </Col>
              :
              <Col md = {4} style = {{padding: 0}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {HardDriveIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Hard Drive Upload</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Clone your entire hard drive to your cloud PC at the click of a button.</p>
                </div>
              </Col>
              }
              {
              this.state.width > 700
              ?
              <Col md = {4} style = {{paddingRight: 0, paddingLeft: 40}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {FileIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>File Backup</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Fractal can download your entire cloud PC hard drive to your local PC every 24 hours.</p>
                </div>
              </Col>
              :
              <Col md = {4} style = {{padding: 0}}>
                <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {FileIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>File Backup</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Fractal can download your entire cloud PC hard drive to your local PC every 24 hours.</p>
                </div>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div style = {{backgroundColor: 'white'}}>
          <div className = "fractal-container">
            <Row>
              {
              this.state.width > 700
              ?
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingBottom: 100, marginLeft: 0, marginTop: 100, marginBottom: 25}}>
                <div style = {{width: '100%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, width: '100%', maxWidth: 500}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 40px', fontWeight: 'bold'}}>
                    Your Info
                  </div>
                  <div style = {{width: '100%', padding: 20, color: '#333333', fontSize: 16}}>
                  <div style = {{padding: '8px 20px', marginTop: 10, display: 'flex'}}>
                    <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                    <div style = {{width: '25%', height: 10, backgroundColor: '#5ec3eb', borderRadius: 5, marginLeft: '5%'}}>
                    </div>
                  </div>
                  <div style = {{padding: '8px 20px', display: 'flex'}}>
                    <div style = {{width: '100%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                  </div>
                  <div style = {{padding: '8px 20px', display: 'flex'}}>
                    <div style = {{width: '25%', height: 10, backgroundColor: '#5ec3eb', borderRadius: 5, marginRight: '5%'}}>
                    </div>
                    <div style = {{width: '70%', height: 10, backgroundColor: '#e3e3e3', borderRadius: 5}}>
                    </div>
                  </div>
                   <div style = {{padding: '8px 20px'}}>
                   <Link to = "/dashboard">
                    <Button style = {{padding: 15, width: '100%', margin: 'auto', color: '#0980b0', background: "rgba(94, 195, 235, 0.2)", border: "none", fontWeight: "bold", textAlign: 'center', borderRadius: 5, marginTop: 20, fontSize: 16}}>
                      + NEW CLOUD PC
                    </Button>
                    </Link>
                  </div>
                  </div>
                </div>
              </Col>
              :
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingBottom: 75, marginTop: 40, marginLeft: 0, marginBottom: 25}}>
                <div style = {{width: '100%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, width: '100%'}}>
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
                   <Link to = "/dashboard">
                    <Button style = {{padding: 15, width: '100%', margin: 'auto', color: '#0980b0', background: "rgba(94, 195, 235, 0.2)", border: "none", fontWeight: "bold", textAlign: 'center', borderRadius: 5, marginTop: 20, fontSize: 16}}>
                      + NEW CLOUD PC
                    </Button>
                    </Link>
                  </div>
                  </div>
                </div>
              </Col>
              }
              {
              this.state.width > 700
              ?
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#111111", textAlign: 'left'}}>Setup in less than <br/>one minute</div>
                <p style = {{textAlign: 'left', marginTop: 20, fontSize: 18}}>Sign up, choose a cloud PC, and download the Fractal desktop app. Your first week is free, no credit card required.</p>
              </Col>
              :
              <Col md = {{span: 6, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 50, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, lineHeight: 1.4, color: "#111111", textAlign: 'left'}}>Setup in less than <br/>one minute</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Sign up, choose a cloud PC, and download the Fractal desktop app. Your first week is free, no credit card required.</p>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div style = {{background: 'linear-gradient(180deg, #F9F9F9 61.47%, #FFFFFF 100%)', paddingLeft: 40, paddingRight: 40}} id = "beta">
          <Container style = {{paddingTop: 75, paddingBottom: 150}}>
            {
            this.state.width > 700
            ?
            <div style = {{fontWeight: 'bold', fontSize: 40, color: "#111111", textAlign: 'center'}}>Fractal is <span className = "blue-gradient">Expanding</span></div>
            :
            <div style = {{fontWeight: 'bold', fontSize: 35, lineHeight: 1.4, color: "#111111", textAlign: 'left'}}>Fractal is <span className = "blue-gradient">Expanding</span></div>
            }
            {
            this.state.width > 700
            ?
            <div>
              <div style = {{margin: 'auto', maxWidth: 750}}>
                <p style = {{textAlign: 'center', marginTop: 20, color: '#333333', fontSize: 18}}>We currently have servers across the Eastern and Midwestern United States. If you live outside the US, you can request access below.</p>
              </div>
              <Button onClick = {this.openForm} style = {{marginTop: 30, backgroundColor: '#111111', padding: '15px 30px', fontWeight: 'bold', borderRadius: 5, border: 'none'}}>
                REQUEST ACCESS
              </Button>
            </div>
            :
            <div style = {{textAlign: 'left'}}>
              <div>
                <p style = {{textAlign: 'left', marginTop: 20, color: '#333333'}}>We currently have servers across the Eastern and Midwestern United States. If you live outside the US, you can request access below.</p>
              </div>
              <Button onClick = {this.openForm} style = {{marginTop: 30, backgroundColor: '#111111', padding: '15px 30px', fontWeight: 'bold', borderRadius: 5, border: 'none'}}>
                REQUEST ACCESS
              </Button>
            </div>
            }
          </Container>
        </div>
        <div style = {{textAlign: 'left'}}>
        <Footer/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    currentPage: state.AccountReducer.currentPage
  }
}

export default connect(mapStateToProps)(PageHome)