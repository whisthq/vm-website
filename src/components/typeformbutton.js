import React, { Component } from "react";

class TypeformButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <button
                    style={{
                        outline: "none",
                        fontWeight: "bold",
                        textAlign: "left",
                        marginTop: 10,
                        border: "none",
                        color: "#1ba8e0",
                        borderRadius: 3,
                        padding: "2px 20px",
                        background: "rgba(94, 195, 235, 0.2)",
                        width: 140,
                    }}
                >
                    {this.props.checked ? (
                        <div
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 8,
                                border: "solid 1px #1ba8e0",
                                background: "#27a7d6",
                                position: "relative",
                                top: 13,
                            }}
                        ></div>
                    ) : (
                        <div
                            style={{
                                width: 15,
                                height: 15,
                                borderRadius: 8,
                                border: "solid 1px #1ba8e0",
                                background: "none",
                                position: "relative",
                                top: 13,
                            }}
                        ></div>
                    )}
                    <div
                        style={{
                            position: "relative",
                            bottom: 7,
                            marginLeft: 30,
                        }}
                    >
                        {this.props.buttonText}
                    </div>
                </button>
            </div>
        );
    }
}

export default TypeformButton;
