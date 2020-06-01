import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import {
    FaTimes,
    FaCheck,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

import Header from "components/header.js";


class CreditsBox extends Component {
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
    }

    render() {
        return (
            <div>
                {this.props.credits &&
                this.props.credits > 0 ? (
                    <div className = "credits-box">
                        Someone redeemed your promo
                        code! Create a cloud PC to
                        redeem a free subscription
                        for {this.props.credits}{" "}
                        {this.props.credits > 1 ? "months" : "month"}.
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        credits: state.DashboardReducer.credits,
    };
}

export default connect(mapStateToProps)(CreditsBox);
