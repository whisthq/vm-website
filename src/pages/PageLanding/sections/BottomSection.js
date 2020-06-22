import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ReactTypeformEmbed } from "react-typeform-embed";

import "static/Shared.css";
import "static/PageLanding.css";

class BottomSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    openForm = () => {
        this.typeformEmbed.typeform.open();
    };

    render() {
        return (
            <div
                style={{
                    background: "white",
                    paddingLeft: 40,
                    paddingRight: 40,
                }}
                id="beta"
            >
                <ReactTypeformEmbed
                    popup
                    autoOpen={false}
                    url="https://fractalcomputers.typeform.com/to/kVelwx"
                    hideHeaders
                    hideFooter
                    buttonText="Request Access"
                    ref={(tf) => {
                        this.typeformEmbed = tf;
                    }}
                    style={{ zIndex: -100 }}
                />
                <Container
                    style={{
                        paddingTop: 75,
                        paddingBottom: this.state.width > 700 ? 150 : 70,
                    }}
                >
                    <div
                        style={{
                            fontSize:
                                this.state.width > 700
                                    ? "calc(30px + 1.1vw)"
                                    : 35,
                            textAlign:
                                this.state.width > 700 ? "center" : "left",
                            color: "#111111",
                            fontWeight: "bold",
                        }}
                    >
                        Fractal is{" "}
                        <span className="blue-gradient">expanding</span>
                    </div>
                    <div
                        style={{
                            textAlign:
                                this.state.width > 700 ? "center" : "left",
                        }}
                    >
                        <div style={{ margin: "auto", maxWidth: 750 }}>
                            <p
                                style={{
                                    marginTop: 20,
                                    color: "#333333",
                                    fontSize:
                                        this.state.width > 700
                                            ? "calc(14px + 0.4vw)"
                                            : 14,
                                    lineHeight:
                                        this.state.width > 700 ? 1.5 : 1.7,
                                }}
                            >
                                We currently have servers across the Eastern and
                                Midwestern United States. If you live outside
                                these areas, you can request access below.
                            </p>
                        </div>
                        <Button
                            onClick={this.openForm}
                            style={{ marginTop: 30 }}
                            className="black-button"
                        >
                            REQUEST ACCESS
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default BottomSection;
