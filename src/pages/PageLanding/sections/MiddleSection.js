import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageFadeIn from "react-image-fade-in";
import { HashLink } from "react-router-hash-link";

import "static/Shared.css";
import "static/PageLanding.css";

import CloudPCBox from "pages/PageLanding/containers/cloudPCBox";
import SetupBox from "pages/PageLanding/containers/setupBox";
import UseCaseBox from "pages/PageLanding/containers/useCaseBox";

import Software from "assets/large_graphics/software.svg";
import Gaming from "assets/large_graphics/gaming.svg";
import Creative from "assets/large_graphics/creative.svg";

class MiddleSection extends Component {
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

    openForm = () => {
        this.typeformEmbed.typeform.open();
    };

    render() {
        return (
            <div>

                <div className="gradient-background" style={{ marginTop: 50 }}>
                    <div
                        className="fractal-container"
                        style={{ paddingTop: 40 }}
                    >
                        <Row>
                            <Col md={4} xs={12} className="col">
                                <HashLink
                                    to="/#Productivity"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        className="section"
                                        style={{ background: "#F2DEF8" }}
                                    >
                                        <ImageFadeIn
                                            src={Software}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="subtext">Productivity</div>
                                </HashLink>
                            </Col>

                            <Col md={4} xs={12} className="col">
                                <HashLink
                                    to="/#Gaming"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        className="section"
                                        style={{ background: "#D7EAF5" }}
                                    >
                                        <ImageFadeIn
                                            src={Gaming}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        />
                                    </div>
                                    <div className="subtext">Gaming</div>
                                </HashLink>
                            </Col>
                            <Col md={4} xs={12} className="col">
                                <HashLink
                                    to="/#Graphics"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        className="section"
                                        style={{ background: "#D7F5F5" }}
                                    >
                                        <ImageFadeIn
                                            src={Creative}
                                            style={{
                                                height: "100%",
                                                float: "right",
                                            }}
                                        />
                                    </div>
                                    <div className="subtext">Graphics</div>
                                </HashLink>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div
                    style={{ background: "white", backgroundSize: "100% auto" }}
                >
                    <div className="fractal-container">
                        <Row
                            style={{
                                marginBottom: this.state.width > 700 ? 30 : 50,
                            }}
                        >
                            <Col
                                md={6}
                                xs={{ order: 1 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop: "10%",
                                    paddingBottom: "10%",
                                }}
                            >
                                <CloudPCBox />
                            </Col>
                            <Col
                                md={{ span: 6, order: 2 }}
                                xs={{ order: 1, span: 12 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop:
                                        this.state.width > 700 ? "10%" : 20,
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: "#111111",
                                        textAlign: "left",
                                        fontSize:
                                            this.state.width > 700
                                                ? "calc(30px + 1.1vw)"
                                                : 30,
                                        marginLeft:
                                            this.state.width > 700 ? 50 : 0,
                                    }}
                                >
                                    Graphics power on
                                    <br /> any device
                                </div>
                                <p
                                    style={{
                                        textAlign: "left",
                                        marginTop: 20,
                                        fontSize:
                                            this.state.width > 700
                                                ? "calc(14px + 0.4vw)"
                                                : 14,
                                        maxWidth: 700,
                                        marginLeft:
                                            this.state.width > 700 ? 50 : 0,
                                        lineHeight:
                                            this.state.width > 700 ? 1.5 : 1.7,
                                    }}
                                >
                                    Edit, render, and play at insane speeds from
                                    any Windows, Apple, or Linux computer with
                                    cloud GPU, RAM, and CPUs.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="fractal-container">
                    <div style={{
                        position: "absolute",
                        zIndex: 0,
                        height: "70vh",
                        width: "70vw",
                        right: 0,
                        background: "rgba(60, 119, 214, 0.08)"
                    }}>
                    </div>
                    <div style={{ paddingTop: 35 }}>
                        <UseCaseBox case={"Productivity"} width={this.state.width} />
                    </div>
                </div>
                <div className="fractal-container" style={{ marginTop: this.state.width > 700 ? 35 : 0 }}>
                    <div style={{ paddingTop: this.state.width > 700 ? 80 : 40 }}>
                        <UseCaseBox case={"Graphics"} reverse width={this.state.width} />
                    </div>
                </div>
                <div className="fractal-container" style={{ marginTop: this.state.width > 700 ? 70 : 35 }}>
                    <div style={{
                        position: "absolute",
                        zIndex: 0,
                        height: "70vh",
                        width: "70vw",
                        right: 0,
                        background: "rgba(60, 119, 214, 0.08)"
                    }}>
                    </div>
                    <div style={{ paddingTop: 35 }}>
                        <UseCaseBox case={"Gaming"} width={this.state.width} />
                    </div>
                </div>
                <div style={{ backgroundColor: "white" }}>
                    <div
                        className="fractal-container"
                        style={{ marginTop: this.state.width > 700 ? 100 : 25 }}
                    >
                        <Row>
                            <Col
                                md={6}
                                xs={{ order: 1 }}
                                style={{
                                    textAlign: "left",
                                    paddingBottom: this.state.width > 700 ? 100 : 35,
                                    marginLeft: 0,
                                    marginBottom: 25,
                                    marginTop: this.state.width > 700 ? 0 : 40,
                                }}
                            >
                                <SetupBox />
                            </Col>
                            <Col
                                md={{ span: 6, order: 2 }}
                                xs={{ order: 2, span: 12 }}
                                style={{
                                    paddingLeft:
                                        this.state.width > 700 ? 50 : 15,
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: this.state.width
                                            ? "calc(30px + 1.1vw)"
                                            : 35,
                                        color: "#111111",
                                        textAlign: "left",
                                    }}
                                >
                                    Setup in less than <br />
                                    one minute
                                </div>
                                <p
                                    style={{
                                        textAlign: "left",
                                        marginTop: 20,
                                        fontSize:
                                            this.state.width > 700
                                                ? "calc(14px + 0.4vw)"
                                                : 14,
                                        lineHeight:
                                            this.state.width > 700 ? 1.5 : 1.7,
                                        paddingBottom: this.state.width > 700 ? 0 : 35
                                    }}
                                >
                                    Sign up, choose a cloud PC, and download the
                                    Fractal desktop app. Your first week is
                                    free, no credit card required.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default MiddleSection;
