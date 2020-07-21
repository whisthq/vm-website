import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

import SSD from "assets/icons/hard-drive-icon.svg";

class DisksSection extends Component {
    render() {
        if (this.props.disks && this.props.disks.length > 0) {
            return (
                <Row style={{ marginTop: 5 }}>
                    <Col xs={12}>
                        <Row
                            style={{
                                width: "100%",
                            }}
                        >
                            {this.props.disks.map((value, index) => {
                                return (
                                    <Col
                                        sm={6}
                                        lg={4}
                                        xl={3}
                                        style={{
                                            paddingRight:
                                                this.state.width > 900 ? 20 : 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 14,
                                                background:
                                                    "rgba(94, 195, 235, 0.06)",
                                                boxShadow:
                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                borderRadius: 7,
                                                padding: "40px 35px",
                                                marginTop: 35,
                                                minHeight: 210,
                                            }}
                                        >
                                            <img
                                                src={SSD}
                                                alt=""
                                                style={{
                                                    textAlign: "left",
                                                    marginTop: 5,
                                                    height: 45,
                                                }}
                                            />
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 18,
                                                    marginTop: 25,
                                                }}
                                            >
                                                Storage Disk {index.toString()}
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: 3,
                                                }}
                                            >
                                                {value["disk_size"].toString() +
                                                    "GB"}
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                            <Col
                                sm={6}
                                md={4}
                                xl={3}
                                className="pointerOnHover"
                                style={{
                                    paddingRight:
                                        this.state.width > 900 ? 20 : 0,
                                }}
                            >
                                <Link
                                    to="/storage"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 14,
                                            background: "#0B172B",
                                            boxShadow:
                                                "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                            borderRadius: 7,
                                            padding: "40px 35px",
                                            marginTop: 35,
                                            minHeight: 210,
                                            textAlign: "center",
                                            color: "white",
                                        }}
                                    >
                                        <FaPlus
                                            style={{
                                                fontSize: 25,
                                                marginTop: 20,
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 32,
                                                fontSize: 16,
                                            }}
                                        >
                                            Add More Storage
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        } else {
            return (
                <Link
                    style={{
                        textDecoration: "none",
                        marginTop: 10,
                    }}
                    to="/purchase"
                >
                    <div
                        style={{
                            fontSize: 14,
                            background: "#0B172B",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            borderRadius: 7,
                            padding: "40px 35px",
                            marginTop: 35,
                            minHeight: 210,
                            textAlign: "center",
                            color: "white",
                        }}
                    >
                        <FaPlus
                            style={{
                                fontSize: 25,
                                marginTop: 20,
                            }}
                        />
                        <div
                            style={{
                                marginTop: 32,
                                fontSize: 16,
                            }}
                        >
                            Create Cloud PC
                        </div>
                    </div>
                </Link>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        disk_is_creating: state.DashboardReducer.disk_is_creating,
        payment: state.DashboardReducer.payment,
        customer: state.DashboardReducer.customer,
        disk_creation_message: state.DashboardReducer.disk_creation_message
            ? state.DashboardReducer.disk_creation_message
            : "Create Cloud PC command sent to server.",
        require_payment_oncreate: state.DashboardReducer
            .require_payment_oncreate
            ? state.DashboardReducer.require_payment_oncreate
            : true,
    };
}

export default connect(mapStateToProps)(DisksSection);
