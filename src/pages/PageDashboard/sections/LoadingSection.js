import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import Header from "components/header.js";

import "static/Shared.css";


class LoadingSection extends Component {
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
                        paddingTop: 250,
                        textAlign: "center",
                        maxWidth: 500,
                        margin: "auto",
                        marginBottom: 60,
                        fontSize: 50,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCircleNotch}
                        spin
                        style={{ color: "#111111" }}
                    />
                </div>
            </div>
        );
    }
}

export default LoadingSection;