import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Popup from "reactjs-popup";

import "static/PageDashboard.css";

import {
    sendFriendsEmail,
    friendsEmailSent,
} from "store/actions/dashboard/popup_actions";
import { FaTimes, FaCheck } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class ReferralButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            emailShare: false,
            emails: [],
            friendsEmail: "",
            showEmailButton: false,
            emailBoxWidth: 45,
            sendingEmails: false,
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

    showEmailShare = (show) => {
        this.setState({ emailShare: show });
        if (!show) {
            this.setState({
                sendingEmails: false,
                emails: [],
                emailBoxWidth: 45,
            });
            this.props.dispatch(friendsEmailSent(0));
        }
    };

    changeFriendsEmail = (evt) => {
        let component = this;
        this.setState({ friendsEmail: evt.target.value }, function () {
            if (this.state.friendsEmail !== "") {
                this.setState({
                    showEmailButton: true,
                    emailBoxWidth:
                        7.1 * component.state.friendsEmail.length + 45,
                });
            } else {
                this.setState({ showEmailButton: false, emailBoxWidth: 45 });
            }
        });
    };

    addEmailToList = () => {
        var new_list = [...this.state.emails, this.state.friendsEmail];
        if (this.state.friendsEmail.length > 40) {
            new_list = [
                ...this.state.emails,
                this.state.friendsEmail.substring(0, 40),
            ];
        }
        this.setState({
            emails: new_list,
            friendsEmail: "",
            emailBoxWidth: 45,
        });
    };

    addEmailToListPress = (evt) => {
        if (evt.key === "Enter") {
            var new_list = [...this.state.emails, this.state.friendsEmail];
            if (this.state.friendsEmail.length > 40) {
                new_list = [
                    ...this.state.emails,
                    this.state.friendsEmail.substring(0, 40),
                ];
            }
            this.setState({
                emails: new_list,
                friendsEmail: "",
                emailBoxWidth: 45,
            });
        }
    };

    removeEmail = (value) => {
        var new_list = this.state.emails.filter(function (e) {
            return e !== value;
        });
        this.setState({ emails: new_list });
    };

    sendEmails = () => {
        this.setState({ sendingEmails: true });
        this.props.dispatch(
            sendFriendsEmail(this.state.emails, this.props.user.code)
        );
    };

    render() {
        if (this.state.width < 700) {
            return <div></div>;
        } else {
            return (
                <div>
                    <Popup
                        trigger={
                            <div
                                style={{
                                    display: "inline",
                                    float: "right",
                                    marginTop: 10,
                                }}
                            >
                                <Button
                                    style={{
                                        marginLeft: 35,
                                        color: "#5ec3eb",
                                        border: "none",
                                        fontWeight: "bold",
                                        padding: "12px 25px",
                                        outline: "none",
                                        background: "rgba(94, 195, 235,0.1)",
                                    }}
                                >
                                    Get a Free Month
                                </Button>
                            </div>
                        }
                        modal
                        onClose={() => this.showEmailShare(false)}
                        contentStyle={{
                            width: 550,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            height: 400,
                            padding: "30px 50px",
                            textAlign: "center",
                        }}
                    >
                        {!this.state.emailShare ? (
                            <div>
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}
                                >
                                    <strong>Share Fractal with a Friend</strong>
                                </div>
                                <div
                                    style={{
                                        fontSize: 14,
                                        color: "#333333",
                                        marginTop: 20,
                                    }}
                                >
                                    For every person that types in the following
                                    code at checkout, both your accounts will be
                                    credited an additional free month.
                                </div>
                                <div
                                    style={{
                                        color: "#111111",
                                        marginTop: 75,
                                        fontSize: 40,
                                    }}
                                >
                                    {this.props.user
                                        ? this.props.user.code
                                        : ""}
                                </div>
                                <button
                                    onClick={() => this.showEmailShare(true)}
                                    style={{
                                        fontWeight: "bold",
                                        marginTop: 75,
                                        outline: "none",
                                        width: "100%",
                                        fontSize: 14,
                                        borderRadius: 3,
                                        float: "right",
                                        display: "inline",
                                        padding: "10px 10px",
                                        color: "#5ec3eb",
                                        border: "none",
                                        background: "rgba(94, 195, 235,0.1)",
                                    }}
                                >
                                    Start Sharing
                                </button>
                            </div>
                        ) : this.props.friend_email_status === 0 ? (
                            <div className="referral-code">
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 22,
                                    }}
                                >
                                    <strong>Send Them A Message</strong>
                                </div>
                                {this.state.emailBoxWidth > 45 ? (
                                    this.state.friendsEmail.length > 4 &&
                                    this.state.friendsEmail.includes("@") &&
                                    this.state.friendsEmail.includes(".") &&
                                    !this.state.emails.includes(
                                        this.state.friendsEmail
                                    ) &&
                                    this.state.emails.length < 50 ? (
                                        <div
                                            ref={this.customWidth}
                                            style={{
                                                textAlign: "left",
                                                display: "flex",
                                                marginTop: 20,
                                                height: 89,
                                            }}
                                        >
                                            <input
                                                autoFocus
                                                defaultValue={
                                                    this.state.friendsEmail
                                                }
                                                type="text"
                                                onChange={
                                                    this.changeFriendsEmail
                                                }
                                                onKeyPress={
                                                    this.addEmailToListPress
                                                }
                                                style={{
                                                    color: "#5ac475",
                                                    maxWidth:
                                                        "calc(100% - 20px)",
                                                    height: 30,
                                                    border: "none",
                                                    background: "none",
                                                    padding: 0,
                                                    borderRadius:
                                                        "4px 0px 0px 4px",
                                                    width: `${this.state.emailBoxWidth}px`,
                                                }}
                                            />
                                            <FaCheck
                                                className="pointerOnHover"
                                                onClick={this.addEmailToList}
                                                style={{
                                                    border: "none",
                                                    padding: 0,
                                                    borderLeft: "none",
                                                    width: 20,
                                                    position: "relative",
                                                    top: 7,
                                                    color: "#5ac475",
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            ref={this.customWidth}
                                            style={{
                                                textAlign: "left",
                                                display: "flex",
                                                marginTop: 20,
                                                height: 89,
                                            }}
                                        >
                                            <input
                                                autoFocus
                                                defaultValue={
                                                    this.state.friendsEmail
                                                }
                                                type="text"
                                                onChange={
                                                    this.changeFriendsEmail
                                                }
                                                style={{
                                                    color: "#666666",
                                                    maxWidth:
                                                        "calc(100% - 20px)",
                                                    height: 30,
                                                    background: "none",
                                                    padding: 5,
                                                    border: "solid 1px #666666",
                                                    borderRadius: "4px",
                                                    width: `${this.state.emailBoxWidth}px`,
                                                }}
                                            />
                                        </div>
                                    )
                                ) : (
                                    <textarea
                                        onChange={this.changeFriendsEmail}
                                        rows="4"
                                        cols="56"
                                        placeholder="Enter your friends' emails here, and we'll email them your referral code for you, along with a friendly message. When they create a cloud PC with this code, your account will automatically be accredited."
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
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        width: "100%",
                                    }}
                                >
                                    {this.state.emails.length === 0 ? (
                                        <div
                                            style={{
                                                height: 138,
                                            }}
                                        ></div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <div
                                        style={{
                                            height: 138,
                                            overflowY: "scroll",
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "flex-start",
                                            alignContent: "flex-start",
                                            fontSize: 12,
                                        }}
                                    >
                                        {this.state.emails.map(
                                            (value, index) => {
                                                return (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            maxWidth: "100%",
                                                            height: 22,
                                                            marginRight: 5,
                                                            border:
                                                                "solid 1px #333333",
                                                            paddingRight: 5,
                                                            borderRadius: 4,
                                                            marginBottom: 5,
                                                            overflowX: "hidden",
                                                        }}
                                                    >
                                                        <FaTimes
                                                            className="pointerOnHover"
                                                            onClick={() =>
                                                                this.removeEmail(
                                                                    value
                                                                )
                                                            }
                                                            style={{
                                                                width: 22,
                                                                height: 9,
                                                                position:
                                                                    "relative",
                                                                top: 5.5,
                                                            }}
                                                        />
                                                        <div>{value}</div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                {this.state.emails.length > 0 ? (
                                    !this.state.sendingEmails ? (
                                        <button
                                            onClick={() => this.sendEmails()}
                                            style={{
                                                fontWeight: "bold",
                                                marginTop: 25,
                                                outline: "none",
                                                width: "100%",
                                                fontSize: 14,
                                                borderRadius: 3,
                                                float: "right",
                                                display: "inline",
                                                padding: "10px 10px",
                                                color: "#5ec3eb",
                                                border: "none",
                                                background:
                                                    "rgba(94, 195, 235,0.1)",
                                            }}
                                        >
                                            Send Emails
                                        </button>
                                    ) : (
                                        <Button
                                            disabled={true}
                                            style={{
                                                fontWeight: "bold",
                                                marginTop: 25,
                                                outline: "none",
                                                width: "100%",
                                                fontSize: 14,
                                                borderRadius: 5,
                                                float: "right",
                                                display: "inline",
                                                padding: "10px 10px",
                                                color: "#5ec3eb",
                                                border: "none",
                                                background:
                                                    "rgba(94, 195, 235,0.1)",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleNotch}
                                                spin
                                                style={{
                                                    color: "#5ec3eb",
                                                    marginRight: 7,
                                                }}
                                            />{" "}
                                            Sending
                                        </Button>
                                    )
                                ) : (
                                    <Button
                                        disabled="true"
                                        style={{
                                            fontWeight: "bold",
                                            marginTop: 25,
                                            outline: "none",
                                            width: "100%",
                                            fontSize: 14,
                                            borderRadius: 3,
                                            float: "right",
                                            display: "inline",
                                            padding: "10px 10px",
                                            color: "#5ec3eb",
                                            border: "none",
                                            background:
                                                "rgba(94, 195, 235,0.1)",
                                        }}
                                    >
                                        Send Emails
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div>
                                {this.props.friend_email_status === 200 ? (
                                    <div
                                        style={{
                                            marginTop: 100,
                                        }}
                                    >
                                        <FaCheck
                                            style={{
                                                color: "#5ac475",
                                                width: 125,
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontSize: 18,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Success! Emails sent.
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: 14,
                                                color: "#666666",
                                            }}
                                        >
                                            On behalf of Fractal, thank you for
                                            telling your friends about us! We've
                                            sent them a customized email on your
                                            behalf.
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            marginTop: 150,
                                        }}
                                    >
                                        <FaTimes
                                            style={{
                                                color: "#e34d4d",
                                                width: 125,
                                            }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Oops! Something went wrong.
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: 14,
                                                color: "#666666",
                                            }}
                                        >
                                            If this issue persists, please
                                            contact
                                            support@fractalcomputers.com. In the
                                            meantime, we'd really appreciate you
                                            referring Fractal to your friends!
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Popup>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.DashboardReducer.user,
        friend_email_status: state.DashboardReducer.friend_email_status,
    };
}

export default withRouter(connect(mapStateToProps)(ReferralButton));
