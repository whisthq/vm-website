import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageFadeIn from "react-image-fade-in";

import "static/Shared.css";
import "static/PageProduct.css";

import FeatureBox from "pages/PageProduct/containers/featureBox";

import Click from "assets/large_graphics/click.svg";
import Devices from "assets/large_graphics/devices.svg";
import Timer from "assets/large_graphics/timer.svg";
import RGBIcon from "assets/icons/rgb-icon.svg";
import HardDriveIcon from "assets/icons/hard-drive-icon.svg";
import FileIcon from "assets/icons/file-icon.svg";

class MiddleSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            useCase: null,
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

    openForm = () => {
        this.typeformEmbed.typeform.open();
    };

    render() {
        return (
            <div>
                <div
                    style={{
                        background: "white",
                        paddingTop: 40,
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 40, marginTop: 40 }}
                    >
                        <Row className="featureRow">
                            <Col md={2}>
                                {" "}
                                <ImageFadeIn
                                    src={Click}
                                    style={{
                                        width: 80,
                                        display: "block",
                                        margin: "auto",
                                    }}
                                />
                            </Col>
                            <Col md={2}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        color: "#111111",
                                        fontSize: 24,
                                    }}
                                >
                                    Interactive, Realtime
                                </div>
                            </Col>
                            <Col md={8}>
                                <p style={{ paddingRight: 40 }}>
                                    Even with a mid-tier internet connection,
                                    our hardware-backed streaming technology
                                    allows you to achieve latency of less than 9
                                    ms. That means everything you see or do on
                                    your cloud PC is synced in realtime—you can
                                    even work on the same computer at the same
                                    time as someone else.
                                </p>
                            </Col>
                        </Row>
                        <Row className="featureRow">
                            <Col md={8}>
                                <p style={{ paddingLeft: 40 }}>
                                    Fractal’s streaming technology allows
                                    streaming of audio, video, and input between
                                    two devices of any type, including virtual
                                    machines, mobile devices, regular computers
                                    or containers. This means that you can use
                                    powerful, highly specialized software on
                                    your phone or tablet.
                                </p>
                            </Col>
                            <Col md={2}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        color: "#111111",
                                        fontSize: 24,
                                    }}
                                >
                                    Multiplatform
                                </div>
                            </Col>
                            <Col md={2}>
                                {" "}
                                <ImageFadeIn
                                    src={Devices}
                                    style={{
                                        width: 80,
                                        display: "block",
                                        margin: "auto",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="featureRow">
                            <Col md={2}>
                                {" "}
                                <ImageFadeIn
                                    src={Timer}
                                    style={{
                                        width: 80,
                                        display: "block",
                                        margin: "auto",
                                    }}
                                />
                            </Col>
                            <Col md={2}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        color: "#111111",
                                        fontSize: 24,
                                    }}
                                >
                                    Easy to use
                                </div>
                            </Col>
                            <Col md={8}>
                                <p style={{ paddingRight: 40 }}>
                                    Our integrated application stack means that
                                    you can go from signing up for an account to
                                    downloading the Fractal application to
                                    launching your cloud PC in a matter of
                                    minutes.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        background: "white",
                        paddingTop: 40,
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 40 }}
                    >
                        <Row style={{ margin: "auto" }}>
                            <Col
                                md={4}
                                style={{
                                    paddingLeft: 0,
                                    paddingRight:
                                        this.state.width > 700 ? 20 : 0,
                                }}
                            >
                                <div className="gradient-box">
                                    <ImageFadeIn
                                        src={RGBIcon}
                                        style={{ height: 50 }}
                                    />
                                    <div className="title">Color Accuracy</div>
                                    <p className="text">
                                        Achieve visually lossless frames with
                                        our color-accurate streaming technology.
                                    </p>
                                </div>
                            </Col>
                            <Col
                                md={4}
                                style={{
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                    paddingRight:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                <div className="gradient-box">
                                    <ImageFadeIn
                                        src={HardDriveIcon}
                                        style={{ height: 50 }}
                                    />
                                    <div className="title">
                                        Hard Drive Upload
                                    </div>
                                    <p className="text">
                                        Clone your entire hard drive to your
                                        cloud PC at the click of a button.
                                    </p>
                                </div>
                            </Col>
                            <Col
                                md={4}
                                style={{
                                    paddingLeft:
                                        this.state.width > 700 ? 20 : 0,
                                    paddingRight: 0,
                                }}
                            >
                                <div className="gradient-box">
                                    <ImageFadeIn
                                        src={FileIcon}
                                        style={{ height: 45 }}
                                    />
                                    <div className="title">4K Resolution</div>
                                    <p className="text">
                                        Experience crisp, native images with
                                        support for up to 4K resolution.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default MiddleSection;
