import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'

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
              Home
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
        <div style = {{paddingLeft: 10, paddingRight: 10, minHeight: 30}}>
          <div style = {{color: 'white', fontWeight: 'bold', float: 'left'}}>Fractal</div> 
          <div style = {{float: 'right'}}>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style = {{backgroundColor: 'black', border: 'none', padding: 0}}>
                Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <Link className = 'headerlink' to = '/' style = {{color: 'black'}}>
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <Link className = 'headerlink' to = '/story' style = {{color: 'black'}}>
                    Our Story
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link className = 'headerlink' to = '/howitworks' style = {{color: 'black'}}>
                    How It Works
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
          </div>
        </div>
        }    
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />    
      </div>
    )
  }
}

export default Header