import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
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
      <div style = {{width: '100%', position: 'absolute', padding: 10, marginTop: 20}}>  
        {
        this.state.width > 700 
        ?
        <div style = {{display: 'flex', width: '100%', padding: 5}}>
          <div style = {{width: '70%', textAlign: 'left', paddingLeft: 25}}>
            <div style = {{fontSize: 24, display: 'flex'}}>
              <div style = {{fontWeight: 'bold', marginRight: 75}}>
                <Link to = '/' style = {{textDecoration: 'none', color: '#c7c7c7'}}>
                  Fractal
                </Link>
              </div>
              <Link className = 'headerlink' to = '/story' style={{color: '#e1e1e1', textDecoration: 'none', textAlign: 'center', marginRight: 25, fontSize: 15, marginTop: 10}}>
                <span style = {this.props.linkStyle}>Our Story</span>
              </Link>
              <Link className = 'headerlink' to = '/howitworks' style={{color: '#e1e1e1', textDecoration: 'none', textAlign: 'center', fontSize: 15, marginTop: 10}}>
                <span style = {this.props.linkStyle}>How It Works</span>
              </Link>
            </div>  
          </div>
          <div style = {{width: '30%', maxWidth: 350, textAlign: 'right'}}>
          <Link className = 'headerbutton' to = '/purchase' style = {{color: 'white', fontSize: 15, position: 'fixed', right: 50, zIndex: 100}}>
            <Button style = {{border: 'none', backgroundColor: '#94a8ed', borderRadius: 30, padding: '10px 30px'}}>
              <strong>Pre-Order</strong>
            </Button>
          </Link>
          </div>
        </div>
        :
        <div style = {{paddingLeft: 10, paddingRight: 10, minHeight: 30}}>
          <div style = {{color: 'white', fontWeight: 'bold', float: 'left'}}>
            <Link to = '/' style = {{color: '#c7c7c7'}}>
              Fractal
            </Link>
          </div> 
          <div style = {{float: 'right'}}>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" style = {{backgroundColor: 'rgba(0,0,0,0.0)', border: 'none', padding: 0}}>
                <span style = {this.props.linkStyle}>Menu</span>
              </Dropdown.Toggle>

              <Dropdown.Menu style = {{backgroundColor: '#333333'}}>
                <Dropdown.Item href="#/action-2">
                  <Link className = 'headerlink' to = '/purchase' style = {{color: '#e3e3e3'}}>
                    Pre-Order
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <Link className = 'headerlink' to = '/story' style = {{color: '#e3e3e3'}}>
                    Our Story
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <Link className = 'headerlink' to = '/howitworks' style = {{color: '#e3e3e3'}}>
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