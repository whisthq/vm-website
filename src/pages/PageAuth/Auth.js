import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/header.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

import LoginBox from "./containers/LoginBox.js";
import SignupBox from "./containers/SignupBox.js";
import GoogleBox from "./containers/GoogleBox.js";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            processing: false,
            google_button_active: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setProcessing = (p) => {
        this.setState({ processing: p });
    };

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        return (
            <div id="top">
                {this.props.loggedIn && this.props.email_verified ? (
                    <Redirect to="/dashboard" />
                ) : (
                        <div
                            style={{
                                position: "relative",
                                margin: "auto",
                                maxWidth: 1920,
                            }}
                        >
                            <Header color="#333333" button="#5ec3eb" homepage />
                            <div
                                style={{
                                    minHeight: "100vh",
                                    paddingTop: 50,
                                    backgroundColor: "white",
                                    position: "relative",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.0)",
                                        borderRadius: 2,
                                        border: "solid 1px white",
                                        padding: "20px 40px 60px 40px",
                                        marginBottom: 80,
                                        margin: "auto",
                                    }}
                                >
                                    <Tabs>
                                        <TabList
                                            style={{
                                                textAlign: "center",
                                                border: "none",
                                                fontWeight: "bold",
                                                fontSize: 16,
                                            }}
                                        >
                                            <Tab
                                                onClick={() =>
                                                    this.setState({
                                                        failed_signup_attempt: false,
                                                    })
                                                }
                                            >
                                                LOG IN
                                        </Tab>
                                            <Tab
                                                onClick={() =>
                                                    this.setState({
                                                        failed_login_attempt: false,
                                                    })
                                                }
                                            >
                                                SIGN UP
                                        </Tab>
                                        </TabList>
                                        <TabPanel style={{ padding: "15px 30px" }}>
                                            {this.props.google_auth &&
                                                this.props.google_auth
                                                    .show_google_button &&
                                                this.state.google_button_active && (
                                                    <GoogleBox
                                                        processing={
                                                            this.state.processing
                                                        }
                                                        setProcessing={
                                                            this.setProcessing
                                                        }
                                                    />
                                                )}
                                            <LoginBox
                                                processing={this.state.processing}
                                                setProcessing={this.setProcessing}
                                            />
                                            <HashLink
                                                to="/reset"
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        textAlign: "center",
                                                        marginTop: 25,
                                                        color: "#333333",
                                                        textDecoration: "none",
                                                        fontSize: 13,
                                                    }}
                                                >
                                                    Forgot Password?
                                            </div>
                                            </HashLink>
                                        </TabPanel>
                                        <TabPanel style={{ padding: "15px 30px" }}>
                                            {this.props.google_auth &&
                                                this.props.google_auth
                                                    .show_google_button &&
                                                this.state.google_button_active && (
                                                    <GoogleBox
                                                        processing={
                                                            this.state.processing
                                                        }
                                                        setProcessing={
                                                            this.setProcessing
                                                        }
                                                    />
                                                )}
                                            <SignupBox
                                                processing={this.state.processing}
                                                setProcessing={this.setProcessing}
                                            />
                                        </TabPanel>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.AuthReducer.logged_in,
        email_verified: state.AuthReducer.email_verified,
        google_auth: state.AuthReducer.google_auth
            ? state.AuthReducer.google_auth
            : {
                needs_reason: false,
                use_google: false,
                auth_error: "",
                show_google_button: true,
            },
    };
}

export default connect(mapStateToProps)(Auth);
