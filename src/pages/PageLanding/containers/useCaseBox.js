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

class UseCaseBox extends Component {
    render() {
        return (
            <div
                style={{
                    padding: "40px 0",
                }}
                id={this.props.case}
            >
                <Row>
                    <Col md={{ span: 4, offset: 2 }}>
                        <ImageFadeIn
                            style={{
                                width: "100%",
                                margin: "auto",
                                borderRadius: 10,
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                            }}
                            src={images[this.props.case]}
                        />
                    </Col>
                    <Col
                        md={5}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            padding: "0 60px",
                            paddingBottom: 20,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 24,
                                fontWeight: 1000,
                                color: "#111111",
                            }}
                        >
                            {this.props.case}
                        </div>
                        <div
                            style={{
                                fontSize: 16,
                                color: "#111111",
                                paddingTop: 20,
                            }}
                        >
                            {descriptions[this.props.case]}
                        </div>
                    </Col>
                    <Col md={1} />
                </Row>
            </div>
        );
    }
}

export default UseCaseBox;
