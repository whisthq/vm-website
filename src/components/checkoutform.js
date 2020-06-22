import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import { chargeStripe } from "store/actions/dashboard/stripe_actions";

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

    monthConvert = (month) => {
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var selectedMonthName = months[month];
        return selectedMonthName;
    };

    unixToDate = (unix) => {
        const milliseconds = unix * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject.toLocaleString().split(",")[0];
        var dateArr = humanDateFormat.split("/");
        const month = this.monthConvert(dateArr[0] - 1);
        var finalDate =
            month + " " + dateArr[1].toString() + ", " + dateArr[2].toString();
        return finalDate;
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
            if (
                this.state.trialEnd === "" &&
                this.props.payment.trial_end &&
                this.props.payment.trial_end > 0
            ) {
                this.setState({
                    trialEnd: this.unixToDate(this.props.payment.trial_end),
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
                trialEnd: this.unixToDate(this.props.customer.trial_end),
            });
        }
    }

    componentDidMount() {
        if (
            this.props.customer &&
            Object.keys(this.props.customer).length > 0
        ) {
            this.setState({
                trialEnd: this.unixToDate(this.props.customer.trial_end),
            });
        }
    }

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
                    <CardElement className="MyCardElement" style={style} />
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
                    {this.props.plan === "Hourly" ? (
                        <div
                            style={{
                                fontSize: 12,
                                marginTop: 50,
                                display: "block",
                            }}
                        >
                            <div style={{ display: "inline", float: "left" }}>
                                Monthly Charge
                            </div>
                            <div
                                style={{
                                    display: "inline",
                                    float: "right",
                                    fontWeight: "bold",
                                }}
                            >
                                $5.00
                            </div>
                        </div>
                    ) : this.props.plan === "Monthly" ? (
                        <div
                            style={{
                                fontSize: 12,
                                marginTop: 50,
                                display: "block",
                            }}
                        >
                            <div style={{ display: "inline", float: "left" }}>
                                Monthly Charge
                            </div>
                            <div
                                style={{
                                    display: "inline",
                                    float: "right",
                                    fontWeight: "bold",
                                }}
                            >
                                $39.00
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                fontSize: 12,
                                marginTop: 50,
                                display: "block",
                            }}
                        >
                            <div style={{ display: "inline", float: "left" }}>
                                Monthly Charge
                            </div>
                            <div
                                style={{
                                    display: "inline",
                                    float: "right",
                                    fontWeight: "bold",
                                }}
                            >
                                $99.00
                            </div>
                        </div>
                    )}
                    <br />
                    <div
                        style={{ fontSize: 12, marginTop: 1, display: "block" }}
                    >
                        <div style={{ display: "inline", float: "left" }}>
                            Plan
                        </div>
                        <div
                            style={{
                                display: "inline",
                                float: "right",
                                fontWeight: "bold",
                            }}
                        >
                            {this.props.plan}
                        </div>
                    </div>
                    <br />
                    <div
                        style={{
                            fontSize: 12,
                            marginTop: 1,
                            display: "block",
                            marginBottom: 45,
                        }}
                    >
                        <div style={{ display: "inline", float: "left" }}>
                            Free Trial Ends
                        </div>
                        <div
                            style={{
                                display: "inline",
                                float: "right",
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

export default connect(mapStateToProps)(injectStripe(CheckoutForm));
