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

import Header from '../../shared_components/header.js'
import Footer from '../../shared_components/footer.js'

class Privacy extends Component {
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
    return(
      <div>
      <Header color = "#333333" button = "#5ec3eb" homepage/>
      <div style = {{padding: '125px 150px', maxWidth: 1280}}>
        <div style = {{fontSize: 40}}>
        PRIVACY POLICY
        </div>
        <div style = {{color: "#555555", marginBottom: 40}}>
        Last updated March 20th, 2020
        </div>
        <div>Oops,it looks like we are currently updating our Terms of Service. Please check back soon!</div>
      </div>
      <div style = {{width: '100vw', background: '#111111', height: 1}}></div>
      <Footer/>
      </div>
    )
  }
}



export default Privacy;