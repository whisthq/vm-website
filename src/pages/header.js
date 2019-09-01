import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

class Header extends Component {
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
    return (
      <div style = {{width: '100%', backgroundColor: 'black', padding: 10}}>  
        {
        this.state.width > 700 
        ?
        <div style = {{display: 'flex', width: '100%', padding: 5}}>
          <div style = {{width: '60%', textAlign: 'left', paddingLeft: 25}}>
            <div style = {{color: 'white', fontWeight: 'bold'}}>Fractal</div>  
          </div>
          <div style = {{width: '30%', maxWidth: 350, textAlign: 'center', display: 'flex'}}>
            <Link className = 'headerlink' to = '/' style={{color: 'white', width: '33.33%', textDecoration: 'none'}}>
              Join Our Beta
            </Link>
            <Link className = 'headerlink' to = '/story' style={{color: 'white', width: '33.33%', textDecoration: 'none'}}>
              Our Story
            </Link>
            <Link className = 'headerlink' to = '/howitworks' style={{color: 'white', width: '33.33%', textDecoration: 'none'}}>
              How It Works
            </Link>
          </div>
        </div>
        :
        <div>
          <div style = {{color: 'white', fontWeight: 'bold', textAlign: 'left'}}>Fractal</div>  
        </div>
        }        
      </div>
    )
  }
}

export default Header