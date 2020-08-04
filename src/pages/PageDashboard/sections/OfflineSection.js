import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { HashLink } from "react-router-hash-link";

import Header from "components/header";

class OfflineSection extends Component {
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
            <div
                style={{
                    backgroundColor: "white",
                    minHeight: "100vh",
                    overflowX: "hidden !important",
                    textAlign: "center",
                }}
            >
                <Header color="#333333" button="#5ec3eb" />
                <div
                    style={{
                        paddingTop: 200,
                        textAlign: "center",
                        maxWidth: 500,
                        margin: "auto",
                        marginBottom: 60,
                    }}
                >
                    {this.props.month} {this.props.day}, {this.props.year}:
                    Fractal is currently undergoing a major update and will be
                    back online within a few days. We apologize for the
                    inconvenience!
                </div>
                <HashLink
                    to="/#top"
                    style={{ outline: "none", textDecoration: "none" }}
                >
                    <Button
                        style={{
                            color: "#5ec3eb",
                            border: "none",
                            fontWeight: "bold",
                            padding: "12px 25px",
                            outline: "none",
                            background: "rgba(94, 195, 235,0.1)",
                        }}
                    >
                        Back to Home
                    </Button>
                </HashLink>
            </div>
        );
    }
}

export default OfflineSection;
