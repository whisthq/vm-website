import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaSpaceShuttle } from "react-icons/fa";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

class HardwareSection extends Component {
    render() {
        return (
            <div
                style={{
                    fontSize: 14,
                    background:
                        "linear-gradient(130.61deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                    borderRadius: 7,
                    padding: "40px 15px",
                    marginTop: 35,
                    minHeight: 245,
                    border: "solid 10px white",
                }}
            >
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
        );
    }
}

export default HardwareSection;
