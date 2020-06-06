import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaAngleUp, FaTimes } from "react-icons/fa";

import "static/PagePurchase.css";


class WaitlistSection extends Component {
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

    render() {
        return (
            <div className = "right-section-wrapper" onKeyPress={this.nextStepKeyPress}>
                <div className = "survey-box">
                    <div style={{ fontSize: 26, marginBottom: 20 }}>
                        We'll be available in your area soon
                    </div>
                    <div>
                        Currently, Fractal is only available in the
                        Eastern and Midwestern United States due to the
                        locations of our servers. We are quickly
                        expanding to West Coast and beyond; if you'd
                        like to be notified when Fractal is available in
                        your location, please join our wait list!
                    </div>
                    <HashLink
                        to="/#beta"
                        style={{ textDecoration: "none" }}
                    >
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
                                boxShadow:
                                    "0px 4px 20px rgba(0, 0, 0, 0.1)",
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
                <div
                    style={{
                        position: "absolute",
                        bottom: 25,
                        right: 40,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <div
                        onClick={this.goBack}
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
        )
    }
}


export default connect()(WaitlistSection);
