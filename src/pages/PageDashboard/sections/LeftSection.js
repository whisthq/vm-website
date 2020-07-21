import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "static/Shared.css";

import { GoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "utils/constants";

import { logout } from "store/actions/auth/login_actions";

class LeftSection extends Component {
    render() {
        return (
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
                <Link
                    to="/dashboard"
                    style={{
                        marginBottom: 20,
                        color:
                            this.props.location.pathname === "/dashboard"
                                ? "#111111"
                                : "#B9B9B9",
                        textDecoration: "none",
                        fontWeight:
                            this.props.location.pathname === "/dashboard"
                                ? "bold"
                                : "normal",
                        display: "block",
                    }}
                >
                    DASHBOARD
                </Link>
                <Link
                    to="/dashboard/settings"
                    className="sign-out-button"
                    style={{
                        marginBottom: 20,
                        display: "block",
                        textDecoration: "none",
                        fontWeight:
                            this.props.location.pathname ===
                            "/dashboard/settings"
                                ? "bold"
                                : "normal",
                        color:
                            this.props.location.pathname ===
                            "/dashboard/settings"
                                ? "#111111"
                                : "#B9B9B9",
                    }}
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

export default withRouter(connect(mapStateToProps)(LeftSection));
