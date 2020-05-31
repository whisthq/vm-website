import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "static/PageLanding.css";


class CloudPCBox extends Component {
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
                    className = "cloud-pc-graphic"
                >
                <div
                    className = "header"
                >
                    My Cloud PC
                </div>
                    <div
                        className = "content"
                        style={{
                            fontSize: this.state.width > 700 ? "calc(12px + 0.4vw)" : 13,
                        }}
                    >
                        <Row>
                            <Col xs={6}>
                                {this.state.width > 700 ?
                                    "NVIDIA Tesla M60 GPU" :
                                    "Tesla M60 GPU"
                                }
                            </Col>
                            <Col
                                xs={6}
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                {this.state.width > 700 ?
                                    <div><strong>16 GB+</strong> DDR4 RAM</div> :
                                    <div><strong>16 GB+</strong> RAM</div> 
                                }
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col xs={6}>
                                <strong>6+</strong> CPU
                                cores
                            </Col>
                            <Col
                                xs={6}
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                <strong>512 GB</strong> SSD
                            </Col>
                        </Row>
                        <Link to="/dashboard">
                            <Button
                                className = "button"
                                style={{
                                    marginTop: this.state.width > 700 ? 50 : 30,
                                    fontSize: this.state.width > 700 ? 16 : 14
                                }}
                            >
                                LAUNCH
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


export default CloudPCBox;
