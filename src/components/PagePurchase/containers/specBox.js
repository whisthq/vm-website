import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../../static/App.css";

class SpecBox extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, modalShow: false };
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
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        return (
            <div
                style={{
                    background: `${this.props.color}`,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                    borderRadius: 5,
                    minHeight: 300,
                }}
            >
                <div
                    style={{
                        padding: "40px 40px 0px 40px",
                        color: "#111111",
                        borderRadius: "5px 5px 0px 0px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                color: "#111111",
                                fontSize: 26,
                                fontWeight: "bold",
                                float: "left",
                            }}
                        >
                            {this.props.name}
                        </div>
                        {this.props.checked ? (
                            <div
                                style={{
                                    float: "right",
                                    width: 15,
                                    height: 15,
                                    borderRadius: 8,
                                    border: "solid 0.5px #111111",
                                    background: "#27a7d6",
                                    position: "relative",
                                    top: 13,
                                }}
                            ></div>
                        ) : (
                            <div
                                style={{
                                    float: "right",
                                    width: 15,
                                    height: 15,
                                    borderRadius: 8,
                                    border: "solid 0.5px #111111",
                                    background: "none",
                                    position: "relative",
                                    top: 13,
                                }}
                            ></div>
                        )}
                    </div>
                    <div style={{ fontSize: 12, color: "#555555" }}>
                        {this.props.pricing}
                    </div>
                    <div
                        style={{ color: "#111111", marginTop: 20, height: 50 }}
                    >
                        {this.props.description}
                    </div>
                </div>
                <Row style={{ color: "#333333", padding: 40, fontSize: 12 }}>
                    <Col style={{ marginBottom: 10 }} md={5}>
                        {this.props.cpu} CPU Cores
                    </Col>
                    <Col style={{ marginBottom: 10 }} md={7}>
                        {this.props.gpu} NVIDIA Tesla M60
                    </Col>
                    <Col style={{ marginBottom: 10 }} md={5}>
                        {this.props.ram}GB RAM
                    </Col>
                    <Col style={{ marginBottom: 10 }} md={7}>
                        Starts at 120GB SSD
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SpecBox;
