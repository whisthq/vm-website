import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Popup from "reactjs-popup";
import ImageFadeIn from "react-image-fade-in";

class EmployeeBox extends Component {
    render() {
        return (
            <Col md={4} style={{ marginBottom: 20 }}>
                <Popup
                    modal
                    trigger={
                        <div
                            className="expandOnHover"
                            style={{
                                background: "white",
                                borderRadius: 10,
                                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                padding: 30,
                                textAlign: "center",
                            }}
                        >
                            <ImageFadeIn
                                src={this.props.image}
                                style={{
                                    maxWidth: 130,
                                    maxHeight: 130,
                                }}
                            />
                        </div>
                    }
                    contentStyle={{
                        width: 500,
                        borderRadius: 5,
                        backgroundColor: "#EBEBEB",
                        border: "none",
                        minHeight: 325,
                        padding: "30px 50px",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <ImageFadeIn
                                src={this.props.image}
                                style={{
                                    maxWidth: 75,
                                    maxHeight: 75,
                                }}
                            />
                            <div
                                style={{
                                    paddingLeft: 50,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 30,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {this.props.name}
                                </div>
                                <div
                                    style={{
                                        marginTop: 20,
                                        color: "#555555",
                                    }}
                                >
                                    {this.props.text}
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </Col>
        );
    }
}

export default EmployeeBox;
