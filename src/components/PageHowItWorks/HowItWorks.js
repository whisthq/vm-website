import React, { Component } from 'react'
import CubeSection from '../PageHome/containers/cubesection.js'
import Header from '../../shared_components/header.js'

class HowItWorks extends Component {
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
    return (
      <div>
        <Header  color = "#333333" button = "#94a8ed"/>
        <div style = {{paddingTop: 70}}>
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%', marginTop: 50}}>
            <CubeSection title = 'What is the Cube?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p>The Cube is a cloud-powered desktop computer. This means that the Cube is a device that connects you seamlessly to a virtual computer, 
                                   living in one our remote datacenters. When you use the Cube, you'll notice no difference between the Cube and your old computer; under the hood, however,
                                   the Cube performs its computation in the cloud, and streams your Windows 10 desktop to whatever display you connect your Cube to.</p>
                                   <p>No data is stored on the Cube. Instead, all your data is stored in your own, protected solid state drive, located in our datacenters. 
                                   Any Cube is capable of connecting your personal virtual machine; in this way, any Cube can be your Cube.
                                   </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: ' 2% 10%'}}>
            <CubeSection subtitle = 'How it works'
                         title = 'What is the Cube?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5, marginTop: 40}}>
                                   <p style = {{fontSize: 14}}>The Cube is a cloud-powered desktop computer. This means that the Cube is a device that connects you seamlessly to a virtual computer, 
                                   living in one our remote datacenters. When you use the Cube, you'll notice no difference between the Cube and your old computer; under the hood, however,
                                   the Cube performs its computation in the cloud, and streams your Windows 10 desktop to whatever display you connect your Cube to.</p>
                                   <p style = {{fontSize: 14}}>No data is stored on the Cube. Instead, all your data is stored in your own, protected solid state drive, located in our datacenters. 
                                   Any Cube is capable of connecting your personal virtual machine; in this way, any Cube can be your Cube.
                                   </p></div>}
                          titleColor = {blackText}
            />
          </div>
          }
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%'}}>
            <CubeSection title = 'What makes the Cube so great?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p>Because of the way that our datacenters are designed, the Cube is significantly less
                                   expensive than a traditional computer. Since the Cube's hardware lives in the cloud, you'll never 
                                   lose access to your Windows desktop, even if you are away from your computer. While your computer's 
                                   hardware wears down over time, our datacenters are constantly maintained, ensuring that you always have
                                   access to the best performance. Finally, the Cube is easily upgradeable. Whereas upgrading a normal computer
                                   requires buying new parts (or even a new computer), upgrading the Cube is as easy as clicking a button.</p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: ' 2% 10%'}}>
            <CubeSection title = 'What makes the Cube so great?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                   <p style = {{fontSize: 14}}>Because of the way that our datacenters are designed, the Cube is significantly less
                                   expensive than a traditional computer. Since the Cube's hardware lives in the cloud, you'll never 
                                   lose access to your Windows desktop, even if you are away from your computer. While your computer's 
                                   hardware wears down over time, our datacenters are constantly maintained, ensuring that you always have
                                   access to the best performance. Finally, the Cube is easily upgradeable. Whereas upgrading a normal computer
                                   requires buying new parts (or even a new computer), upgrading the Cube is as easy as clicking a button.</p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          }
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%'}}>
            <CubeSection title = 'Who is the Cube for?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                  <p>
                                  The Cube is a computer designed for creative professionals, who need flexible computational
                                  power for 3D rendering, simulations, art, and high-resolution video editing.
                                  </p>
                                  <p>
                                  75% of creative professionals regularly experience hardware-related performance issues, from laggy software
                                  to slow rendering times. Fancy hardware, rendering farms, and virtual machines cost a fortune. The Cube costs
                                  2-3x less than similarly-speced computers, while offering users the ability to upgrade their hardware at
                                  the click of a button and access their work and local applications from any device.
                                  </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%'}}>
            <CubeSection title = 'Who is the Cube for?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                  <p style = {{fontSize: 14}}>
                                  The Cube is a computer designed for creative professionals, who need flexible computational
                                  power for 3D rendering, simulations, art, and high-resolution video editing.
                                  </p>
                                  <p style = {{fontSize: 14}}>
                                  75% of creative professionals regularly experience hardware-related performance issues, from laggy software
                                  to slow rendering times. Fancy hardware, rendering farms, and virtual machines cost a fortune. The Cube costs
                                  2-3x less than similarly-speced computers, while offering users the ability to upgrade their hardware at
                                  the click of a button and access their work and local applications from any device.
                                  </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          }
          {
          this.state.width > 700 
          ?
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: '2% 10%'}}>
            <CubeSection title = 'Is it secure?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                  <p>
                                  Yes, even more so than your normal computer. Since all your data lives in the cloud, you don’t have to worry about 
                                  losing or breaking your Cube.
                                  </p>
                                  <p>
                                  All communication between your Cube and the cloud is fully encrypted and all Fractal instances are 
                                  isolated through a technique called virtual private cloud (VPC). In short, a VPC ensures that 
                                  each Fractal instance is fully isolated, meaning no one else than you can access your 
                                  instance and no other instance can communicate with your instance.
                                  </p>
                                  <p>
                                  Although we do store your storage disks in our cloud, the VPC ensures that Fractal cannot access your data.
                                  </p>
                                  </div>}
                          titleColor = {blackText}
            />
          </div>
          :
          <div style = {{width: '100%', backgroundColor: 'white', textAlign: 'left', padding: ' 2% 10%'}}>
            <CubeSection title = 'Is it secure?'
                         text = {<div style = {{color: '#333333', fontSize: 20, lineHeight: 1.8, paddingLeft: 5}}>
                                  <p style = {{fontSize: 14}}>
                                  Yes, even more so than your normal computer. Since all your data lives in the cloud, you don’t have to worry about 
                                  losing or breaking your Cube.
                                  </p>
                                  <p style = {{fontSize: 14}}>
                                  All communication between your Cube and the cloud is fully encrypted and all Fractal instances are 
                                  isolated through a technique called virtual private cloud (VPC). In short, a VPC ensures that 
                                  each Fractal instance is fully isolated, meaning no one else than you can access your 
                                  instance and no other instance can communicate with your instance.
                                  </p>
                                  <p style = {{fontSize: 14}}>
                                  Although we do store your storage disks in our cloud, the VPC ensures that Fractal cannot access your data.
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


export default HowItWorks;