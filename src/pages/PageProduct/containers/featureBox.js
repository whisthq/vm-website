import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageFadeIn from "react-image-fade-in";

import Gaming from "assets/large_graphics/gaming.png";
import Productivity from "assets/large_graphics/productivity.png";
import Graphics from "assets/large_graphics/graphics.png";

const descriptions = {
    Productivity:
        "Get your work done faster and without  frustration with Fractal. Preinstall your applications and launch your cloud PC in less than 3 minutes. Fractal supports anything you can think of, from heavy video editing to running CPU-intensive computation.",
    Gaming:
        "Fractal’s cloud computers and low-latency streaming technology are perfect for playing graphics-intensive games on mid-tier computers. Play the latest games without buying the latest gaming PCs.",
    Graphics:
        "Render and view your graphics faster with Fractal. Fractal’s technology streams your cloud PC at high resolution, fully utilizing our powerful GPUs.",
};

const images = {
    Productivity: Productivity,
    Gaming: Gaming,
    Graphics: Graphics,
};

class FeatureBox extends Component {
    render() {
        return (
            <Row className="featureRow">
                <Col md={2}>
                    {" "}
                    <ImageFadeIn
                        src={this.props.icon}
                        style={{
                            width: 80,
                            display: "block",
                            margin: "auto",
                        }}
                    />
                </Col>
                <Col md={2}>
                    <div
                        style={{
                            textAlign: "left",
                            color: "#111111",
                            fontSize: 24,
                        }}
                    >
                        {" "}
                        {this.props.title}
                    </div>
                </Col>
                <Col md={8}>
                    <p style={{ paddingRight: 40 }}>{this.props.description}</p>
                </Col>
            </Row>
        );
    }
}

export default FeatureBox;
