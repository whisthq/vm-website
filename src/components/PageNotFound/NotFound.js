import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../static/App.css';
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import SignupBox from '../PageHome/containers/signupbox.js'


class NotFound extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false }
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
        <div className = "Homepage-Top" style = {{height: '100vh'}}>
          <div style = {{margin: 'auto', color: 'white', top: '40%', position: 'relative', textAlign: 'center', fontSize: 30, maxWidth: 900}}>
            Oops, bad link! <span>While you're here, though, why not sign up for our beta?</span>
            <SignupBox/>
          </div>
        </div>
      </div>
    );
  }
}



export default NotFound;