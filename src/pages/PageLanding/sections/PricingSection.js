import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "static/Shared.css";
import "static/PageLanding.css";

import PriceBox from "pages/PageLanding/containers/priceBox";
import HardwareIconBox from "pages/PageLanding/containers/hardwareIconBox";

import CPU from "assets/cpu.svg";
import GPU from "assets/gpu.svg";
import RAM from "assets/ram.svg";
import SSD from "assets/hard-drive-icon.svg";


class PricingSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
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
            <div
                style={{
                    width: "100vw",
                    minHeight: 390,
                    backgroundColor: "#F9F9F9",
                }}
            >
                <div
                    className="fractal-container"
                    style={{
                        paddingTop: 75,
                        paddingBottom: 75,
                        textAlign: "center",
                    }}
                >
                    <div style={{ textAlign: this.state.width > 700 ? "center" : "left" }}>
                        <div
                            style={{
                                fontSize: this.state.width > 700 ? 30 : 25,
                                fontWeight: "bold",
                                color: "#111111",
                            }}
                        >
                            Try Fractal free for seven days.
                            <br />
                            Start your trial now, pick a plan later.
                        </div>
                        <div
                            style={{
                                marginTop: 20,
                                color: "#333333",
                                fontSize: "calc(12px + 0.4vw)",
                            }}
                        >
                            No credit card required.
                        </div>
                        <Link to="/dashboard" style = {{textDecoration: "none"}}>
                            <Button
                                className = "black-button"
                                style={{
                                    marginTop: 50
                                }}
                            >
                                GET STARTED{" "}
                                <span
                                    style={{
                                        color: "#D6D6D6",
                                        fontWeight: "normal",
                                    }}
                                >
                                    {" "}
                                    — it's free
                                </span>
                            </Button>
                        </Link>
                    </div>
                    <Row style={{ margin: "auto", marginTop: 75 }}>
                        <Col
                            md={4}
                            style={{ 
                                paddingLeft: 0, 
                                paddingRight: this.state.width > 700 ? 20 : 0 }}
                        >
                            <PriceBox 
                                title = "Hourly"
                                price = "5"
                                description = "+$0.70 per hour usage"
                            />
                        </Col>
                        <Col
                            md={4}
                            style={{ 
                                paddingLeft: this.state.width > 700 ? 10 : 0, 
                                paddingRight: this.state.width > 700 ? 10 : 0 }}
                        >
                            <PriceBox 
                                title = "Monthly"
                                price = "39"
                                description = "6 hr/day + $0.50 per extra hr"
                            />
                        </Col>
                        <Col
                            md={4}
                            style={{ 
                                paddingLeft: this.state.width > 700 ? 20 : 0, 
                                paddingRight: 0 }}
                        >
                            <PriceBox 
                                title = "Unlimited"
                                price = "99"
                                description = "Unlimited monthly usage"
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: this.state.width > 700 ? 50 : 30 }}>
                        <Col xs={6} md={3}>
                            <HardwareIconBox 
                                icon = {CPU}
                                title = "CPU"
                                full_description = "Intel Xeon E5-2690"
                                short_description = "Six Core Xeon"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox 
                                icon = {GPU}
                                title = "GPU"
                                full_description = "NVIDIA Tesla M60"
                                short_description = "Tesla M60"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox 
                                icon = {RAM}
                                title = "RAM"
                                full_description = "56GB RAM"
                                short_description = "56GB RAM"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox 
                                icon = {SSD}
                                title = "SSD"
                                full_description = "120GB SSD"
                                short_description = "120GB SSD"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PricingSection;
