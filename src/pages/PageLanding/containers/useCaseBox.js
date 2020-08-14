import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ImageFadeIn from "react-image-fade-in";

import Gaming from "assets/large_graphics/gaming.png";
import Productivity from "assets/large_graphics/productivity.png";
import Graphics from "assets/large_graphics/graphics.png";

const descriptions = {
    Productivity:
        "Get your work done faster with gigabyte Internet speeds, 56GB RAM, and pre-installable applications.",
    Graphics:
        "Every Fractal cloud PC has a dedicated virtual graphics card capable of handling complex textures, effects, and renders.",
    Gaming:
        "Run your favorite Windows games at 60+ FPS and ultra-low latency.",
};

const images = {
    Productivity: Productivity,
    Gaming: Gaming,
    Graphics: Graphics,
};

const headers = {
    Productivity:
        "Unlock more RAM and blazing-fast Internet",
    Gaming:
        "Play demanding Windows games on any laptop",
    Graphics:
        "Design and render faster"
}

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
                    <Col md={{ span: 7, order: this.props.reverse ? 2 : 1 }}>
                        <ImageFadeIn
                            style={{
                                width: "100%",
                                margin: "auto",
                                borderRadius: 3,
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                            }}
                            src={images[this.props.case]}
                        />
                    </Col>
                    <Col
                        md={{ span: 5, order: this.props.reverse ? 1 : 2 }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-end",
                                paddingLeft: this.props.reverse ? 0 : 50,
                                paddingRight: this.props.reverse ? 50 : 0,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "calc(16px + 0.4vw)",
                                    fontWeight: 1000,
                                    color: "#1b1f7d",
                                    marginBottom: 10
                                }}
                            >
                                {this.props.case}
                            </div>
                            <div
                                style={{
                                    fontSize: "calc(30px + 1.1vw)",
                                    fontWeight: "bold",
                                    color: "#111111",
                                    lineHeight: 1.3
                                }}
                            >
                                {headers[this.props.case]}
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
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UseCaseBox;
