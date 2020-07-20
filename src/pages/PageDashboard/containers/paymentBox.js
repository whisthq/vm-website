import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "static/NewPageDashboard.css";

class PaymentBox extends Component {
    render() {
        return (
            <Link
                to="/card"
                style={{
                    textDecoration: "none",
                }}
                className="pointerOnHover"
            >
                <div className="payment-box">
                    <FontAwesomeIcon icon={faCreditCard} className="icon" />
                    <div className="title">Add Payment</div>
                    <div className="subtext">
                        Your cloud PC is free until {this.props.trialEnd}.
                    </div>
                </div>
            </Link>
        );
    }
}

export default PaymentBox;
