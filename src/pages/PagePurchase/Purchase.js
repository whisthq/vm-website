import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import Header from "components/header.js";
import TypeformButton from "components/typeformbutton.js";
import "static/Shared.css";
import Autocomplete from "./AutoComplete.js";
import { options } from "./Options.js";
import {
    storePurchaseLocation,
    insertCustomer,
} from "store/actions/dashboard/customer_actions";
import {
    createDisk
} from "store/actions/dashboard/disk_actions";
import SpecBox from "./containers/specBox.js";
import PriceBox from "./containers/priceBox.js";

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            continue: false,
            step: 1.0,
            exit: false,
            location: "",
            continue2: false,
            computer: "",
            plan: "",
            country: "",
            processing: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(storePurchaseLocation(""));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    goBack = () => {
        this.setState({ step: this.state.step - 1 });
    };

    goForward = () => {
        this.setState({ step: this.state.step + 1 });
    };

    setCountry = (country) => {
        this.setState({ country: country });
    };

    encodeComputer = (computer) => {
        if (computer === "Medium") {
            return "NV6";
        } else {
            return "NV12";
        }
    };

    handleClick1 = (supported) => {
        if (supported) {
            this.setState({ step: 2, exit: false });
        } else {
            this.setState({ step: 2, exit: true });
        }
    };

    handleClick2 = () => {
        if (options.includes(this.props.purchase_location)) {
            var unsupported = [
                "Washington",
                "Oregon",
                "California",
                "Nevada",
                "Idaho",
                "Montana",
                "Wyoming",
                "Alaska",
                "South Dakota",
                "North Dakota",
                "Arizona",
                "Hawaii",
            ];
            if (unsupported.includes(this.props.purchase_location)) {
                this.setState(
                    { step: 2, exit: true, continue2: false },
                    function () {
                        this.props.dispatch(storePurchaseLocation(""));
                    }
                );
            } else {
                this.setState(
                    {
                        step: 3,
                        location: this.props.purchase_location,
                        continue2: false,
                    },
                    function () {
                        this.props.dispatch(storePurchaseLocation(""));
                    }
                );
            }
        }
    };

    // Determines the vm region based on location given
    findVMLocation = (location) => {
        var eastus = [
            "Maine",
            "New Hampshire",
            "Massachusetts",
            "New York",
            "Vermont",
            "Rhode Island",
            "Connecticut",
            "New Jersey",
            "Delaware",
            "Maryland",
            "Pennsylvania",
            "Virginia",
            "West Virginia",
            "North Carolina",
            "South Carolina",
            "Georgia",
            "Florida",
            "Alabama",
        ];
        var southcentralus = [
            "Texas",
            "Arkansas",
            "Oklahoma",
            "New Mexico",
            "Louisiana",
            "Colorado",
        ];
        var northcentralus = [
            "Illinois",
            "Ohio",
            "Indiana",
            "Kentucky",
            "Michigan",
            "Tennessee",
            "Wisconsin",
            "Minnesota",
            "Iowa",
            "Missouri",
            "Mississippi",
            "Kansas",
            "Nebraska",
        ];

        if (eastus.includes(location)) {
            return "eastus";
        } else if (southcentralus.includes(location)) {
            return "southcentralus";
        } else if (northcentralus.includes(location)) {
            return "northcentralus";
        }
    };

    // Creates a cloud pc trial for the customer
    submitNoPayment = () => {
        this.setState({ processing: true });
        this.props.dispatch(insertCustomer(this.state.location));
        this.props.dispatch(
            createDisk(
                this.findVMLocation(this.state.location),
                this.encodeComputer(this.state.computer),
                true
            )
        );
    };

    // Proceeds to step 1 of the create cloud pc form
    handleKeyPress1 = (event) => {
        if (event.key === "Enter") {
            if (this.state.country === "United States") {
                this.setState({ step: 2, exit: false });
            } else if (this.state.country === "Non-US") {
                this.setState({ step: 2, exit: true });
            }
        }
    };

    // Proceeds to step 2 of the create cloud pc form
    handleKeyPress2 = (event) => {
        if (
            event.key === "Enter" &&
            options.includes(this.props.purchase_location)
        ) {
            if (this.state.continue2) {
                this.handleClick2();
            } else {
                this.setState({ continue2: true });
            }
        }
    };

    // Proceeds to step 3 of the create cloud pc form
    handleKeyPress3 = (event) => {
        if (event.key === "Enter") {
            this.setState({ step: 4 });
        }
    };

    // Creates a trial account
    handleKeyPress4 = (event) => {
        if (event.key === "Enter") {
            this.submitNoPayment();
        }
    };

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        const renderLeftMenu = () => {
            if (this.state.width > 700) {
                if (this.state.step === 1) {
                    return (
                        <div>
                            <div style={{ paddingBottom: 20 }}>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: "#111111",
                                    }}
                                >
                                    Country
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.country}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>State</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.location}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>
                                    Cloud PC Type
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.computer}
                                </div>
                            </div>
                        </div>
                    );
                } else if (this.state.step === 2) {
                    return (
                        <div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>Country</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.country}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        color: "#111111",
                                    }}
                                >
                                    State
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.location}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>
                                    Cloud PC Type
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.computer}
                                </div>
                            </div>
                        </div>
                    );
                } else if (this.state.step === 3) {
                    return (
                        <div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>Country</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.country}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>State</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.location}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div
                                    style={{
                                        color: "#111111",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Cloud PC Type
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.computer}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>Country</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.country}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>State</div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.location}
                                </div>
                            </div>
                            <div style={{ paddingBottom: 20 }}>
                                <div style={{ color: "#B9B9B9" }}>
                                    Cloud PC Type
                                </div>
                                <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                    {this.state.computer}
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                return <div></div>;
            }
        };

        const renderSurvey = () => {
            if (this.state.step === 1) {
                return (
                    <div
                        style={{
                            paddingTop: 100,
                            paddingLeft: 0,
                            width:
                                this.state.width > 700
                                    ? "calc(100% - 400px)"
                                    : "90%",
                            overflowX: "hidden !important",
                            paddingRight: this.state.width > 700 ? 0 : 40,
                        }}
                    >
                        <div
                            style={{
                                padding: "40px 50px",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                borderRadius: 5,
                                width: "100%",
                                maxWidth: 1200,
                            }}
                        >
                            {this.state.width > 700 ? (
                                <span
                                    style={{ position: "relative", bottom: 2 }}
                                >
                                    1{" "}
                                    <FaArrowRight
                                        style={{
                                            height: 10,
                                            position: "relative",
                                            bottom: 2,
                                        }}
                                    />
                                </span>
                            ) : (
                                <div></div>
                            )}
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                Do you live in the United States?
                            </span>
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#333333",
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    fontSize: 16,
                                }}
                            >
                                Currently, Fractal only has servers in certain
                                geographic locations.
                            </div>
                            {this.state.country === "" ? (
                                <div
                                    style={{
                                        outline: "none",
                                        marginTop: 20,
                                        display:
                                            this.state.width > 700
                                                ? "flex"
                                                : "block",
                                        justifyContent: "space-between",
                                        width: 480,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            this.setCountry("United States")
                                        }
                                        style={{
                                            maxWidth: 150,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TypeformButton
                                            buttonLabel="Y"
                                            buttonText="Yes"
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            this.setCountry("Non-US")
                                        }
                                        style={{ maxWidth: 150 }}
                                    >
                                        <TypeformButton
                                            buttonLabel="N"
                                            buttonText="No"
                                        />
                                    </div>
                                    <Button
                                        disabled="true"
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            width: 140,
                                            height: 42,
                                            fontSize: 14,
                                            marginTop:
                                                this.state.width > 700
                                                    ? 10
                                                    : 15,
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            ) : this.state.country === "United States" ? (
                                <div
                                    tabIndex="0"
                                    onKeyDown={(e) => this.handleKeyPress1(e)}
                                    style={{
                                        marginTop: 20,
                                        display:
                                            this.state.width > 700
                                                ? "flex"
                                                : "block",
                                        justifyContent: "space-between",
                                        width: 480,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            this.setCountry("United States")
                                        }
                                        style={{
                                            maxWidth: 150,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TypeformButton
                                            buttonLabel="Y"
                                            buttonText="Yes"
                                            checked
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            this.setCountry("Non-US")
                                        }
                                        style={{ maxWidth: 150 }}
                                    >
                                        <TypeformButton
                                            buttonLabel="N"
                                            buttonText="No"
                                        />
                                    </div>
                                    <Button
                                        onClick={() => this.handleClick1(true)}
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            width: 140,
                                            height: 42,
                                            fontSize: 14,
                                            marginTop:
                                                this.state.width > 700
                                                    ? 10
                                                    : 15,
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            ) : (
                                <div
                                    tabIndex="0"
                                    onKeyDown={(e) => this.handleKeyPress1(e)}
                                    style={{
                                        marginTop: 20,
                                        display:
                                            this.state.width > 700
                                                ? "flex"
                                                : "block",
                                        justifyContent: "space-between",
                                        width: 480,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <div
                                        onClick={() =>
                                            this.setCountry("United States")
                                        }
                                        style={{
                                            maxWidth: 150,
                                            marginBottom: 5,
                                        }}
                                    >
                                        <TypeformButton
                                            buttonLabel="Y"
                                            buttonText="Yes"
                                        />
                                    </div>
                                    <div
                                        onClick={() =>
                                            this.setCountry("Non-US")
                                        }
                                        style={{ maxWidth: 150 }}
                                    >
                                        <TypeformButton
                                            buttonLabel="N"
                                            buttonText="No"
                                            checked
                                        />
                                    </div>
                                    <Button
                                        onClick={() => this.handleClick1(false)}
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            width: 140,
                                            height: 42,
                                            fontSize: 14,
                                            marginTop:
                                                this.state.width > 700
                                                    ? 10
                                                    : 15,
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            )}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 25,
                                    right: 40,
                                    boxShadow:
                                        "0px 4px 20px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <Link to="/dashboard">
                                    <div
                                        className="typeform-up"
                                        style={{
                                            display: "inline",
                                            borderRadius: "5px 0px 0px 5px",
                                            backgroundColor: "#5ec3eb",
                                            color: "white",
                                            padding: "5px 10px",
                                            borderRight: "solid 0.5px #0b172b",
                                        }}
                                    >
                                        <FaAngleUp
                                            style={{
                                                height: 20,
                                                position: "relative",
                                                bottom: 2,
                                                color: "#0b172b",
                                            }}
                                        />
                                    </div>
                                </Link>
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
            } else if (this.state.step === 2 && this.state.exit) {
                return (
                    <div
                        style={{
                            paddingTop: 100,
                            paddingLeft: 0,
                            width:
                                this.state.width > 700
                                    ? "calc(100% - 400px)"
                                    : "95%",
                            overflowX: "hidden !important",
                            paddingRight: 40,
                        }}
                    >
                        <div
                            style={{
                                padding: "40px 50px",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                borderRadius: 5,
                                maxWidth: 1200,
                                fontSize: 16,
                                lineHeight: 1.6,
                            }}
                        >
                            <div style={{ fontSize: 26, marginBottom: 20 }}>
                                We'll be available in your area soon
                            </div>
                            <div>
                                Currently, Fractal is only available in the
                                Eastern and Midwestern United States due to the
                                locations of our servers. We are quickly
                                expanding to West Coast and beyond; if you'd
                                like to be notified when Fractal is available in
                                your location, please join our wait list!
                            </div>
                            <HashLink
                                to="/#beta"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    style={{
                                        display: "inline",
                                        marginTop: 50,
                                        padding:
                                            this.state.width > 700
                                                ? "12px 50px"
                                                : "12px 30px",
                                        background: "#111111",
                                        border: "none",
                                        color: "white",
                                        boxShadow:
                                            "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    Join Wait List
                                </Button>
                            </HashLink>
                        </div>
                        <div
                            style={{
                                display: "inline",
                                fontSize: 12,
                                marginTop: 40,
                                color: "#333333",
                                marginLeft: 25,
                                position: "relative",
                                top: 24,
                            }}
                        ></div>
                        <div
                            style={{
                                position: "absolute",
                                bottom: 25,
                                right: 40,
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
                            }}
                        >
                            <div
                                onClick={this.goBack}
                                style={{
                                    display: "inline",
                                    borderRadius: "5px 0px 0px 5px",
                                    backgroundColor: "#5ec3eb",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRight: "solid 0.5px #0b172b",
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
                );
            } else if (this.state.step === 2 && !this.state.exit) {
                return (
                    <div
                        style={{
                            paddingTop: 100,
                            paddingLeft: 0,
                            width:
                                this.state.width > 700
                                    ? "calc(100% - 400px)"
                                    : "95%",
                            paddingRight: this.state.width > 700 ? 0 : 40,
                        }}
                        onKeyPress={this.handleKeyPress2}
                    >
                        <div
                            className="state-select"
                            style={{
                                padding: "40px 50px",
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                borderRadius: 5,
                                maxWidth: 1200,
                                maxHeight: "calc(100vh - 150px)",
                            }}
                        >
                            {this.state.width > 700 ? (
                                <span
                                    style={{ position: "relative", bottom: 2 }}
                                >
                                    2{" "}
                                    <FaArrowRight
                                        style={{
                                            height: 10,
                                            position: "relative",
                                            bottom: 2,
                                        }}
                                    />
                                </span>
                            ) : (
                                <div></div>
                            )}
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                What state do you live in?
                            </span>
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#333333",
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    fontSize: 16,
                                }}
                            >
                                So we can find servers closest to you.
                            </div>
                            <div
                                style={{
                                    marginTop: 30,
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                }}
                            >
                                <Autocomplete
                                    width={this.state.width}
                                    height={this.state.height}
                                    default={this.state.location}
                                    options={options}
                                />
                                {options.includes(
                                    this.props.purchase_location
                                ) ? (
                                    <Button
                                        onClick={this.handleClick2}
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            padding: "10px 25px",
                                            display: "inline",
                                            position: "relative",
                                            bottom: 2,
                                            marginTop:
                                                this.state.width > 700 ? 0 : 15,
                                            width:
                                                this.state.width > 500
                                                    ? 150
                                                    : "90%",
                                        }}
                                    >
                                        Continue
                                    </Button>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <div
                                style={{
                                    position: "fixed",
                                    bottom: 25,
                                    right: 40,
                                    boxShadow:
                                        "0px 4px 20px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div
                                    onClick={this.goBack}
                                    style={{
                                        display: "inline",
                                        borderRadius: "5px 0px 0px 5px",
                                        backgroundColor: "#5ec3eb",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRight: "solid 0.5px #0b172b",
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
            } else if (this.state.step === 3) {
                return (
                    <div
                        tabIndex="0"
                        onKeyDown={(e) => this.handleKeyPress3(e)}
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
                            {this.state.width > 700 ? (
                                <span
                                    style={{ position: "relative", bottom: 2 }}
                                >
                                    3{" "}
                                    <FaArrowRight
                                        style={{
                                            height: 10,
                                            position: "relative",
                                            bottom: 2,
                                        }}
                                    />
                                </span>
                            ) : (
                                <div></div>
                            )}
                            <span
                                style={{
                                    fontSize: 22,
                                    paddingLeft:
                                        this.state.width > 700 ? 10 : 0,
                                }}
                            >
                                Choose Your Cloud Computer
                            </span>
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#333333",
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    fontSize: 16,
                                    maxWidth: 650,
                                }}
                            >
                                Select the specs that best suit your needs. You
                                can always upgrade or downgrade later.
                            </div>
                            <Row
                                style={{
                                    marginTop: 50,
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    maxWidth: 800,
                                }}
                            >
                                <Col
                                    md={6}
                                    className="pointerOnHover"
                                    style={{
                                        marginBottom:
                                            this.state.width > 700 ? 0 : 20,
                                        paddingRight:
                                            this.state.width > 700 ? 0 : 40,
                                    }}
                                    onClick={() =>
                                        this.setState({ computer: "Medium" })
                                    }
                                >
                                    <SpecBox
                                        name="Medium"
                                        cpu="6"
                                        gpu="1/2"
                                        ram="56"
                                        description="For 3D modeling, medium rendering, gaming."
                                        pricing="Start with free trial"
                                        color={
                                            this.state.computer === "Medium"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={
                                            this.state.computer === "Medium"
                                        }
                                    />
                                </Col>
                                <Col
                                    md={6}
                                    style={{
                                        marginBottom:
                                            this.state.width > 700 ? 0 : 20,
                                        paddingRight:
                                            this.state.width > 700 ? 0 : 40,
                                    }}
                                >
                                    <SpecBox
                                        name="Heavy"
                                        cpu="12"
                                        gpu="1"
                                        ram="112"
                                        description={
                                            <div
                                                style={{
                                                    background: "#111111",
                                                    color: "white",
                                                    padding: "5px 10px",
                                                    borderRadius: 5,
                                                    width: 125,
                                                    textAlign: "center",
                                                    fontSize: 14,
                                                }}
                                            >
                                                Coming Soon
                                            </div>
                                        }
                                        pricing="$5/mo + $1.30/hr"
                                        color={
                                            this.state.computer === "Heavy"
                                                ? "rgba(94, 195, 235, 0.1)"
                                                : "white"
                                        }
                                        checked={
                                            this.state.computer === "Heavy"
                                        }
                                    />
                                </Col>
                            </Row>
                            {this.state.computer !== "" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: 310,
                                        marginTop: 40,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <Button
                                        onClick={() =>
                                            this.setState({ step: 4 })
                                        }
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            padding: "10px 45px",
                                            display: "inline",
                                        }}
                                    >
                                        Continue
                                    </Button>
                                    {this.state.width > 700 ? (
                                        <div
                                            style={{
                                                fontSize: 14,
                                                color: "#555555",
                                                position: "relative",
                                                top: 12,
                                            }}
                                        >
                                            <FaArrowRight
                                                style={{
                                                    marginRight: 6,
                                                    height: 8,
                                                    width: 15,
                                                    position: "relative",
                                                    bottom: 1,
                                                }}
                                            />
                                            Press Enter
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: 375,
                                        marginTop: 40,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <Button
                                        disabled="true"
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            padding: "10px 45px",
                                            display: "inline",
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </div>
                            )}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 25,
                                    right: 40,
                                    boxShadow:
                                        "0px 4px 20px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div
                                    onClick={this.goBack}
                                    style={{
                                        display: "inline",
                                        borderRadius: "5px 0px 0px 5px",
                                        backgroundColor: "#5ec3eb",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRight: "solid 0.5px #0b172b",
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
            } else {
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
                            {this.state.width > 700 ? (
                                <span
                                    style={{ position: "relative", bottom: 2 }}
                                >
                                    4{" "}
                                    <FaArrowRight
                                        style={{
                                            height: 10,
                                            position: "relative",
                                            bottom: 2,
                                        }}
                                    />
                                </span>
                            ) : (
                                <div></div>
                            )}
                            {this.props.credits === 0 ? (
                                <span
                                    style={{
                                        fontSize: 22,
                                        paddingLeft:
                                            this.state.width > 700 ? 10 : 0,
                                    }}
                                >
                                    Your First Week Is On Us!
                                </span>
                            ) : this.props.credits === 1 ? (
                                <span
                                    style={{
                                        fontSize: 22,
                                        paddingLeft:
                                            this.state.width > 700 ? 10 : 0,
                                    }}
                                >
                                    Your First Month Is On Us!
                                </span>
                            ) : (
                                <span
                                    style={{
                                        fontSize: 22,
                                        paddingLeft:
                                            this.state.width > 700 ? 10 : 0,
                                    }}
                                >
                                    Your First {this.props.credits} Months Is On
                                    Us!
                                </span>
                            )}
                            <div
                                style={{
                                    marginTop: 5,
                                    color: "#333333",
                                    paddingLeft:
                                        this.state.width > 700 ? 39 : 0,
                                    fontSize: 16,
                                    maxWidth: 650,
                                }}
                            >
                                After your free trial, you'll have the
                                opportunity to select one of these plans,
                                depending on your computing needs. We hope that
                                your free trial will help you figure out which
                                plan works best for you!
                            </div>
                            <Row
                                style={{
                                    marginTop: 50,
                                    paddingLeft:
                                        this.state.width > 700 ? 55 : 16,
                                }}
                            >
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    onClick={() =>
                                        this.setState({ plan: "Hourly" })
                                    }
                                >
                                    <PriceBox
                                        color="white"
                                        subText="Starts with free trial"
                                        name="Hourly"
                                        price="5"
                                        details="+$0.70 / hr of usage"
                                        hide_checkbox
                                    />
                                </Col>
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    onClick={() =>
                                        this.setState({ plan: "Monthly" })
                                    }
                                >
                                    <PriceBox
                                        color="white"
                                        subText="Starts with free trial"
                                        name="Monthly"
                                        price="39"
                                        details={
                                            <div>
                                                6 hr / day
                                                <br />
                                                +$0.50 per extra hr
                                            </div>
                                        }
                                        hide_checkbox
                                    />
                                </Col>
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0 }}
                                    onClick={() =>
                                        this.setState({ plan: "Unlimited" })
                                    }
                                >
                                    <PriceBox
                                        color="white"
                                        subText="Starts with free trial"
                                        name="Unlimited"
                                        price="99"
                                        details="Unlimited daily usage"
                                        hide_checkbox
                                    />
                                </Col>
                            </Row>
                            {this.state.processing ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: 355,
                                        marginTop: 40,
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
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
                                        paddingLeft:
                                            this.state.width > 700 ? 39 : 0,
                                    }}
                                >
                                    <Button
                                        onClick={this.submitNoPayment}
                                        style={{
                                            background: "#111111",
                                            border: "none",
                                            padding: "10px 45px",
                                            display: "inline",
                                            width: 235,
                                        }}
                                    >
                                        Create My Cloud PC
                                    </Button>
                                </div>
                            )}
                            <div
                                style={{
                                    float:
                                        this.state.width > 700
                                            ? "none"
                                            : "right",
                                    marginTop: this.state.width > 700 ? 0 : 20,
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
                                    onClick={this.goBack}
                                    style={{
                                        display: "inline",
                                        borderRadius: "5px 0px 0px 5px",
                                        backgroundColor: "#5ec3eb",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRight: "solid 0.5px #0b172b",
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
            }
        };

        return (
            <div
                style={{
                    minHeight: "100vh",
                    paddingBottom: 50,
                    background: "#F6F6F6",
                }}
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
        loggedIn: state.AuthReducer.logged_in,
        user: state.AuthReducer.username,
        vms:
            typeof state.DashboardReducer.vm_credentials == "undefined"
                ? []
                : state.DashboardReducer.vm_credentials,
        credits: state.DashboardReducer.credits,
        purchase_location: state.DashboardReducer.purchase_location,
    };
}

export default connect(mapStateToProps)(Purchase);
