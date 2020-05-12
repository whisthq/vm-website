import React, { Component } from 'react'

class Rectangle extends Component {
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
    if (this.state.width < 650) {
      return (
        <div className="Rectangle" style={{textAlign: 'left' }}>
          <div style={{ padding: '10px 0' }}>
            <h3>{this.props.title}</h3>
            <div>{this.props.text}</div>
          </div>
          <div
            style={{
              minHeight: 300,
              marginTop: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {this.props.image}
          </div>
        </div>
      )
    }

    if (this.props.flip) {
      return (
        <div
          className="Rectangle"
          style={{
            display: 'flex',
            marginTop: 40,
            textAlign: 'left',
            width: '100%'
          }}
        >
          <div
            style={{
              width: this.props.leftPercent ? this.props.leftPercent : '55%',
              textAlign: 'left',
            }}
          >
            {this.props.image}
          </div>
          <div
            style={{
              width: this.props.rightPercent ? this.props.rightPercent : '45%',
              paddingLeft: 20,
              // display: "flex", flexDirection: "column", justifyContent: "center"
            }}
          >
            <br />
            <h3>{this.props.title}</h3>
            <div>{this.props.text}</div>
          </div>
        </div>
      )
    }

    return (
      <div
        className="Rectangle"
        style={{
          display: 'flex',
          minHeight: 300,
          textAlign: 'left',
          width: '95%',
          margin: 'auto'
        }}
      >
        <div
          style={{
            width: this.props.leftPercent ? this.props.leftPercent : '50%',
            paddingRight: 20,
            // display: "flex", flexDirection: "column", justifyContent: "center"
          }}
        >
          <br />
          <h3 style = {{zIndex: 1}}>{this.props.title}</h3>
          <div>
            {this.props.text}
          </div><br/>
          <div style = {{display: "inline-block"}}>
            <div href = "" style={{background: "rgb(90, 46, 255)", width: 130, padding: '12px 8px', marginTop: 50,
                        borderRadius: 5, textAlign: "center", color: "white", fontWeight: 'bold',
                        boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)"}}>
              START NOW
            </div>
          </div>
          <div style = {{display: "inline-block", marginLeft: 30}}>
            <div style={{background: "white", width: 130, padding: '12px 8px', marginTop: "30px",
                        borderRadius: 5, textAlign: "center", color: "rgb(90, 46, 255)", fontWeight: 'bold',
                        boxShadow: "0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)",
                        fontWeight: "bold"}}>
              LEARN MORE
            </div>
          </div>
          <div style = {{fontFamily: 'Kalam', marginTop: 100, color: "#595E8A"}}>
            "In <span style = {{color: "rgb(90,46,255)"}}>two days</span>, I received more qualified renter applications than I did on other 
            apartment listing sites in the past two months."
          </div>
          <div style = {{marginTop: 100, fontFamily: 'Maven Pro'}}>
            <h1>{this.props.subtitle}</h1>
            <div>{this.props.subtext}</div>
          </div>
        </div>
        <div
          style={{
            width: this.props.rightPercent ? this.props.rightPercent : '50%',
            textAlign: 'right',
          }}
        >
          {this.props.image}
        </div>
      </div>
    )
  }
}

export default Rectangle
