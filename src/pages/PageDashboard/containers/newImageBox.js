import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";

import "static/NewPageDashboard.css";

import Linux from "assets/large_graphics/Linux.png";
import Windows from "assets/large_graphics/Windows.png";

class ImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background:
                this.props.operatingSystem === "Windows" ? Windows : Linux,
        };
    }
    render() {
        let content;

        if (this.props.stage === "notCreated") {
            content = (
                <>
                    <div className="text">{this.props.operatingSystem}</div>
                </>
            );
        } else if (this.props.stage === "creating") {
            content = (
                <>
                    <div className="text">Your Cloud PC Is Creating</div>
                    <div className="subtext">
                        This should take no more than 20 minutes. Once your
                        cloud PC is ready, you'll be able to download our
                        desktop app below to launch your cloud PC.
                    </div>
                </>
            );
        }

        return (
            <div
                className="image-box"
                style={{
                    backgroundImage: `url(${this.state.background})`,
                }}
            >
                <div className="icon">
                    {this.props.stage === "creating" ? (
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                    ) : (
                        <FontAwesomeIcon icon={faPlus} className="icon" />
                    )}
                </div>
                {content}
            </div>
        );
    }
}

export default ImageBox;
