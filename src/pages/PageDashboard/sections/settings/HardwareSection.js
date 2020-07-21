import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaSpaceShuttle } from "react-icons/fa";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";
import "static/PageSettings.css";

class HardwareSection extends Component {
    render() {
        return (
            <div style={{ width: "100%" }} className="hardware">
                <div className="hardwareBox">
                    <Row
                        style={{
                            width: "100%",
                            margin: 0,
                        }}
                    >
                        <Col
                            xs={12}
                            style={{
                                padding: "0px 20px",
                                marginBottom: 15,
                                textAlign: "center",
                            }}
                        >
                            <FaSpaceShuttle
                                style={{
                                    color: "#444444",
                                    fontSize: 40,
                                    marginTop: 10,
                                }}
                            />
                            <div
                                style={{
                                    color: "#111111",
                                    fontSize: 16,
                                    margin: "auto",
                                    marginTop: 30,
                                    maxWidth: 250,
                                }}
                            >
                                CPU, GPU, and RAM upgradeability coming soon
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default HardwareSection;
