import React, {Component} from 'react';
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import Button from 'react-bootstrap/Button'
import { changeStage } from '../../../actions/index.js';
import { connect } from 'react-redux';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  changeStage = (stage) => {
    this.props.dispatch(changeStage(1))
  }

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    const style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <label style = {{width: '100%', maxWidth: 600}}>
          Card details
          <CardElement className="MyCardElement" style={style} />
        </label>
        <div style = {{maxWidth: 600}}>
          <Button onClick = {() => this.changeStage(1)} style = {{width: '38%', maxWidth: 600, backgroundColor: '#94a8ed', border: 0, marginTop: 20, fontWeight: 'bold', fontSize: 14}}>GO BACK</Button>
          <Button style = {{width: '58%', maxWidth: 600, background: "linear-gradient(258.54deg, #2BF7DE 0%, #62CEE6 52.08%, #94A8ED 100%)", border: 0, marginTop: 20, float: 'right', fontWeight: 'bold', fontSize: 14}}>
            PAY
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { 
    stage: state.AccountReducer.stage}
}


export default connect(mapStateToProps)(injectStripe(CheckoutForm));