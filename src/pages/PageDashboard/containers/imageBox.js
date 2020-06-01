import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

class ImageBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className = "image-box">
                <FontAwesomeIcon
                    icon={
                        faCircleNotch
                    }
                    spin
                    className = "icon"
                />
                <div className = "text">
                    {this.props.text}
                </div>
                <div className = "subtext">
                    {this.props.subtext}
                </div>
            </div>
        );
    }
}

export default ImageBox;
