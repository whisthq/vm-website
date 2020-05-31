import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "static/PageLanding.css";

class SetupBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
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
    }

    render() {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: "white",
                        boxShadow:
                            "0px 4px 20px rgba(0, 0, 0, 0.2)",
                        borderRadius: 5,
                        width: this.state.width > 700 ? "95%": "100%",
                        maxWidth: 750,
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: 50,
                            backgroundColor: "#1F2635",
                            borderRadius: "5px 5px 0px 0px",
                            color: "white",
                            padding: this.state.width > 700 ? "13px 40px" : "13px 30px",
                            fontWeight: "bold",
                        }}
                    >
                        Your Info
                    </div>
                    <div
                        style={{
                            width: "100%",
                            padding: this.state.width > 700 ? 20 : 10,
                            color: "#333333",
                            fontSize: 16,
                        }}
                    >
                    <div
                        style={{
                            padding: "8px 20px",
                            marginTop: 10,
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                width: "70%",
                                height: 10,
                                backgroundColor:
                                    "#e3e3e3",
                                borderRadius: 5,
                            }}
                        ></div>
                        <div
                            style={{
                                width: "25%",
                                height: 10,
                                backgroundColor:
                                    "rgba(94, 195, 235, 0.2)",
                                borderRadius: 5,
                                marginLeft: "5%",
                            }}
                        ></div>
                        </div>
                        <div
                            style={{
                                padding: "8px 20px",
                                display: "flex",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: 10,
                                    backgroundColor:
                                        "#e3e3e3",
                                    borderRadius: 5,
                                }}
                            ></div>
                        </div>
                        <div
                            style={{
                                padding: "8px 20px",
                                display: "flex",
                            }}
                        >
                            <div
                                style={{
                                    width: "25%",
                                    height: 10,
                                    backgroundColor:
                                        "rgba(94, 195, 235, 0.2)",
                                    borderRadius: 5,
                                    marginRight: "5%",
                                }}
                            ></div>
                            <div
                                style={{
                                    width: "70%",
                                    height: 10,
                                    backgroundColor:
                                        "#e3e3e3",
                                    borderRadius: 5,
                                }}
                            ></div>
                        </div>
                        <div
                            style={{ padding: "8px 20px" }}
                        >
                            <Link to="/dashboard">
                                <Button
                                    style={{
                                        padding: 15,
                                        width: "100%",
                                        margin: "auto",
                                        color: "#0980b0",
                                        background:
                                            "rgba(94, 195, 235, 0.2)",
                                        border: "none",
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        borderRadius: 5,
                                        marginTop: 20,
                                        fontSize: this.state.width > 700 ? 16 : 14,
                                    }}
                                >
                                    + NEW CLOUD PC
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SetupBox;
