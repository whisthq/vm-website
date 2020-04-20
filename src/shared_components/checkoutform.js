import React, {Component} from 'react';
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faKey } from '@fortawesome/free-solid-svg-icons'

import {chargeStripe, validatePromoCode, insertCustomer, createDisk } from '../actions/index.js'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '', processing: false, failed_payment_attempt: false, code: '',
      failed_referral_attempt: false, creditCard: true, trial_end: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  async handleSubmit(evt) {
    this.setState({processing: true, failed_payment_attempt: false, failed_referral_attempt: false, errorMessage: ''})


    evt.preventDefault();
    let {token} = await this.props.stripe.createToken();
    if(token) {
      if(token.id) {
        this.props.dispatch(chargeStripe(token.id,  3500, this.props.location, this.state.code))
        this.props.dispatch(createDisk(this.findVMLocation(this.props.location, this.props.vm_size)))
      } else {
        this.setState({processing: false, errorMessage: 'Your card info was declined. Please try again.'})
      }
    } else {
      this.setState({processing: false, errorMessage: 'Your card info was declined. Please try again.'})
    }
  };

  changeToken = (evt) => {
    this.setState({code: evt.target.value})
  }

  submitNoPayment = () => {
    this.setState({processing: true})
    this.props.dispatch(insertCustomer(this.props.location))
    this.props.dispatch(createDisk(this.findVMLocation(this.props.location)))
  }

  findVMLocation = (location) => {
    var eastus = ['Maine', 'New Hampshire', 'Massachusetts', 'New York', 'Vermont', 'Rhode Island', 
      'Connecticut', 'New Jersey', 'Delaware', 'Maryland', 'Pennsylvania', 'Virginia', 'West Virginia', 
      'North Carolina', 'South Carolina', 'Georgia', 'Florida', 'Alabama']
    var southcentralus = ['Texas', 'Arkansas', 'Oklahoma', 'New Mexico', 'Louisiana', 'Colorado']
    var northcentralus = ['Illinois', 'Ohio', 'Indiana', 'Kentucky', 'Michigan', 'Tennessee', 
      'Wisconsin', 'Minnesota', 'Iowa', 'Missouri', 'Mississippi', 'Kansas', 'Nebraska']

    if(eastus.includes(location)) {
      return('eastus')
    } else if(southcentralus.includes(location)) {
      return('southcentralus')
    } else {
      return('northcentralus')
    }
  }

  submitNoPayment = () => {
    this.setState({processing: true})
    this.props.dispatch(insertCustomer(this.props.purchase_location))
    this.props.dispatch(createDisk(this.findVMLocation(this.props.purchase_location)))
  }

  unixToDate = (unix) => {
    const milliseconds = unix * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString().split(',')[0]
    var dateArr = humanDateFormat.split('/')
    const month = this.monthConvert(dateArr[0] - 1)
    var finalDate = month + " " + dateArr[1].toString() + ", " + dateArr[2].toString()
    return finalDate
  }

  componentDidUpdate(prevProps) {
    if(prevProps.failed_payment_attempts != this.props.failed_payment_attempts && !this.state.failed_payment_attempt) {
      this.setState({failed_payment_attempt: true, errorMessage: 'Your card info was declined. Please try again.', processing: false})
    }
    if(prevProps.failed_referral_attempts != this.props.failed_referral_attempts && !this.state.failed_referral_attempt) {
      this.setState({failed_referral_attempt: true, errorMessage: 'Your referral code was invalid. Please re-check the code, or contact support@fractalcomputers.com.', processing: false})
    }

    if(this.state.trialEnd === '' && this.props.customer && Object.keys(this.props.customer).length > 0) {
      this.setState({trialEnd: this.unixToDate(this.props.customer.trial_end)})
    }
  }

  componentDidMount() {
    if(this.props.customer && Object.keys(this.props.customer).length > 0) {
      this.setState({trialEnd: this.unixToDate(this.props.customer.trial_end)})
    }
  }
 
  render() {
    const style = {
      base: {
        color: "#333333",
        fontFamily: 'Maven Pro',
        fontSmoothing: "antialiased",
        fontSize: "14px",
        "::placeholder": {
          color: "#777777"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    return (
      <form onSubmit={this.handleSubmit} onKeyPress = {this.handleSubmitKey}>
        <label style = {{width: '100%', maxWidth: 600, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: 4}}>
          <CardElement className="MyCardElement" style={style} />
        </label>
        <div className = "referral-code">
          <input onChange = {this.changeToken} type = "text" style = {{fontSize: 14, color: "#333333", maxWidth: 600, border: 'none', borderRadius: 4, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', width: '100%', padding: '8px 5px', paddingLeft: 15}} placeholder = "Referral Code (Optional)"/>
        </div>
        {
        this.props.finalPayment
        ?
        <div style = {{maxWidth: 600}}>
          {
          !this.state.processing
          ?
          <div style = {{display: 'block'}}>
            <div>
              <Button onClick = {this.handleSubmit} style = {{marginBottom: 10, width: '100%', maxWidth: 600, background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', paddingTop: 8, paddingBottom: 8, height: 40, float: 'left', display: 'inline'}}>
                PAY
              </Button>
            </div><br/>
          </div>
          :
          <div style = {{display: 'block'}}>
            <div>
              <Button disabled = "true" style = {{marginBottom: 10, width: '100%', maxWidth: 600, background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', paddingTop: 8, paddingBottom: 8, float: 'left', display: 'inline', height: 40}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 12, marginRight: 5, fontSize: 12}}/>
              </Button>
            </div><br/>
          </div>
          }
          <div style = {{marginTop: 25}}>
          {
          this.state.errorMessage != ''
          ?
          <div style = {{fontSize: 12, color: '#e34d4d'}}>
            {this.state.errorMessage}
          </div>
          :
          <div style = {{height: 20}}></div>
          }
          </div>
          <div style = {{fontSize: 12, marginTop: 50, display: 'block'}}>
            <div style = {{display: 'inline', float: 'left'}}>Monthly Charge</div>
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>$35.00</div>
          </div><br/>
          <div style = {{fontSize: 12, marginTop: 1, display: 'block', marginBottom: 45}}>
            <div style = {{display: 'inline', float: 'left'}}>Free Trial Ends</div>
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>{this.state.trialEnd}</div>
          </div>
        </div>
        :
        <div style = {{maxWidth: 600}}>
          {
          !this.state.processing
          ?
          <div style = {{display: 'block'}}>
            <div>
              <Button onClick = {this.handleSubmit} style = {{marginBottom: 10, width: '48%', maxWidth: 600, background: "#111111", border: 0, marginTop: 20, fontSize: 14, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', paddingTop: 8, paddingBottom: 8, height: 40, float: 'left', display: 'inline'}}>
                CONTINUE WITH CARD
              </Button>
              <Button onClick = {() => this.submitNoPayment()} style = {{marginBottom: 10, width: '48%', maxWidth: 600, background: "rgba(94, 195, 235, 0.2)", fontWeight: 'bold', border: 'none', marginTop: 20, fontSize: 14, paddingTop: 8, paddingBottom: 8, color: '#1ba8e0', height: 40, float: 'right', display: 'inline'}}>
                CONTINUE WITHOUT CARD
              </Button>
            </div><br/>
          </div>
          :
          <div style = {{display: 'block'}}>
            <div>
              <Button disabled = "true" style = {{marginBottom: 10, width: '48%', maxWidth: 600, background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', paddingTop: 8, paddingBottom: 8, float: 'left', display: 'inline', height: 40}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "white", height: 12, marginRight: 5, fontSize: 12}}/>
              </Button>
              <Button disabled = "true" style = {{marginBottom: 10, width: '48%', maxWidth: 600, backgroundColor: "rgba(0, 0, 0, 0.05)", border: 'solid 1px #555555', fontWeight: 'bold', marginTop: 20, fontSize: 14, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', paddingTop: 8, paddingBottom: 8, color: '#555555', height: 40, float: 'right', display: 'inline'}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style = {{color: "#555555", height: 12, marginRight: 5, fontSize: 12}}/>
              </Button>
            </div><br/>
          </div>
          }
          <div style = {{marginTop: 25}}>
          {
          this.state.errorMessage != ''
          ?
          <div style = {{fontSize: 12, color: '#e34d4d'}}>
            {this.state.errorMessage}
          </div>
          :
          <div style = {{height: 20}}></div>
          }
          </div>
          <div style = {{fontSize: 12, marginTop: 50, display: 'block'}}>
            <div style = {{display: 'inline', float: 'left'}}>Due Today</div>
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>$0.00</div>
          </div><br/>
          <div style = {{fontSize: 12, marginTop: 1, display: 'block'}}>
            <div style = {{display: 'inline', float: 'left'}}>Plan</div>
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>{this.props.plan}</div>
          </div><br/>
          {
          this.props.credits && this.props.credits > 0
          ?
          <div style = {{fontSize: 12, marginTop: 1, display: 'block', marginBottom: 45}}>
            <div style = {{display: 'inline', float: 'left'}}>Free Trial Period</div>
            {
            this.props.credits > 1
            ?
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>{this.props.credits} months</div>
            :
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>{this.props.credits} month</div>
            }
          </div>
          :
          <div style = {{fontSize: 12, marginTop: 1, display: 'block', marginBottom: 45}}>
            <div style = {{display: 'inline', float: 'left'}}>Free Trial Period</div>
            <div style = {{display: 'inline', float: 'right', fontWeight: 'bold'}}>7 days</div>
          </div>
          }
        </div>
        }
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stripeStatus: state.AccountReducer.stripeStatus,
    failed_payment_attempts: state.AccountReducer.failed_payment_attempts,
    failed_referral_attempts: state.AccountReducer.failed_referral_attempts,
    credits: state.AccountReducer.credits,
    customer_status: state.AccountReducer.customer_status,
    customer: state.AccountReducer.customer
  }
}


export default connect(mapStateToProps)(injectStripe(CheckoutForm));