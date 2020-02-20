import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import '../../static/App.css';
import LandingTop from '../../assets/landingtop.svg'
import LandingLeft from '../../assets/landingleft.svg'
import WhiteBackground from '../../assets/whitebackground.svg'
import SpaceShip from '../../assets/spaceship.svg'
import InfoBox from '../../assets/infobox.svg'
import PriceCompare from '../../assets/pricecompare.svg'
import PriceCompareSmall from '../../assets/pricecomparesmall.svg'
import Car from '../../assets/caribou.svg'
import Topography from '../../assets/topography.svg'
import Logo from '../../assets/logo.svg'
import CubeSection from './containers/cubesection.js'
import SignupBox from './containers/signupbox.js'
import {FaRegEnvelope} from 'react-icons/fa'
import Header from '../../shared_components/header.js'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { ReactTypeformEmbed } from 'react-typeform-embed';

class PageAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false, loaded: false }
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
        Admin Page
      </div>
    );
  }
}

export default PageAdmin;