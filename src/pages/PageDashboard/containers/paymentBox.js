import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "static/PageDashboard.css";

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
                <Row
                    className="payment-box"
                    style={{
                        marginLeft: 0,
                        marginRight: 0,
                    }}
                >
                    <Col md={1}>
                        <FontAwesomeIcon icon={faCreditCard} className="icon" />
                    </Col>
                    <Col md={3} className="title">
                        Add Payment
                    </Col>
                    <Col md={8} className="subtext">
                        Your cloud PC is free until {this.props.trialEnd}.
                    </Col>
                </Row>
            </Link>
        );
    }
}

export default PaymentBox;
