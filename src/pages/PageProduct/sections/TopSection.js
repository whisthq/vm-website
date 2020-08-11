import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ImageFadeIn from "react-image-fade-in";

import "static/Shared.css";
//import "static/PageLanding.css";

import Tech from "assets/large_graphics/technology.png";

class TopSection extends Component {
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
            <div>
                <div>
                    <div className="fractal-container" style={{ padding: 0 }}>
                        <Row
                            style={{
                                backgroundImage: `url(${Tech})`,
                                backgroundPosition: "left bottom",
                                backgroundSize:
                                    this.state.width > 700
                                        ? "contain"
                                        : "cover",
                                backgroundRepeat: "no-repeat",
                                height: `calc(100vh - 68px)`,
                            }}
                        >
                            <Col
                                md={{ span: 7, order: 1 }}
                                xs={{ order: 2, span: 12 }}
                            />
                            <Col
                                md={{ span: 5, order: 2 }}
                                xs={{ order: 1, span: 12 }}
                                style={{
                                    textAlign: "left",
                                    padding: this.state.width < 700 && "0 40px",
                                }}
                            >
                                <div
                                    className="title-text"
                                    style={{
                                        fontSize: 48,
                                        lineHeight:
                                            this.state.width > 700 ? 1.3 : 1.4,
                                        marginTop: 200,
                                    }}
                                >
                                    Cloud computing as you've never{" "}
                                    <span className="blue-gradient">seen</span>{" "}
                                    it before
                                </div>
                                <p
                                    className="title-subtext"
                                    style={{ paddingRight: 40 }}
                                >
                                    Fractal’s proprietary low-latency streaming
                                    technology is the easiest, most responsive
                                    way to access a supercomputer on any device.
                                </p>
                                <Link to="/dashboard">
                                    <Button
                                        className="black-button"
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            marginRight: 20,
                                            marginTop: 10,
                                        }}
                                    >
                                        TRY IT NOW
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopSection;
