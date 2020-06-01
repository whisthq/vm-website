import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import "static/Shared.css";
import "static/PageDashboard.css"

import Header from "components/header.js";
import {
    sendFriendsEmail,
    friendsEmailSent,
    triggerSurvey,
} from "store/actions/dashboard/popup_actions"
import {
    retrieveCustomer,
    submitPurchaseFeedback
} from "store/actions/dashboard/customer_actions"
import {
    dashboardLoaded,
} from "store/actions/dashboard/rendering_actions"
import {
    fetchDisks,
    diskCreating,
    fetchDiskAttachStatus,
} from "store/actions/dashboard/disk_actions"
import {
    cancelPlan
} from "store/actions/dashboard/stripe_actions"
import {
    logout 
} from "store/actions/auth/login_actions"
import "react-tabs/style/react-tabs.css";
import {
    FaClone,
    FaTimes,
    FaCheck,
    FaUser,
    FaPlus,
    FaPlay,
    FaFastForward,
    FaPause,
    FaWindows,
    FaApple,
    FaUbuntu,
    FaAndroid,
    FaTag,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
    faCreditCard,
    faTag,
} from "@fortawesome/free-solid-svg-icons";
import { HashLink } from "react-router-hash-link";

import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";

import CPU from "assets/cpu.svg";
import GPU from "assets/gpu.svg";
import RAM from "assets/ram.svg";
import SSD from "assets/hard-drive-icon.svg";
import WindowsBin from "bin/Fractal.exe";
import MacBin from "bin/Fractal.dmg";
import LinuxBin from "bin/Fractal.AppImage";
import Mountain from "assets/mountain.jpg";


import ReferralButton from "pages/PageDashboard/containers/referralButton"
import FeedbackBox from "pages/PageDashboard/containers/feedbackBox"
import CreditsBox from "pages/PageDashboard/containers/creditsBox"
import ImageBox from "pages/PageDashboard/containers/imageBox"

import OfflineSection from "pages/PageDashboard/sections/OfflineSection"
import LoadingSection from "pages/PageDashboard/sections/LoadingSection"
import LeftSection from "pages/PageDashboard/sections/LeftSection"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            showPopup: false,
            day: 0,
            month: 0,
            year: 0,
            created: "",
            billStart: "",
            billEnd: "",
            cancelling: false,
            hidePassword: true,
            exitSurvey: false,
            exitFeedback: "",
            trialEnd: "",
            waitlist: false,
            loaded: false,
            clipboardCopied: false,
            total_storage: "120GB"
        };
        this.customWidth = React.createRef();
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(dashboardLoaded(false));
        this.props.dispatch(fetchDisks(this.props.user));
        this.props.dispatch(retrieveCustomer());

        var today = new Date();
        this.setState(
            {
                day: today.getDate(),
                month: this.monthConvert(today.getMonth()),
                year: today.getFullYear(),
            },
            function () {
                this.setState({ loaded: true });
            }
        );

        if (this.props.disk_attach_status_id && this.props.disk_is_creating) {
            this.props.dispatch(fetchDiskAttachStatus(this.props.disk_attach_status_id));
        }

        if(this.props.disks && Object.keys(this.props.disks).length > 1) {
            var total_storage = 0
            this.props.disks.forEach(function(disk) {
                total_storage = total_storage + Number(disk["disk_size"]) 
            });
            this.setState({
               total_storage: total_storage.toString() + "GB"
            });
        };
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        if (this.props.payment && Object.keys(this.props.payment).length > 0) {
            if (this.state.created === "" && this.props.payment.created) {
                this.setState({
                    created: this.unixToDate(this.props.payment.created),
                });
            }
            if (
                this.state.billStart === "" &&
                this.props.payment.current_period_start
            ) {
                this.setState({
                    billStart: this.unixToDate(
                        this.props.payment.current_period_start
                    ),
                });
            }
            if (
                this.state.billEnd === "" &&
                this.props.payment.current_period_end
            ) {
                this.setState({
                    billEnd: this.unixToDate(
                        this.props.payment.current_period_end
                    ),
                });
            }
            if (
                this.state.trialEnd === "" &&
                this.props.payment.trial_end &&
                this.props.payment.trial_end > 0
            ) {
                this.setState({
                    trialEnd: this.unixToDate(this.props.payment.trial_end),
                });
            }
        } else {
            if (this.state.created !== "") {
                this.setState({ created: "" });
            }
            if (this.state.billStart !== "") {
                this.setState({ billStart: "" });
            }
            if (this.state.billEnd !== "") {
                this.setState({ billEnd: "" });
            }
            if (
                this.state.trialEnd !== "" &&
                this.props.customer &&
                Object.keys(this.props.customer).length === 0
            ) {
                this.setState({ trialEnd: "" });
            }
        }

        if (
            this.state.trialEnd === "" &&
            this.props.customer &&
            Object.keys(this.props.customer).length > 0
        ) {
            this.setState({
                trialEnd: this.unixToDate(this.props.customer.trial_end),
            });
        }

        if (
            this.props.disks &&
            this.props.disks.length !== prevProps.disks.length &&
            this.state.cancelling
        ) {
            console.log("DONE CANCELLING?");
            this.setState({ cancelling: false });
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    cancelPlan = () => {
        this.setState({ cancelling: true });
        this.props.dispatch(diskCreating(false));
        this.props.dispatch(cancelPlan(this.state.exitFeedback));
    };

    monthConvert = (month) => {
        var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        var selectedMonthName = months[month];
        return selectedMonthName;
    };

    unixToDate = (unix) => {
        const milliseconds = unix * 1000;
        const dateObject = new Date(milliseconds);
        const humanDateFormat = dateObject
            .toLocaleString("en-US")
            .split(",")[0];
        var dateArr = humanDateFormat.split("/");
        const month = this.monthConvert(dateArr[0] - 1);
        var finalDate =
            month + " " + dateArr[1].toString() + ", " + dateArr[2].toString();
        return finalDate;
    };

    showPassword = (show) => {
        this.setState({ hidePassword: !show });
    };

    showExitSurvey = (show) => {
        this.setState({ exitSurvey: show });
    };

    changeExitFeedback = (evt) => {
        this.setState({ exitFeedback: evt.target.value });
    };

    copyToClipboard = (e) => {
        this.setState({ clipboardCopied: true });
        navigator.clipboard.writeText(
            "sudo apt-get install libavcodec-dev libavdevice-dev libx11-dev libxtst-dev xclip x11-xserver-utils -y"
        );
    };

    render() {
        if (this.state.waitlist) {
            return (
                <OfflineSection
                    month = {this.state.month}
                    day = {this.state.day}
                    year = {this.state.year}
                />
            );
        } else if (!this.props.dashboard_loaded && this.props.user) {
            return (
                <LoadingSection/>
            );
        } else if (!this.props.loggedIn || !this.props.email_verified) {
            return (
                <Redirect to="/auth" />
            );
        } else {
            return (
                <div className = "dashboard-container">
                    <div style={{ maxWidth: 1920, margin: "auto" }}>
                        <Header color="#111111" button="#5ec3eb" />
                        <FeedbackBox/>
                        <div className = "dashboard-flex">
                            <LeftSection/>
                            <div className = "right-section">
                                <CreditsBox/>
                                <div className = "date">
                                    {this.state.month}{" "}
                                    {this.state.day},{" "}
                                    {this.state.year}
                                </div>
                                <ReferralButton/>
                                <div className = "title">
                                    MY CLOUD PC
                                </div>
                                {this.props.disks === undefined ||
                                this.props.disks.length === 0 ||
                                this.props.disk_is_creating ? (
                                    this.props.disk_is_creating ? (
                                        <div>
                                            {this.props.customer &&
                                            this.props.customer.paid ? (
                                                <Row
                                                    style={{
                                                        marginTop: 30,
                                                    }}
                                                >
                                                    <Col xs={12}>
                                                        <div className = "disk-status-box">
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Current
                                                                Status:{" "}
                                                            </span>
                                                            {
                                                                this.props.disk_creation_message
                                                            }
                                                        </div>
                                                        <ImageBox 
                                                            text = "Your Cloud PC Is Creating"
                                                            subtext = "This should
                                                                       take no more
                                                                       than 20 minutes.
                                                                       Once your cloud PC
                                                                       is ready, you'll be 
                                                                       able to download our
                                                                       desktop app below
                                                                       to launch your cloud PC."
                                                        />
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Row style={{marginTop: 30}}>
                                                    <Col
                                                        xs={12}
                                                        style={{
                                                            paddingLeft: 15,
                                                            paddingRight: 15,
                                                        }}
                                                    >
                                                        <div className = "disk-status-box">
                                                            <span
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Current
                                                                Status:{" "}
                                                            </span>
                                                            {
                                                                this
                                                                    .props
                                                                    .disk_creation_message
                                                            }
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={8}>
                                                        <ImageBox 
                                                            text = "Your Cloud PC Is Creating"
                                                            subtext = "This should
                                                                       take no more
                                                                       than 20 minutes.
                                                                       Once your cloud PC
                                                                       is ready, you'll be 
                                                                       able to download our
                                                                       desktop app below
                                                                       to launch your cloud PC."
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={4}>
                                                        <Link
                                                            to="/card"
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            className="pointerOnHover"
                                                        >
                                                            <div className = "payment-box">
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCreditCard
                                                                    }
                                                                    className = "icon"
                                                                />
                                                                <div className = "text">
                                                                    Add Payment
                                                                </div>
                                                                <div className = "subtext">
                                                                    Your
                                                                    cloud
                                                                    PC
                                                                    is
                                                                    free
                                                                    until{" "}
                                                                    {
                                                                        this
                                                                            .state
                                                                            .trialEnd
                                                                    }
                                                                    .
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <Row
                                                style={{
                                                    marginTop: 30,
                                                }}
                                            >
                                                <Col xs={12}>
                                                    <Link
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                        to="/purchase"
                                                        className="create-cloud-pc"
                                                    >
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "center",
                                                                backgroundImage:
                                                                    "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255,255,255,0.9)), url(" +
                                                                    Mountain +
                                                                    ")",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundRepeat:
                                                                    "no-repeat",
                                                                backgroundPosition:
                                                                    "center",
                                                                padding:
                                                                    "30px 50px",
                                                                minHeight:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 260
                                                                        : 340,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <FaPlus
                                                                style={{
                                                                    height: 25,
                                                                    marginTop: 25,
                                                                    color:
                                                                        "#333333",
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#333333",
                                                                    fontSize: 22,
                                                                    marginTop: 20,
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Create
                                                                My Cloud
                                                                Computer
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontSize: 14,
                                                                    maxWidth: 450,
                                                                    margin:
                                                                        "auto",
                                                                    marginTop: 10,
                                                                    color:
                                                                        "#333333",
                                                                }}
                                                            >
                                                                Transform
                                                                your
                                                                local
                                                                device
                                                                into a
                                                                GPU-powered
                                                                cloud
                                                                computer.
                                                                Setup in
                                                                less
                                                                than one
                                                                minute,
                                                                no
                                                                credit
                                                                card
                                                                required.
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                ) : this.props.customer &&
                                  this.props.customer.paid &&
                                  this.props.payment &&
                                  Object.keys(this.props.payment)
                                      .length > 0 &&
                                  this.props.payment.plan &&
                                  this.props.payment.plan.nickname ? (
                                    <div>
                                        <Row style={{ marginTop: 30 }}>
                                            <Col md={7} xs={12}>
                                                <Row>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    CPU
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                CPU
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                6 Core
                                                                Intel
                                                                Xeon E5
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    GPU
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                GPU
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                NVIDIA
                                                                Tesla
                                                                M60
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    RAM
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                RAM
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                56GB
                                                                DDR4
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    SSD
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                SSD
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                {this.state.total_storage} 
                                                                &nbsp;Storage
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={5} xs={12}>
                                                <HashLink 
                                                    to="/plan/#top"
                                                    style={{
                                                        textDecoration: "none"
                                                    }}>
                                                    <div
                                                        style={{
                                                            borderRadius: 5,
                                                            textAlign:
                                                                "center",
                                                            boxShadow:
                                                                "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                            padding:
                                                                "30px 50px",
                                                            height: 250,
                                                            margin:
                                                                "auto",
                                                            width:
                                                                "100%",
                                                            marginBottom: 20,
                                                            background:
                                                                "#0B172B",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTag}
                                                            style={{
                                                                color:
                                                                    "white",
                                                                fontSize: 22,
                                                                marginTop: 15,
                                                            }}
                                                        />
                                                        <div
                                                            style={{
                                                                color:
                                                                    "white",
                                                                fontSize:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 24
                                                                        : 20,
                                                                marginTop: 20,
                                                                fontWeight:
                                                                    "bold",
                                                                marginBottom: 10,
                                                            }}
                                                        >
                                                            Change Plan
                                                        </div>
                                                        {this.props
                                                            .payment
                                                            .plan
                                                            .nickname ===
                                                        "Fractal Hourly" ? (
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        this
                                                                            .state
                                                                            .width >
                                                                        700
                                                                            ? 15
                                                                            : 13,
                                                                    maxWidth: 400,
                                                                    margin:
                                                                        "auto",
                                                                    marginTop: 15,
                                                                    color:
                                                                        "#D6D6D6",
                                                                }}
                                                            >
                                                                You are
                                                                subscribed
                                                                to the
                                                                Hourly
                                                                plan.
                                                                You can change
                                                                your 
                                                                plan here.
                                                            </div>
                                                        ) : this.props
                                                              .payment
                                                              .plan
                                                              .nickname ===
                                                          "Fractal Monthly" ? (
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        this
                                                                            .state
                                                                            .width >
                                                                        700
                                                                            ? 15
                                                                            : 13,
                                                                    maxWidth: 400,
                                                                    margin:
                                                                        "auto",
                                                                    marginTop: 15,
                                                                    color:
                                                                        "#D6D6D6",
                                                                }}
                                                            >
                                                                You are
                                                                subscribed
                                                                to the
                                                                Monthly
                                                                plan.
                                                                You can change
                                                                your plan here.
                                                            </div>
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        this
                                                                            .state
                                                                            .width >
                                                                        700
                                                                            ? 15
                                                                            : 13,
                                                                    maxWidth: 400,
                                                                    margin:
                                                                        "auto",
                                                                    marginTop: 15,
                                                                    color:
                                                                        "#D6D6D6",
                                                                }}
                                                            >
                                                                You are
                                                                subscribed
                                                                to the
                                                                Unlimited
                                                                plan.
                                                                You can change
                                                                your plan here.
                                                            </div>
                                                        )}
                                                    </div>
                                                </HashLink>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    <div>
                                        <Row style={{ marginTop: 30 }}>
                                            {this.props
                                                .disk_creation_message !==
                                            "Create Cloud PC command sent to server." ? (
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        paddingLeft: 15,
                                                        paddingRight: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            background:
                                                                "rgba(195, 245, 179, 0.2)",
                                                            boxShadow:
                                                                "0px 4px 5px rgba(0, 0, 0, 0.05)",
                                                            fontSize: 14,
                                                            width:
                                                                "100%",
                                                            margin:
                                                                "auto",
                                                            marginBottom: 20,
                                                            color:
                                                                "#2f960e",
                                                            padding:
                                                                "13px 28px",
                                                            borderRadius: 10,
                                                        }}
                                                    >
                                                        Success! Your
                                                        cloud PC is
                                                        ready to use.
                                                        Simply download
                                                        the appropriate
                                                        client
                                                        application
                                                        below.
                                                    </div>
                                                </Col>
                                            ) : (
                                                <div></div>
                                            )}
                                            <Col xs={12} md={7}>
                                                <Row>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    CPU
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                CPU
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                6 Core
                                                                Intel
                                                                Xeon E5
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    GPU
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                GPU
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                NVIDIA
                                                                Tesla
                                                                M60
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    RAM
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                RAM
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                56GB
                                                                DDR4
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col sm={6} xs={12}>
                                                        <div
                                                            style={{
                                                                borderRadius: 5,
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                textAlign:
                                                                    "left",
                                                                background:
                                                                    "white",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                backgroundAttachment:
                                                                    "fixed",
                                                                padding: 30,
                                                                minHeight: 160,
                                                                margin:
                                                                    "auto",
                                                                width:
                                                                    "100%",
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    SSD
                                                                }
                                                                alt=""
                                                                style={{
                                                                    textAlign:
                                                                        "left",
                                                                    marginTop: 5,
                                                                    height: 45,
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    fontWeight:
                                                                        "bold",
                                                                    fontSize: 18,
                                                                    marginTop: 20,
                                                                }}
                                                            >
                                                                SSD
                                                            </div>
                                                            <div
                                                                style={{
                                                                    color:
                                                                        "#555555",
                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                {this.state.total_storage}
                                                                &nbsp;Storage
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={12} md={5}>
                                                <Link
                                                    to="/card"
                                                    style={{
                                                        textDecoration:
                                                            "none",
                                                    }}
                                                    className="pointerOnHover"
                                                >
                                                    <div
                                                        style={{
                                                            borderRadius: 5,
                                                            textAlign:
                                                                "center",
                                                            boxShadow:
                                                                "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                            padding:
                                                                "30px 50px",
                                                            height: 250,
                                                            margin:
                                                                "auto",
                                                            width:
                                                                "100%",
                                                            marginBottom: 20,
                                                            background:
                                                                "#0B172B",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCreditCard
                                                            }
                                                            style={{
                                                                color:
                                                                    "white",
                                                                height: 25,
                                                                marginTop: 15,
                                                                fontSize: 20
                                                            }}
                                                        />
                                                        <div
                                                            style={{
                                                                color:
                                                                    "white",
                                                                fontSize: 22,
                                                                marginTop: 20,
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Add Payment
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize: 14,
                                                                maxWidth: 400,
                                                                margin:
                                                                    "auto",
                                                                marginTop: 15,
                                                                color:
                                                                    "#D6D6D6",
                                                            }}
                                                        >
                                                            Your cloud
                                                            PC is
                                                            completely
                                                            free to use
                                                            until{" "}
                                                            {
                                                                this
                                                                    .state
                                                                    .trialEnd
                                                            }
                                                            .
                                                        </div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                <Row style={{ marginTop: 40 }}>
                                    <Col sm={6} xs={12}>
                                        <div
                                            style={{
                                                fontSize: 20,
                                                fontWeight: "bold",
                                                marginBottom: 20,
                                                display: "inline",
                                            }}
                                        >
                                            Downloads
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    background:
                                                        "#0B172B",
                                                    backgroundSize:
                                                        "cover",
                                                    backgroundPosition:
                                                        "center",
                                                    backgroundAttachment:
                                                        "fixed",
                                                    boxShadow:
                                                        "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                    borderRadius: 7,
                                                    padding:
                                                        "40px 15px",
                                                    marginTop: 35,
                                                    minHeight: 245,
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
                                                            padding:
                                                                "0px 20px",
                                                            marginBottom: 15,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                float:
                                                                    "left",
                                                                color:
                                                                    "white",
                                                                display:
                                                                    "inline",
                                                                fontSize: 13,
                                                            }}
                                                        >
                                                            <FaWindows
                                                                style={{
                                                                    fontSize: 16,
                                                                    position:
                                                                        "relative",
                                                                    bottom: 1,
                                                                    paddingRight: 5,
                                                                    color:
                                                                        "white",
                                                                }}
                                                            />{" "}
                                                            Windows
                                                            64-Bit
                                                        </div>
                                                        <div
                                                            style={{
                                                                float:
                                                                    "right",
                                                                display:
                                                                    "inline",
                                                                color:
                                                                    "white",
                                                            }}
                                                        >
                                                            {this.props
                                                                .disks ===
                                                                undefined ||
                                                            this.props
                                                                .disks
                                                                .length ===
                                                                0 ||
                                                            this.props
                                                                .disk_is_creating ? (
                                                                <Popup
                                                                    trigger={
                                                                        <Button
                                                                            style={{
                                                                                background:
                                                                                    "rgba(94, 195, 235, 0.1)",
                                                                                border:
                                                                                    "solid 0.5px rgb(94, 195, 235)",
                                                                                fontSize: 12,
                                                                                borderRadius: 2,
                                                                                color:
                                                                                    "rgb(94, 195, 235)",
                                                                                fontWeight:
                                                                                    "bold",
                                                                                width: 90,
                                                                                padding:
                                                                                    "5px 5px",
                                                                            }}
                                                                        >
                                                                            Download
                                                                        </Button>
                                                                    }
                                                                    modal
                                                                    onClose={() =>
                                                                        this.showExitSurvey(
                                                                            false
                                                                        )
                                                                    }
                                                                    contentStyle={{
                                                                        color:
                                                                            "#111111",
                                                                        width:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            500
                                                                                ? 500
                                                                                : "95%",
                                                                        borderRadius: 5,
                                                                        backgroundColor:
                                                                            "white",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            700
                                                                                ? 150
                                                                                : 200,
                                                                        padding:
                                                                            "30px 50px",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            textAlign:
                                                                                "left",
                                                                        }}
                                                                    >
                                                                        Once
                                                                        your
                                                                        cloud
                                                                        PC
                                                                        is
                                                                        finished
                                                                        creating,
                                                                        you
                                                                        will
                                                                        be
                                                                        able
                                                                        to
                                                                        download
                                                                        our
                                                                        client
                                                                        applications
                                                                        to
                                                                        access
                                                                        your
                                                                        cloud
                                                                        PC.
                                                                    </div>
                                                                </Popup>
                                                            ) : (
                                                                <a
                                                                    href={
                                                                        WindowsBin
                                                                    }
                                                                    download="Fractal.exe"
                                                                >
                                                                    <Button
                                                                        style={{
                                                                            background:
                                                                                "rgba(94, 195, 235, 0.1)",
                                                                            border:
                                                                                "solid 0.5px rgb(94, 195, 235)",
                                                                            fontSize: 12,
                                                                            borderRadius: 2,
                                                                            color:
                                                                                "rgb(94, 195, 235)",
                                                                            fontWeight:
                                                                                "bold",
                                                                            width: 90,
                                                                            padding:
                                                                                "5px 5px",
                                                                        }}
                                                                    >
                                                                        Download
                                                                    </Button>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        xs={12}
                                                        style={{
                                                            padding:
                                                                "0px 20px",
                                                            marginBottom: 15,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                float:
                                                                    "left",
                                                                color:
                                                                    "white",
                                                                display:
                                                                    "inline",
                                                                fontSize: 13,
                                                            }}
                                                        >
                                                            <FaApple
                                                                style={{
                                                                    fontSize: 16,
                                                                    position:
                                                                        "relative",
                                                                    bottom: 1,
                                                                    paddingRight: 5,
                                                                    color:
                                                                        "white",
                                                                }}
                                                            />{" "}
                                                            macOS 10.13+
                                                        </div>
                                                        <div
                                                            style={{
                                                                float:
                                                                    "right",
                                                                display:
                                                                    "inline",
                                                                color:
                                                                    "white",
                                                            }}
                                                        >
                                                            {this.props
                                                                .disks ===
                                                                undefined ||
                                                            this.props
                                                                .disks
                                                                .length ===
                                                                0 ||
                                                            this.props
                                                                .disk_is_creating ? (
                                                                <Popup
                                                                    trigger={
                                                                        <Button
                                                                            style={{
                                                                                background:
                                                                                    "rgba(94, 195, 235, 0.1)",
                                                                                border:
                                                                                    "solid 0.5px rgb(94, 195, 235)",
                                                                                fontSize: 12,
                                                                                borderRadius: 2,
                                                                                color:
                                                                                    "rgb(94, 195, 235)",
                                                                                fontWeight:
                                                                                    "bold",
                                                                                width: 90,
                                                                                padding:
                                                                                    "5px 5px",
                                                                            }}
                                                                        >
                                                                            Download
                                                                        </Button>
                                                                    }
                                                                    modal
                                                                    onClose={() =>
                                                                        this.showExitSurvey(
                                                                            false
                                                                        )
                                                                    }
                                                                    contentStyle={{
                                                                        color:
                                                                            "#111111",
                                                                        width:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            500
                                                                                ? 500
                                                                                : "95%",
                                                                        borderRadius: 5,
                                                                        backgroundColor:
                                                                            "white",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            700
                                                                                ? 150
                                                                                : 200,
                                                                        padding:
                                                                            "30px 50px",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            textAlign:
                                                                                "left",
                                                                        }}
                                                                    >
                                                                        Once
                                                                        your
                                                                        cloud
                                                                        PC
                                                                        is
                                                                        finished
                                                                        creating,
                                                                        you
                                                                        will
                                                                        be
                                                                        able
                                                                        to
                                                                        download
                                                                        our
                                                                        client
                                                                        applications
                                                                        to
                                                                        access
                                                                        your
                                                                        cloud
                                                                        PC.
                                                                    </div>
                                                                </Popup>
                                                            ) : (
                                                                <a
                                                                    href={
                                                                        MacBin
                                                                    }
                                                                    download="Fractal.dmg"
                                                                >
                                                                    <Button
                                                                        style={{
                                                                            background:
                                                                                "rgba(94, 195, 235, 0.1)",
                                                                            border:
                                                                                "solid 0.5px rgb(94, 195, 235)",
                                                                            fontSize: 12,
                                                                            borderRadius: 2,
                                                                            color:
                                                                                "rgb(94, 195, 235)",
                                                                            fontWeight:
                                                                                "bold",
                                                                            width: 90,
                                                                            padding:
                                                                                "5px 5px",
                                                                        }}
                                                                    >
                                                                        Download
                                                                    </Button>
                                                                </a>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        xs={12}
                                                        style={{
                                                            padding:
                                                                "0px 20px",
                                                            marginBottom: 15,
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                float:
                                                                    "left",
                                                                color:
                                                                    "white",
                                                                display:
                                                                    "inline",
                                                                fontSize: 13,
                                                            }}
                                                        >
                                                            <FaUbuntu
                                                                style={{
                                                                    fontSize: 18,
                                                                    position:
                                                                        "relative",
                                                                    bottom: 1,
                                                                    paddingRight: 5,
                                                                    color:
                                                                        "white",
                                                                }}
                                                            />{" "}
                                                            Linux Ubuntu
                                                        </div>
                                                        <div
                                                            style={{
                                                                float:
                                                                    "right",
                                                                display:
                                                                    "inline",
                                                                color:
                                                                    "white",
                                                            }}
                                                        >
                                                            {this.props
                                                                .disks ===
                                                                undefined ||
                                                            this.props
                                                                .disks
                                                                .length ===
                                                                0 ||
                                                            this.props
                                                                .disk_is_creating ? (
                                                                <Popup
                                                                    trigger={
                                                                        <Button
                                                                            style={{
                                                                                background:
                                                                                    "rgba(94, 195, 235, 0.1)",
                                                                                border:
                                                                                    "solid 0.5px rgb(94, 195, 235)",
                                                                                fontSize: 12,
                                                                                borderRadius: 2,
                                                                                color:
                                                                                    "rgb(94, 195, 235)",
                                                                                fontWeight:
                                                                                    "bold",
                                                                                width: 90,
                                                                                padding:
                                                                                    "5px 5px",
                                                                            }}
                                                                        >
                                                                            Download
                                                                        </Button>
                                                                    }
                                                                    modal
                                                                    onClose={() =>
                                                                        this.showExitSurvey(
                                                                            false
                                                                        )
                                                                    }
                                                                    contentStyle={{
                                                                        color:
                                                                            "#111111",
                                                                        width:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            500
                                                                                ? 500
                                                                                : "95%",
                                                                        borderRadius: 5,
                                                                        backgroundColor:
                                                                            "white",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            700
                                                                                ? 150
                                                                                : 200,
                                                                        padding:
                                                                            "30px 50px",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            textAlign:
                                                                                "left",
                                                                        }}
                                                                    >
                                                                        Once
                                                                        your
                                                                        cloud
                                                                        PC
                                                                        is
                                                                        finished
                                                                        creating,
                                                                        you
                                                                        will
                                                                        be
                                                                        able
                                                                        to
                                                                        download
                                                                        our
                                                                        client
                                                                        applications
                                                                        to
                                                                        access
                                                                        your
                                                                        cloud
                                                                        PC.
                                                                    </div>
                                                                </Popup>
                                                            ) : (
                                                                <Popup
                                                                    trigger={
                                                                        <div
                                                                            onClick={() =>
                                                                                this.setState(
                                                                                    {
                                                                                        clipboardCopied: false,
                                                                                    }
                                                                                )
                                                                            }
                                                                            style={{
                                                                                float:
                                                                                    "right",
                                                                                display:
                                                                                    "inline",
                                                                                color:
                                                                                    "white",
                                                                            }}
                                                                        >
                                                                            <button
                                                                                style={{
                                                                                    background:
                                                                                        "rgba(94, 195, 235, 0.1)",
                                                                                    border:
                                                                                        "solid 0.5px rgb(94, 195, 235)",
                                                                                    fontSize: 12,
                                                                                    borderRadius: 2,
                                                                                    color:
                                                                                        "rgb(94, 195, 235)",
                                                                                    fontWeight:
                                                                                        "bold",
                                                                                    width: 90,
                                                                                    padding:
                                                                                        "5px 5px",
                                                                                }}
                                                                            >
                                                                                Download
                                                                            </button>
                                                                        </div>
                                                                    }
                                                                    modal
                                                                    onClose={() =>
                                                                        this.showExitSurvey(
                                                                            false
                                                                        )
                                                                    }
                                                                    contentStyle={{
                                                                        color:
                                                                            "#111111",
                                                                        width:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            500
                                                                                ? 500
                                                                                : "95%",
                                                                        borderRadius: 5,
                                                                        backgroundColor:
                                                                            "white",
                                                                        border:
                                                                            "none",
                                                                        height:
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            700
                                                                                ? 300
                                                                                : 350,
                                                                        padding:
                                                                            "30px 50px",
                                                                        textAlign:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            fontSize: 16,
                                                                            textAlign:
                                                                                "left",
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            Our
                                                                            Linux
                                                                            client
                                                                            application
                                                                            relies
                                                                            on
                                                                            a
                                                                            few
                                                                            system
                                                                            libraries.
                                                                            Before
                                                                            downloading
                                                                            our
                                                                            application,
                                                                            please
                                                                            run
                                                                            the
                                                                            following
                                                                            command
                                                                            in
                                                                            a
                                                                            terminal.
                                                                        </div>
                                                                        <div
                                                                            style={{
                                                                                padding: 20,
                                                                                background:
                                                                                    "#0B172B",
                                                                                borderRadius: 4,
                                                                                textAlign:
                                                                                    "left",
                                                                                fontSize: 12,
                                                                                marginTop: 25,
                                                                                color:
                                                                                    "white",
                                                                            }}
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    display:
                                                                                        "flex",
                                                                                }}
                                                                            >
                                                                                <div
                                                                                    style={{
                                                                                        width: 310,
                                                                                        marginRight: 25,
                                                                                    }}
                                                                                >
                                                                                    sudo
                                                                                    apt-get
                                                                                    install
                                                                                    libavcodec-dev
                                                                                    libavdevice-dev
                                                                                    libx11-dev
                                                                                    libxtst-dev
                                                                                    xclip
                                                                                    x11-xserver-utils
                                                                                    -y
                                                                                </div>
                                                                                <div
                                                                                    style={{
                                                                                        width: 50,
                                                                                        fontSize: 18,
                                                                                        textAlign:
                                                                                            "right",
                                                                                    }}
                                                                                >
                                                                                    <FaClone
                                                                                        className="pointerOnHover"
                                                                                        onClick={
                                                                                            this
                                                                                                .copyToClipboard
                                                                                        }
                                                                                        style={{
                                                                                            color: this
                                                                                                .state
                                                                                                .clipboardCopied
                                                                                                ? "#5ec3eb"
                                                                                                : "white",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <a
                                                                            href={
                                                                                LinuxBin
                                                                            }
                                                                            download="Fractal.AppImage"
                                                                        >
                                                                            <Button
                                                                                disabled={
                                                                                    this
                                                                                        .props
                                                                                        .disks ===
                                                                                        undefined ||
                                                                                    this
                                                                                        .props
                                                                                        .disks
                                                                                        .length ===
                                                                                        0 ||
                                                                                    this
                                                                                        .props
                                                                                        .disk_is_creating
                                                                                    ? "true" : "true"
                                                                                }
                                                                                style={{
                                                                                    border:
                                                                                        "none",
                                                                                    fontWeight:
                                                                                        "bold",
                                                                                    padding: 10,
                                                                                    marginTop: 20,
                                                                                    width:
                                                                                        "100%",
                                                                                    background:
                                                                                        "rgba(94, 195, 235,0.1)",
                                                                                    color:
                                                                                        "#5ec3eb",
                                                                                }}
                                                                            >
                                                                                Download
                                                                            </Button>
                                                                        </a>
                                                                    </div>
                                                                </Popup>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col
                                                        xs={12}
                                                        style={{
                                                            padding:
                                                                "0px 20px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                float:
                                                                    "left",
                                                                color:
                                                                    "white",
                                                                display:
                                                                    "inline",
                                                            }}
                                                        >
                                                            <FaAndroid
                                                                style={{
                                                                    fontSize: 18,
                                                                    position:
                                                                        "relative",
                                                                    bottom: 1,
                                                                    paddingRight: 5,
                                                                    color:
                                                                        "white",
                                                                }}
                                                            />{" "}
                                                            Android
                                                        </div>
                                                        <div
                                                            style={{
                                                                float:
                                                                    "right",
                                                                display:
                                                                    "inline",
                                                                color:
                                                                    "white",
                                                            }}
                                                        >
                                                            <button
                                                                disabled="true"
                                                                style={{
                                                                    background:
                                                                        "none",
                                                                    border:
                                                                        "none",
                                                                    fontSize: 12,
                                                                    borderRadius: 2,
                                                                    color:
                                                                        "#A9A9A9",
                                                                    width: 90,
                                                                    padding:
                                                                        "5px 5px",
                                                                }}
                                                            >
                                                                Coming
                                                                Soon
                                                            </button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col
                                        sm={6}
                                        xs={12}
                                        style={{
                                            marginTop:
                                                this.state.width > 700
                                                    ? 0
                                                    : 70,
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: "bold",
                                                    marginBottom: 20,
                                                    float: "left",
                                                    display: "inline",
                                                }}
                                            >
                                                My Info
                                            </div>
                                            {this.state.created !==
                                                "" ||
                                            (this.props.customer &&
                                                Object.keys(
                                                    this.props.customer
                                                ).length > 0) ? (
                                                !this.state
                                                    .cancelling ? (
                                                    <Popup
                                                        trigger={
                                                            <button
                                                                style={{
                                                                    outline:
                                                                        "none",
                                                                    fontSize: 12,
                                                                    borderRadius: 2,
                                                                    float:
                                                                        "right",
                                                                    display:
                                                                        "inline",
                                                                    padding:
                                                                        "6px 12px",
                                                                    border:
                                                                        "none",
                                                                    color:
                                                                        "#e34d4d",
                                                                    backgroundColor:
                                                                        "rgba(227, 77, 77, 0.05)",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                Cancel
                                                                Plan
                                                            </button>
                                                        }
                                                        modal
                                                        onClose={() =>
                                                            this.showExitSurvey(
                                                                false
                                                            )
                                                        }
                                                        contentStyle={{
                                                            width:
                                                                this
                                                                    .state
                                                                    .width >
                                                                500
                                                                    ? 500
                                                                    : "95%",
                                                            borderRadius: 5,
                                                            backgroundColor:
                                                                "#EBEBEB",
                                                            border:
                                                                "none",
                                                            height:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? 275
                                                                    : 325,
                                                            padding:
                                                                "30px 50px",
                                                            textAlign:
                                                                "center",
                                                        }}
                                                    >
                                                        <div>
                                                            {!this.state
                                                                .exitSurvey ? (
                                                                <div>
                                                                    <div
                                                                        style={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            fontSize: 22,
                                                                        }}
                                                                    >
                                                                        <strong>
                                                                            Are
                                                                            You
                                                                            Sure?
                                                                        </strong>
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            fontSize: 14,
                                                                            color:
                                                                                "#333333",
                                                                            marginTop: 20,
                                                                        }}
                                                                    >
                                                                        If
                                                                        you
                                                                        cancel,
                                                                        all
                                                                        the
                                                                        data,
                                                                        files,
                                                                        and
                                                                        applications
                                                                        on
                                                                        stored
                                                                        on
                                                                        cloud
                                                                        PC
                                                                        will
                                                                        be{" "}
                                                                        <strong>
                                                                            permanently
                                                                        </strong>{" "}
                                                                        lost.
                                                                        Please
                                                                        make
                                                                        sure
                                                                        that
                                                                        you
                                                                        have
                                                                        transferred
                                                                        everything
                                                                        you
                                                                        need
                                                                        from
                                                                        your
                                                                        cloud
                                                                        PC
                                                                        to
                                                                        another
                                                                        device
                                                                        before
                                                                        cancelling.
                                                                    </div>
                                                                    <button
                                                                        onClick={() =>
                                                                            this.showExitSurvey(
                                                                                true
                                                                            )
                                                                        }
                                                                        style={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            marginTop: 30,
                                                                            outline:
                                                                                "none",
                                                                            width:
                                                                                "100%",
                                                                            fontSize: 12,
                                                                            borderRadius: 3,
                                                                            float:
                                                                                "right",
                                                                            display:
                                                                                "inline",
                                                                            padding:
                                                                                "10px 10px",
                                                                            border:
                                                                                "none",
                                                                            color:
                                                                                "#e34d4d",
                                                                            backgroundColor:
                                                                                "rgba(227, 77, 77, 0.05)",
                                                                        }}
                                                                    >
                                                                        I
                                                                        UNDERSTAND,
                                                                        PROCEED
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <div className="exit-survey">
                                                                    <div
                                                                        style={{
                                                                            fontWeight:
                                                                                "bold",
                                                                            fontSize: 22,
                                                                        }}
                                                                    >
                                                                        <strong>
                                                                            Your
                                                                            Feedback
                                                                        </strong>
                                                                    </div>
                                                                    <textarea
                                                                        onChange={
                                                                            this
                                                                                .changeExitFeedback
                                                                        }
                                                                        rows="4"
                                                                        cols={
                                                                            this
                                                                                .state
                                                                                .width >
                                                                            700
                                                                                ? "52"
                                                                                : "30"
                                                                        }
                                                                        placeholder="Please give us some feedback on why you're cancelling, so we can improve Fractal. Be brutally honest!"
                                                                        style={{
                                                                            outline:
                                                                                "none",
                                                                            resize:
                                                                                "none",
                                                                            background:
                                                                                "none",
                                                                            border:
                                                                                "none",
                                                                            marginTop: 20,
                                                                            fontSize: 14,
                                                                            padding: 0,
                                                                        }}
                                                                    ></textarea>
                                                                    {this
                                                                        .state
                                                                        .exitFeedback !==
                                                                    "" ? (
                                                                        <button
                                                                            onClick={
                                                                                this
                                                                                    .cancelPlan
                                                                            }
                                                                            style={{
                                                                                fontWeight:
                                                                                    "bold",
                                                                                marginTop:
                                                                                    this
                                                                                        .state
                                                                                        .width >
                                                                                    700
                                                                                        ? 19
                                                                                        : 65,
                                                                                outline:
                                                                                    "none",
                                                                                width:
                                                                                    "100%",
                                                                                fontSize: 12,
                                                                                borderRadius: 5,
                                                                                float:
                                                                                    "right",
                                                                                display:
                                                                                    "inline",
                                                                                padding:
                                                                                    "10px 10px",
                                                                                border:
                                                                                    "none",
                                                                                color:
                                                                                    "#e34d4d",
                                                                                backgroundColor:
                                                                                    "rgba(227, 77, 77, 0.05)",
                                                                            }}
                                                                        >
                                                                            CANCEL
                                                                            PLAN
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            style={{
                                                                                opacity: 0.5,
                                                                                fontWeight:
                                                                                    "bold",
                                                                                marginTop:
                                                                                    this
                                                                                        .state
                                                                                        .width >
                                                                                    700
                                                                                        ? 19
                                                                                        : 65,
                                                                                outline:
                                                                                    "none",
                                                                                width:
                                                                                    "100%",
                                                                                fontSize: 12,
                                                                                borderRadius: 5,
                                                                                float:
                                                                                    "right",
                                                                                display:
                                                                                    "inline",
                                                                                padding:
                                                                                    "10px 10px",
                                                                                border:
                                                                                    "none",
                                                                                color:
                                                                                    "#e34d4d",
                                                                                backgroundColor:
                                                                                    "rgba(227, 77, 77, 0.05)",
                                                                            }}
                                                                        >
                                                                            CANCEL
                                                                            PLAN
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Popup>
                                                ) : (
                                                    <div
                                                        style={{
                                                            float:
                                                                "right",
                                                            display:
                                                                "inline",
                                                            fontSize: 13,
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={
                                                                faCircleNotch
                                                            }
                                                            spin
                                                            style={{
                                                                height: 12,
                                                                marginRight: 4,
                                                            }}
                                                        />{" "}
                                                        Cancelling
                                                    </div>
                                                )
                                            ) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <br />
                                        <div
                                            style={{
                                                display: "block",
                                                fontSize: 13,
                                                background: "white",
                                                boxShadow:
                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                borderRadius: 7,
                                                marginTop: 40,
                                                padding: "40px 15px",
                                                minHeight: 200,
                                            }}
                                        >
                                            <Row
                                                style={{
                                                    width: "100%",
                                                    margin: 0,
                                                    marginBottom: 10,
                                                }}
                                            >
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        padding:
                                                            "0px 20px",
                                                        marginBottom: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "left"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            fontWeight:
                                                                "bold",
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        <FaUser
                                                            style={{
                                                                height: 11,
                                                                position:
                                                                    "relative",
                                                                bottom: 1,
                                                                paddingRight: 5,
                                                                color:
                                                                    "#DDDDDD",
                                                            }}
                                                        />{" "}
                                                        Username
                                                    </div>
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "right"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            paddingLeft:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? 0
                                                                    : 17,
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        {
                                                            this.props
                                                                .user
                                                        }
                                                    </div>
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        padding:
                                                            "0px 20px",
                                                        marginBottom: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "left"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            fontWeight:
                                                                "bold",
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        <FaFastForward
                                                            style={{
                                                                height: 11,
                                                                position:
                                                                    "relative",
                                                                bottom: 1,
                                                                paddingRight: 5,
                                                                color:
                                                                    "#DDDDDD",
                                                            }}
                                                        />{" "}
                                                        Current Period
                                                        Start
                                                    </div>
                                                    {this.state
                                                        .billStart ? (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                paddingLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                color:
                                                                    "#555555",
                                                            }}
                                                        >
                                                            {
                                                                this
                                                                    .state
                                                                    .billStart
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                marginLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                background:
                                                                    "#EBEBEB",
                                                                width: 100,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                position:
                                                                    "relative",
                                                                top: 8,
                                                            }}
                                                        ></div>
                                                    )}
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        padding:
                                                            "0px 20px",
                                                        marginBottom: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "left"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            fontWeight:
                                                                "bold",
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        <FaPause
                                                            style={{
                                                                height: 11,
                                                                position:
                                                                    "relative",
                                                                bottom: 1,
                                                                paddingRight: 5,
                                                                color:
                                                                    "#DDDDDD",
                                                            }}
                                                        />{" "}
                                                        Current Period
                                                        End
                                                    </div>
                                                    {this.state
                                                        .billEnd ? (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                paddingLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                color:
                                                                    "#555555",
                                                            }}
                                                        >
                                                            {
                                                                this
                                                                    .state
                                                                    .billEnd
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                marginLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                background:
                                                                    "#EBEBEB",
                                                                width: 100,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                position:
                                                                    "relative",
                                                                top: 8,
                                                            }}
                                                        ></div>
                                                    )}
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        padding:
                                                            "0px 20px",
                                                        marginBottom: 15,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "left"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            fontWeight:
                                                                "bold",
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        <FaPlay
                                                            style={{
                                                                height: 9,
                                                                position:
                                                                    "relative",
                                                                bottom: 1,
                                                                paddingRight: 5,
                                                                color:
                                                                    "#DDDDDD",
                                                            }}
                                                        />{" "}
                                                        Current Plan
                                                    </div>
                                                    {this.props
                                                        .payment &&
                                                    Object.keys(
                                                        this.props
                                                            .payment
                                                    ).length > 0 &&
                                                    this.props.payment
                                                        .plan &&
                                                    this.props.payment
                                                        .plan
                                                        .nickname ? (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                paddingLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                color:
                                                                    "#555555",
                                                            }}
                                                        >
                                                            {
                                                                this
                                                                    .props
                                                                    .payment
                                                                    .plan
                                                                    .nickname
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                marginLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                background:
                                                                    "#EBEBEB",
                                                                width: 100,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                position:
                                                                    "relative",
                                                                top: 8,
                                                            }}
                                                        ></div>
                                                    )}
                                                </Col>
                                                <Col
                                                    xs={12}
                                                    style={{
                                                        padding:
                                                            "0px 20px",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            float:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "left"
                                                                    : "none",
                                                            display:
                                                                this
                                                                    .state
                                                                    .width >
                                                                700
                                                                    ? "inline"
                                                                    : "block",
                                                            fontWeight:
                                                                "bold",
                                                            color:
                                                                "#555555",
                                                        }}
                                                    >
                                                        <FaTag
                                                            style={{
                                                                height: 11,
                                                                position:
                                                                    "relative",
                                                                bottom: 1,
                                                                paddingRight: 5,
                                                                color:
                                                                    "#DDDDDD",
                                                            }}
                                                        />{" "}
                                                        Free Trial Ends
                                                    </div>
                                                    {this.state
                                                        .trialEnd ? (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                paddingLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                color:
                                                                    "#555555",
                                                            }}
                                                        >
                                                            {
                                                                this
                                                                    .state
                                                                    .trialEnd
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div
                                                            style={{
                                                                float:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "right"
                                                                        : "none",
                                                                display:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? "inline"
                                                                        : "block",
                                                                marginLeft:
                                                                    this
                                                                        .state
                                                                        .width >
                                                                    700
                                                                        ? 0
                                                                        : 17,
                                                                background:
                                                                    "#EBEBEB",
                                                                width: 100,
                                                                height: 6,
                                                                borderRadius: 3,
                                                                position:
                                                                    "relative",
                                                                top: 8,
                                                            }}
                                                        ></div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        loggedIn: state.AuthReducer.logged_in,
        user: state.AuthReducer.username,
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        disk_is_creating: state.DashboardReducer.disk_is_creating,
        id: state.DashboardReducer.id,
        payment: state.DashboardReducer.payment,
        email_verified: state.AuthReducer.email_verified,
        customer: state.DashboardReducer.customer,
        dashboard_loaded: state.DashboardReducer.dashboard_loaded,
        disk_attach_status_id: state.DashboardReducer.disk_attach_status_id
            ? state.DashboardReducer.disk_attach_status_id
            : null,
        disk_creation_message: state.DashboardReducer.disk_creation_message
            ? state.DashboardReducer.disk_creation_message
            : "Create Cloud PC command sent to server.",
    };
}

export default withRouter(connect(mapStateToProps)(Dashboard));
