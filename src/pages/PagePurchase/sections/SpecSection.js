import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaArrowRight } from "react-icons/fa";

import "static/PagePurchase.css";

import SpecBox from "pages/PagePurchase/containers/specBox";
import { 
    storeSetupStep,
    storeComputerSpec 
} from "store/actions/dashboard/vm_setup_actions";

import SurveyButton from "pages/PagePurchase/containers/surveyButton"


class SpecSection extends Component {
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
        if(this.state.spec !== "") {
            if(this.state.spec === "Medium") {
                this.props.dispatch(storeComputerSpec("Medium"));
                this.props.dispatch(storeSetupStep(4));
            }
        }
    }

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
                        3{" "}
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
                    Choose Your Cloud Computer
                </span>
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
                    Select the specs that best suit your needs. You
                    can always upgrade or downgrade later.
                </div>
                <Row
                    style={{
                        marginTop: 50,
                        paddingLeft:
                            this.state.width > 700 ? 39 : 0,
                        maxWidth: 800,
                    }}
                >
                    <Col
                        md={6}
                        className="pointerOnHover"
                        style={{
                            marginBottom:
                                this.state.width > 700 ? 0 : 20,
                            paddingRight:
                                this.state.width > 700 ? 0 : 40,
                        }}
                        onClick={() =>
                            this.setState({ spec: "Medium" })
                        }
                    >
                        <SpecBox
                            name="Medium"
                            cpu="6"
                            gpu="1/2"
                            ram="56"
                            description="For 3D modeling, medium rendering, gaming."
                            pricing="Start with free trial"
                            color={
                                this.state.spec === "Medium"
                                    ? "rgba(94, 195, 235, 0.1)"
                                    : "white"
                            }
                            checked={
                                this.state.spec === "Medium"
                            }
                        />
                    </Col>
                    <Col
                        md={6}
                        style={{
                            marginBottom:
                                this.state.width > 700 ? 0 : 20,
                            paddingRight:
                                this.state.width > 700 ? 0 : 40,
                        }}
                    >
                        <SpecBox
                            name="Heavy"
                            cpu="12"
                            gpu="1"
                            ram="112"
                            description={
                                <div
                                    style={{
                                        background: "#111111",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: 5,
                                        width: 125,
                                        textAlign: "center",
                                        fontSize: 14,
                                    }}
                                >
                                    Coming Soon
                                </div>
                            }
                            pricing="$5/mo + $1.30/hr"
                            color={
                                this.state.spec === "Heavy"
                                    ? "rgba(94, 195, 235, 0.1)"
                                    : "white"
                            }
                            checked={
                                this.state.spec === "Heavy"
                            }
                        />
                    </Col>
                </Row>
                {this.state.spec !== "" ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 310,
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
                            display: "flex",
                            justifyContent: "space-between",
                            width: 375,
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
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                )}
            </div>
        )
    }
}


export default connect()(SpecSection);
