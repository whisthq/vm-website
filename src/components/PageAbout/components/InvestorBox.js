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
import Popup from "reactjs-popup";

import Brian from '../../../assets/brian.png'
import BSV from '../../../assets/bsv.png'
import DC from '../../../assets/dc.jpg'
import DRF from '../../../assets/drf.jpg'
import Michael from '../../../assets/michael.jpg'
import Vijay from '../../../assets/vijay.jpg'
import Pankaj from '../../../assets/pankaj.jpg'
import Neo from '../../../assets/neo.png'
import RDV from '../../../assets/rdv.png'

class InvestorBox extends Component {
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
            <Row>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {Neo} style = {{maxWidth: 75, maxHeight: 75, paddingTop: 20}}/>
                </div>
              </Col>
              {
              this.state.width > 700
              ?
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {BSV} style = {{width: 115, height: 75}}/>
                </div>
              </Col>
              :
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: '30px 20px', textAlign: 'center', height: 125}}>
                  <img src = {BSV} style = {{width: 100, height: 70}}/>
                </div>
              </Col>
              }
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {DRF} style = {{maxWidth: 65, maxHeight: 65}}/>
                </div>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'white', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {RDV} style = {{maxWidth: 70, maxHeight: 70}}/>
                </div>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <Popup
                  modal 
                  trigger = {
                    <div className = "pointerOnHover" style = {{background: 'rgba(215, 245, 245, 0.4)', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                      <img src = {Pankaj} style = {{maxWidth: 70, maxHeight: 70, borderRadius: 35, filter: 'grayscale(100%)'}}/>
                    </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", minHeight: 325, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Pankaj} style = {{maxWidth: 75, maxHeight: 75, borderRadius: 37.5}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Pankaj Patel 
                        </div>
                        <div style = {{marginTop: 20, color: '#555555', maxHeight: 200, overflowY: 'scroll'}}>
                          <p>
                          Pankaj Patel was Executive Vice President and Chief Development Officer at Cisco Systems, Inc. Mr. Patel reported into the CEO as the Engineering head of the company’s $38 billion product and solution portfolio.  He drove the business and technology strategy across Cisco’s Routing, Switching, Wireless, Security, Mobility, Video, Collaboration, Data Center and Cloud offerings delivered by a global team of over 29,000 engineers.
                          </p>
                          <p>
                          Mr. Patel is a proven results-oriented and seasoned technology leader with 35+ years of experience developing highly scalable products and services by building and leading large, high-performance global engineering organizations, setting clear vision, directing strategy and delivering against goals. He is passionate about translating strategy to execution, and delivering the best experience for the customer.
                          </p>
                          <p>
                          Mr. Patel retired from Cisco in October of 2016 and now serves on the Board of Directors of several startups. He is focused on incubating, investing, and advising startups with their strategy, product development, and go-to-market as well as helping them scale.  Patel is also a mentor and sponsor to numerous employees throughout the industry.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <Popup
                  modal 
                  trigger = {
                    <div className = "pointerOnHover" style = {{background: 'rgba(215, 245, 245, 0.4)', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                      <img src = {Michael} style = {{maxWidth: 70, maxHeight: 70, borderRadius: 35, filter: 'grayscale(100%)'}}/>
                    </div>
                  }
                  contentStyle = {{width: 500, borderRadius: 5, backgroundColor: "#EBEBEB", border: "none", minHeight: 325, padding: '30px 50px'}}>
                  <div>
                    <div style = {{display: 'flex'}}>
                      <img src = {Michael} style = {{maxWidth: 75, maxHeight: 75, borderRadius: 37.5}}/>
                      <div style = {{paddingLeft: 50}}>
                        <div style = {{fontSize: 30, fontWeight: 'bold'}}>
                          Michael Stoppelman
                        </div>
                        <div style = {{marginTop: 20, color: '#555555', overflowY: 'scroll'}}>
                          Michael Stoppelman was a former exec at Yelp and is now a full-time early stage investor who has backed companies like Wish, Lyft, Flexport, Benchling and Confluent.  Prior to investing he was SVP of Engineering of Yelp (2007-2017) and a software engineer at Google (2003-2007).
                        </div>
                      </div>
                    </div>
                  </div>    
                </Popup>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'rgba(215, 245, 245, 0.4)', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {Vijay} style = {{maxWidth: 70, maxHeight: 70, borderRadius: 35, filter: 'grayscale(100%)'}}/>
                </div>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'rgba(215, 245, 245, 0.4)', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {DC} style = {{maxWidth: 70, maxHeight: 70, borderRadius: 35, filter: 'grayscale(100%)'}}/>
                </div>
              </Col>
              <Col xs = {6} md = {4} style = {{marginTop: 20}}>
                <div style = {{background: 'rgba(215, 245, 245, 0.4)', borderRadius: 10, boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.20)', padding: 30, textAlign: 'center', height: 125}}>
                  <img src = {Brian} style = {{maxWidth: 70, maxHeight: 70, borderRadius: 35, filter: 'grayscale(100%)'}}/>
                </div>
              </Col>
            </Row>
        );
    }
}

export default InvestorBox;