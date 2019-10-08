import React, { Component } from 'react'

class SpecBox extends Component {
  constructor(props) {
    super(props)
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
      <div style = {this.props.boxStyle}>
        <table style = {{width: '100%'}}>
          <tr style = {{width: '100%'}}>
            <td style = {{fontSize: 20, fontWeight: 'bold', width: '50%', textAlign: 'left'}}>
              <span style = {this.props.mainFont}>{this.props.name}</span></td>
            <td style = {{width: '50%', textAlign: 'right', color: '#94a8ed', fontWeight: 'bold'}}>
              <span style = {this.props.mainFont}>{this.props.price}</span>
            </td>
          </tr>
          <tr style = {{height: 15}}></tr>
          <tr style = {{width: '100%'}}>
            <td style = {this.props.subFont}>{this.props.cpu}</td>
          </tr>
          <tr style = {{height: 5}}></tr>
          <tr style = {{width: '100%'}}>
            <td style = {this.props.subFont}>{this.props.ram}</td>
          </tr>
          <tr style = {{height: 5}}></tr>
          <tr style = {{width: '100%'}}>
            <td style = {this.props.subFont}>{this.props.ssd}</td>
          </tr>
          <tr style = {{width: '100%'}}>
            <td style = {{width: '50%'}}></td>
            <td style = {{width: '50%', textAlign: 'right'}}>
              <button style = {this.props.buttonBorder}>
                Add to Cart
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export const TYPES = {
  BASE: 'baseBox',
  ENHANCED: 'enhancedBox'
}

export default SpecBox