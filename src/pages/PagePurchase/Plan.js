import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import Header from "components/header.js";
import "static/Shared.css";
import {
    changePlan,
    changePlanStatus,
} from "store/actions/dashboard/stripe_actions";
import PriceBox from "./containers/priceBox.js";

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            continue: false,
            exit: false,
            plan: "",
            old_plan: "",
            processing: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        if (
            this.props.payment &&
            Object.keys(this.props.payment).length > 0 &&
            this.props.payment.plan
        ) {
            const nickname = this.props.payment.plan.nickname;
            if (nickname === "Fractal Hourly") {
                this.setState({ old_plan: "Hourly", plan: "Hourly" });
            } else if (nickname === "Fractal Monthly") {
                this.setState({ old_plan: "Monthly", plan: "Monthly" });
            } else if (nickname === "Fractal Unlimited") {
                this.setState({ old_plan: "Unlimited", plan: "Unlimited" });
            }
        }
        this.props.dispatch(changePlanStatus(0));
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.change_plan_status !== this.props.change_plan_status &&
            this.state.processing
        ) {
            this.setState({ processing: false });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    changePlan = () => {
        this.setState({ processing: true });
        this.props.dispatch(changePlanStatus(0));
        this.props.dispatch(changePlan(this.state.plan));
    };

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        const renderLeftMenu = () => {
            if (this.state.width > 700) {
                return (
                    <div>
                        <div style={{ paddingBottom: 20 }}>
                            <div
                                style={{ color: "#111111", fontWeight: "bold" }}
                            >
                                Plan
                            </div>
                            <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                {this.state.plan}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <div></div>;
            }
        };

        const renderSurvey = () => {
            return (
                <div
                    tabIndex="0"
                    onKeyDown={(e) => this.handleKeyPress4(e)}
                    style={{
                        outline: "none",
                        paddingTop: 100,
                        paddingLeft: 0,
                        width:
                            this.state.width > 700
                                ? "calc(100% - 400px)"
                                : "95%",
                        overflowX: "hidden !important",
                        paddingRight: this.state.width > 700 ? 0 : 40,
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: 22,
                            }}
                        >
                            Change Your Plan
                        </span>
                        <div
                            style={{
                                marginTop: 5,
                                color: "#333333",
                                fontSize: 16,
                                maxWidth: 850,
                            }}
                        >
                            You are currently subscribed to the{" "}
                            {this.state.old_plan} plan. You can select a new
                            plan below, which will take effect immediately.
                        </div>
                        {this.state.old_plan === "Hourly" ? (
                            <Row
                                style={{
                                    marginTop: 50,
                                    paddingLeft:
                                        this.state.width > 700 ? 16 : 10,
                                }}
                            >
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Monthly" })
                                    }
                                >
                                    <PriceBox
                                        name="Monthly"
                                        price="39"
                                        details={
                                            <div>
                                                6 hr / day
                                                <br />
                                                +$0.50 per extra hr
                                            </div>
                                        }
                                        color={
                                            this.state.plan === "Monthly"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={this.state.plan === "Monthly"}
                                    />
                                </Col>
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Unlimited" })
                                    }
                                >
                                    <PriceBox
                                        name="Unlimited"
                                        price="99"
                                        details="Unlimited daily usage"
                                        color={
                                            this.state.plan === "Unlimited"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={
                                            this.state.plan === "Unlimited"
                                        }
                                    />
                                </Col>
                            </Row>
                        ) : this.state.old_plan === "Monthly" ? (
                            <Row
                                style={{
                                    marginTop: 50,
                                    paddingLeft:
                                        this.state.width > 700 ? 16 : 10,
                                }}
                            >
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Hourly" })
                                    }
                                >
                                    <PriceBox
                                        name="Hourly"
                                        subText="Takes effect immediately"
                                        price="5"
                                        details="+$0.70 / hr of usage"
                                        color={
                                            this.state.plan === "Hourly"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={this.state.plan === "Hourly"}
                                    />
                                </Col>
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Unlimited" })
                                    }
                                >
                                    <PriceBox
                                        name="Unlimited"
                                        subText="Takes effect immediately"
                                        price="99"
                                        details="Unlimited daily usage"
                                        color={
                                            this.state.plan === "Unlimited"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={
                                            this.state.plan === "Unlimited"
                                        }
                                    />
                                </Col>
                            </Row>
                        ) : (
                            <Row
                                style={{
                                    marginTop: 50,
                                    paddingLeft:
                                        this.state.width > 700 ? 16 : 10,
                                }}
                            >
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Hourly" })
                                    }
                                >
                                    <PriceBox
                                        name="Hourly"
                                        price="5"
                                        details="+$0.70 / hr of usage"
                                        color={
                                            this.state.plan === "Hourly"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={this.state.plan === "Hourly"}
                                    />
                                </Col>
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    className="pointerOnHover"
                                    onClick={() =>
                                        this.setState({ plan: "Monthly" })
                                    }
                                >
                                    <PriceBox
                                        name="Monthly"
                                        price="39"
                                        details={
                                            <div>
                                                6 hr / day
                                                <br />
                                                +$0.50 per extra hr
                                            </div>
                                        }
                                        color={
                                            this.state.plan === "Monthly"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={this.state.plan === "Monthly"}
                                    />
                                </Col>
                            </Row>
                        )}
                        {this.state.processing ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: 355,
                                    marginTop: 40,
                                }}
                            >
                                <Button
                                    disabled="true"
                                    style={{
                                        background: "#111111",
                                        border: "none",
                                        padding: "10px 45px",
                                        display: "inline",
                                        width: 235,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleNotch}
                                        spin
                                        style={{
                                            color: "white",
                                            height: 12,
                                            marginRight: 5,
                                            fontSize: 12,
                                        }}
                                    />
                                </Button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: 300,
                                    marginTop: 40,
                                }}
                            >
                                <Button
                                    disabled={
                                        this.state.plan === this.state.old_plan
                                    }
                                    onClick={this.changePlan}
                                    style={{
                                        background: "#111111",
                                        border: "none",
                                        padding: "10px 45px",
                                        display: "inline",
                                        width: 235,
                                    }}
                                >
                                    Change My Plan
                                </Button>
                            </div>
                        )}
                        {this.props.change_plan_status !== 0 &&
                        this.props.change_plan_status !== 200 ? (
                            <div
                                style={{
                                    marginTop: 10,
                                    fontSize: 12,
                                    color: "#e34d4d",
                                }}
                            >
                                An error occured while trying to change your
                                plan. Please contact
                                support@fractalcomputers.com for assistance.
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div
                            style={{
                                float:
                                    this.state.width > 700 ? "none" : "right",
                                marginTop: this.state.width > 700 ? 0 : 40,
                                position:
                                    this.state.width > 700
                                        ? "absolute"
                                        : "relative",
                                bottom: this.state.width > 700 ? 25 : 0,
                                right: this.state.width > 700 ? 40 : 0,
                                boxShadow:
                                    this.state.width > 700
                                        ? "0px 4px 20px rgba(0, 0, 0, 0.3)"
                                        : "none",
                                background: "none",
                            }}
                        >
                            <div
                                style={{
                                    display: "inline",
                                    borderRadius: "5px 0px 0px 5px",
                                    backgroundColor: "#5ec3eb",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRight: "solid 0.5px #0b172b",
                                    opacity: 0.5,
                                }}
                            >
                                <FaAngleUp
                                    className="typeform-up"
                                    style={{
                                        height: 20,
                                        position: "relative",
                                        bottom: 2,
                                        color: "#0b172b",
                                    }}
                                />
                            </div>
                            <Link to="/dashboard">
                                <div
                                    style={{
                                        display: "inline",
                                        borderRadius: "0px 5px 5px 0px",
                                        backgroundColor: "#5ec3eb",
                                        color: "white",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <FaTimes
                                        style={{
                                            height: 15,
                                            position: "relative",
                                            bottom: 2,
                                            color: "#0b172b",
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <div
                style={{
                    minHeight: "100vh",
                    paddingBottom: 50,
                    background: "#F6F6F6",
                }}
                id="top"
            >
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#333333" button="#5ec3eb" />
                    <div
                        style={{
                            display: "flex",
                            overflowX: "hidden",
                            position: "relative",
                            bottom: 60,
                        }}
                    >
                        <div
                            style={{
                                width: this.state.width > 700 ? 300 : 0,
                                paddingLeft: this.state.width > 700 ? 80 : 40,
                                paddingTop: 120,
                                backgroundColor: "none",
                                height: "100%",
                                minHeight: "100vh",
                                zIndex: 0,
                            }}
                        >
                            {renderLeftMenu()}
                        </div>
                        {renderSurvey()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        payment: state.DashboardReducer.payment,
        change_plan_status: state.DashboardReducer.change_plan_status
            ? state.DashboardReducer.change_plan_status
            : 0,
    };
}

export default connect(mapStateToProps)(Plan);
