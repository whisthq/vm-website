import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import "../../static/App.css";

import Header from "../../shared_components/header.js";
import {
    logout,
    retrieveCustomer,
    vmCreating,
    cancelPlan,
    fetchDisks,
    sendFriendsEmail,
    fetchDiskStatus,
    emailSent,
    triggerSurvey,
    submitPurchaseFeedback,
    dashboardLoaded,
} from "../../actions/index.js";
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
    FaFighterJet,
    FaSpaceShuttle
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

import CPU from "../../assets/cpu.svg";
import GPU from "../../assets/gpu.svg";
import RAM from "../../assets/ram.svg";
import SSD from "../../assets/hard-drive-icon.svg";
import WindowsBin from "../../bin/Fractal.exe";
import MacBin from "../../bin/Fractal.dmg";
import LinuxBin from "../../bin/Fractal.AppImage";
import Mountain from "../../assets/mountain.jpg";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            day: 0,
            month: 0,
            year: 0,
            loaded: true
        };
        this.customWidth = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
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
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


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

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        if (this.state.waitlist) {
            return (
                <div
                    style={{
                        backgroundColor: "white",
                        minHeight: "100vh",
                        overflowX: "hidden !important",
                        textAlign: "center",
                    }}
                >
                    <Header color="#333333" button="#5ec3eb" />
                    <div
                        style={{
                            paddingTop: 200,
                            textAlign: "center",
                            maxWidth: 500,
                            margin: "auto",
                            marginBottom: 60,
                        }}
                    >
                        {this.state.month} {this.state.day}, {this.state.year}:
                        Fractal is currently undergoing a major update and will
                        be back online within a few days. We apologize for the
                        inconvenience!
                    </div>
                    <HashLink
                        to="/#top"
                        style={{ outline: "none", textDecoration: "none" }}
                    >
                        <Button
                            style={{
                                color: "#5ec3eb",
                                border: "none",
                                fontWeight: "bold",
                                padding: "12px 25px",
                                outline: "none",
                                background: "rgba(94, 195, 235,0.1)",
                            }}
                        >
                            Back to Home
                        </Button>
                    </HashLink>
                </div>
            );
        } else if (!this.state.loaded) {
            return (
                <div
                    style={{
                        backgroundColor: "white",
                        minHeight: "100vh",
                        overflowX: "hidden !important",
                        textAlign: "center",
                    }}
                >
                    <Header color="#333333" button="#5ec3eb" />
                    <div
                        style={{
                            paddingTop: 250,
                            textAlign: "center",
                            maxWidth: 500,
                            margin: "auto",
                            marginBottom: 60,
                            fontSize: 50,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{ color: "#111111" }}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        backgroundColor: "#F6F6F6",
                        minHeight: "100vh",
                        overflowX: "hidden !important",
                        justifyContent: "center",
                    }}
                >
                    {!this.props.loggedIn || !this.props.email_verified ? (
                        <Redirect to="/auth" />
                    ) : (
                        <div style={{ maxWidth: 1920, margin: "auto" }}>
                            <div>
                                <Header color="#111111" button="#5ec3eb" />
                                {this.props.show_survey &&
                                this.state.width > 700 ? (
                                    <Popup
                                        open={true}
                                        contentStyle={{
                                            width: 500,
                                            borderRadius: 5,
                                            backgroundColor: "#EBEBEB",
                                            border: "none",
                                            height: 275,
                                            padding: "30px 50px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <div className="exit-survey">
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 22,
                                                    margin: "auto",
                                                    width: "100%",
                                                }}
                                            >
                                                <strong>
                                                    Thank You For Creating a
                                                    Cloud PC!
                                                </strong>
                                            </div>
                                            <textarea
                                                onChange={
                                                    this.changePurchaseFeedback
                                                }
                                                rows="4"
                                                cols="52"
                                                placeholder="We hope you love it. Please take a minute to tell us what you plan on using Fractal for (i.e. creative work, gaming, etc)."
                                                style={{
                                                    outline: "none",
                                                    resize: "none",
                                                    background: "none",
                                                    border: "none",
                                                    marginTop: 20,
                                                    fontSize: 14,
                                                    padding: 0,
                                                }}
                                            ></textarea>
                                            <button
                                                onClick={
                                                    this.submitPurchaseFeedback
                                                }
                                                style={{
                                                    border: "none",
                                                    fontWeight: "bold",
                                                    marginTop: 25,
                                                    outline: "none",
                                                    width: "100%",
                                                    fontSize: 14,
                                                    borderRadius: 5,
                                                    padding: "10px 10px",
                                                    color: "#5ec3eb",
                                                    background:
                                                        "rgba(94, 195, 235,0.1)",
                                                }}
                                            >
                                                SUBMIT FEEDBACK
                                            </button>
                                        </div>
                                    </Popup>
                                ) : (
                                    <div></div>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        overflowX: "hidden",
                                        position: "relative",
                                        bottom: 60,
                                    }}
                                >
                                    {this.state.width > 700 ? (
                                        <div
                                            style={{
                                                width: 300,
                                                paddingLeft: 80,
                                                paddingTop: 120,
                                                backgroundColor: "none",
                                                flex: "0 1 auto",
                                                zIndex: 0,
                                                position: "sticky",
                                            }}
                                        >
                                            <Link to = "/dashboard"
                                                style={{
                                                    marginBottom: 20,
                                                    color: "#B9B9B9",
                                                    textDecoration: "none",
                                                    display: "block"
                                                }}
                                            >
                                                DASHBOARD
                                            </Link>
                                            <Link to = "/settings" 
                                                className="sign-out-button" 
                                                style = {{textDecoration: "none",
                                                          color: "#111111",
                                                          fontWeight: "bold"}}
                                            >
                                                SETTINGS
                                            </Link>
                                            <div
                                                className="sign-out-button"
                                                onClick={() =>
                                                    this.props.dispatch(
                                                        logout()
                                                    )
                                                }
                                                style = {{
                                                    marginTop: 15
                                                }}
                                            >
                                                SIGN OUT
                                            </div>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <div
                                        style={{
                                            paddingTop: 40,
                                            paddingLeft:
                                                this.state.width > 700
                                                    ? 25
                                                    : 40,
                                            paddingRight:
                                                this.state.width > 700 ? 0 : 40,
                                            paddingBottom: 50,
                                            width:
                                                this.state.width > 700
                                                    ? "calc(100% - 400px)"
                                                    : "100%",
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    display:
                                                        this.state.width > 700
                                                            ? "block"
                                                            : "block",
                                                    float:
                                                        this.state.width > 700
                                                            ? "none"
                                                            : "none",
                                                    marginTop:
                                                        this.state.width > 700
                                                            ? 0
                                                            : 50,
                                                }}
                                            >
                                                {this.state.month}{" "}
                                                {this.state.day},{" "}
                                                {this.state.year}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                fontSize:
                                                    this.state.width > 700
                                                        ? 42
                                                        : 35,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            SETTINGS
                                        </div>
                                        {
                                        this.props.disks 
                                        ?
                                        <Row style={{ marginTop: 40 }}>
                                            <Col xs={12}>
                                                <div
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        marginBottom: 20,
                                                        display: "inline",
                                                    }}
                                                >
                                                    Cloud PC Storage
                                                </div>
                                                <Row style = {{width: "100%"}}>
                                                    {this.props.disks.map((value, index) => {
                                                        return(
                                                            <Col sm = {6} md = {3}
                                                                style = {{paddingRight: this.state.width > 700 ? 20 : 0}}
                                                            >
                                                                <div style={{
                                                                    fontSize: 14,
                                                                    background:
                                                                        "rgba(94, 195, 235, 0.06)",
                                                                    boxShadow:
                                                                        "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                    borderRadius: 7,
                                                                    padding:
                                                                        "40px 35px",
                                                                    marginTop: 35,
                                                                    minHeight: 210
                                                                }}>
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
                                                                    <div style = {{fontWeight: 'bold', fontSize: 18, marginTop: 25}}>
                                                                        Storage Disk {index.toString()}
                                                                    </div>
                                                                    <div style = {{marginTop: 3}}>
                                                                        {value["disk_size"].toString() + "GB"}
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        );
                                                    })}
                                                    <Col sm = {6} md = {3}
                                                        className = "pointerOnHover"
                                                        style = {{paddingRight: this.state.width > 700 ? 20 : 0}}
                                                    >
                                                        <Link to = "/storage"
                                                            style = {{
                                                                textDecoration: "none"
                                                            }}>
                                                            <div style={{
                                                                fontSize: 14,
                                                                background:
                                                                    "#0B172B",
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                borderRadius: 7,
                                                                padding:
                                                                    "40px 35px",
                                                                marginTop: 35,
                                                                minHeight: 210,
                                                                textAlign: "center",
                                                                color: "white"
                                                            }}>
                                                                <FaPlus style = {{
                                                                    fontSize: 25, 
                                                                    marginTop: 20
                                                                }}
                                                                />
                                                                <div style = {{
                                                                    marginTop: 32,
                                                                    fontSize: 16
                                                                }}>
                                                                    Add More Storage
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        :
                                        <Row style={{ marginTop: 40 }}>
                                            <Col xs={12}>
                                                <div
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        marginBottom: 20,
                                                        display: "inline",
                                                    }}
                                                >
                                                    Storage
                                                </div>
                                                <Row style = {{width: "100%"}}>

                                                    <Col sm = {6} md = {3}
                                                        className = "pointerOnHover"
                                                        style = {{paddingRight: this.state.width > 700 ? 20 : 0}}
                                                    >
                                                        <Link
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                            to="/purchase"
                                                        >
                                                            <div style={{
                                                                fontSize: 14,
                                                                background:
                                                                    "#0B172B",
                                                                boxShadow:
                                                                    "0px 4px 15px rgba(0, 0, 0, 0.2)",
                                                                borderRadius: 7,
                                                                padding:
                                                                    "40px 35px",
                                                                marginTop: 35,
                                                                minHeight: 210,
                                                                textAlign: "center",
                                                                color: "white"
                                                            }}>
                                                                <FaPlus style = {{fontSize: 25, marginTop: 20}}/>
                                                                <div style = {{
                                                                    marginTop: 32,
                                                                    fontSize: 16
                                                                }}>
                                                                    Create Cloud PC
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        }
                                        <Row style={{ marginTop: 60 }}>
                                            <Col sm={6} xs={12}>
                                                <div
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        marginBottom: 20,
                                                        display: "inline",
                                                    }}
                                                >
                                                    Account
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            background:
                                                                "linear-gradient(130.61deg, #F2DEF8 2.24%, #D7F5F5 100%)",
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
                                                            marginBottom: 40,
                                                            border: "solid 10px white"
                                                        }}
                                                    >
                                                        <Row
                                                            style={{
                                                                width: "100%",
                                                                margin: 0
                                                            }}
                                                        >
                                                            <Col
                                                                xs={12}
                                                                style={{
                                                                    padding:
                                                                        "0px 20px",
                                                                    marginBottom: 15,
                                                                    textAlign: "center"
                                                                }}
                                                            >    
                                                                <FaFighterJet style = {{
                                                                    color: "#111111",
                                                                    fontSize: 40,
                                                                    marginTop: 10
                                                                }}/>
                                                                <div style = {{
                                                                    color: "#111111", 
                                                                    fontSize: 16, 
                                                                    margin: "auto",
                                                                    marginTop: 30,
                                                                    maxWidth: 250
                                                                }}>
                                                                    More account configurability
                                                                    coming soon
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col sm={6} xs={12}>
                                                <div
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: "bold",
                                                        marginBottom: 20,
                                                        display: "inline",
                                                    }}
                                                >
                                                    Cloud PC Hardware
                                                </div>
                                                <div style={{ width: "100%" }}>
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            background:
                                                                "linear-gradient(130.61deg, #F2DEF8 2.24%, #D7F5F5 100%)",
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
                                                            border: "solid 10px white"
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
                                                                    textAlign: "center"
                                                                }}
                                                            >    
                                                                <FaSpaceShuttle style = {{
                                                                    color: "#111111",
                                                                    fontSize: 40,
                                                                    marginTop: 10
                                                                }}/>
                                                                <div style = {{
                                                                    color: "#111111", 
                                                                    fontSize: 16, 
                                                                    margin: "auto",
                                                                    marginTop: 30,
                                                                    maxWidth: 250
                                                                }}>
                                                                    CPU, GPU, and RAM upgradeability coming soon
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
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
    return {
        loggedIn: state.AccountReducer.loggedIn,
        user: state.AccountReducer.user,
        disks:
            typeof state.AccountReducer.disks === "undefined"
                ? []
                : state.AccountReducer.disks,
        id: state.AccountReducer.id,
        email_verified: state.AccountReducer.email_verified,
        customer: state.AccountReducer.customer
    };
}

export default withRouter(connect(mapStateToProps)(Settings));
