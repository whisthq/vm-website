import React, { Component } from 'react'

import Header from '../../shared_components/header.js'
import Footer from '../../shared_components/footer.js'

class Privacy extends Component {
  constructor(props) {
    super(props)
    this.state = { width: 0, height: 0 }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
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
      <div style = {{overflowX: 'hidden'}} id = 'top'>
      <Header color = "#333333" button = "#5ec3eb" homepage/>
      <div style = {{padding: '125px 150px', maxWidth: 1280}}>
        <div style = {{fontSize: 40}}>
        COOKIE POLICY
        </div>
        <div style = {{color: "#555555", marginBottom: 40}}>
        Last updated May 17th, 2020
        </div>
        <p>
        Fractal Computers, Inc. (“we” or “us” or “our”) may use cookies and other tracking technologies when you visit our website, <a href = "https://www.fractalcomputers.com">www.fractalcomputers.com</a>, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”) to help customize the Site and improve your experience.
        </p>
        <p>
        We reserve the right to make changes to this Cookie Policy at any time and for any reason. We will alert you about any changes by updating the “Last Updated” date of this Cookie Policy. Any changes or modifications will be effective immediately upon posting the updated Cookie Policy on the Site, and you waive the right to receive specific notice of each such change or modification.
        </p>
        <p>
        You are encouraged to periodically review this Cookie Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Cookie Policy by your continued use of the Site after the date such revised Cookie Policy is posted.
        </p>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        What Are Cookies
        </p>
        <p>
        A “cookie” is a string of information which assigns you a unique identifier that we store on your computer. Your browser then provides that unique identifier to use each time you submit a query to the Site. We use cookies on the Site to, among other things, keep track of services you have used, record account information, record your user preferences, keep you logged into the Site, facilitate purchase procedures, and track the pages you visit. Cookies help us understand how the Site is being used and improve your user experience.
        </p>
        <p>
        This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
        </p>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        How We Use Cookies
        </p>
        <p>
        We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this Site. It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
        </p>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        Disabling Cookies
        </p>
        <p>
        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help section for how to do this). Be aware that disabling cookies will affect the functionality of many other websites that you visit, and will disable certain functionality and features of this Site. Therefore, it is recommended that you do not disable cookies.
        </p>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        Cookies We Set
        </p>
        <p>
        We set industry-standard cookies to provide you the best experience possible when using the Site.
        </p>
        <div style = {{paddingLeft: 20}}>
            <p style = {{fontWeight: 'bold'}}>
            Account Cookies
            </p>
            <p>
            When you create an account with us, we use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, however in some cases they may remain afterwards to remember your Site preferences when logged out.
            </p>
            <p style = {{fontWeight: 'bold'}}>
            Site Management Cookies
            </p>
            <p>
            We use cookies to remember your login state when you are logged in. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
            </p>
            <p style = {{fontWeight: 'bold'}}>
            Email and Newsletter Cookies
            </p>
            <p>
            This Site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.          
            </p>
            <p style = {{fontWeight: 'bold'}}>
            Subscription Processing Cookies
            </p>
            <p>
            This Site offers subscription and digital payment facilities, and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.          
            </p>
            <p style = {{fontWeight: 'bold'}}>
            Survey Cookies
            </p>
            <p>
            From time to time we offer user surveys and questionnaires to provide you with interesting insights, helpful tools, or to understand our user base more accurately. These surveys may use cookies to remember who has already taken part in a survey or to provide you with accurate results across pages.          
            </p>
            <p style = {{fontWeight: 'bold'}}>
            Preference Cookies
            </p>
            <p>
            In order to provide you with a great experience on this Site, we provide the functionality to set your preferences for how this Site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be accessed whenever you interact with a page on our Site.
            </p>
        </div>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        Third-Party Cookies
        </p>
        <p>
        In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this Site.
        </p>
        <div style = {{paddingLeft: 20}}>
            <p style = {{fontWeight: 'bold'}}>
            Testing Management Cookies
            </p>
            <p>
            From time to time we test new features and make subtle changes to the way that the Site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.
            </p>
        </div>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        Privacy Policy
        </p>
        <p>
        For more information about how we use information collected by cookies and other tracking technologies, please refer to our <a href = "https://www.fractalcomputers.com/privacy">Privacy Policy</a>. This Cookie Policy is part of and is incorporated into our Privacy Policy. By using the Site, you agree to be bound by this Cookie Policy and our Privacy Policy.
        </p>
        <p style = {{fontWeight: 'bold', fontSize: 20}}>
        More Information
        </p>
        <p>
        If you are looking for more information, you can contact us via email at <a href = "mailto: support@fractalcomputers.com">support@fractalcomputers.com</a>.
        </p>
      </div>
      <Footer/>
    </div>
    )
  }
}

export default Privacy;
