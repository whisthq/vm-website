import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import '../static/App.css';
import { HashLink } from 'react-router-hash-link';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, menu: false }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  openMenu = (open) => {
    this.setState({menu: open})
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
      <div style = {{width: '100%', position: 'absolute', padding: 10, marginTop: 20, overflowX: 'hidden'}}>  
        {
        this.state.width > 700 
        ?
        <div className = "fractal-container">
        <div style = {{display: 'flex', width: '100%'}}>
          <div style = {{width: '40%', textAlign: 'left', zIndex: 1}}>
            <Link to = '/' style = {{textDecoration: 'none', color: `${ this.props.color }`, fontWeight: 'bold', fontSize: 24}}>
              <img src = {Logo} style = {{height: 24, position: 'relative', bottom: 2, right: 10}}/>
              <span style = {{color: `${ this.props.title }`}}>
              Fractal
              </span>
            </Link> 
          </div>
          {
          this.props.homepage
          ?
          <div style = {{width: '60%', textAlign: 'right'}}>
              <HashLink className = 'headerlink' to = '/' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12}}>
                <span style = {this.props.linkStyle}>Personal</span>
              </HashLink>
              <HashLink className = 'headerlink' to = '/studios' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Teams</span>
              </HashLink>
              <a href = "mailto: hello@fractalcomputers.com" style = {{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Contact Us</span>
              </a>
              <Link to = "/auth">
                <Button style = {{marginLeft: 35, color: `${ this.props.button }`, border: 'solid 1px #5ec3eb', borderColor: `${ this.props.button }`, fontWeight: 'bold', paddingLeft: 20, paddingRight: 20,background: "rgba(0, 0,0,0.0)"}}>My Account</Button>
              </Link>
          </div>
          :
          <div>
          </div>
          }
        </div>
        </div>
        :
        <div style = {{paddingLeft: 35, paddingRight: 25, minHeight: 30}}>
          <div style = {{color: 'white', fontWeight: 'bold', float: 'left'}}>
            <Link to = '/' style = {{color: 'white', fontSize: 20}}>
              <img src = {Logo} style = {{height: 24, position: 'relative', bottom: 2, right: 10}}/>
              Fractal
            </Link>
          </div> 
          <div style = {{float: 'right', zIndex: 100}}>
            <FaBars onClick = {() => this.openMenu(true)} style = {{color: 'white'}}/>
          </div>
          {
          this.state.menu
          ?
          <div style = {{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'white', zIndex: 1000}}>
            <div style = {{padding: 35, paddingTop: 30}}>
              <FaTimes onClick = {() => this.openMenu(false)} style = {{color: "#333333", float: 'right', height: 30}}/>
            </div>
            <div style = {{padding: 35, marginTop: 50}}>
              <div style = {{marginBottom: 10}}>
                <HashLink className = 'headerlink' to = '/' style = {{color: '#333333'}}>
                  Personal
                </HashLink>
              </div>
              <div style = {{marginBottom: 10}}>
                <HashLink className = 'headerlink' to = '/studios' style = {{color: '#333333'}}>
                  Teams
                </HashLink>
              </div>
              <div style = {{marginBottom: 10}}>
                <a href = "mailto: hello@fractalcomputers.com" style = {{color: '#333333'}}>
                  Contact Us
                </a>
              </div>
              <div style = {{marginBottom: 10}}>
                <Link className = 'headerlink' to = '/auth' style = {{color: '#333333'}}>
                  My Account
                </Link>
              </div>
            </div>
          </div>
          :
          <div>
          </div>
          }
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