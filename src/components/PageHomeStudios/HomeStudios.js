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
import Car from '../../assets/caribou.svg'
import Topography from '../../assets/topography.svg'
import RGBIcon from '../../assets/rgb-icon.svg'
import HardDriveIcon from '../../assets/hard-drive-icon.svg'
import FileIcon from '../../assets/file-icon.svg'
import WindowsBin from '../../bin/Fractal.exe'
import MacBin from '../../bin/Fractal.dmg'
import Logo from '../../assets/logo.svg'
import Desktop from '../../assets/desktop.svg'
import StreamCompare from '../../assets/streamcompare.svg'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import Footer from '../../shared_components/footer.js'
import { changeTab } from '../../actions/index.js';

class PageStudios extends Component {
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

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    this.props.dispatch(changeTab('teams'))
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
      <div className='App' style = {{backgroundColor: '#0b172b'}}>
        <Header color = "white" button = "#5ec3eb" homepage/>
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url="https://phil603142.typeform.com/to/sYgZKf"
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
              <Col md = {{span: 6, order: 1}} xs = {{order: 2, span: 12}} style = {{textAlign: 'left', paddingTop: 50}}>
                <div style = {{marginBottom: 30, color: "#D6D6D6", fontSize: 16, height: 40, display: 'flex'}}>
                  <div style = {{height: 30, backgroundColor: '#5ec3eb', padding: '5px 15px', color: '#0b172b', fontWeight: 'bold', fontSize: 14, borderRadius: 5, marginRight: 20}}>NEW</div>
                  <div style = {{position: 'relative', bottom: 5}}>
                    Get started with a one-week free trial.
                  </div>
                </div>
                <div style = {{color: '#FFFFFF', fontSize: 35, lineHeight: 1.4, fontWeight: 'bold'}}>
                  Access your computer anywhere at <span className = "blue-gradient">ultra-low latency</span>
                </div>
                <p style = {{textAlign: 'left', marginTop: 25, color: '#EBEBEB', marginBottom: 40, fontSize: 18}}>
                  State-of-the-art remote desktop for creative work that actually feels like a real computer
                </p>
                  <Button onClick={this.openForm} style = {{display: 'inline', float: 'left', background: "linear-gradient(258.54deg, #5ec3eb 0%, #d023eb 100%)", marginTop: 5, padding: "10px 35px", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)', fontSize: 14, marginRight: 20, minWidth: 194, marginBottom: 10}}>GET STARTED</Button>
              </Col>
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{textAlign: 'right'}}>
                {
                this.state.width > 700
                ?
                <img src = {Car} style = {{width: "90%", position: 'relative', maxWidth: 1200, paddingTop: 25}}/>
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
              <Col md = {7} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: 100}}>
                <div style = {{width: '100%', margin: "auto", maxWidth: 600}}>
                  {
                  this.state.width > 700
                  ?
                  <img src = {Desktop} style = {{width: '100%'}}/>
                  :
                  <img src = {Desktop} style = {{width: '100%'}}/>
                  }
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 5, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left', lineHeight: 1.3}}>Your work computer, streamed to your <span className = "blue-gradient">personal computer</span></div>
                <p style = {{textAlign: 'left', marginTop: 25, fontSize: 18}}>Access your primary workstation to edit, render, and play at insane speeds from any Windows, Mac, or Ubuntu device.</p>
              </Col>
              :
              <Col md = {{span: 5, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 50, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 35, color: "#333333", textAlign: 'left', lineHeight: 1.4}}><span className = "blue-gradient">Graphics power</span><br/>minus the bulky hardware</div>
                <p style = {{textAlign: 'left', marginTop: 20}}>Access your primary workstation to edit, render, and play at insane speeds from any Windows, Mac, or Ubuntu device.</p>
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
            <div className = "fractal-container" style = {{color: 'white', paddingTop: "37%", textAlign: 'center', fontWeight: 'bold', fontSize: 35, paddingBottom: 40}}>
              Fractal Streaming Tech Is <br/><span className = "blue-gradient">Fast</span>
            </div>
            <div style = {{color: "#D6D6D6", maxWidth: 600, margin: 'auto', zIndex: 100, fontSize: 18, paddingLeft: 50, paddingRight: 50, lineHeight: 1.6}}>
              Experience <span style = {{color: 'white', fontWeight: 'bold'}}>60 frames per second</span> without perceivable latency at 13 Mbps bandwidth.
            </div>
            <Button onClick = {this.openForm} style = {{zIndex: 100, marginTop: 40, padding: "12px 50px", background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)', zIndex: 200}}>GET STARTED</Button>
          </div>
        </div>
        :
        <div style = {{backgroundColor: 'white', paddingTop: "66.68%", width: '100%', position: 'relative'}}>
          <div style = {{backgroundImage: `url(${SpaceShip})`, backgroundSize: '100% auto', backgroundRepeat: 'no-repeat', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100}}>
            <div className = "fractal-container" style = {{color: 'white', paddingTop: "55%", textAlign: 'center', fontWeight: 'bold', fontSize: 30, paddingBottom: 40}}>
              Fractal Cloud Computers Are <br/>Fast
            </div>
            <div style = {{color: "#D6D6D6", maxWidth: 600, margin: 'auto', zIndex: 100, paddingLeft: 50, paddingRight: 50}}>
              Experience <span style = {{color: 'white', fontWeight: 'bold'}}>60 frames per second</span> without latency or input lag. Upload a 5GB video file to cloud storage in under three minutes (coming soon).
            </div>
            <Button onClick = {this.openForm} style = {{zIndex: 100, marginTop: 40, padding: "12px 50px", background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.60)'}}>GET STARTED</Button>
          </div>
        </div>
        }
        {
        this.state.width > 700
        ?
        <div></div>
        :
        <div style = {{backgroundColor: "#0b172b", height: 250, zIndex: -1}}></div>
        }
        <div  style = {{backgroundColor: "#0b172b", paddingBottom: 150, paddingTop: 25, position: 'relative', bottom: 1}}>
        <div className = "fractal-container">
            {
            this.state.width > 700
            ?
            <div style = {{boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.6)', padding: 0, margin: 'auto', marginTop: 75, width: '100%', maxWidth: 1000}}>
              <img src = {StreamCompare} style = {{width: '100%'}}/>
            </div>
            :
            <img src = {StreamCompare} style = {{width: '90%', margin: 'auto', maxWidth: 1000, marginTop: 75}}/>
            }
        </div>
        </div>
        <div style = {{backgroundColor: 'white'}}>
          <div className = "fractal-container" style = {{paddingTop: 100, paddingBottom: 20}}>
            <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'center'}}>Skyrocket your studio's <span className = "blue-gradient">productivity</span></div>
            <div style = {{margin: 'auto'}}>
              <p style = {{textAlign: 'center', maxWidth: 750, margin: 'auto',  marginTop: 20, fontSize: 18}}>
                Significantly less lag and higher FPS compared to TeamViewer, RDP, or VNC.
              </p>
            </div>
            <Row style = {{margin: 'auto', marginTop: 75, maxWidth: 1500}}>
              {
              this.state.width > 700
              ?
              <Col md = {4}>
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, width: '100%', marginBottom: 20}}>
                  <img src = {RGBIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Color Accuracy</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Achieve visually lossless frames with our color-accurate streaming technology.</p>
                </div>
              </Col>
              :
              <Col md = {4}>
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, width: '100%', marginBottom: 20}}>
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
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {HardDriveIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Advanced Encryption</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Your entire stream — video, audio, peripheral inputs — is fully AES encrypted.</p>
                </div>
              </Col>
              :
              <Col md = {4} style = {{margin: 0}}>
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {HardDriveIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Advanced Encryption</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Your entire stream — video, audio, peripheral inputs — is fully AES encrypted.</p>
                </div>
              </Col>
              }
              {
              this.state.width > 700
              ?
              <Col md = {4}>
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 270, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {FileIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Easy to Use</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Create an account, download our application on both computers, and connect. That's it.</p>
                </div>
              </Col>
              :
              <Col md = {4}>
                <div style = {{boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: 30, minHeight: 210, margin:'auto', width: '100%', marginBottom: 20}}>
                  <img src = {FileIcon} style = {{height: 50}}/>
                  <div style = {{fontWeight: 'bold', fontSize: 20, color: "#333333", textAlign: 'left', marginTop: 30}}>Easy to Use</div>
                  <p style = {{textAlign: 'left', marginTop: 10, fontSize: 15}}>Create an account, download our application on both computers, and connect. That's it.</p>
                </div>
              </Col>
              }
{/*              {
              this.state.width > 700
              ?
              <Col md = {6}>
                <div style = {{backgroundImage: 'linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', padding: "20px 50px", minHeight: 210, margin:'auto', width: '100%'}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#5ec3eb", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              :
              <Col md = {6} style = {{marginTop: 40}}>
                <div style = {{backgroud: 'white', boxShadow: '0px 4px 50px rgba(0, 0, 0, 0.25)', padding: "20px 50px", margin: 'auto', minHeight: 210}}>
                  <div style = {{fontWeight: 'bold', fontSize: 25, color: "#333333", textAlign: 'left'}}>Hardware Flexibility</div>
                  <div style = {{backgroundColor: "#5ec3eb", color: 'white', fontWeight: 'bold', padding: "5px 10px", borderRadius: 15, fontSize: 12, width: 120, marginTop: 10}}>Coming Soon</div>
                  <p style = {{textAlign: 'left', marginTop: 20}}>Instantly swap out your CPU, GPU, RAM, or storage at the click of a button.</p>
                </div>
              </Col>
              }*/}
            </Row>
          </div>
        </div>
        <div style = {{backgroundColor: 'white'}}>
          <div className = "fractal-container">
            <Row>
              <Col md = {6} xs = {{order: 2}} style = {{textAlign: 'left', paddingTop: '10%', paddingBottom: 100}}>
                <div style = {{width: '100%', backgroundColor: 'white', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.3)', borderRadius: 5, margin: "auto", maxWidth: 450}}>
                  <div style = {{width: '100%', height: 50, backgroundColor: '#1F2635', borderRadius: '5px 5px 0px 0px', color: 'white', padding: '13px 40px', fontWeight: 'bold'}}>
                    My Free Trial
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
                    <Button onClick = {this.openForm} style = {{padding: 15, width: '100%', margin: 'auto', color: 'white', background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", fontWeight: "bold", textAlign: 'center', borderRadius: 5, marginTop: 20, border: 'none', fontSize: 14}}>
                      GET STARTED
                    </Button>
                  </div>
                  </div>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {{span: 6, order: 2}} xs = {{order: 1, span: 12}} style = {{paddingTop: '10%', paddingLeft: 50}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}>Try it, <span className = "blue-gradient">completely free</span></div>
                <p style = {{textAlign: 'left', marginTop: 20, fontSize: 18}}>Experience ultra-fast streaming yourself with a one week free trial.</p>
              </Col>
              :
              <Col md = {{span: 6, order: 1}} xs = {{order: 1, span: 12}} style = {{paddingTop: 100, width: '100%'}}>
                <div style = {{fontWeight: 'bold', fontSize: 40, color: "#333333", textAlign: 'left'}}>Try it, <span className = "blue-gradient">completely free</span></div>
                <p style = {{textAlign: 'left', marginTop: 20, fontSize: 18}}>Experience ultra-fast streaming yourself with a one week free trial.</p>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div style = {{backgroundColor: "#0b172b", paddingLeft: 40, paddingRight: 40}} id = "beta">
          <Container style = {{paddingTop: 100, paddingBottom: 150}}>
            <div style = {{fontWeight: 'bold', fontSize: 35, color: "white", textAlign: 'center'}}><span className = "blue-gradient">Interested?</span></div>
            <div style = {{margin: 'auto', maxWidth: 750}}>
              <p style = {{textAlign: 'center', marginTop: 20, color: '#D6D6D6', fontSize: 18}}>Fill out your info below, and one of our engineers will set you up with a free trial within 24 hours.</p>
            </div>
            <Button style = {{zIndex: 100, marginTop: 40, padding: "12px 50px", background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 'none', color: 'white', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.6)', zIndex: 200}} onClick={this.openForm}>REQUEST ACCESS</Button>
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

export default connect(mapStateToProps)(PageStudios)