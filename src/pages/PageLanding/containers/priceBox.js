import React, { Component } from "react";

import { FaCheck } from "react-icons/fa";

import "static/Shared.css";
import "static/PageLanding.css";

class PriceBox extends Component {
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
                <div
                    style={{
                        borderRadius: 5,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                        textAlign: "left",
                        background: this.props.background ? this.props.background : "white",
                        padding: 30,
                        minHeight: 350,
                        width: "100%",
                        marginBottom: 20,
                    }}
                >
                    <div style={{ fontWeight: "bold" }}>{this.props.title}</div>
                    {this.props.include_pricing &&
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
                                    fontSize: this.state.width > 700 ? 70 : 50,
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
                    }
                    {this.props.include_banner &&
                        <div
                            style={{
                                paddingTop: 20,
                                display: "block",
                                height: this.state.width > 700 ? 110 : 90,
                            }}
                        >
                            {this.props.banner}
                        </div>
                    }
                    <div
                        className="pricing-description"
                        style={{ fontSize: this.state.width > 700 ? 16 : 14, display: "flex", marginTop: 15 }}
                    >
                        <div style={{ width: 30 }}>
                            <FaCheck style={{ marginRight: 15, fontSize: 12, position: "relative", top: -2, color: "#5ec3eb" }} />
                        </div>
                        <div>
                            {this.props.description1}
                        </div>
                    </div>
                    <div
                        className="pricing-description"
                        style={{ fontSize: this.state.width > 700 ? 16 : 14, display: "flex" }}
                    >
                        <div style={{ width: 30 }}>
                            <FaCheck style={{ marginRight: 15, fontSize: 12, position: "relative", top: -2, color: "#5ec3eb" }} />
                        </div>
                        <div>
                            {this.props.description2}
                        </div>
                    </div>
                    <div
                        className="pricing-description"
                        style={{ fontSize: this.state.width > 700 ? 16 : 14, display: "flex" }}
                    >
                        <div style={{ width: 30 }}>
                            <FaCheck style={{ marginRight: 15, fontSize: 12, position: "relative", top: -2, color: "#5ec3eb" }} />
                        </div>
                        <div>
                            {this.props.description3}
                        </div>
                    </div>
                    {
                        this.props.description4 &&
                        <div
                            className="pricing-description"
                            style={{ fontSize: this.state.width > 700 ? 16 : 14, display: "flex" }}
                        >
                            <div style={{ width: 30 }}>
                                <FaCheck style={{ marginRight: 15, fontSize: 12, position: "relative", top: -2, color: "#5ec3eb" }} />
                            </div>
                            <div>
                                {this.props.description4}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default PriceBox;
