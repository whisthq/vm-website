import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";

import { googleLogin, googleReason } from "store/actions/auth/login_actions";

import { GOOGLE_CLIENT_ID } from "utils/constants";

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

    handleSuccess = (res) => {
        console.log(res);
        this.props.setProcessing(true);
        this.props.dispatch(googleLogin(res.code));
        //this.props.setProcessing(false);
    };

    handleFailure = (res) => {
        console.log(res);
    };

    render() {
        return (
            <div style={{ maxWidth: 300, margin: "auto" }}>
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
                                marginTop: 15,
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
                        }}
                    >
                        <GoogleLogin
                            clientId={GOOGLE_CLIENT_ID}
                            buttonText={"Sign in with Google"}
                            responseType={"code"}
                            accessType={"offline"}
                            onSuccess={this.handleSuccess}
                            onFailure={this.handleFailure}
                            cookiePolicy={"single_host_origin"}
                            redirectUri={"postmessage"}
                            prompt={"consent"}
                            style={{ width: "100%" }}
                        />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        use_google: state.AuthReducer.use_google,
        needs_reason: state.AuthReducer.needs_reason,
        signup_status: state.AuthReducer.signup_status,
        failed_signup_attempts: state.AuthReducer.failed_signup_attempts,
    };
}

export default connect(mapStateToProps)(GoogleBox);
