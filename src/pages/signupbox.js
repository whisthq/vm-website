import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaArrowRight } from 'react-icons/fa';
import apiClient from './apiClient'
import requestClient from './requestClient'

class SignupBox extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, email: '', signedup: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.storeEmail = this.storeEmail.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
  }

  changeEmail(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  storeEmail(email) {
    (async () => {
      const rawResponse = await fetch('https://infinite-everglades-29230.herokuapp.com/email', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({email: email})
      });
    })();
    this.setState({
      signedup: true
    });
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
    if (this.state.signedup) {
      if (this.state.width < 700) {
        return(<div style = {{color: '#94a8ed', padding: 10}}>Thank you for signing up!<br/>You'll hear from us soon.</div>) 
      }
      return(<div style = {{color: '#94a8ed', padding: 10}}>Thank you for signing up! You'll hear from us soon.</div>) 
    }
    if (this.props.right) {
      if (this.state.width < 700) {
        return (
          <div style = {{marginRight: 60, display: 'flex', textAlign: 'center', marginTop: 15}}>
            <input type = "text" placeholder = '    Our beta is open! Apply with your email.'
            style = {{color: 'white', backgroundColor: '#4BC6ED', height: 15, marginTop: 5, width: 300,
              border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15, boxShadow: '0px 0px 10px #9ecaed'}}
              value = {this.state.email} onChange = {this.changeEmail}>
              </input>
            <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                              height: 40, width: 40, position: 'relative', right: 30}} onClick = {() => this.storeEmail(this.state.email)}>
              <FaArrowRight/>
            </button>
          </div>
        )
      }
      return (
        <div style = {{width: '100%', marginTop: 40}}>
        <div style = {{margin: 'auto'}}>
          <input type = "text" placeholder = '    Our beta is open! Apply with your email.'
          style = {{color: 'white', backgroundColor: '#4BC6ED', height: 33, marginTop: 8, maxWidth: 450, display: 'inline-block',
            width: '90%', border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}
            value = {this.state.email} onChange = {this.changeEmail}>
            </input>
          <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none', display: 'inline-block',
                            height: 50, width: 50, position: 'relative', right: 40}} onClick = {() => this.storeEmail(this.state.email)}>
            <FaArrowRight/>
          </button>
        </div>
        </div>
      )
    }
    if (this.state.width < 700) {
      return (
        <div style = {{marginRight: 60, display: 'flex', textAlign: 'center', marginTop: 15}}>
          <input type = "text" placeholder = '  Email Address'
          style = {{color: 'white', backgroundColor: '#4BC6ED', height: 30, marginTop: 4, width: 160,
            border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}
            value = {this.state.email} onChange = {this.changeEmail}></input>
          <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                            height: 40, width: 40, position: 'relative', right: 20}}
                            onClick = {() => this.storeEmail(this.state.email)}>
            <FaArrowRight/>
          </button>
        </div>
      )
    }
    return (
      <div style = {{marginRight: 30, display: 'flex'}}>
        <input type = "text" placeholder = '  Enter your email to join our beta!'
        style = {{color: 'white', backgroundColor: '#4BC6ED', height: 34, marginTop: 8, width: 450,
          border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}
          value = {this.state.email} onChange = {this.changeEmail}></input>
        <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                          height: 50, width: 50, position: 'relative', right: 40}}
                          onClick = {() => this.storeEmail(this.state.email)}>
          <FaArrowRight/>
        </button>
      </div>
    )
  }
}

export default SignupBox
