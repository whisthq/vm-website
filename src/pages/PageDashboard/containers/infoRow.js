import React, { Component } from "react";
import Col from "react-bootstrap/Col";

import "static/PageDashboard.css";

class InfoRow extends Component {
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
            <Col
                xs={12}
                style={{
                    padding: "0px 20px",
                    marginBottom: 15,
                }}
            >
                <div
                    style={{
                        float: this.state.width > 700 ? "left" : "none",
                        display: this.state.width > 700 ? "inline" : "block",
                        fontWeight: "bold",
                        color: "#555555",
                    }}
                >
                    {this.props.icon} {this.props.name}
                </div>
                {this.props.text ? (
                    <div
                        style={{
                            float: this.state.width > 700 ? "right" : "none",
                            display:
                                this.state.width > 700 ? "inline" : "block",
                            paddingLeft: this.state.width > 700 ? 0 : 17,
                            color: "#555555",
                        }}
                    >
                        {this.props.text}
                    </div>
                ) : (
                    <div className="gray-line"></div>
                )}
            </Col>
        );
    }
}

export default InfoRow;
