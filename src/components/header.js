import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Logo from "assets/logo.svg";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import "static/Shared.css";
import { HashLink } from "react-router-hash-link";

import { GoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "utils/constants";

import { logout } from "store/actions/auth/login_actions";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0, menu: false };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    openMenu = (open) => {
        this.setState({ menu: open });
    };

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
        if (this.state.width > 900) {
            return (
                <div
                    style={{
                        width: "100%",
                        paddingTop: 20,
                        overflowX: "hidden",
                        paddingLeft: "80px",
                        paddingRight: "80px",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            width: "40%",
                            textAlign: "left",
                            zIndex: 1,
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: `${this.props.color}`,
                                fontWeight: "bold",
                                fontSize: 24,
                            }}
                        >
                            <img
                                src={Logo}
                                alt=""
                                style={{
                                    height: 19,
                                    position: "relative",
                                    bottom: 2,
                                    marginRight: 12,
                                }}
                            />
                            <span style={{ color: `${this.props.title}` }}>
                                Fractal
                            </span>
                        </Link>
                    </div>
                    {this.props.homepage && (
                        <div style={{ width: "60%", textAlign: "right" }}>
                            <HashLink
                                className="headerlink"
                                to="/"
                                style={{
                                    color:
                                        this.props.location.pathname === "/"
                                            ? `${this.props.button}`
                                            : `${this.props.color}`,
                                    fontWeight:
                                        this.props.location.pathname === "/"
                                            ? "bold"
                                            : "normal",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    fontSize: 16,
                                    marginTop: 12,
                                }}
                            >
                                <span style={this.props.linkStyle}>
                                    Product
                                </span>
                            </HashLink>
                            <HashLink
                                className="headerlink"
                                to="/about"
                                style={{
                                    color:
                                        this.props.location.pathname ===
                                        "/about"
                                            ? `${this.props.button}`
                                            : `${this.props.color}`,
                                    fontWeight:
                                        this.props.location.pathname ===
                                        "/about"
                                            ? "bold"
                                            : "normal",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    fontSize: 16,
                                    marginTop: 12,
                                    marginLeft: 20,
                                }}
                            >
                                <span style={this.props.linkStyle}>
                                    Company
                                </span>
                            </HashLink>
                            <a
                                href="mailto: hello@fractalcomputers.com"
                                style={{
                                    color: `${this.props.color}`,
                                    textDecoration: "none",
                                    textAlign: "center",
                                    fontSize: 16,
                                    marginTop: 12,
                                    marginLeft: 20,
                                }}
                            >
                                <span style={this.props.linkStyle}>
                                    Contact Us
                                </span>
                            </a>
                            <Link to="/auth">
                                <Button
                                    style={{
                                        fontWeight: "bold",
                                        marginLeft: 35,
                                        color: "#1ba8e0",
                                        border: "none",
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        padding: "12px 30px",
                                        background: "rgba(94, 195, 235, 0.2)",
                                    }}
                                >
                                    My Account
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div
                    style={{
                        width: "100%",
                        paddingTop: 20,
                        overflowX: "hidden",
                        paddingLeft: 35,
                        paddingRight: 25,
                        minHeight: 30,
                    }}
                >
                    <div
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            float: "left",
                        }}
                    >
                        <Link to="/" style={{ color: "#111111", fontSize: 20 }}>
                            <img
                                src={Logo}
                                alt=""
                                style={{
                                    height: 20,
                                    position: "relative",
                                    bottom: 2,
                                    right: 10,
                                }}
                            />
                            <span style={{ color: `${this.props.title}` }}>
                                Fractal
                            </span>
                        </Link>
                    </div>
                    {(this.props.homepage || this.props.dashboard) && (
                        <div style={{ float: "right", zIndex: 100 }}>
                            <FaBars
                                onClick={() => this.openMenu(true)}
                                style={{ color: "#111111" }}
                            />
                        </div>
                    )}
                    {this.state.menu && (
                        <div
                            style={{
                                position: "fixed",
                                top: 0,
                                left: 0,
                                width: "100vw",
                                height: "100vh",
                                background: "white",
                                zIndex: 1000,
                                textAlign: "center",
                            }}
                        >
                            <div style={{ padding: 35, paddingTop: 30 }}>
                                <FaTimes
                                    onClick={() => this.openMenu(false)}
                                    style={{
                                        color: "#333333",
                                        float: "right",
                                        height: 30,
                                    }}
                                />
                            </div>
                            {this.props.homepage && (
                                <div style={{ padding: 35, marginTop: 50 }}>
                                    <div style={{ marginBottom: 10 }}>
                                        <HashLink
                                            className="headerlink"
                                            to="/product"
                                            style={{
                                                color:
                                                    this.props.location
                                                        .pathname === "/product"
                                                        ? `${this.props.button}`
                                                        : `${this.props.color}`,
                                                fontWeight:
                                                    this.props.location
                                                        .pathname === "/product"
                                                        ? "bold"
                                                        : "normal",
                                            }}
                                        >
                                            Product
                                        </HashLink>
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <HashLink
                                            className="headerlink"
                                            to="/about"
                                            style={{
                                                color:
                                                    this.props.location
                                                        .pathname === "/about"
                                                        ? `${this.props.button}`
                                                        : `${this.props.color}`,
                                                fontWeight:
                                                    this.props.location
                                                        .pathname === "/about"
                                                        ? "bold"
                                                        : "normal",
                                            }}
                                        >
                                            Company
                                        </HashLink>
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <a
                                            href="mailto: hello@fractalcomputers.com"
                                            style={{
                                                color: `${this.props.color}`,
                                            }}
                                        >
                                            Contact Us
                                        </a>
                                    </div>
                                    <div style={{ marginBottom: 10 }}>
                                        <Link
                                            className="headerlink"
                                            to="/auth"
                                            style={{
                                                color: `${this.props.color}`,
                                            }}
                                        >
                                            My Account
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {this.props.dashboard && (
                                <div style={{ padding: 35, marginTop: 50 }}>
                                    <Link
                                        to="/dashboard"
                                        style={{
                                            marginBottom: 10,
                                            color:
                                                this.props.location.pathname ===
                                                "/dashboard"
                                                    ? `${this.props.button}`
                                                    : `${this.props.color}`,
                                            textDecoration: "none",
                                            fontWeight:
                                                this.props.location.pathname ===
                                                "/dashboard"
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
                                            textDecoration: "none",
                                            fontWeight:
                                                this.props.location.pathname ===
                                                "/dashboard/settings"
                                                    ? "bold"
                                                    : "normal",
                                            color:
                                                this.props.location.pathname ===
                                                "/dashboard/settings"
                                                    ? `${this.props.button}`
                                                    : `${this.props.color}`,
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
                                                    this.props.dispatch(
                                                        logout()
                                                    )
                                                }
                                                onFailure={() =>
                                                    console.error(
                                                        "Google logout failure"
                                                    )
                                                }
                                                render={(renderProps) => (
                                                    <div
                                                        className="sign-out-button"
                                                        onClick={
                                                            renderProps.onClick
                                                        }
                                                        style={{
                                                            marginTop: 10,
                                                            color: `${this.props.color}`,
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
                                            onClick={() =>
                                                this.props.dispatch(logout())
                                            }
                                            style={{
                                                marginTop: 10,
                                                color: `${this.props.color}`,
                                            }}
                                        >
                                            SIGN OUT
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        use_google: state.AuthReducer.google_auth.use_google
            ? state.AuthReducer.google_auth.use_google
            : false,
    };
}

export default withRouter(connect(mapStateToProps)(Header));
