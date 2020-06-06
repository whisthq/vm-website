import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleUp, FaTimes } from "react-icons/fa";

import "static/PagePurchase.css";

import {
    storeSetupStep,
    storePurchaseLocation
} from "store/actions/dashboard/vm_setup_actions";

import { 
    all_american_states,
    unsupported_american_states
} from "pages/PagePurchase/constants/american_states";

import Autocomplete from "pages/PagePurchase/containers/autoComplete";

class StateSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            country: ""
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
        if (event.key === "Enter" && all_american_states.includes(this.props.vm_setup_data.location)
        ) {
            this.nextStep()
        }
    }

    nextStep = () => {
        if (all_american_states.includes(this.props.vm_setup_data.location)) {
            if (unsupported_american_states.includes(this.props.vm_setup_data.location)) {
                this.props.dispatch(storeSetupStep(2.1))
                this.props.dispatch(storePurchaseLocation(""))
            } else {
                this.props.dispatch(storeSetupStep(3))
            }
        }
    }

    render() {
        return (
            <div className = "right-section-wrapper" onKeyPress={this.nextStepKeyPress}>
                <div className = "survey-box">
                {this.state.width > 700 ? (
                    <span
                        style={{ position: "relative", bottom: 2 }}
                    >
                        2{" "}
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
                        paddingLeft:
                            this.state.width > 700 ? 10 : 0,
                    }}
                >
                    What state do you live in?
                </span>
                <div
                    style={{
                        marginTop: 5,
                        color: "#333333",
                        paddingLeft:
                            this.state.width > 700 ? 39 : 0,
                        fontSize: 16,
                    }}
                >
                    So we can find servers closest to you.
                </div>
                <div
                    style={{
                        marginTop: 30,
                        paddingLeft:
                            this.state.width > 700 ? 39 : 0,
                    }}
                >
                    <Autocomplete
                        width={this.state.width}
                        height={this.state.height}
                        default={this.state.location}
                        options={all_american_states}
                    />
                    {all_american_states.includes(
                        this.props.vm_setup_data.location
                    ) ? (
                        <Button
                            onClick={this.nextStep}
                            style={{
                                background: "#111111",
                                border: "none",
                                padding: "10px 25px",
                                display: "inline",
                                position: "relative",
                                bottom: 2,
                                marginTop:
                                    this.state.width > 700 ? 0 : 15,
                                width:
                                    this.state.width > 500
                                        ? 150
                                        : "90%",
                            }}
                        >
                            Continue
                        </Button>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div
                    style={{
                        position: "fixed",
                        bottom: 25,
                        right: 40,
                        boxShadow:
                            "0px 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <div
                        onClick={() => this.props.dispatch(storeSetupStep(1))}
                        style={{
                            display: "inline",
                            borderRadius: "5px 0px 0px 5px",
                            backgroundColor: "#5ec3eb",
                            color: "white",
                            padding: "5px 10px",
                            borderRight: "solid 0.5px #0b172b",
                        }}
                    >
                        <FaAngleUp
                            className="typeform-up"
                            style={{
                                height: 20,
                                position: "relative",
                                bottom: 2,
                                color: "#0b172b",
                            }}
                        />
                    </div>
                    <Link to="/dashboard">
                        <div
                            style={{
                                display: "inline",
                                borderRadius: "0px 5px 5px 0px",
                                backgroundColor: "#5ec3eb",
                                color: "white",
                                padding: "5px 10px",
                            }}
                        >
                            <FaTimes
                                style={{
                                    height: 15,
                                    position: "relative",
                                    bottom: 2,
                                    color: "#0b172b",
                                }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        )
    }
}


export default connect()(StateSection);
