import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ImageFadeIn from "react-image-fade-in";

import "static/Shared.css";
import "static/PageLanding.css";

import Cloud from "assets/large_graphics/cloud-computing.svg";


class TopSection extends Component {
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
            <div>
                <div style={{ paddingTop: 50 }}>
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 25 }}
                    >
                        <Row>
                            <Col
                                md={{ span: 5, order: 1 }}
                                xs={{ order: 2, span: 12 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop: 25,
                                }}
                            >
                                <div
                                    className = "title-text"
                                    style = {{
                                        fontSize: this.state.width > 700 ? "calc(28px + 2.0vw)" : 35,
                                        lineHeight: this.state.width > 700 ? 1.3 : 1.4
                                    }}
                                >
                                    Transform your laptop into a{" "}
                                    <span className="blue-gradient">
                                        supercomputer
                                    </span>
                                </div>
                                <p
                                    className = "title-subtext"
                                >
                                    Fractal brings the power of a
                                    workstation to any Internet-connected
                                    device.
                                </p>
                                <Link to="/dashboard">
                                    <Button
                                        className = "black-button"
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            marginRight: 20,
                                            marginTop: 10,
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
                            </Col>
                            <Col
                                md={{ span: 7, order: 2 }}
                                xs={{ order: 1, span: 12 }}
                                style={{ textAlign: "right" }}
                            >
                                <ImageFadeIn
                                    src={Cloud}
                                    style={{
                                        width: this.state.width > 700 ? "90%" : "100%",
                                        paddingTop: this.state.width > 700 ? 25 : 0,
                                        position: "relative",
                                        maxWidth: 1200
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopSection;
