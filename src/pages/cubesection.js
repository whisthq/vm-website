import React, { Component } from 'react'

class CubeSection extends Component {
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
  	if (this.props.daymode) {
  		if (this.state.width > 700) {
		    return (
		      <div style = {{width: '100%', marginTop: 20, margin: 'auto', maxWidth: 900}}>
		        <h2 style = {{color: '#333333', margin: 0}}>{this.props.subtitle}</h2>
		        <h1 style = {{color: 'black', fontSize: 70, margin: 0, marginTop: 15, marginBottom: 30, fontWeight: 'bold'}}>{this.props.title}</h1>
		        {this.props.text}
		        {this.props.image}
		      </div>
		    )
		}
    return (
      <div style = {{width: '100%', marginTop: 20}}>
        <h2 style = {{color: '#333333', margin: 0, fontSize: 20}}>{this.props.subtitle}</h2>
        <h1 style = {{color: 'black', fontSize: 30, margin: 0, marginTop: 10, marginBottom: 30, fontWeight: 'bold'}}>{this.props.title}</h1>
        {this.props.text}
        {this.props.image}
      </div>
    )
  	}
    return (
    <div>
    {
    this.state.width > 700
    ?
      <div style = {{width: '100%', marginTop: 20, margin: 'auto', maxWidth: 900}}>
        <h2 style = {{color: '#999999', margin: 0}}>{this.props.subtitle}</h2>
        <h1 style = {{color: 'white', fontSize: 70, margin: 0, marginTop: 15, marginBottom: 30, fontWeight: 'bold'}}>{this.props.title}</h1>
        {this.props.text}
        {this.props.image}
      </div>
    :
      <div style = {{width: '100%', marginTop: 20}}>
        <h2 style = {{color: '#999999', margin: 0, fontSize: 20}}>{this.props.subtitle}</h2>
        <h1 style = {{color: 'white', fontSize: 30, margin: 0, marginTop: 10, marginBottom: 30, fontWeight: 'bold'}}>{this.props.title}</h1>
        {this.props.text}
        {this.props.image}
      </div>
     }
    </div>
    )
  }
}

export default CubeSection
