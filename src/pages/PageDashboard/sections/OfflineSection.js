import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { HashLink } from "react-router-hash-link";

import Header from "components/header";

import moment from "moment";

class OfflineSection extends Component {
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
                        maxWidth: 600,
                        margin: "auto",
                        marginBottom: 60,
                    }}
                >
                    {moment().format("MMMM Do, YYYY")}: Fractal is currently
                    undergoing a major update. For questions, please contact
                    support@fractalcomputers.com. We apologize for the inconvenience!
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
