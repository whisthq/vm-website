import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight, FaAngleUp, FaTimes } from "react-icons/fa";

import "static/PagePurchase.css";

import {
    storeSetupStep,
    storeCountry
} from "store/actions/dashboard/vm_setup_actions"

import TypeformButton from "components/typeformbutton.js";

class CountrySection extends Component {
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
        if (event.key === "Enter" && this.state.country !== "") {
            this.props.dispatch(storeCountry(this.state.country))

            if (this.state.country === "United States") {
                this.props.dispatch(storeSetupStep(2))
            } else if (this.state.country === "Non-US") {
                this.props.dispatch(storeSetupStep(2.1))
            }
        }
    }

    nextStep = () => {
        if (this.state.country !== "") {
            this.props.dispatch(storeCountry(this.state.country))

            if (this.state.country === "United States") {
                this.props.dispatch(storeSetupStep(2))
            } else if (this.state.country === "Non-US") {
                this.props.dispatch(storeSetupStep(2.1))
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
                        1{" "}
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
                    Do you live in the United States?
                </span>
                <div
                    style={{
                        marginTop: 5,
                        color: "#333333",
                        paddingLeft: this.state.width > 700 ? 39 : 0,
                        fontSize: 16,
                    }}
                >
                    Currently, Fractal only has servers in certain
                    geographic locations.
                </div>
                <div
                    style={{
                        outline: "none",
                        marginTop: 20,
                        display:
                            this.state.width > 700
                                ? "flex"
                                : "block",
                        justifyContent: "space-between",
                        width: 480,
                        paddingLeft:
                            this.state.width > 700 ? 39 : 0,
                    }}
                >
                    <div
                        onClick={() => this.setState({country: "United States"})}
                        style={{
                            maxWidth: 150,
                            marginBottom: 5,
                        }}
                    >
                        <TypeformButton
                            buttonLabel="Y"
                            buttonText="Yes"
                            checked={this.state.country==="United States"}
                        />
                    </div>
                    <div
                        onClick={() => this.setState({country: "Non-US"})}
                        style={{ maxWidth: 150 }}
                    >
                        <TypeformButton
                            buttonLabel="N"
                            buttonText="No"
                            checked={this.state.country==="Non-US"}
                        />
                    </div>
                    <Button
                        disabled={this.state.country === ""}
                        onClick={this.nextStep}
                        style={{
                            background: "#111111",
                            border: "none",
                            width: 140,
                            height: 42,
                            fontSize: 14,
                            marginTop:
                                this.state.width > 700
                                    ? 10
                                    : 15,
                        }}
                    >
                        Continue
                    </Button>
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 25,
                        right: 40,
                        boxShadow:
                            "0px 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Link to="/dashboard">
                        <div
                            className="typeform-up"
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
                                style={{
                                    height: 20,
                                    position: "relative",
                                    bottom: 2,
                                    color: "#0b172b",
                                }}
                            />
                        </div>
                    </Link>
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


export default connect()(CountrySection);
