import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaWindows, FaUbuntu } from "react-icons/fa";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "static/PageDashboard.css";

import Linux from "assets/large_graphics/Linux.png";
import Windows from "assets/large_graphics/Windows.png";
import HardwareBox from "pages/PageDashboard/containers/hardwareBox";

import CPU from "assets/icons/cpu.svg";
import GPU from "assets/icons/gpu.svg";
import RAM from "assets/icons/ram.svg";
import SSD from "assets/icons/ssd.svg";

class ImageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background:
                this.props.operatingSystem === "Windows" ? Windows : Linux,
        };
    }
    render() {
        const title =
            this.props.stage === "created" ? (
                <div className="title">
                    {this.props.operatingSystem === "Windows" ? (
                        <>
                            <FaWindows />
                            <span style={{ marginLeft: "0.6em" }}>Windows</span>
                        </>
                    ) : (
                        <>
                            <FaUbuntu />
                            <span style={{ marginLeft: "0.6em" }}>Linux</span>
                        </>
                    )}
                </div>
            ) : null;

        let content;

        if (this.props.stage === "notCreated") {
            content = (
                <>
                    <div className="text" style={{ fontSize: "24pt" }}>
                        {this.props.operatingSystem}
                    </div>
                </>
            );
        } else if (this.props.stage === "creating") {
            content = (
                <>
                    <div className="text">
                        Your {this.props.operatingSystem} Cloud PC Is Creating
                    </div>
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
                    <Col lg={6} md={12}>
                        <HardwareBox
                            icon={CPU}
                            title="CPU"
                            text="6 Core Intel Xeon E5"
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <HardwareBox
                            icon={GPU}
                            title="GPU"
                            text="NVIDIA Tesla M60"
                        />
                    </Col>
                    <Col lg={6} md={12}>
                        <HardwareBox icon={RAM} title="RAM" text="56GB DDR4" />
                    </Col>
                    <Col lg={6} md={12}>
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
                {this.props.stage === "creating" && (
                    <div className="icon">
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                    </div>
                )}
                {this.props.stage === "notCreated" && (
                    <div className="icon" style={{ marginTop: "5em" }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                )}
                {title}
                {content}
            </div>
        );
    }
}

export default ImageBox;
