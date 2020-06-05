import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

class ImageBox extends Component {
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
