import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaCheck, FaExclamationTriangle, FaCaretLeft } from "react-icons/fa";
import {
    userSignup,
    changeTab,
    subscribeNewsletter,
    lookupUser,
    signupFailure
} from "../../../actions/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "react-tabs/style/react-tabs.css";
import "../../../static/App.css";

class SignupBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            emailSignup: "",
            passwordSignup: "",
            passwordConfirmSignup: "",
            validEmail: false,
            tooShort: false,
            failed_login_attempt: false,
            processing: false,
            failed_signup_attempt: false,
            termsAccepted: false,
            subscribed: true,
            name: "",
            feedback: "",
            step: 1
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    handleSignup = (evt) => {
        this.setState({ processing: true, failed_signup_attempt: false });
        this.props.dispatch(
            userSignup(this.state.emailSignup, 
                this.state.passwordSignup, 
                this.state.name,
                this.state.feedback)
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
            this.setState({processing: true, failed_signup_attempt: false})
            this.props.dispatch(lookupUser(this.state.emailSignup))
        }
    }

    toStepOne = () => {
        this.setState({step: 1, processing: false, failed_signup_attempt: false, termsAccepted: false})
        this.props.dispatch(signupFailure(0))
    }

    toStepTwo = () => {
        this.setState({processing: true, failed_signup_attempt: false})
        this.props.dispatch(lookupUser(this.state.emailSignup))
    }

    signupKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            this.state.validEmail &&
            !this.state.tooShort &&
            this.state.matches &&
            this.state.termsAccepted
        ) {
            this.setState({ processing: true, failed_signup_attempt: false });
            this.props.dispatch(
                userSignup(this.state.emailSignup, 
                    this.state.passwordSignup, 
                    this.state.name,
                    this.state.feedback)
            );
        }
    };

    toStepThreeKeyPress = (evt) => {
        if (
            evt.key === "Enter" &&
            this.state.name.length > 1
        ) {
            this.setState({step: 3})
        }
    }

    toStepThree = () => {
        if (
            this.state.name.length > 1
        ) {
            this.setState({step: 3})
        }  
    }

    changeEmailSignup = (evt) => {
        this.setState({ emailSignup: evt.target.value }, function () {
            if (this.state.emailSignup.includes("@")) {
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
        this.setState({ name: evt.target.value })
    };

    changeFeedback = (evt) => {
        this.setState({feedback: evt.target.value })
    }

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
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(changeTab("auth"));
        this.props.dispatch(signupFailure(0))
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.failed_signup_attempts !==
                this.props.failed_signup_attempts &&
            !this.state.failed_signup_attempt
        ) {
            this.setState({ failed_signup_attempt: true, processing: false });
        }

        if(prevProps.signupStatus !== this.props.signupStatus && 
                this.props.signupStatus === 200 && this.state.processing) {
            this.setState({step: 2, processing: false})
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        const signupWarning = () => {
            if (
                this.props.signupStatus === 400 &&
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
                            padding: 10,
                            borderRadius: 5,
                            fontWeight: "bold",
                            marginTop: 10,
                        }}
                    >
                        Email already taken
                    </div>
                );
            } else {
                return <div></div>;
            }
        };

        if(this.state.step === 1) {
            return (
                <div style = {{maxWidth: 300, margin: "auto"}}>
                    {signupWarning()}
                    <InputGroup
                        className="mb-3"
                        style={{ marginTop: 20 }}
                    >
                        <FormControl
                            type="email"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Email Address"
                            value = {this.state.emailSignup}
                            onChange={
                                this.changeEmailSignup
                            }
                            onKeyPress= {this.toStepTwoKeyPress}
                            style={{
                                borderRadius: 5,
                                maxWidth: 600,
                                backgroundColor: "#F4F4F4",
                                border: "none",
                                padding: "30px 20px",
                            }}
                        />
                        {!this.state.validEmail &&
                        this.state.emailSignup.length >
                            1 ? (
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
                                        position:
                                            "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.emailSignup.length >
                          1 ? (
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
                                        position:
                                            "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    <InputGroup
                        className="mb-3"
                        style={{ marginTop: 20 }}
                    >
                        <FormControl
                            aria-label="Default"
                            type="password"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Password"
                            value={this.state.passwordSignup}
                            onChange={
                                this.changePasswordSignup
                            }
                            onKeyPress={this.toStepTwoKeyPress}
                            style={{
                                borderRadius: 5,
                                maxWidth: 600,
                                backgroundColor: "#F4F4F4",
                                border: "none",
                                padding: "30px 20px",
                            }}
                        />
                        {this.state.tooShort ? (
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
                                        position:
                                            "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.passwordSignup
                              .length > 0 ? (
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
                                        position:
                                            "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    <InputGroup
                        className="mb-3"
                        style={{ marginTop: 20 }}
                    >
                        <FormControl
                            aria-label="Default"
                            type="password"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Confirm Password"
                            value={this.state.passwordConfirmSignup}
                            onChange={
                                this
                                    .changePasswordConfirmSignup
                            }
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
                        this.state.passwordConfirmSignup
                            .length > 0 ? (
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
                                        position:
                                            "relative",
                                    }}
                                />
                            </div>
                        ) : this.state.passwordConfirmSignup
                              .length > 0 ? (
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
                                        position:
                                            "relative",
                                        top: 10,
                                        color: "#62CEE6",
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </InputGroup>
                    {!this.state.processing ? (
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
                                    backgroundColor:
                                        "#0B172B",
                                    boxShadow:
                                        "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                    fontWeight: "bold",
                                    padding: 12,
                                }}
                            >
                                SIGN UP
                            </Button>
                        ) : (
                            <Button
                                disabled="true"
                                style={{
                                    marginTop: 5,
                                    color: "white",
                                    width: "100%",
                                    border: "none",
                                    backgroundColor:
                                        "#0B172B",
                                    boxShadow:
                                        "0px 2px 4px rgba(0, 0, 0, 0.25)",
                                    fontWeight: "bold",
                                    padding: 12,
                                }}
                            >
                                SIGN UP
                            </Button>
                        )
                    ) : (
                        <Button
                            disabled="true"
                            style={{
                                marginTop: 5,
                                color: "white",
                                width: "100%",
                                border: "none",
                                backgroundColor: "#0B172B",
                                boxShadow:
                                    "0px 2px 4px rgba(0, 0, 0, 0.25)",
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
                                onKeyPress={
                                    this.toStepTwoKeyPress
                                }
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
                            I accept the&nbsp;
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
                                onKeyPress={
                                    this.toStepTwoKeyPress
                                }
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
                            Subscribe to the Fractal
                            newsletter and receive
                            (infrequent) major updates
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.step === 2) {
            return(
                <div style = {{
                    maxWidth: 600, 
                    margin: "10px auto"}}
                >
                    <div style = {{
                        padding: "0px 50px 60px 50px"
                    }}>
                        <div style = {{fontSize: 30, textAlign: "center", fontWeight: "bold"}}>
                            <span style = {{fontSize: 18}}>Welcome!</span><br/>
                            How should we greet you?
                        </div>
                        <div className = "signupBox" style = {{marginTop: 45, textAlign: "center"}}>
                            <input 
                                type = "text"
                                placeholder = "e.g. Michael"
                                value = {this.state.name}
                                style={{
                                    borderRadius: 5,
                                    maxWidth: 600,
                                    backgroundColor: "#F4F4F4",
                                    border: "none",
                                    padding: "15px 25px",
                                    width: 400
                                }}
                                onChange = {this.changeName}
                                onKeyPress = {this.toStepThreeKeyPress}
                            />
                        </div>
                        <div style = {{textAlign: "center", fontWeight: "bold", marginTop: 15}}>
                            <Button 
                                style = {{
                                    padding: "12px 75px",
                                    width: 400,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    background: "#0B172B",
                                    color: "white",
                                    border: "none"
                                }}
                                disabled = {this.state.name.length < 1}
                                onClick = {this.toStepThree}
                            >
                                CONTINUE
                            </Button>
                        <div 
                            style = {{color: "#666666", textAlign: "center", marginTop: 15, fontSize: 14}}
                            onClick = {this.toStepOne}
                            className = "pointerOnHover"
                        >
                            <FaCaretLeft 
                                style = {{position: "relative", bottom: 1.5}}
                            /> Go Back
                        </div>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.step === 3) {
            return(
                <div style = {{
                    maxWidth: 600, 
                    margin: "auto"}}
                >
                    <div style = {{
                        padding: "0px 50px 60px 50px"
                    }}>
                        <div style = {{paddingLeft: 30, paddingRight: 30}}>
                            {signupWarning()}
                        </div>
                        <div style = {{fontSize: 30, textAlign: "center", fontWeight: "bold", marginTop: 10}}>
                            <span style = {{fontSize: 18}}>Hello, {this.state.name}!</span><br/>
                            How did you discover us?
                        </div>
                        <div className = "signupBox" style = {{marginTop: 45, textAlign: "center"}}>
                            <input 
                                type = "text"
                                onChange = {this.changeFeedback}
                                value = {this.state.feedback}
                                onKeyPress = {this.signupKeyPress}
                                placeholder = "e.g. Google search"
                                style={{
                                    borderRadius: 5,
                                    maxWidth: 600,
                                    backgroundColor: "#F4F4F4",
                                    border: "none",
                                    padding: "15px 25px",
                                    width: 400
                                }}
                            />
                        </div>
                        <div style = {{textAlign: "center", fontWeight: "bold", marginTop: 15}}>
                            <Button 
                                disabled = {this.state.feedback.length < 1}
                                style = {{
                                    padding: "12px 60px",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    background: "#0B172B",
                                    color: "white",
                                    border: "none",
                                    width: 400
                                }}
                                onClick = {this.handleSignup}
                            >
                                FINISH & SIGN UP
                            </Button>
                        </div>
                        <div 
                            style = {{color: "#666666", textAlign: "center", marginTop: 15, fontSize: 14}}
                            onClick = {() => this.setState({step: 2})}
                            className = "pointerOnHover"
                        >
                            <FaCaretLeft 
                                style = {{position: "relative", bottom: 1.5}}
                            /> Go Back
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        failed_signup_attempts: state.AccountReducer.failed_signup_attempts,
        signupStatus: state.AccountReducer.signupStatus
    };
}

export default connect(mapStateToProps)(SignupBox);
