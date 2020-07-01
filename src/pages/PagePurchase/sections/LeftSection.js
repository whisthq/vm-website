import React, { Component } from "react";

import "static/PagePurchase.css";

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
        if (this.state.width > 700) {
            return (
                <div className="left-section-wrapper">
                    <div style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                fontWeight:
                                    this.props.vm_setup_data.step === 1
                                        ? "bold"
                                        : "normal",
                                color:
                                    this.props.vm_setup_data.step === 1
                                        ? "#111111"
                                        : "#B9B9B9",
                            }}
                        >
                            Country
                        </div>
                        <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                            {this.props.vm_setup_data.country}
                        </div>
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                fontWeight:
                                    this.props.vm_setup_data.step === 2
                                        ? "bold"
                                        : "normal",
                                color:
                                    this.props.vm_setup_data.step === 2
                                        ? "#111111"
                                        : "#B9B9B9",
                            }}
                        >
                            State
                        </div>
                        <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                            {this.props.vm_setup_data.location}
                        </div>
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                fontWeight:
                                    this.props.vm_setup_data.step === 3
                                        ? "bold"
                                        : "normal",
                                color:
                                    this.props.vm_setup_data.step === 3
                                        ? "#111111"
                                        : "#B9B9B9",
                            }}
                        >
                            Cloud PC Type
                        </div>
                        <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                            {this.props.vm_setup_data.spec}
                        </div>
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                fontWeight:
                                    this.props.vm_setup_data.step === 4
                                        ? "bold"
                                        : "normal",
                                color:
                                    this.props.vm_setup_data.step === 4
                                        ? "#111111"
                                        : "#B9B9B9",
                            }}
                        >
                            Apps
                        </div>
                        <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                            {this.props.vm_setup_data.step >= 4 ? (
                                <div>
                                    {this.props.vm_setup_data.apps.length.toString()}{" "}
                                    apps selected
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                        <div
                            style={{
                                fontWeight:
                                    this.props.vm_setup_data.step === 5
                                        ? "bold"
                                        : "normal",
                                color:
                                    this.props.vm_setup_data.step === 5
                                        ? "#111111"
                                        : "#B9B9B9",
                            }}
                        >
                            Plan
                        </div>
                        <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                            {this.props.vm_setup_data.plan}
                        </div>
                    </div>
                    {this.props.enableCreditCard && (
                        <div style={{ paddingBottom: 20 }}>
                            <div
                                style={{
                                    fontWeight:
                                        this.props.vm_setup_data.step === 6
                                            ? "bold"
                                            : "normal",
                                    color:
                                        this.props.vm_setup_data.step === 6
                                            ? "#111111"
                                            : "#B9B9B9",
                                }}
                            >
                                Payment
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            return <div className="left-section-wrapper"></div>;
        }
    }
}

export default LeftSection;
