import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import { FaBars, FaTimes } from 'react-icons/fa'
import '../static/App.css';
import { HashLink } from 'react-router-hash-link';
import { changeTab } from '../actions/index.js';

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, menu: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  openMenu = (open) => {
    this.setState({menu: open})
  }

  switchTab = (tab) => {
    this.props.dispatch(changeTab(tab))
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
            {
            this.props.currentPage === 'personal'
            ?
            <div>
              <HashLink onClick = {() => this.switchTab('personal')} className = 'headerlink' to = '/' style={{color: `${ this.props.button }`, fontWeight: 'bold', textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12}}>
                <span style = {this.props.linkStyle}>Product</span>
              </HashLink>
              <HashLink onClick = {() => this.switchTab('about')} className = 'headerlink' to = '/about' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Company</span>
              </HashLink>
              <a href = "mailto: hello@fractalcomputers.com" style = {{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Contact Us</span>
              </a>
              <Link to = "/auth">
                <Button style = {{fontWeight: 'bold', marginLeft: 35, color: '#1ba8e0', border: 'none', fontWeight: 'bold', paddingLeft: 20, paddingRight: 20, padding: '12px 30px', background: "rgba(94, 195, 235, 0.2)"}}>
                  My Account
                </Button>
              </Link>
            </div>
            :
            (
            this.props.currentPage === 'about'
            ?
            <div>
              <HashLink onClick = {() => this.switchTab('personal')} className = 'headerlink' to = '/' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12}}>
                <span style = {this.props.linkStyle}>Product</span>
              </HashLink>
              <HashLink onClick = {() => this.switchTab('about')} className = 'headerlink' to = '/about' style={{color: `${ this.props.button }`, fontWeight: 'bold', textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Company</span>
              </HashLink>
              <a href = "mailto: hello@fractalcomputers.com" style = {{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Contact Us</span>
              </a>
              <Link to = "/auth">
                <Button style = {{fontWeight: 'bold', marginLeft: 35, color: '#1ba8e0', border: 'none', fontWeight: 'bold', paddingLeft: 20, paddingRight: 20, padding: '12px 30px', background: "rgba(94, 195, 235, 0.2)"}}>
                  My Account
                </Button>
              </Link>
            </div>
            :
            <div>
              <HashLink onClick = {() => this.switchTab('personal')} className = 'headerlink' to = '/' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12}}>
                <span style = {this.props.linkStyle}>Product</span>
              </HashLink>
              <HashLink onClick = {() => this.switchTab('about')} className = 'headerlink' to = '/about' style={{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>About</span>
              </HashLink>
              <a href = "mailto: hello@fractalcomputers.com" style = {{color: `${ this.props.color }`, textDecoration: 'none', textAlign: 'center', fontSize: 14, marginTop: 12, marginLeft: 20}}>
                <span style = {this.props.linkStyle}>Contact Us Us</span>
              </a>
              <Link to = "/auth">
                <Button style = {{marginLeft: 35, color: `${ this.props.button }`, border: `$solid 1px { this.props.button }`, borderColor: `${ this.props.button }`, fontWeight: 'bold', paddingLeft: 20, paddingRight: 20,background: "rgba(0, 0,0,0.0)"}}>My Account</Button>
              </Link>
            </div>
            )
            }
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
            <Link to = '/' style = {{color: '#111111', fontSize: 20}}>
              <img src = {Logo} style = {{height: 20, position: 'relative', bottom: 2, right: 10}}/>
              <span style = {{color: `${ this.props.title }`}}>
                Fractal
              </span>
            </Link>
          </div> 
          <div style = {{float: 'right', zIndex: 100}}>
            <FaBars onClick = {() => this.openMenu(true)} style = {{color: '#111111'}}/>
          </div>
          {
          this.state.menu
          ?
          <div style = {{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'white', zIndex: 1000, textAlign: 'center'}}>
            <div style = {{padding: 35, paddingTop: 30}}>
              <FaTimes onClick = {() => this.openMenu(false)} style = {{color: "#333333", float: 'right', height: 30}}/>
            </div>
            <div style = {{padding: 35, marginTop: 50}}>
              {
              this.props.currentPage === 'personal'
              ?
              <div>
                <div onClick = {() => this.switchTab('personal')} style = {{marginBottom: 10}}>
                  <HashLink className = 'headerlink' to = '/' style = {{color: '#5ec3eb', fontWeight: 'bold'}}>
                    Product
                  </HashLink>
                </div>
                <div onClick = {() => this.switchTab('about')} style = {{marginBottom: 10}}>
                  <HashLink className = 'headerlink' to = '/about' style = {{color: '#333333'}}>
                    Company
                  </HashLink>
                </div>
              </div>
              :
              <div>
                <div onClick = {() => this.switchTab('personal')} style = {{marginBottom: 10}}>
                  <HashLink className = 'headerlink' to = '/' style = {{color: '#333333'}}>
                    Product
                  </HashLink>
                </div>
                <div onClick = {() => this.switchTab('about')} style = {{marginBottom: 10}}>
                  <HashLink className = 'headerlink' to = '/about' style = {{color: '#5ec3eb', fontWeight: 'bold'}}>
                    Company
                  </HashLink>
                </div>
              </div>
              }
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

function mapStateToProps(state) {
  return { 
    currentPage: state.AccountReducer.currentPage
  }
}


export default connect(mapStateToProps)(Header)