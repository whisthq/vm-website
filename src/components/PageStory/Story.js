import React, { Component } from 'react'
import CubeSection from '../PageHome/containers/cubesection.js'
import Header from '../../shared_components/header.js'

class Story extends Component {
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
    const blackText = {color: 'black'}
    const linkStyle = {color: '#666666'}
    return (
      <div>
        <Header linkStyle = {linkStyle}/>
        <div style = {{paddingTop: 70}}>
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', marginTop: 50}}>
            <CubeSection title = 'Who We Are'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p>Fractal was founded in the summer of 2019 by a team of computer scientists from Harvard University, who saw a way to build a next 
                                   generation of more affordable,  more elegant computers. </p>
                                   <p>
                                   Our office is located on the East Coast (United States), and we are currently gearing up for the launch of our private beta 
                                   for our first product, the Cube.
                                   </p>
                                  </div>}
                         titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: ' 2% 10%', marginTop: 40}}>
            <CubeSection title = 'Who We Are' subtitle = 'Our Story'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p style = {{fontSize: 14}}>Fractal was founded in the summer of 2019 by a team of computer scientists from Harvard University, who saw a way to build a next 
                                   generation of more affordable,  more elegant computers. </p>
                                   <p style = {{fontSize: 14}}>
                                   Our office is located on the East Coast (United States), and we are currently gearing up for the launch of our private beta 
                                   for our first product, the Cube.
                                   </p>
                                  </div>}
                         titleColor = {blackText}
            />
          </div>
          }
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', marginBottom: 50}}>
            <CubeSection title = 'Behind the Logo'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p>A fractal is a mathematical object with finite area but infinite perimeter. Following this line of thought, 
                                      we have designed Fractal devices to be small in physical size but vast in computational power.</p>
                                   <p>We often get questions about our logo, which is intentionally abstract⁠—after all, abstract art can be anything
                                   you imagine. When we launched Fractal, we envisioned a world where personal computing would not be tied to a specific 
                                   device or limited by local hardware; a world where you are empowered to imagine your own computing experience. 
                                   </p>
                                   <p>In our eyes, the logo represents a spherical water droplet. Water freezes into fractal-like patterns, and possesses simplicity that
                                   we strive to recreate in our products.
                                   </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: ' 2% 10%', marginBottom: 50}}>
            <CubeSection title = 'Behind the Logo'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p style = {{fontSize: 14}}>A fractal is a mathematical object with finite area but infinite perimeter. Following this line of thought, 
                                      we have designed Fractal devices to be small in physical size but vast in computational power.</p>
                                   <p style = {{fontSize: 14}}>We often get questions about our logo, which is intentionally abstract⁠—after all, abstract art can be anything
                                   you imagine. When we launched Fractal, we envisioned a world where personal computing would not be tied to a specific 
                                   device or limited by local hardware; a world where you are empowered to imagine your own computing experience. 
                                   </p>
                                   <p style = {{fontSize: 14}}>In our eyes, the logo represents a spherical water droplet. Water freezes into fractal-like patterns, and possesses simplicity that
                                   we strive to recreate in our products.
                                   </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          }
        </div>
      </div>
    );
  }
}



export default Story;