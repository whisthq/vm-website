import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaCheck, FaExclamationTriangle, FaCaretLeft } from "react-icons/fa";
import {
    userSignup,
    signupFailure,
    subscribeNewsletter,
    checkUserExists,
} from "store/actions/auth/signup_actions";
import { showGoogleButton } from "store/actions/auth/login_actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

const emailValidationRegex = /^(.+)@(.+)\.([a-zA-Z]{2,15})$/;

class SignupBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSignup: "",
            passwordSignup: "",
            passwordConfirmSignup: "",
            validEmail: false,
            tooShort: false,
            validPasswordformat: false,
            failed_login_attempt: false,
            failed_signup_attempt: false,
            termsAccepted: false,
            subscribed: true,
            name: "",
            feedback: "",
            step: 1,
        };
    }

    handleSignup = (evt) => {
        this.props.setProcessing(true);
        this.setState({ failed_signup_attempt: false });
        this.props.dispatch(
            userSignup(
                this.state.emailSignup,
                this.state.passwordSignup,
                this.state.name,
                this.state.feedback
            )
        );
        if (this.state.subscribed) {
            this.props.dispatch(subscribeNewsletter(this.state.emailSignup));
        }
    };

    toStepTwoKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            this.state.validEmail &&
            !this.state.tooShort &&
            this.state.matches &&
            this.state.termsAccepted
        ) {
            this.props.setProcessing(true);
            this.setState({ failed_signup_attempt: false });
            this.props.dispatch(checkUserExists(this.state.emailSignup));
            this.setState({
                emailSignup: "",
                passwordSignup: "",
                passwordConfirmSignup: "",
            });
        }
    };

    toStepOne = () => {
        this.props.setProcessing(false);
        this.setState({
            step: 1,
            failed_signup_attempt: false,
            termsAccepted: false,
        });
        this.props.dispatch(signupFailure(0));
        this.props.dispatch(showGoogleButton(true));
        this.setState({
            emailSignup: "",
            passwordSignup: "",
            passwordConfirmSignup: "",
        });
    };

    toStepTwo = () => {
        this.props.setProcessing(true);
        this.setState({ failed_signup_attempt: false });
        this.props.dispatch(checkUserExists(this.state.emailSignup));
    };

    signupKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            this.state.validEmail &&
            !this.state.tooShort &&
            this.state.matches &&
            this.state.termsAccepted
        ) {
            this.props.setProcessing(true);
            this.setState({ failed_signup_attempt: false });
            this.props.dispatch(
                userSignup(
                    this.state.emailSignup,
                    this.state.passwordSignup,
                    this.state.name,
                    this.state.feedback
                )
            );
        }
    };

    toStepThreeKeyPress = (evt) => {
        if (evt.key === "Enter" && this.state.name.length > 1) {
            this.setState({ step: 3 });
        }
    };

    toStepThree = () => {
        if (this.state.name.length > 1) {
            this.setState({ step: 3 });
        }
    };

    changeEmailSignup = (evt) => {
        this.setState({ emailSignup: evt.target.value }, function () {
            if (emailValidationRegex.test(this.state.emailSignup)) {
                this.setState({ validEmail: true });
            } else {
                this.setState({ validEmail: false });
            }
        });
    };

    changePasswordSignup = (evt) => {
        this.setState({ passwordSignup: evt.target.value }, function () {
            if (
                this.state.passwordSignup.length < 7 &&
                this.state.passwordSignup.length > 0
            ) {
                this.setState({ tooShort: true });
            } else {
                this.setState({ tooShort: false });
            }

            if (!passwordValidationRegex.test(this.state.passwordSignup)) {
                this.setState({ validPasswordFormat: false });
            } else {
                this.setState({ validPasswordFormat: true });
            }
        });
    };

    changePasswordConfirmSignup = (evt) => {
        this.setState({ passwordConfirmSignup: evt.target.value }, function () {
            if (
                this.state.passwordSignup === this.state.passwordConfirmSignup
            ) {
                this.setState({ matches: true });
            } else {
                this.setState({ matches: false });
            }
        });
    };

    changeName = (evt) => {
        this.setState({ name: evt.target.value });
    };

    changeFeedback = (evt) => {
        this.setState({ feedback: evt.target.value });
    };

    acceptTerms = (event) => {
        const target = event.target;
        if (target.checked) {
            this.setState({ termsAccepted: true });
        } else {
            this.setState({ termsAccepted: false });
        }
    };

    subscribe = (event) => {
        const target = event.target;
        if (target.checked) {
            this.setState({ subscribed: true });
        } else {
            this.setState({ subscribed: false });
        }
    };

    componentDidMount() {
        this.props.dispatch(signupFailure(0));
        this.props.dispatch(showGoogleButton(true));
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.failed_signup_attempts !==
                this.props.failed_signup_attempts &&
            !this.state.failed_signup_attempt
        ) {
            this.props.setProcessing(false);
            this.setState({
                failed_signup_attempt: true,
            });
        }

        if (
            prevProps.signup_status !== this.props.signup_status &&
            this.props.signup_status === 200 &&
            this.props.processing
        ) {
            this.props.setProcessing(false);
            this.props.dispatch(showGoogleButton(false));
            this.setState({ step: 2 });
        }
    }

    render() {
        const signupWarning = () => {
            if (this.props.error && this.state.failed_signup_attempt) {
                return (
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "#f9000b",
                            background: "#fdf0f1",
                            width: "100%",
                            padding: 15,
                            borderRadius: 5,
                            fontWeight: "bold",
                            marginTop: 20,
                        }}
                    >
                        {this.props.error}
                    </div>
                );
            } else if (
                this.props.signup_status !== 200 &&
                this.state.failed_signup_attempt
            ) {
                return (
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "#f9000b",
                            background: "#fdf0f1",
                            width: "100%",
                            padding: 15,
                            borderRadius: 5,
                            fontWeight: "bold",
                            marginTop: 20,
                        }}
                    >
                        Email already taken
                    </div>
                );
            } else if (
                this.state.passwordSignup.length > 0 &&
                !this.state.validPasswordFormat
            ) {
                return (
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: 14,
                            color: "#f9000b",
                            background: "#fdf0f1",
                            width: "100%",
                            padding: "15px 20px",
                            borderRadius: 5,
                            marginTop: 20,
                        }}
                    >
                        Password requires one uppercase, lowercase letter,
                        special character, and one number
                    </div>
                );
            } else {
                if (
                    this.state.passwordSignup.length < 7 &&
                    this.state.passwordSignup.length > 3
                ) {
                    return (
                        <div
                            style={{
                                textAlign: "center",
                                fontSize: 14,
                                color: "#f9000b",
                                background: "#fdf0f1",
                                width: "100%",
                                padding: 15,
                                borderRadius: 5,
                                marginTop: 20,
                            }}
                        >
                            Password too short
                        </div>
                    );
                }
            }
        };

        if (this.props.needs_reason) {
            return <div></div>;
        }

        if (this.state.step === 1) {
            return (
                <div style={{ maxWidth: 300, margin: "auto" }}>
                    {signupWarning()}
                    <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                        <FormControl
                            type="email"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Email Address"
                            value={this.state.emailSignup}
                            onChange={this.changeEmailSignup}
                            onKeyPress={this.toStepTwoKeyPress}
                            style={{
                                borderRadius: 5,
                                maxWidth: 600,
                                backgroundColor: "#F4F4F4",
                                border: "none",
                                padding: "30px 20px",
                            }}
                        />
                        {!this.state.validEmail &&
                        this.state.emailSignup.length > 1 ? (
                            <div
                                style={{
                                    color: "#a62121",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 20,
                                    fontSize: 14,
                                }}
                            >
                                <FaExclamationTriangle
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.emailSignup.length > 1 ? (
                            <div
                                style={{
                                    color: "green",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 9,
                                    fontSize: 14,
                                }}
                            >
                                <FaCheck
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                        <FormControl
                            aria-label="Default"
                            type="password"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Password"
                            value={this.state.passwordSignup}
                            onChange={this.changePasswordSignup}
                            onKeyPress={this.toStepTwoKeyPress}
                            style={{
                                borderRadius: 5,
                                maxWidth: 600,
                                backgroundColor: "#F4F4F4",
                                border: "none",
                                padding: "30px 20px",
                            }}
                        />
                        {this.state.passwordSignup.length > 0 &&
                        (this.state.tooShort ||
                            !this.state.validPasswordFormat) ? (
                            <div
                                style={{
                                    color: "#a62121",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 20,
                                    fontSize: 14,
                                }}
                            >
                                <FaExclamationTriangle
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.passwordSignup.length > 0 ? (
                            <div
                                style={{
                                    color: "green",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 9,
                                    fontSize: 14,
                                }}
                            >
                                <FaCheck
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                        <FormControl
                            aria-label="Default"
                            type="password"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Confirm Password"
                            value={this.state.passwordConfirmSignup}
                            onChange={this.changePasswordConfirmSignup}
                            onKeyPress={this.toStepTwoKeyPress}
                            style={{
                                borderRadius: 5,
                                maxWidth: 600,
                                backgroundColor: "#F4F4F4",
                                border: "none",
                                padding: "30px 20px",
                            }}
                        />
                        {!this.state.matches &&
                        this.state.passwordConfirmSignup.length > 0 ? (
                            <div
                                style={{
                                    color: "#a62121",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 20,
                                    fontSize: 14,
                                }}
                            >
                                <FaExclamationTriangle
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.passwordConfirmSignup.length > 0 ? (
                            <div
                                style={{
                                    color: "green",
                                    marginLeft: 5,
                                    position: "absolute",
                                    right: "5%",
                                    zIndex: 100,
                                    top: 9,
                                    fontSize: 14,
                                }}
                            >
                                <FaCheck
                                    style={{
                                        marginRight: 5,
                                        position: "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    {!this.props.processing ? (
                        this.state.validEmail &&
                        !this.state.tooShort &&
                        this.state.matches &&
                        this.state.termsAccepted ? (
                            <Button
                                onClick={this.toStepTwo}
                                style={{
                                    marginTop: 5,
                                    color: "white",
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "#0B172B",
                                    fontWeight: "bold",
                                    padding: 12,
                                }}
                            >
                                SIGN UP
                            </Button>
                        ) : (
                            <Button
                                disabled={true}
                                style={{
                                    marginTop: 5,
                                    color: "white",
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "#0B172B",
                                    fontWeight: "bold",
                                    padding: 12,
                                }}
                            >
                                SIGN UP
                            </Button>
                        )
                    ) : (
                        <Button
                            disabled={true}
                            style={{
                                marginTop: 5,
                                color: "white",
                                width: "100%",
                                border: "none",
                                backgroundColor: "#0B172B",
                                fontWeight: "bold",
                                padding: 12,
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faCircleNotch}
                                spin
                                style={{
                                    color: "white",
                                    height: 14,
                                    marginRight: 5,
                                }}
                            />{" "}
                            Processing
                        </Button>
                    )}
                    <div
                        style={{
                            marginTop: 25,
                            display: "flex",
                        }}
                    >
                        <label className="termsContainer">
                            <input
                                type="checkbox"
                                onChange={this.acceptTerms}
                                onKeyPress={this.toStepTwoKeyPress}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <div
                            style={{
                                fontSize: 12,
                                position: "relative",
                                bottom: 4,
                                color: "#111111",
                            }}
                        >
                            I accept Fractal's&nbsp;
                            <Link
                                to="/termsofservice"
                                style={{
                                    textDecoration: "none",
                                    color: "#5ec3eb",
                                }}
                            >
                                Terms of Service&nbsp;
                            </Link>
                            and&nbsp;
                            <Link
                                to="/privacy"
                                style={{
                                    textDecoration: "none",
                                    color: "#5ec3eb",
                                }}
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: 25,
                            display: "flex",
                        }}
                    >
                        <label className="termsContainer">
                            <input
                                defaultChecked
                                type="checkbox"
                                onChange={this.subscribe}
                                onKeyPress={this.toStepTwoKeyPress}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <div
                            style={{
                                fontSize: 12,
                                position: "relative",
                                bottom: 4,
                                color: "#111111",
                            }}
                        >
                            Subscribe to the Fractal newsletter and receive
                            (infrequent) major updates
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.step === 2) {
            return (
                <div
                    style={{
                        maxWidth: 500,
                        margin: "10px auto",
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "bold",
                            }}
                        >
                            <span style={{ fontSize: 18 }}>Welcome!</span>
                            <br />
                            How should we greet you?
                        </div>
                        <div
                            className="signupBox"
                            style={{ marginTop: 45, textAlign: "center" }}
                        >
                            <input
                                type="text"
                                placeholder="e.g. Michael"
                                value={this.state.name}
                                style={{
                                    borderRadius: 5,
                                    maxWidth: 400,
                                    backgroundColor: "#F4F4F4",
                                    border: "none",
                                    padding: "15px 25px",
                                    width: "100%",
                                }}
                                onChange={this.changeName}
                                onKeyPress={this.toStepThreeKeyPress}
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
                                style={{
                                    padding: "12px 75px",
                                    maxWidth: 400,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    background: "#0B172B",
                                    color: "white",
                                    border: "none",
                                    width: "100%",
                                }}
                                disabled={this.state.name.length < 1}
                                onClick={this.toStepThree}
                            >
                                CONTINUE
                            </Button>
                            <div
                                style={{
                                    color: "#666666",
                                    textAlign: "center",
                                    marginTop: 15,
                                    fontSize: 14,
                                }}
                                onClick={this.toStepOne}
                                className="pointerOnHover"
                            >
                                <FaCaretLeft
                                    style={{
                                        position: "relative",
                                        bottom: 1.5,
                                    }}
                                />{" "}
                                Go Back
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.step === 3) {
            return (
                <div
                    style={{
                        maxWidth: 500,
                        margin: "auto",
                    }}
                >
                    <div>
                        <div style={{ paddingLeft: 30, paddingRight: 30 }}>
                            {signupWarning()}
                        </div>
                        <div
                            style={{
                                fontSize: 30,
                                textAlign: "center",
                                fontWeight: "bold",
                                marginTop: 10,
                            }}
                        >
                            <span style={{ fontSize: 18 }}>
                                Hello, {this.state.name}!
                            </span>
                            <br />
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
                                onKeyPress={this.signupKeyPress}
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
                                onClick={this.handleSignup}
                            >
                                FINISH
                            </Button>
                        </div>
                        <div
                            style={{
                                color: "#666666",
                                textAlign: "center",
                                marginTop: 15,
                                fontSize: 14,
                            }}
                            onClick={() => this.setState({ step: 2 })}
                            className="pointerOnHover"
                        >
                            <FaCaretLeft
                                style={{ position: "relative", bottom: 1.5 }}
                            />{" "}
                            Go Back
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        failed_signup_attempts: state.AuthReducer.failed_signup_attempts,
        signup_status: state.AuthReducer.signup_status,
        error: state.AuthReducer.error,
        needs_reason: state.AuthReducer.needs_reason
            ? state.AuthReducer.google_auth.needs_reason
            : false,
    };
}

export default connect(mapStateToProps)(SignupBox);
