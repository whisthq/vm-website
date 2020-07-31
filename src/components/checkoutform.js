import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { chargeStripe } from "store/actions/dashboard/stripe_actions";
import { getZipState } from "utils/zipcode";
import { TAX_RATES } from "utils/taxes";

import moment from "moment";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            processing: false,
            failed_payment_attempt: false,
            code: "",
            failed_referral_attempt: false,
            creditCard: true,
            trial_end: "",
            billingState: null,
            taxPercent: 0,
            monthlyCharge: 5,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }
    };

    async handleSubmit(evt) {
        this.setState({
            processing: true,
            failed_payment_attempt: false,
            failed_referral_attempt: false,
            errorMessage: "",
        });

        evt.preventDefault();
        let { token } = await this.props.stripe.createToken();
        if (token) {
            if (token.id) {
                this.props.dispatch(
                    chargeStripe(
                        token.id,
                        3500,
                        this.state.code,
                        this.props.plan.toLowerCase()
                    )
                );
                this.props.callback();
            } else {
                this.setState({
                    processing: false,
                    errorMessage:
                        "Your card info was declined. Please try again.",
                });
            }
        } else {
            this.setState({
                processing: false,
                errorMessage: "Your card info was declined. Please try again.",
            });
        }
    }

    changeToken = (evt) => {
        this.setState({ code: evt.target.value });
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.failed_payment_attempts !==
                this.props.failed_payment_attempts &&
            !this.state.failed_payment_attempt
        ) {
            this.setState({
                failed_payment_attempt: true,
                errorMessage: "Your card info was declined. Please try again.",
                processing: false,
            });
        }
        if (
            prevProps.failed_referral_attempts !==
                this.props.failed_referral_attempts &&
            !this.state.failed_referral_attempt
        ) {
            this.setState({
                failed_referral_attempt: true,
                errorMessage:
                    "Your referral code was invalid. Please re-check the code, or contact support@fractalcomputers.com.",
                processing: false,
            });
        }

        if (this.props.payment && Object.keys(this.props.payment).length > 0) {
            console.log(this.props.payment.trial_end);
            if (
                this.state.trialEnd === "" &&
                this.props.payment.trial_end &&
                this.props.payment.trial_end > 0
            ) {
                this.setState({
                    trialEnd: moment
                        .unix(this.props.payment.trial_end)
                        .format("MMMM Do, YYYY"),
                });
            }
        } else {
            if (
                this.state.trialEnd !== "" &&
                this.props.customer &&
                Object.keys(this.props.customer).length === 0
            ) {
                this.setState({ trialEnd: "" });
            }
        }

        if (
            this.state.trialEnd === "" &&
            this.props.customer &&
            Object.keys(this.props.customer).length > 0
        ) {
            this.setState({
                trialEnd: moment
                    .unix(this.props.customer.trial_end)
                    .format("MMMM Do, YYYY"),
            });
        }
    }

    componentDidMount() {
        if (
            this.props.customer &&
            Object.keys(this.props.customer).length > 0
        ) {
            this.setState({
                trialEnd: moment
                    .unix(this.props.customer.trial_end)
                    .format("MMMM Do, YYYY"),
            });
        }

        if (this.props.plan) {
            if (this.props.plan === "Hourly") {
                this.setState({ monthlyCharge: 5 });
            } else if (this.props.plan === "Monthly") {
                this.setState({ monthlyCharge: 39 });
            } else {
                this.setState({ monthlyCharge: 99 });
            }
        }
    }

    handleCardChange = (evt) => {
        let postCode = evt.value.postalCode;
        if (postCode !== null) {
            let out = getZipState(postCode);
            if (out !== null) {
                this.setState({
                    billingState: out.state,
                    taxPercent: TAX_RATES[out.st],
                });
            }
        }
    };

    render() {
        const style = {
            base: {
                color: "#333333",
                fontFamily: "Maven Pro",
                fontSmoothing: "antialiased",
                fontSize: "14px",
                "::placeholder": {
                    color: "#777777",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        };

        return (
            <form
                onSubmit={this.handleSubmit}
                onKeyPress={this.handleSubmitKey}
            >
                <label
                    style={{
                        width: "100%",
                        maxWidth: 900,
                        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
                        borderRadius: 4,
                    }}
                >
                    <CardElement
                        className="MyCardElement"
                        style={style}
                        onChange={this.handleCardChange}
                    />
                </label>
                <div className="referral-code">
                    <input
                        onChange={this.changeToken}
                        type="text"
                        style={{
                            fontSize: 14,
                            color: "#333333",
                            maxWidth: 900,
                            border: "none",
                            borderRadius: 4,
                            boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.05)",
                            width: "100%",
                            padding: "8px 5px",
                            paddingLeft: 15,
                        }}
                        placeholder="Referral Code (Optional)"
                    />
                </div>
                <div style={{ maxWidth: 900 }}>
                    {!this.state.processing ? (
                        <div style={{ display: "block" }}>
                            <div>
                                <Button
                                    onClick={this.handleSubmit}
                                    style={{
                                        color: "#1ba8e0",
                                        marginBottom: 10,
                                        width: "100%",
                                        maxWidth: 900,
                                        background: "rgba(94, 195, 235, 0.2)",
                                        border: 0,
                                        marginTop: 20,
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        paddingTop: 10,
                                        paddingBottom: 10,
                                        height: 42,
                                        float: "left",
                                        display: "inline",
                                    }}
                                >
                                    PAY
                                </Button>
                            </div>
                            <br />
                        </div>
                    ) : (
                        <div style={{ display: "block" }}>
                            <div>
                                <Button
                                    disabled="true"
                                    style={{
                                        marginBottom: 10,
                                        width: "100%",
                                        maxWidth: 900,
                                        background: "rgba(94, 195, 235, 0.2)",
                                        border: 0,
                                        marginTop: 20,
                                        fontWeight: "bold",
                                        fontSize: 14,
                                        boxShadow:
                                            "0px 4px 5px rgba(0, 0, 0, 0.05)",
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        float: "left",
                                        display: "inline",
                                        height: 40,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleNotch}
                                        spin
                                        style={{
                                            color: "#1ba8e0",
                                            height: 12,
                                            marginRight: 5,
                                            fontSize: 12,
                                        }}
                                    />
                                </Button>
                            </div>
                            <br />
                        </div>
                    )}
                    <div style={{ marginTop: 25 }}>
                        {this.state.errorMessage !== "" ? (
                            <div style={{ fontSize: 12, color: "#e34d4d" }}>
                                {this.state.errorMessage}
                            </div>
                        ) : (
                            <div style={{ height: 20 }}></div>
                        )}
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div>Plan</div>
                        <div
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {this.props.plan}
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 15,
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div>Monthly Charge</div>
                        <div
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            ${this.state.monthlyCharge.toFixed(2)} USD
                        </div>
                    </div>
                    {this.state.billingState !== null && (
                        <div
                            style={{
                                fontSize: 12,
                                marginTop: 5,
                            }}
                            className="d-flex justify-content-between"
                        >
                            <div style={{ color: "grey" }}>
                                Sales tax - {this.state.billingState} (
                                {this.state.taxPercent}%)
                            </div>
                            <div
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                $
                                {(
                                    this.state.monthlyCharge *
                                    this.state.taxPercent *
                                    0.01
                                ).toFixed(2)}{" "}
                                USD
                            </div>
                        </div>
                    )}
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div>Total</div>
                        <div
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            $
                            {(
                                this.state.monthlyCharge +
                                this.state.monthlyCharge *
                                    this.state.taxPercent *
                                    0.01
                            ).toFixed(2)}{" "}
                            USD
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 5,
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div>Amount due</div>
                        <div
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            $
                            {(
                                this.state.monthlyCharge +
                                this.state.monthlyCharge *
                                    this.state.taxPercent *
                                    0.01
                            ).toFixed(2)}{" "}
                            USD
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 15,
                        }}
                        className="d-flex justify-content-between"
                    >
                        <div>Free Trial Ends</div>
                        <div
                            style={{
                                fontWeight: "bold",
                            }}
                        >
                            {this.state.trialEnd}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        stripe_status: state.DashboardReducer.stripe_status,
        failed_payment_attempts: state.DashboardReducer.failed_payment_attempts,
        failed_referral_attempts:
            state.DashboardReducer.failed_referral_attempts,
        credits: state.DashboardReducer.credits,
        customer_status: state.DashboardReducer.customer_status,
        customer: state.DashboardReducer.customer,
        payment: state.DashboardReducer.payment,
    };
}

CheckoutForm.defaultProps = {
    callback: () => {},
};

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
