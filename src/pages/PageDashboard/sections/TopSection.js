import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";
import { faCreditCard, faTag } from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

import ImageBox from "pages/PageDashboard/containers/imageBox";
import HardwareBox from "pages/PageDashboard/containers/hardwareBox";

import CPU from "assets/icons/cpu.svg";
import GPU from "assets/icons/gpu.svg";
import RAM from "assets/icons/ram.svg";
import SSD from "assets/icons/hard-drive-icon.svg";

class TopSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            total_storage: "120GB",
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
        if (
            this.props.disks === undefined ||
            this.props.disks.length === 0 ||
            this.props.disk_is_creating
        ) {
            if (this.props.disk_is_creating) {
                if (
                    (this.props.customer && this.props.customer.paid) ||
                    this.props.require_payment_oncreate
                ) {
                    return (
                        <Row
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <Col xs={12}>
                                <div className="disk-status-box">
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Current Status:{" "}
                                    </span>
                                    {this.props.disk_creation_message}
                                </div>
                                <ImageBox
                                    text="Your Cloud PC Is Creating"
                                    subtext="This should take no more
                                               than 20 minutes. Once your cloud PC
                                               is ready, you'll be able to download our
                                               desktop app below to launch your cloud PC."
                                    creating
                                />
                            </Col>
                        </Row>
                    );
                } else {
                    return (
                        <Row style={{ marginTop: 30 }}>
                            <Col
                                xs={12}
                                style={{
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                }}
                            >
                                <div className="disk-status-box">
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Current Status:{" "}
                                    </span>
                                    {this.props.disk_creation_message}
                                </div>
                            </Col>
                            <Col xs={12} md={8}>
                                <ImageBox
                                    text="Your Cloud PC Is Creating"
                                    subtext="This should take no more
                                               than 20 minutes. Once your cloud PC
                                               is ready, you'll be able to download our
                                               desktop app below to launch your cloud PC."
                                    creating
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Link
                                    to="/card"
                                    style={{
                                        textDecoration: "none",
                                    }}
                                    className="pointerOnHover"
                                >
                                    <div className="payment-box">
                                        <FontAwesomeIcon
                                            icon={faCreditCard}
                                            className="icon"
                                        />
                                        <div className="title">Add Payment</div>
                                        <div className="subtext">
                                            Your cloud PC is free until{" "}
                                            {this.props.trialEnd}.
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    );
                }
            } else {
                return (
                    <Row
                        style={{
                            marginTop: 30,
                        }}
                    >
                        <Col xs={12}>
                            <Link
                                style={{
                                    textDecoration: "none",
                                }}
                                to="/purchase"
                                className="create-cloud-pc"
                            >
                                <ImageBox
                                    text="Create My Cloud Computer"
                                    subtext="Transform your
                                        computer into a GPU-powered cloud
                                        computer. Setup in less than a 
                                        minute, no payment required."
                                />
                            </Link>
                        </Col>
                    </Row>
                );
            }
        } else if (
            this.props.customer &&
            this.props.customer.paid &&
            this.props.payment &&
            Object.keys(this.props.payment).length > 0 &&
            this.props.payment.plan &&
            this.props.payment.plan.nickname
        ) {
            return (
                <div>
                    <Row style={{ marginTop: 30 }}>
                        <Col md={7} xs={12}>
                            <Row>
                                <Col sm={6} xs={12}>
                                    <HardwareBox
                                        icon={CPU}
                                        title="CPU"
                                        text="6 Core Intel Xeon E5"
                                    />
                                </Col>
                                <Col sm={6} xs={12}>
                                    <HardwareBox
                                        icon={GPU}
                                        title="GPU"
                                        text="NVIDIA Tesla M60"
                                    />
                                </Col>
                                <Col sm={6} xs={12}>
                                    <HardwareBox
                                        icon={RAM}
                                        title="RAM"
                                        text="56GB DDR4"
                                    />
                                </Col>
                                <Col sm={6} xs={12}>
                                    <HardwareBox
                                        icon={SSD}
                                        title="SSD"
                                        text={
                                            <span>
                                                {this.props.total_storage}
                                                &nbsp;Storage
                                            </span>
                                        }
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5} xs={12}>
                            <HashLink
                                to="/plan/#top"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <div className="payment-box">
                                    <FontAwesomeIcon
                                        icon={faTag}
                                        className="icon"
                                    />
                                    <div className="title">Change Plan</div>
                                    <div className="text">
                                        You are subscribed to the{" "}
                                        {this.props.payment.plan.nickname} plan.
                                        You can change your plan here.
                                    </div>
                                </div>
                            </HashLink>
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <Row style={{ marginTop: 30 }}>
                    {this.props.disk_creation_message !==
                    "Create Cloud PC command sent to server." ? (
                        <Col
                            xs={12}
                            style={{
                                paddingLeft: 15,
                                paddingRight: 15,
                            }}
                        >
                            <div className="disk-status-box">
                                Success! Your cloud PC is ready to use. Simply
                                download the appropriate desktop application
                                below.
                            </div>
                        </Col>
                    ) : (
                        <div></div>
                    )}
                    <Col xs={12} md={7}>
                        <Row>
                            <Col sm={6} xs={12}>
                                <HardwareBox
                                    icon={CPU}
                                    title="CPU"
                                    text="6 Core Intel Xeon E5"
                                />
                            </Col>
                            <Col sm={6} xs={12}>
                                <HardwareBox
                                    icon={GPU}
                                    title="GPU"
                                    text="NVIDIA Tesla M60"
                                />
                            </Col>
                            <Col sm={6} xs={12}>
                                <HardwareBox
                                    icon={RAM}
                                    title="RAM"
                                    text="56GB DDR4"
                                />
                            </Col>
                            <Col sm={6} xs={12}>
                                <HardwareBox
                                    icon={SSD}
                                    title="SSD"
                                    text={
                                        <span>
                                            {this.props.total_storage}
                                            &nbsp;Storage
                                        </span>
                                    }
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={12} md={5}>
                        <Link
                            to="/card"
                            style={{
                                textDecoration: "none",
                            }}
                            className="pointerOnHover"
                        >
                            <div className="payment-box">
                                <FontAwesomeIcon
                                    icon={faCreditCard}
                                    className="icon"
                                />
                                <div className="title">Add Payment</div>
                                <div className="text">
                                    Your cloud PC is completely free to use
                                    until {this.props.trialEnd}.
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            );
        }
    }
}

function mapStateToProps(state) {
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

export default connect(mapStateToProps)(TopSection);
