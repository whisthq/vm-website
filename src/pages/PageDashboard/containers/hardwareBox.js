import React, { Component } from "react";

import "static/PageDashboard.css";

class HardwareBox extends Component {
    render() {
        return (
            <div className="hardware-box">
                <img src={this.props.icon} alt="" className="icon" />
                <div style={{ marginLeft: 12 }}>
                    <div className="title">{this.props.title}</div>
                    <div className="subtext">{this.props.text}</div>
                </div>
            </div>
        );
    }
}

export default HardwareBox;
