import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
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

const usage = {
    Productivity: "how users are working",
    Gaming: "what users are playing",
    Graphics: "what users are creating",
};

class UseCaseModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ borderRadius: 10 }}
            >
                <Modal.Body style={{ padding: 40 }}>
                    <Row>
                        <Col md={8}>
                            <ImageFadeIn
                                style={{
                                    width: "100%",
                                    margin: "auto",
                                    borderRadius: 10,
                                }}
                                src={images[this.props.case]}
                            />
                        </Col>
                        <Col
                            md={4}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
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
                                    paddingTop: 60,
                                }}
                            >
                                {descriptions[this.props.case]}
                            </div>
                            <div
                                style={{
                                    fontSize: 16,
                                    fontWeight: 1000,
                                    color: "#111111",
                                    paddingTop: 20,
                                }}
                            >
                                <a
                                    href="https://medium.com/@fractalcomputers"
                                    style={{ color: "#111111" }}
                                >
                                    Read more about {usage[this.props.case]} on
                                    Fractal on our blog.
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

export default UseCaseModal;
