import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaArrowRight } from 'react-icons/fa';

class SignupBox extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
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
    if (this.props.right) {
      if (this.state.width < 700) {
        return (
          <div style = {{marginRight: 60, display: 'flex', textAlign: 'center', marginTop: 15}}>
            <input type = "text" placeholder = '    Our beta is open! Apply with your email.'
            style = {{color: 'white', backgroundColor: '#4BC6ED', height: 15, marginTop: 5, width: 300,
              border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}></input>
            <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                              height: 40, width: 40, position: 'relative', right: 30}}>
              <FaArrowRight/>
            </button>
          </div>
        )
      }
      return (
        <div style = {{marginRight: 30, display: 'flex'}}>
          <input type = "text" placeholder = '    Our beta is open! Apply with your email.'
          style = {{color: 'white', backgroundColor: '#4BC6ED', height: 20, marginTop: 8, maxWidth: 450,
            width: '90%', border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}></input>
          <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                            height: 50, width: 50, position: 'relative', right: 40}}>
            <FaArrowRight/>
          </button>
        </div>
      )
    }
    if (this.state.width < 700) {
      return (
        <div style = {{marginRight: 60, display: 'flex', textAlign: 'center', marginTop: 15}}>
          <input type = "text" placeholder = '  johndoe@gmail.com'
          style = {{color: 'white', backgroundColor: '#4BC6ED', height: 15, marginTop: 5, width: 200,
            border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}></input>
          <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                            height: 40, width: 40, position: 'relative', right: 30}}>
            <FaArrowRight/>
          </button>
        </div>
      )
    }
    return (
      <div style = {{marginRight: 30, display: 'flex'}}>
        <input type = "text" placeholder = '  johndoe@gmail.com'
        style = {{color: 'white', backgroundColor: '#4BC6ED', height: 20, marginTop: 8, width: 450,
          border: 'none', borderRight: 'none', padding: '7px 5px', borderRadius: 15}}></input>
        <button style = {{color: 'white', backgroundColor: 'black', borderRadius: '50%', border: 'none',
                          height: 50, width: 50, position: 'relative', right: 40}}>
          <FaArrowRight/>
        </button>
      </div>
    )
  }
}

export default SignupBox
