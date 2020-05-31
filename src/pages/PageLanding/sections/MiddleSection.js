import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ImageFadeIn from "react-image-fade-in";

import "static/Shared.css";
import "static/PageLanding.css";

import CloudPCBox from "pages/PageLanding/containers/cloudPCBox";
import PriceBox from "pages/PageLanding/containers/priceBox";
import SetupBox from "pages/PageLanding/containers/setupBox";

import Software from "assets/software.svg";
import Gaming from "assets/gaming.svg";
import Creative from "assets/creative.svg";
import Art from "assets/art.svg";
import Process from "assets/process.svg";
import RGBIcon from "assets/rgb-icon.svg";
import CPU from "assets/cpu.svg";
import GPU from "assets/gpu.svg";
import RAM from "assets/ram.svg";
import SSD from "assets/hard-drive-icon.svg";
import HardDriveIcon from "assets/hard-drive-icon.svg";
import FileIcon from "assets/file-icon.svg";


class MiddleSection extends Component {
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

    openForm = () => {
        this.typeformEmbed.typeform.open();
    };
    
    render() {
        return (
            <div>
                <div
                    style={{ background: "white", backgroundSize: "100% auto" }}
                >
                    <div className="fractal-container">
                        <Row style = {{
                            marginBottom: this.state.width > 700 ? 30 : 50
                        }}>
                            <Col
                                md={6}
                                xs={{ order: 1 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop: "10%",
                                    paddingBottom: "10%",
                                }}
                            >
                                 <CloudPCBox/>
                            </Col>
                            <Col
                                md={{ span: 6, order: 2 }}
                                xs={{ order: 1, span: 12 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop: this.state.width > 700 ? "10%" : 20,
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: "#111111",
                                        textAlign: "left",
                                        fontSize: this.state.width > 700 ? "calc(30px + 1.1vw)" : 30,
                                        marginLeft: this.state.width > 700 ? 50 : 0
                                    }}
                                >
                                    Graphics power on
                                    <br /> any device
                                </div>
                                <p
                                    style={{
                                        textAlign: "left",
                                        marginTop: 20,
                                        fontSize: this.state.width > 700 ? "calc(14px + 0.4vw)": 14,
                                        maxWidth: 700,
                                        marginLeft: this.state.width > 700 ? 50 : 0,
                                        lineHeight: this.state.width > 700 ? 1.5 : 1.7
                                    }}
                                >
                                    Edit, render, and play at insane speeds
                                    from any Windows, Apple, or Linux
                                    computer with cloud GPU, RAM, and CPUs.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className = "gradient-background">
                    <div
                        className="fractal-container"
                        style={{ paddingTop: 40 }}
                    >
                        <Row>
                            <Col md={4} xs = {12} className = "col">
                                <div className = "section" style = {{background: "#F2DEF8"}}>
                                    <ImageFadeIn
                                        src={Software}
                                        style = {{width: "100%", height: "100%"}}
                                    />
                                </div>
                                <div className = "subtext">
                                    Productivity
                                </div>
                            </Col>
                            <Col md={4} xs = {12} className = "col">
                                <div className = "section" style = {{background: "#D7EAF5"}}>
                                    <ImageFadeIn
                                        src={Gaming}
                                        style={{width: "100%", height: "100%"}}
                                    />
                                </div>
                                <div className = "subtext">
                                    Gaming
                                </div>
                            </Col>
                            <Col md={4} xs = {12} className = "col">
                                <div className = "section" style = {{background: "#D7F5F5"}}>
                                    <ImageFadeIn
                                        src={Creative}
                                        style={{
                                            height: "100%",
                                            float: "right"
                                        }}
                                    />
                                </div>
                                <div className = "subtext">
                                    Graphics
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                    <div
                        style={{
                            background: "white",
                            backgroundSize: "100% auto",
                            paddingTop: this.state.width > 700 ? 75 : 0,
                        }}
                    >
                        <div className="fractal-container">
                            <Row style={{ 
                                marginBottom: 10, 
                                paddingTop: 30, 
                                paddingBottom: this.state.width > 700 ? 100 : 50
                            }}>
                                <Col
                                    md={4}
                                    xs={{ order: 3, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingLeft: this.state.width > 700 ? 20 : 15,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            minHeight: 250,
                                            background: "white",
                                            marginTop: this.state.width > 700 ? 0 : 30
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Process}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                            }}
                                        >
                                            Sub-9ms Software Latency
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: this.state.width > 700 ? 18 : 14,
                                            }}
                                        >
                                            Achieve an immersive, native desktop
                                            experience.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={4}
                                    xs={{ order: 2, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingLeft: this.state.width > 700 ? 20 : 15,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            minHeight: 250,
                                            background: "white",
                                            marginTop: this.state.width > 700 ? 0 : 40
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Art}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                            }}
                                        >
                                            60+ Frames per Second
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: this.state.width > 700 ? 18 : 14,
                                            }}
                                        >
                                            Scrub through videos or play games
                                            effortlessly.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={{ span: 4, order: 1 }}
                                    xs={{ order: 1, span: 12 }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            color: "#111111",
                                            textAlign: "left",
                                            fontSize: this.state.width > 700 ? "calc(35px + 1.0vw)" : 35,
                                        }}
                                    >
                                        Fractal cloud computers are{" "}
                                        <span className="blue-gradient">
                                            fast
                                        </span>
                                    </div>
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
                        <div
                            style={{
                                fontWeight: "bold",
                                fontSize: this.state.width > 700 ? "calc(30px + 1.1vw)" : 30,
                                color: "#111111",
                                textAlign: this.state.width > 700 ? "center" : "left",
                                marginBottom: 20,
                            }}
                        >
                            Access your desktop anywhere
                        </div>
                        <div style={{ margin: "auto" }}>
                            <p
                                style={{
                                    fontSize: this.state.width > 700 ? "calc(14px + 0.4vw)" : 14,
                                    lineHeight: this.state.width > 700 ? 1.5 : 1.7,
                                    textAlign: this.state.width > 700 ? "center" : "left",
                                    maxWidth: 750,
                                    margin: "auto",
                                    marginTop: 20,
                                    marginBottom: this.state.width > 700 ? 75 : 40,
                                }}
                            >
                                Need to work in more than one location?
                                Forgot to upload a file to the cloud, or to
                                commit a change? Your Fractal cloud PC is
                                accessible from any Internet-connected
                                device.
                            </p>
                        </div>
                        <Row style={{ margin: "auto" }}>
                            <Col
                                md={4}
                                style={{ 
                                    paddingLeft: 0, 
                                    paddingRight: this.state.width > 700 ? 20 : 0
                                }}
                            >
                                <div className = "gradient-box">
                                    <ImageFadeIn
                                        src={RGBIcon}
                                        style={{ height: 50 }}
                                    />
                                    <div className = "title">
                                        Color Accuracy
                                    </div>
                                    <p className = "text">
                                        Achieve visually lossless frames
                                        with our color-accurate streaming
                                        technology.
                                    </p>
                                </div>
                            </Col>
                            <Col md={4} style={{ 
                                    paddingLeft: this.state.width > 700 ? 10 : 0, 
                                    paddingRight: this.state.width > 700 ? 10 : 0
                                }}>
                                <div className = "gradient-box">
                                    <ImageFadeIn
                                        src={HardDriveIcon}
                                        style={{ height: 50 }}
                                    />
                                    <div className = "title">
                                        Hard Drive Upload
                                    </div>
                                    <p className = "text">
                                        Clone your entire hard drive to your
                                        cloud PC at the click of a button.
                                    </p>
                                </div>
                            </Col>
                            <Col md={4} style={{ 
                                    paddingLeft: this.state.width > 700 ? 20 : 0, 
                                    paddingRight: 0
                                }}>
                                <div className = "gradient-box">
                                    <ImageFadeIn
                                        src={FileIcon}
                                        style={{ height: 45 }}
                                    />
                                    <div className = "title">
                                        4K Resolution
                                    </div>
                                    <p className = "text">
                                        Experience crisp, native images with
                                        support for up to 4K resolution.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={{ backgroundColor: "white" }}>
                    <div
                        className="fractal-container"
                        style={{ marginTop: this.state.width > 700 ? 100 : 0 }}
                    >
                        <Row>
                            <Col
                                md={6}
                                xs={{ order: 2 }}
                                style={{
                                    textAlign: "left",
                                    paddingBottom: 100,
                                    marginLeft: 0,
                                    marginBottom: 25,
                                    marginTop: this.state.width > 700 ? 0 : 40
                                }}
                            >
                                <SetupBox/>
                            </Col>
                            <Col
                                md={{ span: 6, order: 2 }}
                                xs={{ order: 1, span: 12 }}
                                style={{ paddingLeft: this.state.width > 700 ? 50 : 15 }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: this.state.width ? "calc(30px + 1.1vw)" : 35,
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
                                        fontSize: this.state.width > 700 ? "calc(14px + 0.4vw)" : 14,
                                        lineHeight: this.state.width > 700 ? 1.5 : 1.7
                                    }}
                                >
                                    Sign up, choose a cloud PC, and download
                                    the Fractal desktop app. Your first week
                                    is free, no credit card required.
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
