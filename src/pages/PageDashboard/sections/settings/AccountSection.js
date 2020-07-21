import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFighterJet } from "react-icons/fa";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

class AccountSection extends Component {
    render() {
        return (
            <div style={{ width: "100%" }}>
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
                        marginBottom: 40,
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
                            <FaFighterJet
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
                                More account configurability coming soon
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AccountSection;
