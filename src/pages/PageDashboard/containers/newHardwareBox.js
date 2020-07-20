import React, { Component } from "react";

import "static/NewPageDashboard.css";

class HardwareBox extends Component {
    render() {
        return (
            <div className="hardware-box">
                <img
                    src={this.props.icon}
                    alt=""
                    style={{
                        textAlign: "left",
                        marginTop: 5,
                        height: 45,
                    }}
                />
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        marginTop: 20,
                    }}
                >
                    {this.props.title}
                </div>
                <div
                    style={{
                        color: "#555555",
                        fontSize: 13,
                    }}
                >
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default HardwareBox;
