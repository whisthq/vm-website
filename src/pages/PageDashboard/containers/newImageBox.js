import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "static/NewPageDashboard.css";

import Linux from "assets/large_graphics/Linux.png";
import Windows from "assets/large_graphics/Windows.png";
import HardwareBox from "pages/PageDashboard/containers/newHardwareBox";

import CPU from "assets/icons/cpu.svg";
import GPU from "assets/icons/gpu.svg";
import RAM from "assets/icons/ram.svg";
import SSD from "assets/icons/hard-drive-icon.svg";

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
        } else if (this.props.stage === "created") {
            content = (
                <Row>
                    <Col sm={6} xs={12}>
                        <HardwareBox
                            icon={CPU}
                            title="CPU"
                            text="6 Core Intel Xeon E5"
                        />
                    </Col>
                    <Col sm={6} xs={12}>
                        <HardwareBox
                            icon={GPU}
                            title="GPU"
                            text="NVIDIA Tesla M60"
                        />
                    </Col>
                    <Col sm={6} xs={12}>
                        <HardwareBox icon={RAM} title="RAM" text="56GB DDR4" />
                    </Col>
                    <Col sm={6} xs={12}>
                        <HardwareBox
                            icon={SSD}
                            title="SSD"
                            text={
                                <span>
                                    {this.props.total_storage}
                                    &nbsp;Storage
                                </span>
                            }
                        />
                    </Col>
                </Row>
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
