import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";

import { googleLogin, googleReason } from "store/actions/auth/login_actions";

import { GOOGLE_CLIENT_ID } from "utils/constants";

import "static/PageAuth.css";

class GoogleBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedback: "",
        };
    }

    changeFeedback = (evt) => {
        this.setState({ feedback: evt.target.value });
    };

    feedbackKeyPress = (evt) => {
        if (evt.key === "Enter") {
            this.props.dispatch(googleReason(this.state.feedback));
        }
    };

    handleFeedbackSubmit = (evt) => {
        this.props.dispatch(googleReason(this.state.feedback));
    };

    responseGoogleSuccess = (res) => {
        this.props.setProcessing(true);
        this.props.dispatch(googleLogin(res.code));
        //this.props.setProcessing(false);
    };

    responseGoogleFailure = (res) => {
        console.log(res);
        this.props.setProcessing(false);
    };

    render() {
        return (
            <div style={{ maxWidth: 500, margin: "auto" }}>
                {this.props.use_google && this.props.needs_reason ? (
                    <div
                        style={{
                            maxWidth: 500,
                            margin: "auto",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            <div style={{ fontSize: 20, paddingBottom: 5 }}>
                                Welcome!
                            </div>
                            How did you discover us?
                        </div>
                        <div
                            className="signupBox"
                            style={{ marginTop: 45, textAlign: "center" }}
                        >
                            <input
                                type="text"
                                onChange={this.changeFeedback}
                                value={this.state.feedback}
                                onKeyPress={this.feedbackKeyPress}
                                placeholder="e.g. Google search"
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: "#F4F4F4",
                                    border: "none",
                                    padding: "15px 25px",
                                    maxWidth: 400,
                                    width: "100%",
                                }}
                            />
                        </div>
                        <div
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: 20,
                            }}
                        >
                            <Button
                                disabled={this.state.feedback.length < 1}
                                style={{
                                    padding: "12px 60px",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    background: "#0B172B",
                                    color: "white",
                                    border: "none",
                                    maxWidth: 400,
                                    width: "100%",
                                }}
                                onClick={this.handleFeedbackSubmit}
                            >
                                FINISH
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            margin: "auto",
                            marginTop: 20,
                            maxWidth: 300,
                            borderRadius: 4,
                            background: "rgba(76, 139, 245, 0.1)",
                        }}
                        className="google-button-wrapper"
                    >
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText={"Sign in with Google"}
                            responseType={"code"}
                            accessType={"offline"}
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailure}
                            cookiePolicy={"single_host_origin"}
                            redirectUri={"postmessage"}
                            prompt={"consent"}
                            style={{ width: "100%", fontWeight: "bold" }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        use_google: state.AuthReducer.google_auth
            ? state.AuthReducer.google_auth.use_google
            : false,
        needs_reason: state.AuthReducer.needs_reason
            ? state.AuthReducer.google_auth.needs_reason
            : false,
        signup_status: state.AuthReducer.signup_status,
        failed_signup_attempts: state.AuthReducer.failed_signup_attempts,
    };
}

export default connect(mapStateToProps)(GoogleBox);
