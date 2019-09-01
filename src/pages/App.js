import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../static/App.css';
import LandingTop from '../assets/landingtop.svg'
import LandingLeft from '../assets/landingleft.svg'
import FractalOutline from '../assets/fractaloutline.svg'
import FractalOutlineSmall from '../assets/fractaloutlinesmall.svg'
import CubeRender1 from '../assets/bluecube.png'
import CubeRender2 from '../assets/cubegif.gif'
import CubeRender3 from '../assets/closeup.png'
import CubeRender4 from '../assets/pricingchart.svg'
import CubeSection from './cubesection.js'
import SignupBox from './signupbox.js'
import {FaRegEnvelope} from 'react-icons/fa'

export default class PageHome extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
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
      <div className='App'>
        <div style = {{background: `url(${FractalOutline}) no-repeat center center`, maxHeight: '95vh', minHeight: '75vh'}}>
          {
          this.state.width > 700 
          ?
          <div style = {{width: '60%', float: 'left', marginLeft: '20%', marginBottom: 20}}>
            <img src = {LandingTop} style = {{width: '100%'}}/>
          </div>
          :
          <div style = {{width: '110%', float: 'left', marginLeft: '10%', marginBottom: 20}}>
            <img src = {LandingTop} style = {{width: '100%'}}/>
          </div>
          }
          <div style = {{width: '100%', display: 'flex'}}>
            {
            this.state.width > 700 
            ?
            <div style = {{width: '25%', textAlign: 'right'}}>
              <img src = {LandingLeft} style = {{maxHeight: 300}}/>
            </div>
            :
            <div style = {{width: '9%', textAlign: 'right'}}>
              <img src = {LandingLeft} style = {{maxHeight: 200}}/>
            </div> 
            }
            {
            this.state.width > 700
            ?
            <div style = {{width: '45%', maxWidth: 600, paddingLeft: 30, textAlign: 'left'}}>
              <div style = {{color: '#555555', margin: 0, lineHeight: 1.8, fontSize: 20}}>
                Fractal builds computers and phones powered by the cloud.
                Our first computer, the Cube, is in currently in a private beta.
              </div>    
              <div style = {{display: 'flex', marginTop: 20}}>
                <button class = 'LandingButton'>Learn More</button>
                <button class = 'LandingButton' style = {{marginLeft: 20, color: '#4BC6ED', border: 'solid 1px #4BC6ED'}}>
                  Join Our Beta
                </button>
              </div>
            </div>
            :
            <div style = {{width: '80%', paddingLeft: 30, textAlign: 'left'}}>
              <div style = {{color: '#555555', margin: 0, lineHeight: 1.7, fontSize: 14, backgroundColor: 'white'}}>
                Fractal builds the next generation of personal devices—cloud-powered computers and 
                phones that are more flexible, affordable, and secure than ever before. 
                Our first computer, the Cube, is in currently in a private beta.
              </div>    
              <div style = {{marginTop: 20, position: 'relative', left: 70}}>
                <SignupBox/>
              </div>
            </div>
            }
          </div>
        </div>
        <div style = {{backgroundColor: 'black', width: '100%', textAlign: 'left', padding: '10%'}}>
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Introducing the Cube'
                       title = 'A next generation, cloud-powered desktop computer.'
                       image = {<img src = {CubeRender1} style = {{width: '100%', margin: 'auto', marginTop: 50, maxWidth: 900}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Introducing the Cube'
                       title = 'A next generation, cloud-powered desktop computer.'
                       image = {<img src = {CubeRender1} style = {{width: '150%', margin: 'auto', maxWidth: 700, position: 'relative', right: '25%'}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Technology'
                       title = 'Why the Cube?'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>Current desktop computers like your Mac or PC are expensive. Difficult to upgrade. 
                                  Confined to a physical box.</p>
                               <p>The Cube is a desktop computer powered by the cloud, and it changes all of that. 
                                  It runs Windows 10, but unlike any computer you’ve ever owned, it's way more affordable, 
                                  easily upgradeable, and accessible from any Internet-connected device.
                               </p></div>}
                       image = {<img src = {CubeRender2} style = {{width: '110%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Technology'
                       title = 'Why the Cube?'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 13}}>Current desktop computers like your Mac or PC are expensive. Difficult to upgrade. 
                                  Confined to a physical box.</p>
                               <p style = {{fontSize: 13}}>The Cube is a desktop computer powered by the cloud, and it changes all of that. 
                                  It runs Windows 10, but unlike any computer you’ve ever owned, it's way more affordable, 
                                  easily upgradeable, and accessible from any Internet-connected device.
                               </p></div>}
                       image = {<img src = {CubeRender2} style = {{width: '150%', margin: 'auto', maxWidth: 700, position: 'relative', right: '25%'}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Flexibility'
                       title = 'Upgrade at the click of a button.'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>Gone are the days of buying and installing new hardware. Need more processing power to run heavy applications? Want more storage? 
                                  Simply click a button to upgrade your Cube instantly. With the Cube, you’ll always have the computer that perfectly fits your needs.</p></div>}
                       image = {<img src = {CubeRender3} style = {{width: '100%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          :
          <CubeSection subtitle = 'Flexibility'
                       title = 'Upgrade at the click of a button.'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 14}}>Gone are the days of buying and installing new hardware. Need more processing power to run heavy applications? Want more storage? 
                                  Simply click a button to upgrade your Cube instantly. With the Cube, you’ll always have the computer that perfectly fits your needs.</p></div>}
                       image = {<img src = {CubeRender3} style = {{width: '100%', margin: 'auto', maxWidth: 900}}
                       /> }
          />
          }
          {
          this.state.width > 700 
          ?
          <div>
          <CubeSection subtitle = 'Affordability'
                       title = 'Yours for just $75.'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p>The Cube drastically reduces the cost of a computer. We’ll ship a Cube to your door for $75 — shipping on us. 
                                  Afterward, you’ll select a plan depending on the computer that best fits your needs.</p></div>}
                       image = {<img src = {CubeRender4} style = {{width: '100%', margin: 'auto', marginTop: 50, marginLeft: 5, maxWidth: 900}}
                       /> }
          /><br/><br/></div>
          :
          <div>
          <CubeSection subtitle = 'Affordability'
                       title = 'Yours for just $75.'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                               <p style = {{fontSize: 14}}>The Cube drastically reduces the cost of a computer. We’ll ship a Cube to your door for $75 — shipping on us. 
                                  Afterward, you’ll select a plan depending on the computer that best fits your needs.</p></div>}
                       image = {<img src = {CubeRender4} style = {{width: '100%', margin: 'auto', marginTop: 20, marginLeft: 5, maxWidth: 700}}
                       /> }
          /><br/><br/></div>
          }
          {
          this.state.width > 700 
          ?
          <CubeSection subtitle = 'Security'
                       title = 'Peace of mind'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p>Privacy matters. All communications with the cloud are encrypted end-to-end, and Fractal does 
                                    not have access to your data. Your private cloud is isolated, ensuring that your computer will not
                                    be compromised.</p>
                                <p>Security matters. Unlike your normal hard drive, your Cube's hard drive is backed up in the cloud,
                                   which means that you'll never lose your data—even if your Cube is lost or broken. Want to cancel your plan? We'll
                                   ship you a free hard drive to download all of your data locally.</p>
                                </div>}
          />
          :
          <CubeSection subtitle = 'Security'
                       title = 'Peace of mind'
                       text = {<div style = {{color: '#999999', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p style = {{fontSize: 14}}>Privacy matters. All communications with the cloud are encrypted end-to-end, and Fractal does 
                                    not have access to your data. Your private cloud is isolated, ensuring that your computer will not
                                    be compromised.</p>
                                <p style = {{fontSize: 14}}>Security matters. Unlike your normal hard drive, your Cube's hard drive is backed up in the cloud,
                                   which means that you'll never lose your data—even if your Cube is lost or broken. Want to cancel your plan? We'll
                                   ship you a free hard drive to download all of your data locally.</p>
                                </div>}
          />
          }
        </div>
        {
        this.state.width > 700 
        ?
        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '10%'}}>
          <CubeSection subtitle = 'Test it out yourself'
                       title = 'Join Our Beta'
                       text = {<div style = {{color: '#333333', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p>We’re currently accepting applications for our first wave of beta users. 
                                 If you want to be one of the first to experience the Cube, apply below.</p>
                                </div>}
                        daymode
          />
          <SignupBox/>
        </div>
        :
        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '10%'}}>
          <CubeSection subtitle = 'Test it out yourself'
                       title = 'Join Our Beta'
                       text = {<div style = {{color: '#333333', maxWidth: 800, fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                 <p style = {{fontSize: 14}}>We’re currently accepting applications for our first wave of beta users. 
                                 If you want to be one of the first to experience the Cube, apply below.</p>
                                </div>}
                        daymode
          />
          <SignupBox/>
        </div>
        }
        <div style = {{width: '100%', height: 2, backgroundColor: 'black'}}></div>
        {
        this.state.width > 700 
        ?
        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', display: 'flex'}}>
          <p style = {{margin: 0, width: '75%'}}>@ Fractal Computers Inc., 2019</p>
          <p style = {{margin: 0, width: '20%', textAlign: 'right', display: 'flex'}}>
            Contact Us
            <FaRegEnvelope style = {{marginLeft: 20}}/>
          </p>
        </div>
        :
        <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', display: 'flex', fontSize: 12}}>
          <p style = {{margin: 0, width: '60%'}}>@ Fractal Inc., 2019</p>
          <p style = {{margin: 0, width: '30%', textAlign: 'right', display: 'flex'}}>
            Contact Us
            <FaRegEnvelope style = {{marginLeft: 10}}/>
          </p>
        </div>
        }
      </div>
    );
  }
}
