import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup";

import Header from '../../shared_components/header.js'
import Footer from '../../shared_components/footer.js'

import Datacenter from '../../assets/datacenter.svg'
import Software from '../../assets/software.svg'
import Gaming from '../../assets/gaming.svg'
import Creative from '../../assets/creative.svg'
import InvestorBox from './components/InvestorBox.js'
import Ming from '../../assets/ming.svg'
import Phil from '../../assets/phil.svg'
import Nick from '../../assets/nick.svg'
import Roshan from '../../assets/roshan.svg'

class About extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
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
    window.addEventListener('resize', this.updateWindowDimensions)

    return(
      <div style = {{overflowX: 'hidden'}}>
      <Header color = "#333333" button = "#5ec3eb" homepage/>
        {
        this.state.width > 700
        ?
        <div className = "fractal-container" style = {{minHeight: '100vh', paddingTop: 150}}>
          <Row>
            <Col md = {7} style = {{paddingRight: 60}}>
              <img src = {Datacenter} style = {{width: '100%', border: 'solid 10px white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)'}}/>
            </Col>
            <Col md = {5}>
              <div style = {{color: "#5ec3eb", fontWeight: 'bold'}}>
                Our Mission
              </div>
              <div style = {{fontSize: 40, marginTop: 10, lineHeight: 1.4}}>
                To Democratize Computing Power
              </div>
              <div style = {{color: "#555555", marginTop: 40, lineHeight: 1.9}}>
                At Fractal, we envision laptops that render 4K video at lightning speeds. Chromebooks and Macs 
                that easily run Windows or Linux. PCs whose hardware can be upgraded at the click of a button. 
              </div>
              <div style = {{color: "#555555", marginTop: 15, lineHeight: 1.9}}>
                We believe that a single cloud PC should handle all your computing needs.
              </div>
            </Col>
          </Row>
        </div>
        :
        <div className = "fractal-container" style = {{minHeight: '100vh', paddingTop: 100, paddingBottom: 50}}>
          <Row>
            <Col md = {7} style = {{marginBottom: 40}}>
              <img src = {Datacenter} style = {{width: '100%', border: 'solid 5px white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)'}}/>
            </Col>
            <Col md = {5}>
              <div style = {{color: "#5ec3eb", fontWeight: 'bold'}}>
                Our Mission
              </div>
              <div style = {{fontSize: 30, marginTop: 10, lineHeight: 1.4}}>
                To Democratize Computing Power
              </div>
              <div style = {{color: "#555555", marginTop: 30, lineHeight: 1.9}}>
                At Fractal, we envision laptops that render 4K video at lightning speeds. Chromebooks and Macs 
                that easily run Windows or Linux. PCs whose hardware can be upgraded at the click of a button. 
              </div>
              <div style = {{color: "#555555", marginTop: 15, lineHeight: 1.9}}>
                We believe that a single cloud PC should handle all your computing needs.
              </div>
            </Col>
          </Row>
        </div>
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
        <div className = "fractal-container" style = {{marginTop: 50, paddingBottom: 50}}>
          <Row>
            <Col md = {12} style = {{textAlign: 'center'}}>
              <div style = {{fontSize: 40, marginTop: 10, lineHeight: 1.4}}>
                Our Stories
              </div>
              <div style = {{color: "#555555", lineHeight: 1.9, maxWidth: 600, margin: 'auto', marginTop: 20}}>
                We’re computer scientists passionate about the future of personal computing. Here are a few of our stories.
              </div>
            </Col>
            <Col md = {12} style = {{marginTop: 50}}>
              <Row>
                <Col md = {3} style = {{marginBottom: 20}}>
                <Popup
                  modal 
                  trigger = {
                  <div className = "expandOnHover" style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)', padding: 30, textAlign: 'center'}}>
                    <img src = {Ming} style = {{maxWidth: 125, maxHeight: 125}}/>
                  </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 325, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Ming} style = {{maxWidth: 75, maxHeight: 75}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Ming Ying
                        </div>
                        <div style = {{color: '#333333'}}>
                          Co-President
                        </div>
                        <div style = {{marginTop: 20, color: '#555555'}}>
                          Prior to founding Fractal, Ming was a software engineer at Fidelity Investments and did quant research at AQR Capital Management.
                          He graduated from Harvard University, where he studied Statistics and Computer Science.
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
                </Col>
                <Col md = {3} style = {{marginBottom: 20}}>
                <Popup
                  modal 
                  trigger = {
                  <div className = "expandOnHover" style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)', padding: 30, textAlign: 'center'}}>
                    <img src = {Phil} style = {{maxWidth: 125, maxHeight: 125}}/>
                  </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 325, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Phil} style = {{maxWidth: 75, maxHeight: 75}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Philippe Noel
                        </div>
                        <div style = {{color: '#333333'}}>
                          Co-President
                        </div>
                        <div style = {{marginTop: 20, color: '#555555'}}>
                          Prior to founding Fractal, Phil was a product manager at Microsoft Azure, machine learning researcher at Premier Tech, and TedX speaker. 
                          Phil graduated from Harvard University, where he studied Computer Science and neuroscience.
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
                </Col>
                <Col md = {3} style = {{marginBottom: 20}}>
                <Popup
                  modal 
                  trigger = {
                  <div className = "expandOnHover" style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)', padding: 30, textAlign: 'center'}}>
                    <img src = {Nick} style = {{maxWidth: 125, maxHeight: 125}}/>
                  </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 325, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Nick} style = {{maxWidth: 75, maxHeight: 75}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Nicholas Pipitone
                        </div>
                        <div style = {{color: '#333333'}}>
                          CTO
                        </div>
                        <div style = {{marginTop: 20, color: '#555555'}}>
                          Nick has an affinity for graphics shaders, circuits, and cryptocurrencies, with particular experience in 
                          cybersecurity and penetration testing. He studied Information Systems at Carnegie Mellon.
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
                </Col>
                <Col md = {3} style = {{marginBottom: 20}}>
                <Popup
                  modal 
                  trigger = {
                  <div className = "expandOnHover" style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.45)', padding: 30, textAlign: 'center'}}>
                    <img src = {Roshan} style = {{maxWidth: 125, maxHeight: 125}}/>
                  </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", height: 350, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Roshan} style = {{maxWidth: 75, maxHeight: 75}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Roshan Padaki
                        </div>
                        <div style = {{color: '#333333'}}>
                          Engineer 
                        </div>
                        <div style = {{marginTop: 20, color: '#555555'}}>
                          Prior to Fractal, Roshan researched performance lower bounds for matching algorithms in 
                          dynamic matching markets and developed methods for reducing dimensionality and 
                          sampling parameters in Bayesian deep learning. He studied mathematics at Harvard.
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div style = {{width: '100vw', background: 'linear-gradient(180deg, #FEF8FF 61.47%, #FEF8FF 84.35%, #FFFFFF 100%)', marginTop: 75}}>
          <div className = "fractal-container" style = {{paddingTop: 50, paddingBottom: 100}}>
            <Row>
              <Col md = {5}>
                <div style = {{color: "#5ec3eb", fontWeight: "bold"}}>
                  Support
                </div>
                <div style = {{fontSize: 40, marginTop: 10, lineHeight: 1.4}}>
                  Our Investors
                </div>
                <div style = {{color: "#555555", marginTop: 30, lineHeight: 1.9, marginBottom: 20}}>
                  We’re fortunate to be backed by amazing institutional and individual investors. We'd also like to give special thanks to
                  <a target = "__blank" href = "https://hacklodge.org/" style = {{textDecoration: 'none', fontWeight: 'bold', color: '#555555'}}>&nbsp;Hack Lodge</a>, which connected us with some of our best advisors and engineers.
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col md = {7} style = {{paddingLeft: 60}}>
                <InvestorBox/>
              </Col>
              :
              <Col md = {7} style = {{paddingLeft: 0}}>
                <InvestorBox/>
              </Col>
              }
            </Row>
          </div>
        </div>
        <div className = "fractal-container" style = {{paddingTop: 50, paddingBottom: 100, textAlign: 'center'}}>
          <div style = {{fontSize: 40}}>
            <span className = "blue-gradient">
              Create My Cloud PC
            </span>
          </div>
          <div style = {{color: "#555555", lineHeight: 1.9, maxWidth: 600, margin: 'auto', marginTop: 10}}>
            Experience the next generation of personal computing today.
          </div>
          <Link to = "/dashboard" style = {{textDecoration: 'none'}}>
            <Button style = {{marginTop: 30, backgroundColor: '#111111', padding: '10px 30px', fontWeight: 'bold', borderRadius: 5, border: 'none'}}>
              GET STARTED
            </Button>
          </Link>
        </div>
      <Footer/>
      </div>
    )
  }
}



export default About;