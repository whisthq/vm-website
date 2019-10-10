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
import { FaExclamationTriangle } from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import { FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { sendPreOrder, deleteBaseCube, deleteEnhancedCube, deletePowerCube } from '../../actions/index.js';


class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, address1: '', address2: '', zipcode: '', name: '', email: '', password: '', continue: false, tooShort: false}
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.changeAddress1 = this.changeAddress1.bind(this)
    this.changeAddress2 = this.changeAddress2.bind(this)
    this.changeZipCode = this.changeZipCode.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.dispatch(sendPreOrder(this.state))
  }

  deleteBase() {
    this.props.dispatch(deleteBaseCube())
    if(this.props.enhanced === 0 && this.props.power === 0) {
      this.setState({ continue: false })
    }
  }

  deleteEnhanced() {
    this.props.dispatch(deleteEnhancedCube())
    if(this.props.base === 0 && this.props.power === 0) {
      this.setState({ continue: false })
    }
  }

  deletePower() {
    this.props.dispatch(deletePowerCube())
    if(this.props.enhanced === 0 && this.props.base === 0) {
      this.setState({ continue: false })
    }
  }

  changeAddress1(evt) {
    this.setState({
      address1: evt.target.value
    });
    if(this.state.address1 && this.state.zipcode && this.state.name && this.state.password.length > 6 && this.state.email.includes("@")) {
      this.setState({ continue: true})
    } else {
      this.setState({ continue: false})
    }
  }

  changeAddress2(evt) {
    this.setState({
      address2: evt.target.value
    });
  }

  changeZipCode(evt) {
    this.setState({
      zipcode: evt.target.value
    });
    if(this.state.address1 && this.state.zipcode && this.state.name && this.state.password.length > 6 && this.state.email.includes("@")) {
      this.setState({ continue: true})
    } else {
      this.setState({ continue: false})
    }
  }

  changeName(evt) {
    this.setState({
      name: evt.target.value
    });
    if(this.state.address1 && this.state.zipcode && this.state.name && this.state.password.length > 6 && this.state.email.includes("@")) {
      this.setState({ continue: true})
    }
  }

  changeEmail(evt) {
    this.setState({
      email: evt.target.value
    });
    if(this.state.address1 && this.state.zipcode && this.state.name && this.state.password.length > 6 && this.state.email.includes("@")) {
      this.setState({ continue: true})
    } else {
      this.setState({ continue: false})
    }
  }

  changePassword(evt) {
    this.setState({
      password: evt.target.value
    });
    if(this.state.address1 && this.state.zipcode && this.state.name && this.state.password.length > 6 && this.state.email.includes("@")) {
      this.setState({ continue: true})
    } else {
      this.setState({ continue: false})
    }
    if(this.state.password.length < 7 && this.state.password.length > 0) {
      this.setState({ tooShort: true})
    } else {
      this.setState({ tooShort: false})
    }
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
    var checkoutBoxStyle = {margin: 'auto', padding: 40, position: 'relative', bottom: 75}
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
      checkoutBoxStyle = {margin: 'auto', maxWidth: 1000}
    }
    const linkStyle = {color: '#666666'}
    return (
      <div>
        <Header linkStyle = {linkStyle}/>
        <div style = {{paddingTop: 150}}>
          <Container style = {checkoutBoxStyle}>
            <Row>
              <Col md = {8} style = {{maxWidth: '100%'}}>
                <div style = {{margin: 'auto'}}>
                  <div style = {{fontWeight: 'bold', fontSize: 20}}>Shipping Details</div>
                  <InputGroup className="mb-3" style = {{marginTop: 20}}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Address Line 1*"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                      onChange = {this.changeAddress1}
                    /><br/>
                  </InputGroup>
                  <InputGroup className="mb-3" style = {{maxWidth: 600}}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Address Line 2"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0}}
                      onChange = {this.changeAddress2}
                    />
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Zip Code*"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0}}
                      onChange = {this.changeZipCode}
                    />
                  </InputGroup>
                </div>
                <div style = {{marginTop: 50}}>
                  <div style = {{fontWeight: 'bold', fontSize: 20}}>Personal Details</div>
                  <InputGroup className="mb-3" style = {{maxWidth: 600}}>
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Email Address*"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0}}
                      onChange = {this.changeEmail}
                    />
                    <FormControl
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Full Name*"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0, maxWidth: 600}}
                      onChange = {this.changeName}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3" style = {{marginTop: 20, maxWidth: 600}}>
                    <FormControl
                      type = "password"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder = "Create Password*"
                      style = {{border: 'none', borderBottom: 'solid 1px #aaa', borderRadius: 0}}
                      onChange = {this.changePassword}
                    />
                    {
                    this.state.tooShort
                    ? ( this.state.width < 700 ?
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', left: '65%', zIndex: 100, top: 7, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Too Short
                    </div> :
                    <div style = {{color: '#a62121', marginLeft: 5, position: 'absolute', left: '82%', zIndex: 100, top: 7, fontSize: 14}}>
                      <FaExclamationTriangle style = {{marginRight: 5, position: 'relative', bottom: 2}}/>Too Short
                    </div>  )
                    :
                    <div></div>
                    }
                  </InputGroup>
                </div>
                <div style = {{marginTop: 30, marginBottom: 30}}>
                  {
                  this.state.continue
                  ?
                  <Link style = {{color: 'white', textDecoration: 'none'}} to = "/checkedout">
                  <Button onClick = {() => this.handleClick()} disabled = {!this.state.continue} style = {{width: '100%', maxWidth: 600, backgroundColor: '#36b53d', border: 'none', fontWeight: 'bold', borderRadius: 15, color: 'white'}}>
                    Pre-Order
                  </Button>
                  </Link>
                  :
                  <Button disabled = {!this.state.continue} style = {{width: '100%', maxWidth: 600, backgroundColor: '#36b53d', border: 'none', fontWeight: 'bold', borderRadius: 15, color: 'white'}}>
                    Pre-Order
                  </Button>
                  }    
                </div>
              </Col>
              <Col md = {4}>
                <div style = {{backgroundColor: '#f6f6f6', height: 400, padding: 30, borderRadius: 10, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                  <div style = {{fontWeight: 'bold', fontSize: 20}}>Cart Summary</div>
                  <div style = {{marginTop: 30, color: "#555555"}}>
                  {this.props.base > 0 &&
                      <div>{this.props.base}x Base Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deleteBase()}/></div>
                  }
                  {this.props.enhanced > 0 &&
                      <div style = {{marginTop: 5}}>{this.props.enhanced}x Enhanced Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deleteEnhanced()}/></div>
                  }
                  {this.props.power > 0 &&
                      <div style = {{marginTop: 5}}>{this.props.power}x Power Cube<FaTrashAlt className = "trash-icon" onClick={() => this.deletePower()}/></div>
                  }
                  </div>
                  <div style = {{position: 'absolute', top: 300}}>
                    <div style = {{marginBottom: 15, fontSize: 15, color: '#777777'}}>Due Today: $0.00</div>
                    <Link style = {{color: 'white', textDecoration: 'none'}} to = "/purchase">
                    <Button style = {{backgroundColor: '#94a8ed', borderRadius: 10, border: 'none', paddingLeft: 40, paddingRight: 40, fontWeight: 'bold'}}>
                      Go Back
                    </Button>
                    </Link> 
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { base: state.CartReducer.base,
  enhanced: state.CartReducer.enhanced,
  power: state.CartReducer.power }
}

export default connect(mapStateToProps)(Checkout)