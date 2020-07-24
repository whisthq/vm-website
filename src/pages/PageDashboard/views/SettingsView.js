import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
    FaPlus,
    FaFighterJet,
    FaSpaceShuttle,
    FaPencilAlt,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

import { fetchDisks } from "store/actions/dashboard/disk_actions";
import { retrieveCustomer } from "store/actions/dashboard/customer_actions";

import SSD from "assets/icons/hard-drive-icon.svg";
import Visa from "assets/icons/payment-icons/visa.svg";
import Mastercard from "assets/icons/payment-icons/mastercard.svg";
import DefaultCard from "assets/icons/payment-icons/default.svg";

class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            loaded: true,
        };
        this.customWidth = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(fetchDisks(this.props.user.username));
        this.props.dispatch(retrieveCustomer());
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        let cardIcon;
        let cardEntries = this.props.cards.map((card) => {
            switch (card.brand) {
                case "Visa":
                    cardIcon = Visa;
                    break;
                case "Mastercard":
                    cardIcon = Mastercard;
                    break;
                default:
                    cardIcon = DefaultCard;
            }
            return (
                <div className="d-flex">
                    <img
                        src={cardIcon}
                        alt="Card icon"
                        style={{ height: 20, marginRight: 10 }}
                    />
                    <div>**** **** **** {card.last4}</div>
                </div>
            );
        });
        if (!cardEntries.length) {
            cardEntries = (
                <div
                    style={{
                        color: "#B9B9B9",
                        marginBottom: 30,
                    }}
                >
                    Use a paid plan to set your credit card
                </div>
            );
        }

        if (!this.state.loaded) {
            return (
                <div
                    style={{
                        backgroundColor: "white",
                        minHeight: "100vh",
                        overflowX: "hidden !important",
                        textAlign: "center",
                    }}
                >
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
                        display: "flex",
                        overflowX: "hidden",
                        position: "relative",
                        bottom: 60,
                    }}
                >
                    <div
                        style={{
                            paddingTop: 40,
                            paddingBottom: 50,
                        }}
                    >
                        <div
                            style={{
                                fontSize: this.state.width > 900 ? 42 : 35,
                                fontWeight: "bold",
                                paddingTop: 20,
                            }}
                        >
                            SETTINGS
                        </div>
                        {this.props.disks && this.props.disks.length > 0 ? (
                            <Row style={{ marginTop: 5 }}>
                                <Col xs={12}>
                                    <Row
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        {this.props.disks.map(
                                            (value, index) => {
                                                return (
                                                    <Col
                                                        sm={6}
                                                        lg={4}
                                                        xl={3}
                                                        style={{
                                                            paddingRight:
                                                                this.state
                                                                    .width > 900
                                                                    ? 20
                                                                    : 0,
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
                                                                padding:
                                                                    "40px 35px",
                                                                marginTop: 35,
                                                                minHeight: 210,
                                                            }}
                                                        >
                                                            <img
                                                                src={SSD}
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
                                                                    marginTop: 25,
                                                                }}
                                                            >
                                                                Storage Disk{" "}
                                                                {index.toString()}
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginTop: 3,
                                                                }}
                                                            >
                                                                {value[
                                                                    "disk_size"
                                                                ].toString() +
                                                                    "GB"}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                );
                                            }
                                        )}
                                        <Col
                                            sm={6}
                                            md={4}
                                            xl={3}
                                            className="pointerOnHover"
                                            style={{
                                                paddingRight:
                                                    this.state.width > 900
                                                        ? 20
                                                        : 0,
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
                        ) : (
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
                                        Create Cloud PC
                                    </div>
                                </div>
                            </Link>
                        )}

                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginTop: 60,
                            }}
                        >
                            Account
                        </div>
                        <div
                            style={{
                                marginTop: 20,
                                backgroundColor: "white",
                                borderRadius: 10,
                                padding: "40px 35px",
                            }}
                        >
                            <Row>
                                <Col sm={6}>
                                    <div
                                        style={{
                                            color: "#5EC4EB",
                                            paddingBottom: 5,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Name
                                    </div>
                                    <div
                                        className="d-flex align-items-center"
                                        style={{ marginBottom: 30 }}
                                    >
                                        <div
                                            style={{
                                                color: this.props.user.name
                                                    ? "black"
                                                    : "#B9B9B9",
                                            }}
                                        >
                                            {this.props.user.name
                                                ? this.props.user.name
                                                : "What is your name?"}
                                        </div>
                                        <FaPencilAlt
                                            style={{
                                                color: "#B9B9B9",
                                                marginLeft: 10,
                                            }}
                                        />
                                    </div>
                                    {!this.props.user.google_login && (
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    color: "#5EC4EB",
                                                    paddingBottom: 5,
                                                }}
                                            >
                                                Email
                                            </div>
                                            <div
                                                className="d-flex align-items-center"
                                                style={{ marginBottom: 30 }}
                                            >
                                                <div
                                                    style={{
                                                        color: "black",
                                                    }}
                                                >
                                                    {this.props.user.username}
                                                </div>
                                                <FaPencilAlt
                                                    style={{
                                                        color: "#B9B9B9",
                                                        marginLeft: 10,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Col>
                                <Col sm={6}>
                                    <div
                                        style={{
                                            fontWeight: 600,
                                            color: "#5EC4EB",
                                            paddingBottom: 5,
                                        }}
                                    >
                                        Credit Card
                                    </div>
                                    {cardEntries}
                                </Col>
                            </Row>
                            <div>Delete Account</div>
                        </div>

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
                                    Advanced settings
                                </div>
                                <div style={{ width: "100%" }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            background:
                                                "linear-gradient(130.61deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            boxShadow:
                                                "0px 4px 15px rgba(0, 0, 0, 0.2)",
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
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            boxShadow:
                                                "0px 4px 15px rgba(0, 0, 0, 0.2)",
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
                                                    CPU, GPU, and RAM
                                                    upgradeability coming soon
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.DashboardReducer.user,
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        id: state.DashboardReducer.id,
        customer: state.DashboardReducer.customer,
        cards: state.DashboardReducer.cards,
    };
}

export default withRouter(connect(mapStateToProps)(SettingsView));
