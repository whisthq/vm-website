import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../static/App.css';
import SpecBox from './containers/specBox.js'
import { FaArrowRight } from 'react-icons/fa'
import Header from '../../shared_components/header.js'


class Purchase extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false, showPopup: false }
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
    let modalClose = () => this.setState({ modalShow: false })
    if (this.state.width > 700 && this.state.modalShow) {
      modalClose()
    }
    const baseBox = {border: 'solid 2px #111111', padding: 20} 
    const baseFont = {color: '#111111'}
    const baseSubFont = {color: '#555555'}
    const enhancedBox = {backgroundColor: '#124270', padding: 20}
    const enhancedFont = {color: 'white'}
    const enhancedSubFont = {color: '#e3e3e3'} 
    const baseButton = {border: 'solid 2px #111111', backgroundColor: 'rgba(0,0,0,0.0)', color: '#111111', padding: '10px 15px', position: 'relative', bottom: 20}
    const enhancedButton = {border: 'solid 2px white', backgroundColor: 'rgba(0,0,0,0.0)', color: 'white', padding: '10px 15px', position: 'relative', bottom: 20}
    const powerBox = {backgroundColor: '#14a0b5', padding: 20} 
    const linkStyle = {color: '#666666'}
    return (
      <div>
        <Header linkStyle = {linkStyle}/>
        <div style = {{paddingTop: 120}}>
          <div style = {{fontWeight: 'bold', fontSize: 40, textAlign: 'center'}}>
            Select the right specs for your Cube.
          </div>
          <div style = {{display: 'flex', padding: '10px 50px'}}>
            <div style = {{width: '70%', maxWidth: 1000}}>
              <div>
                <div style = {{backgroundColor: '#F1F1F1', padding: 70, marginTop: 70}}>
                  <div style = {{marginBottom: 30}}>
                    <SpecBox 
                    name = "Base Cube"
                    boxStyle = {baseBox}
                    mainFont = {baseFont}
                    subFont = {baseSubFont}
                    buttonBorder = {baseButton}
                    price = "$5 / month"
                    cpu = "2 CPU Cores, 2.9GHz, Turbo Boost up to 3.5 GHz"
                    ram = "4 GB DDR4 RAM, 2666 MHz"
                    ssd = "128 GB M.2 PCIe SSD"/>
                  </div>
                  <div style = {{marginBottom: 30}}>
                    <SpecBox 
                    name = "Enhanced Cube"
                    boxStyle = {enhancedBox}
                    mainFont = {enhancedFont}
                    subFont = {enhancedSubFont}
                    buttonBorder = {enhancedButton}
                    price = "$10 / month"
                    cpu = "4 CPU Cores, 2.9GHz, Turbo Boost up to 3.5 GHz"
                    ram = "8 GB DDR4 RAM, 2666 MHz"
                    ssd = "256 GB M.2 PCIe SSD"/>
                  </div>
                  <div>
                    <SpecBox 
                    name = "Power Cube"
                    boxStyle = {baseBox}
                    mainFont = {baseFont}
                    subFont = {baseSubFont}
                    buttonBorder = {baseButton}
                    price = "$15 / month"
                    cpu = "6 CPU Cores, 2.9GHz, Turbo Boost up to 3.5 GHz"
                    ram = "16 GB DDR4 RAM, 2666 MHz"
                    ssd = "512 GB M.2 PCIe SSD"/>
                  </div>
                </div>
              </div>
            </div>
            <div style = {{width: '27%', backgroundColor: '#f1f1f1', height: 400, marginTop: 70, marginLeft: '3%', padding: 30}}>
              <div style = {{fontWeight: 'bold', fontSize: 20}}>Cart Summary</div>
              <div style = {{height: 279}}></div>
              <table style = {{width: '100%'}}>
                <tr style = {{width: '100%'}}>
                <td style = {{width: '70%'}}>
                  <input type = "text" placeholder = "Promo Code" style = {{height: 30, border: 'none'}}></input>
                </td>
                <td style = {{width: '30%'}}>
                  <button style = {{color: 'white', backgroundColor: '#94a8ed', border: 'none', height: 30, fontSize: 12}}>Submit</button>
                </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Purchase;