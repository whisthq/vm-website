import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";

import "static/PagePurchase.css";

import SurveyButton from "pages/PagePurchase/containers/surveyButton";

class WaitlistSection extends Component {
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

    render() {
        return (
            <div onKeyPress={this.nextStepKeyPress}>
                <SurveyButton currentStep={this.props.step} />
                <div className="survey-box">
                    <div style={{ fontSize: 26, marginBottom: 20 }}>
                        We'll be available in your area soon
                    </div>
                    <div>
                        Currently, Fractal is only available in the Eastern and
                        Midwestern United States due to the locations of our
                        servers. We are quickly expanding to West Coast and
                        beyond; if you'd like to be notified when Fractal is
                        available in your location, please join our wait list!
                    </div>
                    <HashLink to="/#beta" style={{ textDecoration: "none" }}>
                        <Button
                            style={{
                                display: "inline",
                                marginTop: 50,
                                padding:
                                    this.state.width > 700
                                        ? "12px 50px"
                                        : "12px 30px",
                                background: "#111111",
                                border: "none",
                                color: "white",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            Join Wait List
                        </Button>
                    </HashLink>
                </div>
                <div
                    style={{
                        display: "inline",
                        fontSize: 12,
                        marginTop: 40,
                        color: "#333333",
                        marginLeft: 25,
                        position: "relative",
                        top: 24,
                    }}
                ></div>
            </div>
        );
    }
}

export default connect()(WaitlistSection);
