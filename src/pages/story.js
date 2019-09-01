import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../static/App.css';
import Banner from './banner.js';
import SignupBox from './signupbox.js'
import Header from './header.js'
import LandingTop from '../assets/landingtop.svg'
import LandingLeft from '../assets/landingleft.svg'
import FractalOutline from '../assets/fractaloutline.svg'
import CubeRender1 from '../assets/bluecube.png'
import CubeRender2 from '../assets/cubegif.gif'
import CubeRender3 from '../assets/closeup.png'
import CubeRender4 from '../assets/pricingchart.svg'
import CubeSection from './cubesection.js'
import {FaRegEnvelope} from 'react-icons/fa'

export default class Story extends Component {
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
      <div className = 'About'>
        <div style = {{background: 'white'}}>
          {
          this.state.width > 700 
          ?
          <div style = {{width: '60%', float: 'left', marginLeft: '10%', marginBottom: 20, maxWidth: 800}}>
            <img src = {LandingTop} style = {{width: '100%'}}/>
          </div>
          :
          <div style = {{width: '110%', float: 'left', marginLeft: '5%', marginBottom: 20}}>
            <img src = {LandingTop} style = {{width: '100%'}}/>
          </div>
          }
          <div style = {{width: '100%', display: 'flex'}}>
            {
            this.state.width > 700 
            ?
            <div style = {{width: '15%', textAlign: 'right'}}>
              <img src = {LandingLeft} style = {{maxHeight: 200}}/>
            </div>
            :
            <div style = {{width: '8%', textAlign: 'right'}}>
              <img src = {LandingLeft} style = {{maxHeight: 150}}/>
            </div> 
            }
            {
            this.state.width > 700
            ?
            <div style = {{fontSize: 20, fontWeight: 'bold', color: '#2F5DA3', paddingLeft: 30}}>Our Story</div>
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
      </div>
    );
  }
}
