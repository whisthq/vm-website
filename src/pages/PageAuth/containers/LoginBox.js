import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { userLogin } from "store/actions/auth/login_actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "static/Shared.css";

class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            emailLogin: "",
            passwordLogin: "",
            failed_login_attempt: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    handleLogin = (evt) => {
        this.props.setProcessing(true);
        this.setState({ failed_login_attempt: false });
        this.props.dispatch(
            userLogin(this.state.emailLogin, this.state.passwordLogin, false)
        );
        this.setState({ emailLogin: "", passwordLogin: "" });
    };

    changeEmailLogin = (evt) => {
        this.setState({
            emailLogin: evt.target.value,
        });
    };

    loginKeyPress = (event) => {
        if (
            event.key === "Enter" &&
            this.state.emailLogin.length > 4 &&
            this.state.passwordLogin.length > 6 &&
            this.state.emailLogin.includes("@")
        ) {
            this.props.setProcessing(true);
            this.setState({ failed_login_attempt: false });
            this.props.dispatch(
                userLogin(
                    this.state.emailLogin,
                    this.state.passwordLogin,
                    false
                )
            );
        }
    };

    changePasswordLogin = (evt) => {
        if (evt.key === "Enter") {
            this.props.setProcessing(true);
            this.setState({ failed_login_attempt: false });
            this.props.dispatch(
                userLogin(
                    this.state.emailLogin,
                    this.state.passwordLogin,
                    false
                )
            );
            this.setState({ emailLogin: "", passwordLogin: "" });
        } else {
            this.setState({
                passwordLogin: evt.target.value,
            });
        }
    };

    componentDidMount() {
        this.setState({ failures: this.props.failed_login_attempts });
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.failed_login_attempts !==
                this.props.failed_login_attempts &&
            !this.state.failed_login_attempt
        ) {
            this.props.setProcessing(false);
            this.setState({
                failed_login_attempt: true,
            });
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

        const loginWarning = () => {
            if (this.props.error && this.state.failed_login_attempt) {
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
                this.props.login_status !== 200 &&
                this.state.failed_login_attempt
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
                            marginTop: 10,
                        }}
                    >
                        Invalid credentials
                    </div>
                );
            } else {
                return <div></div>;
            }
        };

        return (
            <div style={{ maxWidth: 300, margin: "auto" }}>
                {loginWarning()}
                <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                    <FormControl
                        type="email"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Email Address"
                        onChange={this.changeEmailLogin}
                        onKeyPress={this.loginKeyPress}
                        value={this.state.emailLogin}
                        style={{
                            borderRadius: 5,
                            maxWidth: 600,
                            backgroundColor: "#F4F4F4",
                            border: "none",
                            padding: "30px 20px",
                        }}
                    />
                    <br />
                </InputGroup>
                <InputGroup className="mb-3" style={{ marginTop: 20 }}>
                    <FormControl
                        aria-label="Default"
                        type="password"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Password"
                        onChange={this.changePasswordLogin}
                        onKeyPress={this.loginKeyPress}
                        value={this.state.passwordLogin}
                        style={{
                            borderRadius: 5,
                            maxWidth: 600,
                            backgroundColor: "#F4F4F4",
                            border: "none",
                            padding: "30px 20px",
                        }}
                    />
                </InputGroup>
                {!this.props.processing ? (
                    this.state.emailLogin.length > 4 &&
                    this.state.passwordLogin.length > 6 &&
                    this.state.emailLogin.includes("@") ? (
                        <Button
                            onClick={this.handleLogin}
                            style={{
                                marginTop: 5,
                                color: "white",
                                width: "100%",
                                border: "none",
                                background: "#0B172B",
                                fontWeight: "bold",
                                padding: 12,
                            }}
                        >
                            LOG IN
                        </Button>
                    ) : (
                        <Button
                            disabled={true}
                            style={{
                                marginTop: 5,
                                color: "white",
                                width: "100%",
                                border: "none",
                                background: "#0B172B",
                                fontWeight: "bold",
                                padding: 12,
                            }}
                        >
                            LOG IN
                        </Button>
                    )
                ) : (
                    <Button
                        disabled={true}
                        onClick={this.handleLogin}
                        style={{
                            marginTop: 5,
                            color: "white",
                            width: "100%",
                            border: "none",
                            background: "#0B172B",
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
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        failed_login_attempts: state.AuthReducer.failed_login_attempts,
        login_status: state.AuthReducer.login_status,
        error: state.AuthReducer.error,
        needs_reason: state.AuthReducer.needs_reason
            ? state.AuthReducer.google_auth.needs_reason
            : false,
    };
}

export default connect(mapStateToProps)(LoginBox);
