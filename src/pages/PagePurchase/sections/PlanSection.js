import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "static/PagePurchase.css";

import PriceBox from "pages/PagePurchase/containers/priceBox";
import SurveyButton from "pages/PagePurchase/containers/surveyButton";

import { createDisk } from "store/actions/dashboard/disk_actions";
import {
    storeSetupStep,
    storePlanType,
} from "store/actions/dashboard/vm_setup_actions";
import { insertCustomer } from "store/actions/dashboard/customer_actions";

import {
    eastus,
    northcentralus,
    southcentralus,
} from "pages/PagePurchase/constants/american_states";

class PlanSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            spec: "",
            plan: "",
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

    nextStepKeyPress = (event) => {
        if (event.key === "Enter") {
            if (this.props.enableCreditCard && this.state.plan !== "") {
                this.nextStep();
            } else {
                this.createVm();
            }
        }
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

    nextStep = () => {
        this.props.dispatch(storeSetupStep(6));
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

    setPlan = (newPlan) => {
        this.setState({ plan: newPlan });
        this.props.dispatch(storePlanType(newPlan));
    };

    render() {
        const renderPrice = () => (
            <Row
                style={{
                    marginTop: 50,
                    paddingLeft: this.state.width > 700 ? 39 : 15,
                }}
            >
                <Col
                    md={4}
                    style={{ paddingLeft: 0 }}
                    onClick={() => this.setPlan("Hourly")}
                    className="pointerOnHover"
                >
                    <PriceBox
                        color="white"
                        subText="Starts with free trial"
                        name="Hourly"
                        price="5"
                        details="+$0.70 / hr of usage"
                        checked={this.state.plan === "Hourly"}
                    />
                </Col>
                <Col
                    md={4}
                    style={{ paddingLeft: 0 }}
                    onClick={() => this.setPlan("Monthly")}
                    className="pointerOnHover"
                >
                    <PriceBox
                        color="white"
                        subText="Starts with free trial"
                        name="Monthly"
                        price="39"
                        details={
                            <div>
                                6 hr / day
                                <br />
                                +$0.50 per extra hr
                            </div>
                        }
                        checked={this.state.plan === "Monthly"}
                    />
                </Col>
                <Col
                    md={4}
                    style={{ paddingLeft: 0 }}
                    onClick={() => this.setPlan("Unlimited")}
                    className="pointerOnHover"
                >
                    <PriceBox
                        color="white"
                        subText="Starts with free trial"
                        name="Unlimited"
                        price="99"
                        details="Unlimited daily usage"
                        checked={this.state.plan === "Unlimited"}
                    />
                </Col>
            </Row>
        );

        const renderSurvey = () => (
            <div
                tabIndex="0"
                style={{
                    outline: "none",
                    paddingLeft: this.state.width > 700 ? 0 : 40,
                    paddingRight: this.state.width > 700 ? 0 : 40,
                    width:
                        this.state.width > 700 ? "calc(100% - 400px)" : "95%",
                    overflowX: "hidden !important",
                }}
            >
                <div>
                    {this.state.width > 700 ? (
                        <span style={{ position: "relative", bottom: 2 }}>
                            5{" "}
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
                        Choose Your Plan
                    </span>
                    <div
                        style={{
                            marginTop: 5,
                            color: "#333333",
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                            fontSize: 16,
                            maxWidth: 1200,
                        }}
                    >
                        No payment is required until your free trial has ended.
                        You can change or cancel your plan at any time.
                    </div>
                </div>
                {renderPrice()}
                {this.state.plan !== "" ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 285,
                            marginTop: 20,
                            paddingLeft: this.state.width > 700 ? 25 : 0,
                        }}
                    >
                        <Button
                            onClick={this.nextStep}
                            style={{
                                background: "#111111",
                                border: "none",
                                padding: "10px 45px",
                                display: "inline",
                            }}
                        >
                            Continue
                        </Button>
                        {this.state.width > 700 ? (
                            <div
                                style={{
                                    fontSize: 14,
                                    color: "#555555",
                                    position: "relative",
                                    top: 12,
                                }}
                            >
                                <FaArrowRight
                                    style={{
                                        marginRight: 6,
                                        height: 8,
                                        width: 15,
                                        position: "relative",
                                        bottom: 1,
                                    }}
                                />
                                Press Enter
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                ) : (
                    <div
                        style={{
                            marginTop: 20,
                            paddingLeft: this.state.width > 700 ? 25 : 0,
                        }}
                    >
                        <Button
                            disabled="true"
                            style={{
                                background: "#111111",
                                border: "none",
                                padding: "10px 45px",
                                display: "inline",
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                )}
            </div>
        );

        return (
            <div
                className="right-section-wrapper"
                onKeyPress={this.nextStepKeyPress}
            >
                <SurveyButton currentStep={this.props.step} />

                {this.props.enableCreditCard ? (
                    <div>{renderSurvey()}</div>
                ) : (
                    <div>
                        {this.state.width > 700 ? (
                            <span style={{ position: "relative", bottom: 2 }}>
                                5{" "}
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
                        {this.props.credits === 0 ? (
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                Your First Week Is On Us!
                            </span>
                        ) : this.props.credits === 1 ? (
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                Your First Month Is On Us!
                            </span>
                        ) : (
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                Your First {this.props.credits} Months Is On Us!
                            </span>
                        )}
                        <p
                            style={{
                                marginTop: 5,
                                color: "#333333",
                                paddingLeft: this.state.width > 700 ? 39 : 0,
                                fontSize: 16,
                                maxWidth: 650,
                            }}
                        >
                            After your free trial, you'll have the opportunity
                            to select one of these plans, depending on your
                            computing needs. We hope that your free trial will
                            help you figure out which plan works best for you!
                        </p>

                        <Row
                            style={{
                                marginTop: 50,
                                paddingLeft: this.state.width > 700 ? 55 : 16,
                            }}
                        >
                            <Col
                                md={4}
                                style={{ paddingLeft: 0 }}
                                onClick={() =>
                                    this.setState({ plan: "Hourly" })
                                }
                            >
                                <PriceBox
                                    color="white"
                                    subText="Starts with free trial"
                                    name="Hourly"
                                    price="5"
                                    details="+$0.70 / hr of usage"
                                    hide_checkbox
                                />
                            </Col>
                            <Col
                                md={4}
                                style={{ paddingLeft: 0 }}
                                onClick={() =>
                                    this.setState({ plan: "Monthly" })
                                }
                            >
                                <PriceBox
                                    color="white"
                                    subText="Starts with free trial"
                                    name="Monthly"
                                    price="39"
                                    details={
                                        <div>
                                            6 hr / day
                                            <br />
                                            +$0.50 per extra hr
                                        </div>
                                    }
                                    hide_checkbox
                                />
                            </Col>
                            <Col
                                md={4}
                                style={{ paddingLeft: 0 }}
                                onClick={() =>
                                    this.setState({ plan: "Unlimited" })
                                }
                            >
                                <PriceBox
                                    color="white"
                                    subText="Starts with free trial"
                                    name="Unlimited"
                                    price="99"
                                    details="Unlimited daily usage"
                                    hide_checkbox
                                />
                            </Col>
                        </Row>
                    </div>
                )}
                {this.state.processing ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 355,
                            marginTop: 40,
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                        }}
                    >
                        <Button
                            disabled="true"
                            style={{
                                background: "#111111",
                                border: "none",
                                padding: "10px 45px",
                                display: "inline",
                                width: 235,
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                style={{
                                    color: "white",
                                    height: 12,
                                    marginRight: 5,
                                    fontSize: 12,
                                }}
                            />
                        </Button>
                    </div>
                ) : (
                    !this.props.enableCreditCard && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: 300,
                                marginTop: 40,
                                paddingLeft: this.state.width > 700 ? 39 : 0,
                            }}
                        >
                            <Button
                                onClick={this.createVm}
                                style={{
                                    background: "#111111",
                                    border: "none",
                                    padding: "10px 45px",
                                    display: "inline",
                                    width: 235,
                                }}
                            >
                                Create My Cloud PC
                            </Button>
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default connect()(PlanSection);
