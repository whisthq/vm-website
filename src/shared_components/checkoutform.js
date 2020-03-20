import React, {Component} from 'react';
import {CardElement, injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements';
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import {chargeStripe} from '../actions/index.js'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    let {token} = await this.props.stripe.createToken();
    console.log(token.id)
    this.props.dispatch(chargeStripe(token.id,  3500))
  };

  render() {
    const style = {
      base: {
        color: "#333333",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#888888"
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
          <CardElement className="MyCardElement" style={style} />
        </label>
        <div style = {{maxWidth: 600}}>
          <Button onClick = {this.handleSubmit} style = {{width: '100%', maxWidth: 600, background: "linear-gradient(110.1deg, #5ec3eb 0%, #d023eb 100%)", border: 0, marginTop: 10, fontWeight: 'bold', fontSize: 14, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', paddingTop: 7, paddingBottom: 7}}>
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