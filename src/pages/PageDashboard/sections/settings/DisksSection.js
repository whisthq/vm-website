import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import DiskBox from "pages/PageDashboard/containers/diskBox";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";
import "static/PageSettings.css";

class DisksSection extends Component {
    render() {
        const windowsDisks = this.props.disks.filter((d) => d.os === "Windows");

        const windowsBox = (
            <Link
                style={{
                    textDecoration: "none",
                    marginTop: 10,
                }}
                to={{
                    pathname: "/purchase",
                    state: { operatingSystem: "Windows" },
                }}
            >
                <div className="createBox">
                    <FaPlus className="icon" />
                    <div className="title">Create Windows Cloud PC</div>
                </div>
            </Link>
        );

        const linuxDisks = this.props.disks.filter((d) => d.os === "Linux");

        const linuxBox = (
            <Link
                style={{
                    textDecoration: "none",
                    marginTop: 10,
                }}
                to={{
                    pathname: "/purchase",
                    state: { operatingSystem: "Linux" },
                }}
            >
                <div className="createBox">
                    <FaPlus className="icon" />
                    <div className="title">Create Linux Cloud PC</div>
                </div>
            </Link>
        );

        if (this.props.disks && this.props.disks.length > 0) {
            return (
                <Row style={{ marginTop: 5 }} className="disks">
                    <Col xs={12}>
                        <Row
                            style={{
                                width: "100%",
                            }}
                        >
                            {this.props.disks.map((value, index) => (
                                <DiskBox
                                    index={index}
                                    value={value}
                                    width={this.props.width}
                                />
                            ))}
                            <Col
                                sm={6}
                                lg={4}
                                xl={3}
                                className="pointerOnHover"
                                style={{
                                    paddingRight:
                                        this.props.width > 900 ? 20 : 0,
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
                <Row className="disks">
                    <Col md={6} sm={12}>
                        {windowsBox}
                    </Col>
                    <Col md={6} sm={12}>
                        {linuxBox}
                    </Col>
                </Row>
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
