import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTag } from "@fortawesome/free-solid-svg-icons";
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
                <Col lg={1}>
                    <FontAwesomeIcon
                        icon={
                            this.props.icon === "Credit Card"
                                ? faCreditCard
                                : faTag
                        }
                        className="icon"
                    />
                </Col>
                <Col lg={3} className="title">
                    {this.props.title}
                </Col>
                <Col lg={8} className="subtext">
                    {this.props.subtext}
                </Col>
            </Row>
        );
    }
}

export default PaymentBox;
