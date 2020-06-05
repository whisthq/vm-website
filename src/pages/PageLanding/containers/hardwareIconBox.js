import React, { Component } from "react";
import ImageFadeIn from "react-image-fade-in";

import "static/Shared.css";
import "static/PageLanding.css";


class HardwareIconBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
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
    }

    render() {
        return (
            <div>
                {
                    this.state.width > 700
                    ?
                    <div>
                       <ImageFadeIn
                            src={this.props.icon}
                            style={{
                                display: "inline",
                                marginRight: 30,
                                height: 30,
                                float: "left",
                                marginTop: 10,
                            }}
                        />
                        <div
                            style={{
                                display: "inline",
                                float: "left",
                                fontWeight: "bold",
                                fontSize: 20,
                                textAlign: "left",
                            }}
                        >
                            <div style={{ display: "inline" }}>
                                {this.props.title}
                            </div>
                            <div
                                style={{
                                    fontWeight: "normal",
                                    fontSize: 16,
                                    color: "#333333",
                                }}
                            >
                                {this.props.full_description}
                            </div>
                        </div>
                    </div>
                    :
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            textAlign: "left",
                            marginBottom: 10
                        }}
                    >
                        <ImageFadeIn
                            src={this.props.icon}
                            style={{
                                height: 20,
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                        />
                        <div>{this.props.title}</div>
                        <div
                            style={{
                                fontWeight: "normal",
                                fontSize: 14,
                                color: "#333333",
                            }}
                        >
                            {this.props.short_description}
                        </div>
                    </div>
                }
            </div>
        );
    }
}


export default HardwareIconBox;
