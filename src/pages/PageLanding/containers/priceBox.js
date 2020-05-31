import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "static/Shared.css";
import "static/PageLanding.css";


class PriceBox extends Component {
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
                        borderRadius: 5,
                        boxShadow:
                            "0px 4px 20px rgba(0, 0, 0, 0.2)",
                        textAlign: "left",
                        background: "white",
                        padding: 30,
                        minHeight: 210,
                        width: "100%",
                        marginBottom: 20,
                    }}
                >
                    <div style={{ fontWeight: "bold" }}>
                        {this.props.title}
                    </div>
                    <div
                        style={{
                            marginTop: 5,
                            display: "block",
                            height: this.state.width > 700 ? 110 : 90,
                        }}
                    >
                        <div
                            style={{
                                display: "inline",
                                float: "left",
                                position: "relative",
                                marginRight: 5,
                                top: 25,
                            }}
                        >
                            $
                        </div>
                        <div
                            style={{
                                display: "inline",
                                float: "left",
                                position: "relative",
                                fontSize: this.state.width > 700 ? 70: 50,
                                fontWeight: "bold",
                            }}
                        >
                            {this.props.price}
                        </div>
                        <div
                            style={{
                                display: "inline",
                                float: "left",
                                position: "relative",
                                marginLeft: 8,
                                top: this.state.width > 700 ? 60 : 38,
                            }}
                        >
                            / mo
                        </div>
                    </div>
                    <div
                        style={{
                            color: "#555555",
                            display: "block",
                            position: "relative",
                            bottom: 5,
                            fontSize: this.state.width> 700 ? 16 : 14
                        }}
                    >
                        {this.props.description}
                    </div>
                </div>
            </div>
        );
    }
}


export default PriceBox;
