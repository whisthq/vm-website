import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "static/Shared.css";
import "static/PageLanding.css";

import PriceBox from "pages/PageLanding/containers/priceBox";
import HardwareIconBox from "pages/PageLanding/containers/hardwareIconBox";

import CPU from "assets/icons/cpu.svg";
import GPU from "assets/icons/gpu.svg";
import RAM from "assets/icons/ram.svg";
import SSD from "assets/icons/hard-drive-icon.svg";

class PricingSection extends Component {
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
                    <div
                        style={{
                            textAlign:
                                this.state.width > 700 ? "center" : "left",
                        }}
                    >
                        <div
                            style={{
                                fontSize: this.state.width > 700 ? 30 : 25,
                                fontWeight: "bold",
                                color: "#111111",
                            }}
                        >
                            {!this.props.require_payment_oncreate ? (
                                <div>
                                    Try Fractal free for seven days.
                                    <br />
                                    Start your trial now, pick a plan later.
                                </div>
                            ) : (
                                <div>
                                    Try Fractal free for seven days.
                                    <br />
                                    Start your trial now.
                                </div>
                            )}
                        </div>
                        {!this.props.require_payment_oncreate && (
                            <div
                                style={{
                                    marginTop: 20,
                                    color: "#333333",
                                    fontSize: "calc(12px + 0.4vw)",
                                }}
                            >
                                No credit card required.
                            </div>
                        )}
                        <Link
                            to="/dashboard"
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                className="black-button"
                                style={{
                                    marginTop: 50,
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
                            md={3}
                            style={{
                                paddingLeft: 0,
                                paddingRight: this.state.width > 700 ? 20 : 0,
                            }}
                        >
                            <PriceBox
                                title="Hourly"
                                include_pricing
                                price="5"
                                description1="Ideal for non-daily use"
                                description2="Additional $0.70/hr usage"
                                description3="4K + 60FPS support"
                            />
                        </Col>
                        <Col
                            md={3}
                            style={{
                                paddingLeft: this.state.width > 700 ? 0 : 0,
                                paddingRight: this.state.width > 700 ? 10 : 0,
                            }}
                        >
                            <PriceBox
                                title="Monthly"
                                include_pricing
                                price="39"
                                description1="Ideal for daily use"
                                description2="6 hr/day + $0.50/extra hr"
                                description3="4K + 60FPS support"
                            />
                        </Col>
                        <Col
                            md={3}
                            style={{
                                paddingLeft: this.state.width > 700 ? 10 : 0,
                                paddingRight: this.state.width > 700 ? 0 : 0,
                            }}
                        >
                            <PriceBox
                                title="Unlimited"
                                include_pricing
                                price="99"
                                description1="Ideal for extended daily use or overnight rendering"
                                description2="Unlimited daily usage"
                                description3="4K + 60FPS support"
                            />
                        </Col>
                        <Col
                            md={3}
                            style={{
                                paddingLeft: this.state.width > 700 ? 20 : 0,
                                paddingRight: 0,
                            }}
                        >
                            <PriceBox
                                title="Enterprise"
                                background="#f4f2ff"
                                include_banner
                                banner={
                                    <div>
                                        <div>Pricing varies by team size</div>
                                        <a
                                            href="mailto: sales@fractalcomputers.com"
                                            style={{ outline: "none" }}
                                        >
                                            <Button
                                                style={{
                                                    marginTop: 10,
                                                    background: "#171d87",
                                                    border: "none",
                                                    paddingLeft: 20,
                                                    paddingRight: 20,
                                                    outline: "none",
                                                }}
                                            >
                                                Contact Us
                                            </Button>
                                        </a>
                                    </div>
                                }
                                description1="Ideal for teams of 3+"
                                description2="Cloud PC management dashboard"
                                description3="24/7 support"
                                description4="Built-in file sharing"
                            />
                        </Col>
                    </Row>
                    <Row
                        style={{ marginTop: this.state.width > 700 ? 50 : 30 }}
                    >
                        <Col xs={6} md={3}>
                            <HardwareIconBox
                                icon={CPU}
                                title="CPU"
                                full_description="Intel Xeon E5-2690"
                                short_description="Six Core Xeon"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox
                                icon={GPU}
                                title="GPU"
                                full_description="NVIDIA Tesla M60"
                                short_description="Tesla M60"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox
                                icon={RAM}
                                title="RAM"
                                full_description="56GB RAM"
                                short_description="56GB RAM"
                            />
                        </Col>
                        <Col xs={6} md={3}>
                            <HardwareIconBox
                                icon={SSD}
                                title="SSD"
                                full_description="120GB SSD"
                                short_description="120GB SSD"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        require_payment_oncreate: state.DashboardReducer
            .require_payment_oncreate
            ? state.DashboardReducer.require_payment_oncreate
            : true,
    };
}

export default connect(mapStateToProps)(PricingSection);
