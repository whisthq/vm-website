import React, { Component } from "react";
import Popup from "reactjs-popup";
import { Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import { FaPencilAlt } from "react-icons/fa";

import Visa from "assets/icons/payment-icons/visa.svg";
import Mastercard from "assets/icons/payment-icons/mastercard.svg";
import DefaultCard from "assets/icons/payment-icons/default.svg";

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: "",
            name: "",
        };
    }

    editEmail = (e) => {
        this.setState({ newEmail: e.target.value });
    };

    changeEmail = () => {
        console.log("Change email");
    };

    changePassword = () => {
        console.log("change password");
    };

    editName = (e) => {
        this.setState({ newName: e.target.value });
    };

    changeName = () => {
        console.log("change name");
    };

    changeCreditCard = () => {
        console.log("Change credit card");
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
                                                placeholder="Jonathan"
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
