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
        TERMS OF SERVICE
        </div>
        <div style = {{color: "#555555", marginBottom: 40}}>
        Last updated May 17th, 2020
        </div>
        <div>
          <p> 
          PLEASE READ THESE TERMS OF SERVICE (COLLECTIVELY WITH FRACTAL'S PRIVACY POLICY <a href = "https://www.fractalcomputers.com/privacy">www.fractalcomputers.com/privacy</a> AND <a href = "http://www.copyright.gov/legislation/dmca.pdf">www.copyright.gov/legislation/dmca.pdf</a>, THE "TERMS OF SERVICE ") FULLY AND CAREFULLY BEFORE USING <a href = "https://www.fractalcomputers.com">WWW.FRACTALCOMPUTERS.COM</a> (THE "SITE"), ANY DESKTOP OR MOBILE APPLICATIONS PROVIDED BY FRACTAL (THE "APPLICATIONS") AND THE CLOUD COMPUTING SERVICES, FEATURES, CONTENT OR APPLICATIONS OFFERED BY FRACTAL COMPUTERS, INC. ("FRACTAL," "WE," "US," OR "OUR") (TOGETHER WITH THE SITE AND THE APPLICATIONS, THE "SERVICES"). THESE TERMS OF SERVICE SET FORTH THE LEGALLY BINDING TERMS AND CONDITIONS FOR YOUR USE OF THE SITE, THE APPLICATIONS AND THE SERVICES.
          </p>
          <p>
          YOUR RIGHT TO USE THE SERVICES IS EXPRESSLY CONDITIONED ON ACCEPTANCE OF THESE TERMS OF SERVICE. BY CLICKING ON THE "ACCEPT" BUTTON AND USING THE SERVICES, YOU UNCONDITIONALLY AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF THESE TERMS OF SERVICE ARE CONSIDERED AN OFFER, ACCEPTANCE IS EXPRESSLY LIMITED TO THESE TERMS OF SERVICE. IF YOU DO NOT AGREE WITH ANY PROVISION OF THESE TERMS OF SERVICE, YOU MUST CLICK ON THE "CANCEL" BUTTON AND MAY NOT ACCESS OR USE THE SERVICES IN ANY MANNER FOR ANY PURPOSE.
          </p>
          <p>
          These Terms of Service were last updated on the date listed above. It is effective between Fractal and you as of the date you accept these Terms of Service.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Acceptance of Terms of Service
          </p>
          <ul>
            <li>
              By registering for and/or using the Services in any manner, including but not limited to visiting or browsing the Site and/or downloading the Applications, you agree to these Terms of Service and all other operating rules, policies and procedures that may be published from time to time on the Site by us, each of which is incorporated by reference and each of which may be updated from time to time without any notice.
            </li>
            <li>
              Certain of the Services may be subject to additional terms and conditions specified by us from time to time; your use of such Services is subject to those additional terms and conditions, which are incorporated into these Terms of Service by this reference.
            </li>
            <li>   
              These Terms of Service apply to all users of the Services, including, without limitation, users who are contributors of content, information, and other materials or services, registered or otherwise.
            </li>
          </ul>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Eligibility
          </p>
          <p>
          You represent and warrant that you are at least 18 years of age. If you are under age 18, you may not, under any circumstances or for any reason, use the Services. We may, in our sole discretion, refuse to offer the Services to any person or entity and change its eligibility criteria at any time. You are solely responsible for ensuring that these Terms of Service are in compliance with all laws, rules and regulations applicable to you. The right to access the Services is revoked where these Terms of Service or use of the Services is prohibited or to the extent offering, sale or provision of the Services conflicts with any applicable law, rule or regulation. Further, the Services are offered only for your use, and not for the use or benefit of any third party.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Registration
          </p>
          <p>
          To sign up for the Services, you must register for a Fractal user account (a "User Account") on the Services (an "Account"). You must provide accurate and complete information and keep your Account information updated. You shall not: (i) use the name of another person with the intent to impersonate that person or (ii) use the name of a person other than you without appropriate authorization. You are solely responsible for the activity that occurs on your Account, and for keeping your Account password secure. You may never use another person's user account or registration information for the Services without permission. You must notify us immediately of any change in your eligibility to use the Services (including any changes to or revocation of any licenses from state authorities), breach of security or unauthorized use of your Account. You should never publish, distribute or post login information for your Account. You shall have the ability to delete your Account, either directly or through a request made to one of our employees or affiliates.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Product
          </p>
          <p>
          Fractal is a provider of cloud-based personal computers ("Cloud Computers") and of peer-to-peer low-latency streaming technologies (“Streaming Technology”). A Fractal cloud computer is similar to a standard PC in that once your Fractal subscription is active, it allows you to install software for which you have a legitimate license. Fractal is not designed to support pirated or otherwise illegitimately obtained software. Unless indicated otherwise, your Fractal cloud computer runs on Windows 10 Professional or Linux Ubuntu 18.04, depending on which plan you select. In certain world regions, Windows 10 Professional may be replaced by Windows Server 2016, which is indicated to you before you select your cloud computer.
          </p>
          <p>
          The Fractal Streaming Technology can be used to stream your own computer, provided that you have a legitimate license for it, to another of your devices over the Internet. The Fractal Streaming Technology cannot be used to stream your own computer to a third party or to a device which you do not own and cannot be used to stream pirated or otherwise illegitimately obtained software.
          </p>
          <p>
          Your cloud computer and/or your personal computer streamed through Fractal can be accessed from any Internet-connected device (a “User Device”), provided that a Fractal local application has been developed for the device’s operating system.
          </p>
          <p>
          Given the nature of cloud-based personal computing, your inputs (keystrokes, mouse/touchpad movements, etc.) are sent from the User Device to Fractal’s data center infrastructure. The servers in Fractal’s data center infrastructure interpret these signals on your personal cloud computer, which allows for the Fractal local application to display the cloud computers. All communications between your User Device and your Fractal Cloud Computer, including audio and video components of the streaming, are fully AES encrypted, and Fractal does not observe directly any of your stream components.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Fractal Plans and Subscriptions
          </p>
          <p>
          A Fractal plan is your subscription to access your cloud computer or to license the Fractal Streaming Technology to stream your personal computer. Your subscription period will be calculated from the date on which your Fractal cloud computer is set up and available for use, or the date on which your Fractal streaming license is set delivered to you, whichever applies to your situation (the “Start Date”). You will receive an email informing you of that date when you sign up for our service. The subscription will continue from the Start Date for the term you selected (the “Subscription Period”) and will then automatically renew for successive periods equal to your then-current subscription term, unless no later than the day preceding the end of the then-current term you have cancelled your subscription. The renewed subscription will be on the same terms as the current subscription, unless we have amended our pricing or other terms before the renewal date, which you will be informed of ahead of time should it happen.
          </p>
          <p>
          The cost to you of the Services is the price that was agreed by you when you purchased your subscription. This price will remain unchanged until the end of your then-current Subscription Period. For example, if your subscription period is 30 days, then the cost to you will stay the same within the 30 days of that period, payable at the beginning of said period. We will inform you reasonably in advance of any proposed increase in the price of the Services you have purchased. You will have the opportunity to approve or decline the renewal of your subscription at the new price, before it is charged to your account. However if you have not agreed to the new price by the effective date of the proposed price increase, we may at our discretion cancel your subscription at the end of the then-current Subscription Period, or transition you subscription to the plan which is most similar to your then-current subscription.
          </p>
          <p>
          If you selected a monthly plan, or a longer plan that involves monthly payments, you will generally be charged a full month at the time of purchase of your subscription.  Subsequent monthly payments will be charged on or about the same date in every subsequent month of the Subscription Period (or renewed Subscription Period).  If you selected a prepaid plan, you will generally be charged the full amount of the plan at the time of purchase of your subscription.
          </p>
          <p>
          You are responsible for making on-time payments for your Fractal subscription, as well as for updating relevant payment information in the case of any changes. Fractal reserves the right to suspend your access to any and all Fractal services if you do not make a payment on time, and/or charge late payment fees equal to ten (10) US dollars per default per week. There may be a delay in return to normal Services after default payments have been rendered. If Fractal does not receive payment for your Fractal plan on the day of renewal and you have not cancelled your Fractal plan, your Services will be suspended, and your Fractal cloud computer data will be kept securely and privately for a maximum of 30 days after cancellation of your plan. You will be notified by email and given the opportunity to download your Fractal cloud computer data before it is erased. Your Fractal cloud computer data will be erased after this 30-day period unless you have made explicit request for it to be kept, for which you will continue to incur a monthly fee. If you were licensing the Fractal Streaming Technology, you will no longer be able to stream your personal computer, effective immediately from the date you default on your payment. If your Services are suspended, Fractal is not responsible for any refund of previous payments (nor is Fractal responsible for refunds of previous payments in other situations), and you are still responsible for the entire subscription fee outstanding, meaning you are still responsible for the entire subscription fee of the current subscription period, as defined in your Fractal plan. If Services are cancelled by Fractal because of a failure to pay, the entire remaining subscription fee for the subscription period will be payable to Fractal immediately.
          </p>
          You may receive offers to purchase additional optional services from Fractal or to change your subscription plan. For the most part, those changes will be accessible from the User Account. In the case that you purchase additional optional services, your purchase of those services will become effective immediately, subject to the time needed for activation. The optional services or upgrades will be billed instantly on a pro rata basis from the date of activation to the end of the then-current Subscription Period. Going forward from that point, the optional services or upgrades will be added onto the main subscription and billed in cycle
          <p>
          If you would like to change subscription plans to a lower-priced plan, or you would like to remove optional services, the change and/or removal will take effect on the first day of the next Subscription Period after the then-current Subscription Period.
          </p>
          <p>
          Fractal reserves the right to permanently delete any user Data found on a server that is no longer subscribed to by a user 30 days after a user has cancelled their plan. You will receive one or many emails notifying you ahead of time that your data is scheduled for deletion, to provide you with the opportunity to download it locally.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Referral Programs
          </p>
          <p>
          From time to time, Fractal may offer its Users benefits for referring new additional customers to Fractal. Access to any such program is subject to compliance with these Terms by both the User and the referred User.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Fractal Software
          </p>
          <p>
          Many of the Services offered by Fractal allow you, the user, to download software, in order to use those Services. Software includes, but is not limited to, local desktop, tablet, and mobile applications that allow the user to access Fractal cloud-based personal computers from User Devices. Fractal may automatically update Fractal software on your device.
          </p>
          <p>
          Fractal software is licensed and not sold. If you comply with these Terms, Fractal grants you a worldwide, limited, personal, non-exclusive, non-transferable, non-sub-licensable, and revocable license to use the software, only for private and non-commercial use, on compatible User  Devices belonging to the user, and for the sole purpose of enabling the user to access the Services offered by Fractal. This license is granted to the user for the duration of the Subscription Period and will terminate the end of that period. This User license includes the right to download and install a copy of the software on each User Device.
          </p>
          <p>
          Fractal reserves all other rights to the software. These rights include, but are not limited to, technological protection and privacy measures included in or relating to the software which you, the user, are not authorized: to circumvent or avoid; Likewise, you are not authorized to: disassemble, decrypt, illegally penetrate, reverse-engineer, copy, use, or reconstruct the logic of the software; separate the software components to use them on different devices; publish, copy, rent, transfer, sell, lend, distribute, export, or import the software; make unauthorized use of the software in a way that could disrupt services to third parties; or attempt to do or assist anyone in doing the aforementioned. Any of the above-mentioned behaviors would expose you to prosecution, to full extent of the applicable law in your jurisdiction.
          </p>
          <p>
          If you elect so, Fractal may download for you, on your Fractal cloud computer, a set of applications that you may request. Fractal will only download open-source applications, in accordance with the open-source license of these applications. Fractal can also download certain closed-source applications, provided that they do not require a license to be downloaded. You will be asked to provide a valid license for these applications to be able to use them, in accordance with the licensing policy of the software provider. This license belongs to you and in no way to Fractal and remains yours should you stop using Fractal.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Servers and Operating Systems
          </p>
          <p>
          Fractal may use any hardware/service providers it sees fit to deliver Fractal’s Services, and those hardware/service providers may change over time.  A Fractal session (“Session”) occurs each time you use Fractal’s software to access a Fractal cloud computer. It is important to note that the User may be using different computing infrastructure in different Sessions and/or during a single Session. We will have sole discretion in deciding which hardware/service providers we will use in connection with our Services; the User acknowledges and agrees that they may not make any complaints or demands regarding Fractal’s choice in hardware/service providers.
          </p>
          <p>
          Fractal cloud computers are collectively hosted on Microsoft Azure, Amazon Web Services or Google Cloud Platform, depending on the operating system and the world region. Fractal abides by the terms of services of the respective cloud providers for which it uses the cloud infrastructure to service Fractal cloud computers, and your agreement is the Fractal Terms of Services extends to the terms of service of the cloud provider from which the Fractal cloud computer you are using is being serviced. We encourage you to review the terms of service of the three cloud providers from which Fractal services cloud computers.
          </p>
          <p>
          Unless otherwise stated and as mentioned above, Fractal cloud computers run on Windows 10 Professional or Linux Ubuntu. When logging into a Fractal session and using a Fractal cloud computer, you obtain access to an appropriate Windows license (the “License”). If you are licensing the Fractal Streaming Technology to stream your own personal computer to another of your devices, you acknowledge that your computer must run Windows 10 or Linux Ubuntu. The Fractal Streaming Technology might run on other operating systems, like other variants of the Windows operating system and/or other variants of the Linux operating system; Fractal makes no claim to support those operating systems. If you choose to run the Fractal Streaming Technology on other operating system than the officially supported ones to stream your personal computer, you may experience bugs and a reduced quality of experience. Fractal declines any responsibility for the quality of your experience using the Fractal Streaming Technology on an unofficially supported operating system.
          </p>
          <p>
          Windows Licenses are purchased and activated for the cloud computer you are using in accordance with Microsoft’s licensing policy (https://www.microsoft.com/en-us/Useterms/Retail/Windows/10/UseTerms_Retail_Windows_10_English.htm). Each License is only activated on a single, specific Fractal cloud computer and will be your license for the duration of your Fractal session. You do not own this License and have no claim to the License. Each License stays with the cloud computer it is activated for, meaning if you are using a different Fractal cloud computer across Sessions, you will be using different Licenses. All the rights associated with purchasing Licenses are assigned to Fractal and only allocated to you for the duration of your Fractal Session. Unless otherwise stated, we will pay for the License, and we will not ask you to refund the cost of the License during your Subscription Period.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Internet Access
          </p>
          <p>
          Use of Fractal’s Services requires a working Internet connection, which is not included in our Services. The quality of Fractal’s Services will depend on the quality of the User’s Internet connection, in terms of bandwidth, stability, ping, and a variety of other factors dependent on the properties of the Internet connection. The User is responsible for their own Internet connection. Fractal cannot be held responsible for interruptions or degradations in our Services due to a User’s Internet connection; we will not offer any refund if access to our Services has been interrupted or degraded by your Internet connection.
          </p>
          <p>
          You acknowledge that our Services may require the transfer of large amounts of data over your Internet connection and accept that Fractal is not responsible for any costs payable to your Internet service provider.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Code of Conduct
          </p>
          <p>
          The proper functioning of our Services requires that Users use the Services in an appropriate and reasonable way. Most notably, Fractal may only be used as a personal computer, for the private use of the Fractal User, whether in the context of personal usage or that of a personal business computer. This excludes any business or professional purpose which exceeds a personal business computer, like running a server, selling access to your Fractal cloud computer, etc.
          </p>
          <p>
          In the case of the Fractal Streaming Technology, it may only be used to stream to one receiving User Device at a time. Modifying the system in any way to overcome this limitation is strictly prohibited and will result in immediate cancellation of your Fractal Plan without prenotice.
          </p>
          <p>
          Without limiting the above, you will not use Fractal’s Services for any of the following:
          </p>
          <ul>
            <li>
              advocating or perpetrating illegal activities of any kind, including any activities which would violate local, state, national, federal, or international laws, rules, and regulations;
            </li>
            <li>
              creating, uploading, linking or sharing fraudulent, defamatory or misleading content, or intending to incite crimes and offences, racial hate or suicide, justify crimes against humanity, or containing child pornography, or any other content of a violent or pornographic nature where the content could be accessed by minors;
            </li>
            <li>
             infringing any third party's copyright, patent, trademark, trade secret or other proprietary rights or rights of publicity or privacy, or using the Services to share copyrighted material that you do not own or have permission to share or distribute;
            </li>
            <li>
             disseminating any harassing, slanderous, defamatory, sexually explicit, libelous, racist, indecent, abusive, violent, threatening, intimidating, harmful, vulgar, obscene, offensive or otherwise objectionable material of any kind or nature, or infringing the personal privacy or rights of third parties;
            </li>
            <li>
             hacking into third-party computer systems, hosting botnet-type aggressive services, spreading viruses, worms, spyware, time bombs or other computer programs with the purpose or effect of restricting, harming or altering the proper functioning of hardware or computer programs;
            </li>
            <li>
             posting, distributing, or otherwise making available or transmitting any software or other computer file that contains a virus, trojan horse, worm, malware or other harmful or destructive component;
            </li>
            <li>
             mining cryptocurrencies, any related activities, or using Fractal’s computing power to break encryption keys;
            </li>
            <li>
             sending unwanted messages, promotions or advertising, or spam, or modified, misleading or false source identification information, including by spoofing or phishing techniques, and in general, taking the identity of any other person whatsoever;
            </li>
            <li>
             reselling the Services or otherwise making the Services available to a third party, including using Fractal cloud computers as a server or with Software that functions as a server, or using Fractal for commercial or business purposes;
            </li>
            <li>
             hampering or attempting to hamper, in any way whatsoever, the proper functioning of the Services, including disabling, altering, infringing or circumventing, or attempting to disable, alter, or circumvent, in any form whatsoever, any device or feature of the Services, in particular any security or authentication feature, access restriction, storage limit, or any standby or shut-down mechanism, or modifying or using non-public areas of the Services or common areas of the Services which you are asked not to access;
            </li>
            <li>
             deleting from the Service or the Software any legal notices, disclaimers, or proprietary notices such as copyright or trademark notices, or using or modifying any logo or other content of the Websites without Fractal’s prior written consent;
            </li>
            <li>
             printing, copying or reverse engineering any code or Fractal hardware, including any Software;
            </li>
            <li>
             taking any action that degrades, harms, disrupts or interferes with the Services, the cloud equipment that operates Fractal, or the security of the Services or, more generally, taking any action that could be harmful to Fractal or other users;
            </li>
            <li>
            analyzing, probing, or testing the vulnerability of any system or network.
            </li>
          </ul>
          <p>
          We reserve the right to review your conduct and content for compliance with these Terms, and to suspend your access to the Services and/or cancel your subscription, or take such other action as we may in our discretion deem appropriate, in the event that we have reason to believe that you have violated these Terms.
          </p>
          <p>
          We also reserve the right to monitor, amend and/or remove any content posted on the Websites. Fractal will not assume any liability arising from the content in your (the user’s) account. You are responsible for the content on your account.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Non-Fractal Provided Services and Applications
          </p>
          <p>
          The Services may include software, applications, websites and services which are offered, controlled or operated by third-parties unaffiliated with Fractal (the “Third-Party Applications”).  We may also allow you to purchase Third-Party Applications from our Websites.  These Third-Party Applications may have their own terms of use, in which case you may be required to accept them in order to access the relevant Third-Party Applications. We are not responsible for, and disclaim all liability which may arise out of or in connection with, any Third-Party Applications.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          User’s data and content
          </p>
          <p>
          While using Fractal cloud computers, you will send us various files, content, e-mails, contacts, etc. (the “User Content”). The User Content belongs to the User and in no way to Fractal. Fractal is only granted the right to use the User Content to the extent required for the proper functioning of the Services. These limited rights include in particular, the right to host, save, and share the User Content, for the intended functioning of the User’s computer.
          </p>
          You acknowledge and agree that Fractal may remove User Content from the Services if you are in violation of these Terms or if we cancel or suspend our Services; we are not liable for deletion of User Content or accidental loss User Content. We strongly advise that Users backup User Content in other places. Some of our Services may allow you to share your User Content with third parties; Fractal is not liable for the sharing of any User Content with third parties.
          <p>
          You acknowledge and agree that Fractal may, at times, need to access your Fractal cloud computer to monitor the quality of the Services, fix potential bugs and/or issues, etc. If Fractal needs to access your Fractal cloud computer, we will previously inform you and seek your consent. You must note that if you report to us a malfunctioning in the Services but do not give us consent to access your Fractal cloud computer, either directly or via screen-sharing, we may not be able to correct the issue. Fractal reserves the right to access your Fractal cloud computer without your consent in the rare event that doing so is essential to the integrity and well-being of the Services.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Personal Data
          </p>
          <p>
          In addition to the User Content saved on the User's cloud computer, Fractal collects certain personal data concerning the User. For example, Fractal will collect information such as your name, email address, phone number, payment information, physical address, date of birth, and data concerning your purchase of Services. In addition, Fractal will collect information related to how and when you use the Services, including any User Devices used to access the Services, solely with a view to performing or improving its Services, including adjusting the video streaming to the User's Internet connection and allocating its hardware resources based on its Users’ needs.
          </p>
          <p>
          You hereby authorize Fractal to store, process and use the foregoing data, and communicate such data to our affiliates, in each case for the purposes set forth above.
          </p>
          <p>
          For the efficient and proper running of the Websites, Fractal may use cookies, which are files used to identify the User each time he or she connects. Cookies are used to improve the personalized services offered and for statistical purposes. The User may object to the use of cookies, by changing his or her browser settings, without relinquishing access to the service.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Websites User License
          </p>
          <p>
          Fractal grants the User, subject to compliance with these Terms, a limited, non-exclusive, non-transferable, non-sub-licensable and revocable license for non-commercial, personal, private access, browsing and use of the Websites.
          </p>
          <p>
          Fractal grants the User a non-exclusive and revocable right to create hyperlinks to the home page of the Websites, provided that they do not portray Fractal or its Services in a misleading, derogatory or offensive way, or more generally, provided that they do not affect Fractal in any way whatsoever. 
          </p>
          <p>
          The reproduction of any documents published on the Websites is only permitted for information purposes, and for personal and private use only. Any commercial use of the documents is strictly prohibited.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Intellectual Property
          </p>
          <p>
          All intellectual property associated with the Services and the Software (jointly referred to as the "Fractal IP") are proprietary to Fractal and/or its affiliates and/or its or their suppliers, and are protected by copyrights, trademarks, service marks, patents and/or other proprietary rights and laws. Fractal IP includes, without limitation, any trademarks, logos, trade names, photographs, publications, texts, documents, descriptions, slogans, domain names, patents, know-how, Software, source code, applications, user interfaces, databases, drawings, designs and models, designs, works, images, graphs, illustrations, digital downloads, animated and audio sequences, and all other intellectual works associated with the Services.
          </p>
          <p>
          You acknowledge that by purchasing the Services you are not acquiring any right in or title to the Fractal IP. Except as specifically permitted herein, no portion of the Fractal IP may be used or reproduced in any form, or by any means. All intellectual property rights not expressly granted in these Terms are reserved to Fractal and its affiliates.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Termination by us
          </p>
          <p>
          We expect you to comply with these Terms. Fractal reserves the right to suspend the Services, without notice, if you breach these Terms (including, in particular, in the event of a payment default or a violation of our Code of Conduct, which can be found above, in these Terms).  If a breach has not been cured within seven (7) days from an email notice from us, we may elect, to terminate your subscription, in which case you will receive an email and you will become immediately liable for the price of all the Services included in your then-current Subscription Period. If you have selected a monthly plan, your plan will be automatically suspended immediately without refund for the current billing period and your data will be kept for 30 days from the suspension date in accordance with our policy outlined above. If you have selected a longer prepaid plan, your plan will be automatically suspended immediately without refund for the entire period of your prepaid plan and your data will be kept for 30 days from the suspension date. Fractal takes the security of your data extremely seriously and is committed to keeping your data available for you to download for 30 days after suspension of your Services, even in the event of a termination by us.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Termination by you
          </p>
          <p>
          You may decide to end your subscription at any time, by reaching out to your support team via the Fractal website, or by any other means that may be indicated on the Websites. If you decide to terminate your subscription, the Services and the corresponding payments will continue until the end of the then-current Subscription Period, and will stop at the end of the period; we will not offer any refund.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Territories
          </p>
          <p>
          Fractal cloud computers are only supported in the regions and countries listed on our website. Fractal cloud computers might be accessible in the country or region in which you are physically present at a specific moment, even if this country or region is not part of the officially supported regions on our website. Furthermore, access from those other geographies may be possible, but the distance between the User and the Fractal data center infrastructure may cause diminished material quality of Services. Fractal does not intentionally impose any limitation on territorial availability, but local laws may impose restrictions which must be respected by the User.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Copyright
          </p>
          <p>
          We respect the intellectual property of others and ask our Users to do the same. 
          </p>
          <p>
          If you believe that any content made available on or through our Services has been used or exploited in a manner that infringes an intellectual property right you own or control, then please promptly send a DMCA Notice to the Designated Agent identified below:
          </p>
          <p>
          Fractal Computers, Inc. <br/>
          103 Greaton Road, Unit 2 <br/>
          Boston, MA 02132 <br/>
          <a href = "mailto: support@fractalcomputers.com">support@fractalcomputers.com</a> <br/>
          </p>
          <p>
          We reserve the right to delete or disable any content alleged to be infringing, and/or terminate the subscription of repeat infringers.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Disclaimer; Liability; Indemnification
          </p>
          <p>
          YOU ACKNOWLEDGE AND AGREE THAT THE SERVICES ARE PROVIDED ON AN "AS IS" AND “AS AVAILABLE” BASIS. 
          </p>
          <p>
          TO THE FULLEST EXTENT PERMITTED BY LAW, (A) FRACTAL MAKES NO WARRANTIES, EXPRESS OR IMPLIED, WITH RESPECT TO THE SERVICES; (B) FRACTAL DISCLAIMS ANY REPRESENTATIONS AND WARRANTIES, INCLUDING WITHOUT LIMITATION AS TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT; AND (C) EXCEPT FOR ANY LIABILITY FOR FRAUD, FRAUDULENT MISREPRESENTATION OR GROSS NEGLIGENCE, IN NO EVENT SHALL FRACTAL OR ITS AFFILIATES BE LIABLE TO YOU OR ANY THIRD-PARTY FOR (1) ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, OR (2) ANY LOSS OF USE, DATA, BUSINESS, GOODWILL, OR PROFITS, OR THE LOSS OF USER CONTENT, OR (3) ANY DAMAGE TO USER’S HARDWARE OR SOFTWARE, EVEN, IN EACH CASE, IN CIRCUMSTANCES WHERE FRACTAL WAS WARNED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
          IN ADDITION, OTHER THAN FOR THE TYPES OF LIABILITY WE CANNOT LIMIT BY LAW, FRACTAL AND ITS AFFILIATES’ LIABILITY FOR ALL CLAIMS RELATING TO ANY SERVICE WILL BE CAPPED AT THE HIGHER OF $100 OR THE AMOUNTS PAID BY YOU TO FRACTAL FOR THE SERVICE CONCERNED, DURING THE SIX MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
          FINALLY, YOU WILL DEFEND, INDEMNIFY AND HOLD FRACTAL, ITS AFFILIATES, AND ITS AND THEIR DIRECTORS, OFFICERS AND EMPLOYEES HARMLESS FROM ANY CLAIM, COST, LIABILITY, LOSS OR SETTLEMENT INCURRED IN CONNECTION WITH A THIRD-PARTY CLAIM ARISING OUT OF OR IN CONNECTION WITH A VIOLATION BY YOU OF ANY OF THESE TERMS.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Amendment of the Conditions
          </p>
          <p>
          Fractal may from time to time amend these Terms.  In that case, you will be asked to accept the amended Terms that will apply as of the start of your next billing period.  If you do not accept the amended Terms, the Services will continue in accordance with these Terms, until the end of your then-current Subscription Period.  If by that date you have not agreed to the amended Terms, we reserve the right to immediately cancel your subscription.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Notices
          </p>
          <p>
          Unless otherwise stated in these Terms, when the User seeks to contact Fractal, the user should do so through Fractal’s website.
          </p>
          <p>
          Fractal may contact the User by any useful means, including by email or text message sent to the contact details provided by the User in his or her User Account, by the User's Fractal cloud computer or via the Websites. 
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Miscellaneous
          </p>
          <p>
          These Terms constitute the entire agreement between you and Fractal with respect to the subject matter of these Terms, and supersede and replace any other prior or contemporaneous agreements, or terms and conditions applicable to the subject matter of these Terms.  These Terms create no third-party beneficiary rights.
          </p>
          <p>
          Fractal’s failure to enforce a provision of these Terms shall not be deemed a waiver of its right to do so in the future. If a provision of these Terms is found to be unenforceable, the remaining provisions of these Terms will remain in full effect and an enforceable term will be substituted reflecting as closely as possible the intent of the parties. You may not assign any of your rights under these Terms, and any such attempt will be void. Fractal may assign its rights to any of its affiliates, or to any successor in interest of any business associated with the Services.
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Applicable law; Disputes
          </p>
          <p>
          These Terms will be governed by Massachusetts, U.S.A. law except for its conflicts of laws principles, unless otherwise required by a mandatory law of any other jurisdiction.
          </p>
          <p>
          The parties shall endeavor to settle any disputes regarding these Terms or the Services amicably before submitting the case to the competent courts.
          </p> 
          To that effect, before filing a claim against us, you agree to try to resolve the dispute informally by opening a support ticket on your account page.  We will try to resolve the dispute informally.  If a dispute is not resolved within fifteen days of submission, you or we may bring a formal proceeding.
          <p>
          Any judicial proceeding to resolve claims relating to these Terms or the Services shall be brought in the federal or state courts of Middlesex County, Massachusetts, subject to the mandatory arbitration provisions below. By accepting these terms, you consent to our choice of venue and submit to the jurisdiction of the federal and/or state courts of Middlesex County, Massachusetts (or other courts, if we so choose).
          </p>
          <p style = {{fontWeight: 'bold', fontSize: 20}}>
          Mandatory Arbitration
          </p>
          <p>
          You and we agree to resolve any claims relating to these Terms or the Services through final and binding arbitration by the American Arbitration Association (AAA), in accordance with its Commercial Arbitration Rules and the Supplementary Procedures for Consumer Related Disputes. The AAA rules will govern payment of all arbitration fees.  The arbitration will be held in the United States county where you live or work or in Middlesex County, Massachusetts, or any other location we agree upon. If the agreement to arbitrate is found not to apply to you or your claim, you agree to the exclusive jurisdiction of the state and federal courts in Middlesex County, Massachusetts to resolve your claim.
          </p>
          <p>
          You can opt-out of the requirement to arbitrate by emailing <a href = "mailto: support@fractalcomputers.com">support@fractalcomputers.com</a> with the subject line “Arbitration Opt-Out” within 30 days of the date you first register your account. You can obtain the opt-form, free of charge, by contacting Fractal via the Fractal website. This step is not necessary if you have already opted-out in a previous version of these terms: your previous decision regarding arbitration is still binding unless you update it.
          </p>
          <p>
          Notwithstanding the foregoing, either you or we may assert claims in small claims court in Middlesex County (MA) or any United States county where you live or work. Either party may bring a lawsuit solely for injunctive relief to stop unauthorized use or abuse of the Services, violation of these Terms, or intellectual property infringement without first engaging in arbitration or the informal dispute-resolution process described above.
          </p>
          <p>
          Class arbitrations, class actions, private attorney general actions, and consolidation with other arbitrations are NOT allowed.  You may not bring a claim as a plaintiff or a class member in a class, consolidated, or representative action. You may only resolve disputes with us on an individual basis. If this specific paragraph is held unenforceable, then the entirety of this "Mandatory Arbitration Provisions" section will be deemed void.
          </p>
        </div>
      </div>
      <Footer/>
      </div>
    )
  }
}

export default Privacy;
