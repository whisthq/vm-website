import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/header.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Redirect } from "react-router-dom";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";
import LoginBox from "./containers/LoginBox.js"
import SignupBox from "./containers/SignupBox.js"

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false
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

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        return (
            <div id = "top">
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
                                        <LoginBox/>
                                    </TabPanel>
                                    <TabPanel style={{ padding: "15px 30px" }}>
                                        <SignupBox/>
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
        email_verified: state.AuthReducer.email_verified
    };
}

export default connect(mapStateToProps)(Auth);
