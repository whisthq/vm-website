import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button'
import '../../static/App.css';
import WhiteCube from '../../assets/whitecube.svg'
import BaseSpec from '../../assets/basespec.svg'
import EnhancedSpec from '../../assets/enhancedspec.svg'
import PowerSpec from '../../assets/powerspec.svg'
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, continue: false }
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
      <div>
        <Header/>
        <div className = "Homepage-Top" style = {{height: '100vh'}}>
          <Container style = {{textAlign: 'center', paddingTop: 150, maxWidth: '90%'}}>
            <div style = {{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
              Your pre-order has been received.
            </div>
            <div style = {{color: '#f1f1f1', marginTop: 15}}>We will contact you via email once your Cube is ready to ship.</div>
            <Link to = "/" style = {{textDecoration: 'none', color: 'white'}}>
            <Button style = {{marginTop: 60, paddingLeft: 40, paddingRight: 40, backgroundColor: '#94a8ed', border: 'none', fontWeight: 'bold', borderRadius: 15}}>Back to Homepage</Button>
            </Link>
          </Container>
        </div>
      </div>
    );
  }
}

export default connect()(Checkout)