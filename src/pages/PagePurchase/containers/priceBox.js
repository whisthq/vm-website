import React, { Component } from 'react'

import 'static/Shared.css';

class PriceBox extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0, modalShow: false }
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

    return(
      <div style = {{borderRadius: 5, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', textAlign: 'left', background: `${ this.props.color }`, padding: 30, minHeight: 240, width: '100%', marginBottom: 20}}>
          <div style = {{display: 'flex', justifyContent: 'space-between'}}>
            <div style = {{color: '#111111', fontSize: 22, fontWeight: 'bold', float: 'left'}}>
              {this.props.name}
            </div>
            {
            !this.props.hide_checkbox
            ?
            (
            this.props.checked
            ?
            <div style = {{float: 'right', width: 15, height: 15, borderRadius: 8, border: 'solid 0.5px #111111', background: '#27a7d6', position: 'relative', top: 13}}>
            </div>
            :
            <div style = {{float: 'right', width: 15, height: 15, borderRadius: 8, border: 'solid 0.5px #111111', background: 'none', position: 'relative', top: 13}}>
            </div>
            )
            :
            <div></div>
            }
          </div>
          <div style = {{fontSize: 12, color: '#555555'}}>
            {this.props.subText}
          </div>
        <div style = {{marginTop: 10, display: 'block', height: 80}}>
          <div style = {{display: 'inline', float: 'left', position: 'relative', marginRight: 5, top: 10}}>
            $
          </div>
          <div style = {{display: 'inline', float: 'left', position: 'relative', fontSize: 40, fontWeight: 'bold'}}>
            {this.props.price}
          </div>
          <div style = {{display: 'inline', float: 'left', position: 'relative', marginLeft: 8, top: 30, fontSize: 14}}>
            / mo
          </div>
        </div>
        <div style = {{color: "#333333", display: 'block', position: 'relative', bottom: 5, fontSize: 14}}>
          {this.props.details}
        </div>
      </div>
    )
  }
}

export default PriceBox
