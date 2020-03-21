import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'react-bootstrap'
import { FaBars, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import '../static/App.css';
import { HashLink } from 'react-router-hash-link';

class Footer extends Component {
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
      <div>
      {
      this.state.width > 700
      ?
      <div style = {{width: '100%', backgroundColor: 'white', padding: 30, paddingTop: 60, fontSize: 15, borderTop: 'solid 1px white'}}>
       <Container>
        <div style = {{width: '100%', minHeight: 100}}>
        <Row style = {{float: 'left', width: 400, display: 'inline'}}>
            <Col xs = {12} style = {{maxWidth: 350}}>
              <div style = {{fontWeight: 'bold', marginBottom: 10, fontSize: 25}}>Fractal</div>
              <div style = {{fontSize: 14}}>
                <div style = {{marginTop: 10, color: '#555555', textDecoration: 'none', marginBottom: 4, lineHeight: 1.7}}>
                  Fractal streams a powerful computer to any device.
                </div>
                <div style = {{display: 'flex', marginTop: 15}}>
                  <a href = "https://twitter.com/fractalapp" target = "_blank" style = {{textDecoration: 'none'}}>
                  <div style = {{backgroundColor: '#EBEBEB', width: 40, height: 40, position: 'relative', borderRadius: 5}}>
                    <FaLinkedinIn style = {{color: '#888888', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                  </div>
                  </a>
                  <a href = "https://www.linkedin.com/company/fractalcomputers/about/?viewAsMember=true" target = "_blank" style = {{textDecoration: 'none'}}>
                  <div style = {{backgroundColor: '#EBEBEB', width: 40, height: 40, position: 'relative',marginLeft: 10, borderRadius: 5}}>
                    <FaTwitter style = {{color: '#888888', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                  </div>
                  </a>
                </div>
              </div>
            </Col>
        </Row>
        <Row style = {{float: 'right', width: 500, paddingRight: 100}}>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>HOME</div>
              <Link to = "/" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 13}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Personal Use</div>
                </div>
              </Link>
              <Link to = "/studios" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 13}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Studios</div>
                </div>
              </Link>
              <div style = {{fontSize: 13}}>
                <div>
                <a href = "mailto: hello@fractalcomputers.com" style = {{color: '#555555', textDecoration: 'none', marginBottom: 4}}>Contact Us</a>
                </div>
              </div>
            </Col>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>LEGAL</div>
              <Link to = "/" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 13}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Terms of Service</div>
                </div>
              </Link>
              <Link to = "/studios" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 13}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Privacy Policy</div>
                </div>
              </Link>
            </Col>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>CONTACT</div>
              <div style = {{fontSize: 13}}>
                <div style = {{color: '#555555', marginBottom: 4}}>support@fractalcomputers.com</div>
              </div>
              <div style = {{fontSize: 13}}>
                <div style = {{color: '#555555', marginBottom: 4}}>sales@fractalcomputers.com</div>
              </div>
            </Col>
          </Row>
        </div>
        <div style = {{width: '100%', marginTop: 100, background: '#EBEBEB', height: 1}}></div>
        <div style = {{fontSize: 11, marginTop: 20, width: '100%'}}>
          <p style = {{margin: 0, textAlign: 'left', color: '#555555'}}>Copyright &copy; Fractal Computers Inc., All Rights Reserved.</p>
        </div>
      </Container>
    </div>
    :
      <div style = {{width: '100%', backgroundColor: 'white', padding: 30, paddingTop: 60, fontSize: 15, borderTop: 'solid 1px white'}}>
       <Container>
        <div style = {{width: '100%', minHeight: 100}}>
        <Row style = {{width: 400}}>
            <Col xs = {12} style = {{maxWidth: 350}}>
              <div style = {{fontWeight: 'bold', marginBottom: 10, fontSize: 25}}>Fractal</div>
              <div style = {{fontSize: 14}}>
                <div style = {{marginTop: 10, color: '#555555', textDecoration: 'none', marginBottom: 4, lineHeight: 1.7}}>
                  Fractal streams a powerful computer to any device.
                </div>
                <div style = {{display: 'flex', marginTop: 15}}>
                  <a href = "https://twitter.com/fractalapp" target = "_blank" style = {{textDecoration: 'none'}}>
                  <div style = {{backgroundColor: '#EBEBEB', width: 40, height: 40, position: 'relative', borderRadius: 5}}>
                    <FaLinkedinIn style = {{color: '#888888', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                  </div>
                  </a>
                  <a href = "https://www.linkedin.com/company/fractalcomputers/about/?viewAsMember=true" target = "_blank" style = {{textDecoration: 'none'}}>
                  <div style = {{backgroundColor: '#EBEBEB', width: 40, height: 40, position: 'relative',marginLeft: 10, borderRadius: 5}}>
                    <FaTwitter style = {{color: '#888888', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}/>
                  </div>
                  </a>
                </div>
              </div>
            </Col>
        </Row>
        <Row style= {{marginTop: 20, width: 280}}>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>HOME</div>
              <Link to = "/" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 11}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Personal Use</div>
                </div>
              </Link>
              <Link to = "/studios" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 11}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Studios</div>
                </div>
              </Link>
              <div style = {{fontSize: 11}}>
                <div>
                <a href = "mailto: hello@fractalcomputers.com" style = {{color: '#555555', textDecoration: 'none', marginBottom: 4}}>Contact Us</a>
                </div>
              </div>
            </Col>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>LEGAL</div>
              <Link to = "/" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 11}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Terms of Service</div>
                </div>
              </Link>
              <Link to = "/studios" style = {{textDecoration: 'none'}}>
                <div style = {{fontSize: 11}}>
                  <div style = {{color: '#555555', marginBottom: 4}}>Privacy Policy</div>
                </div>
              </Link>
            </Col>
            <Col xs = {4} style = {{paddingTop: 12}}>
              <div style = {{fontWeight: 'bold', marginBottom: 15}}>CONTACT</div>
              <div style = {{fontSize: 11}}>
                <div style = {{color: '#555555', marginBottom: 4}}>support@fractalcomputers.com</div>
              </div>
              <div style = {{fontSize: 11}}>
                <div style = {{color: '#555555', marginBottom: 4}}>sales@fractalcomputers.com</div>
              </div>
            </Col>
          </Row>
        </div>
        <div style = {{width: '100%', marginTop: 100, background: '#EBEBEB', height: 1}}></div>
        <div style = {{fontSize: 11, marginTop: 20, width: '100%'}}>
          <p style = {{margin: 0, textAlign: 'left', color: '#555555'}}>Copyright &copy; Fractal Computers Inc., All Rights Reserved.</p>
        </div>
      </Container>
    </div>
    }
    </div>
    )
  }
}

export default Footer