import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HashLink } from "react-router-hash-link";
import {
    FaLinkedinIn,
    FaTwitter,
    FaFacebook,
    FaInstagram,
    FaMediumM,
} from "react-icons/fa";

import "static/Footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        return (
            <div>
                <div className="footer">
                    <div
                        style={{
                            width: "100%",
                            marginTop: 0,
                            marginBottom: 20,
                            background: "#EBEBEB",
                            height: 1,
                        }}
                    ></div>
                    <div className="fractal-container">
                        <Row
                            style={{
                                float: "left",
                                display: "inline",
                            }}
                        >
                            <Col xs={12} style={{ maxWidth: 350 }}>
                                <div className="title">Fractal</div>
                                <div className="text">
                                    Fractal uses the cloud to transform your
                                    laptop into a graphics workstation.
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        marginTop: 20,
                                        textAlign: "left",
                                    }}
                                >
                                    <a
                                        href="https://twitter.com/tryfractal"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <FaTwitter className="icon" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://medium.com/@fractal"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <FaMediumM className="icon" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/fractal"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <FaLinkedinIn className="icon" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/tryfractal"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <FaInstagram className="icon" />
                                        </div>
                                    </a>
                                    <a
                                        href="https://www.facebook.com/tryfractal"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <FaFacebook className="icon" />
                                        </div>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                        <Row
                            style={{
                                float:
                                    this.state.width > 700 ? "right" : "none",
                                width: this.state.width > 700 ? 650 : "100%",
                                paddingRight: this.state.width > 700 ? 0 : 15,
                                textAlign: "left",
                                paddingTop: this.state.width > 700 ? 0 : 40,
                            }}
                        >
                            <Col
                                sm={3}
                                style={{ paddingTop: 15, paddingBottom: 20 }}
                            >
                                <div className="section-name">PRODUCT</div>
                                {/* <HashLink
                                    to="/product#top"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div className="page-link">Technology</div>
                                </HashLink> */}
                                <HashLink
                                    to="/changelog#top"
                                    style={{ textDecoration: "none" }}
                                >
                                    <div className="page-link">Changelog</div>
                                </HashLink>
                            </Col>
                            <Col
                                sm={3}
                                style={{ paddingTop: 15, paddingBottom: 20 }}
                            >
                                <div className="section-name">COMPANY</div>
                                <div style={{ fontSize: 13 }}>
                                    <HashLink
                                        to="/about#top"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="page-link">About</div>
                                    </HashLink>
                                </div>
                                <div style={{ fontSize: 13 }}>
                                    <HashLink
                                        to="/about#careers"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <div className="page-link">Careers</div>
                                    </HashLink>
                                </div>
                            </Col>
                            <Col
                                sm={3}
                                style={{ paddingTop: 15, paddingBottom: 20 }}
                            >
                                <div className="section-name">RESOURCES</div>
                                <div style={{ fontSize: 13 }}>
                                    <div>
                                        <a
                                            href="https://medium.com/@fractal"
                                            className="page-link"
                                        >
                                            Blog
                                        </a>
                                    </div>
                                </div>
                                <div style={{ fontSize: 13 }}>
                                    <div>
                                        <a
                                            href="https://discord.gg/eG88g6k"
                                            className="page-link"
                                        >
                                            Discord
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Col
                                sm={3}
                                style={{ paddingTop: 15, paddingBottom: 20 }}
                            >
                                <div className="section-name">CONTACT</div>
                                <div>
                                    <a
                                        href="mailto: sales@fractalcomputers.com"
                                        className="page-link"
                                    >
                                        Sales
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="mailto: support@fractalcomputers.com"
                                        className="page-link"
                                    >
                                        Support
                                    </a>
                                </div>
                                <div>
                                    <a
                                        href="mailto: careers@fractalcomputers.com"
                                        className="page-link"
                                    >
                                        Careers
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 30, maxWidth: 1920 }}
                    >
                        <div
                            style={{
                                width: "100%",
                                marginTop: 50,
                                background: "#EBEBEB",
                                height: 1,
                            }}
                        ></div>
                        <div
                            style={{
                                fontSize: 13,
                                marginTop: 20,
                                width: "100%",
                            }}
                        >
                            <span
                                style={{
                                    margin: 0,
                                    color: "#555555",
                                    overflow: "hidden",
                                    float: "left",
                                    fontSize: this.state.width > 700 ? 14 : 12,
                                }}
                            >
                                Copyright &copy; Fractal Computers, Inc. All
                                Rights Reserved.
                            </span>
                            {this.state.width > 700 && (
                                <span
                                    style={{
                                        margin: 0,
                                        color: "#555555",
                                        overflow: "hidden",
                                        float: "right",
                                    }}
                                >
                                    <HashLink
                                        to="/termsofservice#top"
                                        style={{ color: "#555555" }}
                                    >
                                        Terms of Service
                                    </HashLink>{" "}
                                    &amp;{" "}
                                    <HashLink
                                        to="/privacy#top"
                                        style={{ color: "#555555" }}
                                    >
                                        Privacy Policy
                                    </HashLink>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
