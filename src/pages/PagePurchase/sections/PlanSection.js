import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "static/PagePurchase.css";

import PriceBox from "pages/PagePurchase/containers/priceBox";
import SurveyButton from "pages/PagePurchase/containers/surveyButton"

import {
    insertCustomer,
} from "store/actions/dashboard/customer_actions";
import {
    createDisk
} from "store/actions/dashboard/disk_actions";

import { eastus, northcentralus, southcentralus } from "pages/PagePurchase/constants/american_states"


class PlanSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            spec: ""
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
    }

    nextStepKeyPress = (event) => {
        if (event.key === "Enter") {
            this.nextStep()
        }
    }

    nextStep = () => {
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
        if(spec === "Medium") {
            return "NV6"
        } else {
            return "NV12"
        }
    }

    getVMRegion = (location) => {
        if (eastus.includes(location)) {
            return "eastus";
        } else if (southcentralus.includes(location)) {
            return "southcentralus";
        } else if (northcentralus.includes(location)) {
            return "northcentralus";
        }
    };

    render() {
        return (
            <div className = "right-section-wrapper" onKeyPress={this.nextStepKeyPress}>
                <SurveyButton 
                    currentStep = {this.props.step}
                />
                {this.state.width > 700 ? (
                    <span
                        style={{ position: "relative", bottom: 2 }}
                    >
                        4{" "}
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
                        Your First {this.props.credits} Months Is On
                        Us!
                    </span>
                )}
                <div
                    style={{
                        marginTop: 5,
                        color: "#333333",
                        paddingLeft:
                            this.state.width > 700 ? 39 : 0,
                        fontSize: 16,
                        maxWidth: 650,
                    }}
                >
                    After your free trial, you'll have the
                    opportunity to select one of these plans,
                    depending on your computing needs. We hope that
                    your free trial will help you figure out which
                    plan works best for you!
                </div>
                <Row
                    style={{
                        marginTop: 50,
                        paddingLeft:
                            this.state.width > 700 ? 55 : 16,
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
                {this.state.processing ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 355,
                            marginTop: 40,
                            paddingLeft:
                                this.state.width > 700 ? 39 : 0,
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 300,
                            marginTop: 40,
                            paddingLeft:
                                this.state.width > 700 ? 39 : 0,
                        }}
                    >
                        <Button
                            onClick={this.nextStep}
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
                )}
            </div>
        )
    }
}


export default connect()(PlanSection);
