import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "static/PageDashboard.css";

class PaymentBox extends Component {
    render() {
        return (
            <Row
                className="payment-box"
                style={{
                    marginLeft: 0,
                    marginRight: 0,
                }}
            >
                <Col md={1}>
                    <FontAwesomeIcon
                        icon={
                            this.props.icon === "Credit Card"
                                ? faCreditCard
                                : faTag
                        }
                        className="icon"
                    />
                </Col>
                <Col md={3} className="title">
                    {this.props.title}
                </Col>
                <Col md={8} className="subtext">
                    {this.props.subtext}
                </Col>
            </Row>
        );
    }
}

export default PaymentBox;
