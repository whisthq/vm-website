import React, { Component } from "react";
import { connect } from "react-redux";

import StripeBadge from "assets/icons/powered_by_stripe.svg";
import SurveyButton from "pages/PagePurchase/containers/surveyButton";
import CheckoutForm from "components/checkoutform";
import { Elements, StripeProvider } from "react-stripe-elements";
import { FaArrowRight } from "react-icons/fa";

import { createDisk } from "store/actions/dashboard/disk_actions";
import { insertCustomer } from "store/actions/dashboard/customer_actions";

import { config } from "utils/constants";

import {
    eastus,
    northcentralus,
    southcentralus,
} from "pages/PagePurchase/constants/american_states";

class PaymentSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    createVm = () => {
        this.setState({ processing: true });
        this.props.dispatch(insertCustomer(this.props.vm_setup_data.location));
        this.props.dispatch(
            createDisk(
                this.getVMRegion(this.props.vm_setup_data.location),
                this.getAzureSpec(this.props.vm_setup_data.spec),
                this.props.vm_setup_data.apps
            )
        );
    };

    getAzureSpec = (spec) => {
        if (spec === "Medium") {
            return "NV6";
        } else {
            return "NV12";
        }
    };

    getVMRegion = (location) => {
        if (eastus.includes(location)) {
            return "eastus";
        } else if (southcentralus.includes(location)) {
            return "southcentralus";
        } else if (northcentralus.includes(location)) {
            return "northcentralus";
        }
    };

    nextStepKeyPress = (event) => {
        if (event.key === "Enter") {
            this.createVm();
        }
    };

    render() {
        const fonts = [
            { cssSrc: "https://fonts.googleapis.com/css?family=Maven+Pro" },
        ];
        var public_key = config.stripe.PUBLIC_KEY;

        return (
            <div
                className="right-section-wrapper"
                // onKeyPress={this.nextStepKeyPress}
            >
                <SurveyButton currentStep={this.props.step} />
                <div
                    style={{
                        paddingLeft: this.state.width > 700 ? 0 : 40,
                        paddingRight: this.state.width > 700 ? 0 : 40,
                        width:
                            this.state.width > 700
                                ? "calc(100% - 400px)"
                                : "95%",
                        overflowX: "hidden !important",
                    }}
                >
                    <img
                        src={StripeBadge}
                        alt=""
                        style={{
                            width: 125,
                            position: "absolute",
                            bottom: 30,
                            marginLeft: this.state.width > 700 ? 40 : 0,
                        }}
                    />
                    <div>
                        {this.state.width > 700 ? (
                            <span style={{ position: "relative", bottom: 2 }}>
                                6{" "}
                                <FaArrowRight
                                    style={{
                                        height: 10,
                                        position: "relative",
                                        bottom: 2,
                                    }}
                                />
                            </span>
                        ) : (
                            <div></div>
                        )}
                        <span
                            style={{
                                fontSize: 22,
                                paddingLeft: this.state.width > 700 ? 10 : 0,
                            }}
                        >
                            Submit Payment Details
                        </span>
                        {this.props.credits && this.props.credits > 0 ? (
                            this.props.credits === 1 ? (
                                <div
                                    style={{
                                        marginTop: 5,
                                        color: "#555555",
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                        fontSize: 16,
                                        maxWidth: 1200,
                                    }}
                                >
                                    Your first month is free, and you can cancel
                                    anytime. Get an additional free month for
                                    every friend who enters your referral code.
                                </div>
                            ) : (
                                <div
                                    style={{
                                        marginTop: 5,
                                        color: "#555555",
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                        fontSize: 16,
                                        maxWidth: 1200,
                                    }}
                                >
                                    Your first {this.props.credits} months are
                                    free, and you can cancel anytime. Get an
                                    additional free month for every friend who
                                    enters your referral code.
                                </div>
                            )
                        ) : (
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#555555",
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    fontSize: 16,
                                    maxWidth: 1200,
                                }}
                            >
                                Your first seven days are free, and you can
                                cancel anytime. Get an additional free month for
                                every friend who enters your referral code.
                            </div>
                        )}
                        <div
                            style={{
                                marginTop: 40,
                                marginLeft: this.state.width > 700 ? 39 : 0,
                            }}
                        >
                            <StripeProvider apiKey={public_key}>
                                <div className="example">
                                    <Elements fonts={fonts}>
                                        <CheckoutForm
                                            plan={this.props.vm_setup_data.plan}
                                            callback={this.createVm}
                                        />
                                    </Elements>
                                </div>
                            </StripeProvider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PaymentSection);
