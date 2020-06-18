import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "static/Shared.css";

import { GoogleLogout } from "react-google-login";

import { GOOGLE_CLIENT_ID } from "utils/constants";

import { logout } from "store/actions/auth/login_actions";

class LeftSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
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

    render() {
        return (
            <div>
                {this.state.width > 700 ? (
                    <div
                        style={{
                            width: 300,
                            paddingLeft: 80,
                            paddingTop: 120,
                            backgroundColor: "none",
                            flex: "0 1 auto",
                            zIndex: 0,
                            position: "sticky",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: 20,
                                fontWeight: "bold",
                                color: "#111111",
                            }}
                        >
                            DASHBOARD
                        </div>
                        <Link
                            to="/settings"
                            className="sign-out-button"
                            style={{ textDecoration: "none", color: "#B9B9B9" }}
                        >
                            SETTINGS
                        </Link>
                        {this.props.use_google ? (
                            <div>
                                <GoogleLogout
                                    clientId={GOOGLE_CLIENT_ID}
                                    buttonText={"Logout"}
                                    onLogoutSuccess={() =>
                                        this.props.dispatch(logout())
                                    }
                                    onFailure={() =>
                                        console.error("Google logout failure")
                                    }
                                    render={(renderProps) => (
                                        <div
                                            className="sign-out-button"
                                            onClick={renderProps.onClick}
                                            style={{
                                                marginTop: 15,
                                            }}
                                        >
                                            SIGN OUT
                                        </div>
                                    )}
                                />
                            </div>
                        ) : (
                            <div
                                className="sign-out-button"
                                onClick={() => this.props.dispatch(logout())}
                                style={{
                                    marginTop: 15,
                                }}
                            >
                                SIGN OUT
                            </div>
                        )}
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        use_google: state.AuthReducer.google_auth.use_google
            ? state.AuthReducer.google_auth.use_google
            : false,
    };
}

export default connect(mapStateToProps)(LeftSection);
