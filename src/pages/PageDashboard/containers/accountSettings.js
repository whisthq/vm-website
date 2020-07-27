import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { FaPencilAlt } from "react-icons/fa";

import Visa from "assets/icons/payment-icons/visa.svg";
import Mastercard from "assets/icons/payment-icons/mastercard.svg";
import DefaultCard from "assets/icons/payment-icons/default.svg";

import {
    updateEmail,
    updateName,
    deleteUser,
    updatePassword,
} from "store/actions/dashboard/customer_actions";

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: "",
            newName: "",
            newPass: "",
            confirmPassword: "",
        };
    }

    editEmail = (e) => {
        this.setState({ newEmail: e.target.value });
    };

    changeEmail = () => {
        console.log("Change email");
        this.props.dispatch(updateEmail(this.state.newEmail));
        this.setState({ newEmail: "" });
    };

    editName = (e) => {
        this.setState({ newName: e.target.value });
    };

    changeName = () => {
        this.props.dispatch(updateName(this.state.newName));
        this.setState({ newName: "" });
    };

    changeCreditCard = () => {
        console.log("Change credit card");
    };

    editPassword = (e) => {
        this.setState({ newPass: e.target.value });
    };

    changePassword = () => {
        this.props.dispatch(updatePassword(this.state.newPass));
        this.setState({ newPass: "", confirmPassword: "" });
    };

    editConfirmationPass = (e) => {
        this.setState({ confirmPassword: e.target.value });
    };

    deleteAccount = () => {
        this.props.dispatch(deleteUser());
    };

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
                    <FaPencilAlt
                        style={{
                            color: "#B9B9B9",
                            marginLeft: 10,
                            cursor: "pointer",
                        }}
                    />
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
        let passwordsEquals = this.state.newPass === this.state.confirmPassword;
        let validPassword =
            this.state.newPass.length >= 8 &&
            /[A-Z]/.test(this.state.newPass) &&
            /[0-9]/.test(this.state.newPass) &&
            passwordsEquals;

        return (
            <div>
                {" "}
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
                                <Popup
                                    modal
                                    trigger={
                                        <FaPencilAlt
                                            style={{
                                                color: "#B9B9B9",
                                                marginLeft: 10,
                                                cursor: "pointer",
                                            }}
                                        />
                                    }
                                    contentStyle={{
                                        width: 500,
                                        borderRadius: 5,
                                        backgroundColor: "#EBEBEB",
                                        border: "none",
                                        padding: "30px 50px",
                                    }}
                                >
                                    {(close) => (
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 20,
                                                }}
                                            >
                                                Change your name
                                            </div>
                                            <textarea
                                                onChange={this.editName}
                                                placeholder="John"
                                                rows={1}
                                                style={{
                                                    outline: "none",
                                                    resize: "none",
                                                    background: "#F4F4F4",
                                                    border: "none",
                                                    marginTop: 40,
                                                    padding: "10px 20px",
                                                    borderRadius: 3,
                                                    width: "100%",
                                                }}
                                            />
                                            <Button
                                                onClick={() => {
                                                    this.changeName();
                                                    close();
                                                }}
                                                style={{
                                                    fontWeight: "bold",
                                                    marginTop: 20,
                                                    outline: "none",
                                                    width: "100%",
                                                    borderRadius: 3,
                                                    float: "right",
                                                    padding: "10px 10px",
                                                    border: "none",
                                                    color: "white",
                                                    backgroundColor: "#0B172B",
                                                }}
                                                disabled={!this.state.newName}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    )}
                                </Popup>
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
                                        <Popup
                                            modal
                                            trigger={
                                                <FaPencilAlt
                                                    style={{
                                                        color: "#B9B9B9",
                                                        marginLeft: 10,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            }
                                            contentStyle={{
                                                width: 500,
                                                borderRadius: 5,
                                                backgroundColor: "#EBEBEB",
                                                border: "none",
                                                padding: "30px 50px",
                                            }}
                                        >
                                            {(close) => (
                                                <div>
                                                    <div
                                                        style={{
                                                            fontWeight: "bold",
                                                            fontSize: 20,
                                                        }}
                                                    >
                                                        Change your email
                                                    </div>
                                                    <textarea
                                                        onChange={
                                                            this.editEmail
                                                        }
                                                        placeholder="Your new email address"
                                                        rows={1}
                                                        style={{
                                                            outline: "none",
                                                            resize: "none",
                                                            background:
                                                                "#F4F4F4",
                                                            border: "none",
                                                            marginTop: 40,
                                                            padding:
                                                                "10px 20px",
                                                            borderRadius: 3,
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            this.changeEmail();
                                                            close();
                                                        }}
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginTop: 20,
                                                            outline: "none",
                                                            width: "100%",
                                                            borderRadius: 3,
                                                            float: "right",
                                                            padding:
                                                                "10px 10px",
                                                            border: "none",
                                                            color: "white",
                                                            backgroundColor:
                                                                "#0B172B",
                                                        }}
                                                        disabled={
                                                            !this.state.newEmail
                                                        }
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            )}
                                        </Popup>
                                    </div>
                                </div>
                            )}
                        </Col>
                        <Col sm={6}>
                            <div style={{ marginBottom: 30 }}>
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
                            </div>
                            {!this.props.user.google_login && (
                                <Popup
                                    modal
                                    trigger={
                                        <Button
                                            style={{
                                                fontWeight: "bold",
                                                outline: "none",
                                                borderRadius: 3,
                                                padding: "10px 20px",
                                                border: "none",
                                                color: "#1BA8F4",
                                                background:
                                                    "rgba(94,195,235,0.2)",
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                    }
                                    contentStyle={{
                                        width: 600,
                                        borderRadius: 5,
                                        backgroundColor: "#EBEBEB",
                                        border: "none",
                                        padding: "50px 30px",
                                    }}
                                >
                                    {(close) => (
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: "bold",
                                                    fontSize: 20,
                                                }}
                                            >
                                                Change your password
                                            </div>
                                            <Row>
                                                <Col sm={7}>
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            marginTop: 20,
                                                        }}
                                                    >
                                                        New password
                                                    </div>
                                                    <input
                                                        onChange={
                                                            this.editPassword
                                                        }
                                                        value={
                                                            this.state.newPass
                                                        }
                                                        type="password"
                                                        style={{
                                                            outline: "none",
                                                            resize: "none",
                                                            background:
                                                                "#F4F4F4",
                                                            border: "none",
                                                            padding:
                                                                "10px 20px",
                                                            borderRadius: 3,
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            fontSize: 14,
                                                            marginTop: 20,
                                                        }}
                                                    >
                                                        Confirm your password
                                                    </div>
                                                    <input
                                                        onChange={
                                                            this
                                                                .editConfirmationPass
                                                        }
                                                        value={
                                                            this.state
                                                                .confirmPassword
                                                        }
                                                        type="password"
                                                        style={{
                                                            outline: "none",
                                                            resize: "none",
                                                            background:
                                                                "#F4F4F4",
                                                            border: "none",
                                                            padding:
                                                                "10px 20px",
                                                            borderRadius: 3,
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            this.changePassword();
                                                            close();
                                                        }}
                                                        style={{
                                                            fontWeight: "bold",
                                                            marginTop: 20,
                                                            outline: "none",
                                                            width: "100%",
                                                            borderRadius: 3,
                                                            float: "right",
                                                            padding:
                                                                "10px 10px",
                                                            border: "none",
                                                            color: "white",
                                                            backgroundColor:
                                                                "#0B172B",
                                                        }}
                                                        disabled={
                                                            !validPassword
                                                        }
                                                    >
                                                        Change my password
                                                    </Button>
                                                </Col>
                                                <Col
                                                    sm={5}
                                                    style={{ fontSize: 14 }}
                                                >
                                                    <p
                                                        style={{
                                                            marginTop: 35,
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        New password must
                                                        contain:
                                                    </p>
                                                    <div
                                                        style={{
                                                            color: /[A-Z]/.test(
                                                                this.state
                                                                    .newPass
                                                            )
                                                                ? "black"
                                                                : "red",
                                                        }}
                                                    >
                                                        At least 1 upper case
                                                        character (A-Z)
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: /[0-9]/.test(
                                                                this.state
                                                                    .newPass
                                                            )
                                                                ? "black"
                                                                : "red",
                                                        }}
                                                    >
                                                        At least 1 number (0-9)
                                                    </div>
                                                    <div
                                                        style={{
                                                            color:
                                                                this.state
                                                                    .newPass
                                                                    .length >= 8
                                                                    ? "black"
                                                                    : "red",
                                                        }}
                                                    >
                                                        At least 8 characters
                                                    </div>
                                                    {!passwordsEquals && (
                                                        <div
                                                            style={{
                                                                color: "red",
                                                                marginTop: 10,
                                                            }}
                                                        >
                                                            Passwords must mach
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                                </Popup>
                            )}
                        </Col>
                    </Row>
                    <Popup
                        modal
                        trigger={
                            <Button
                                style={{
                                    fontWeight: "bold",
                                    outline: "none",
                                    borderRadius: 3,
                                    padding: "10px 20px",
                                    border: "none",
                                    color: "#E24D4D",
                                    backgroundColor: "#FFCFCF",
                                }}
                            >
                                Delete Account
                            </Button>
                        }
                        contentStyle={{
                            width: 500,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            padding: "30px 50px",
                        }}
                    >
                        {(close) => (
                            <div>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 20,
                                    }}
                                >
                                    Delete your account
                                </div>
                                <div>
                                    Your account, including all of your virtual
                                    computers will be irreversibly deleted. Are
                                    you sure you want to continue?
                                </div>
                                <Button
                                    onClick={() => {
                                        this.deleteAccount();
                                        close();
                                    }}
                                    style={{
                                        fontWeight: "bold",
                                        marginTop: 20,
                                        outline: "none",
                                        width: "100%",
                                        borderRadius: 3,
                                        float: "right",
                                        padding: "10px 10px",
                                        border: "none",
                                        color: "#E24D4D",
                                        backgroundColor: "#FFCFCF",
                                    }}
                                >
                                    I am sure. Delete my account.
                                </Button>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.DashboardReducer.user,
        customer: state.DashboardReducer.customer,
        cards: state.DashboardReducer.cards,
    };
}

export default connect(mapStateToProps)(AccountSettings);
