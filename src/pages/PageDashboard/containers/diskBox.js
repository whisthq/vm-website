import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import SSD from "assets/icons/ssd_dark.svg";

import "static/PageSettings.css";

class DiskBox extends Component {
    render() {
        return (
            <Col
                sm={6}
                lg={4}
                xl={3}
                style={{
                    paddingRight: this.props.width > 900 ? 20 : 0,
                }}
            >
                <div
                    style={{
                        fontSize: 14,
                        background: "rgba(94, 195, 235, 0.06)",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                        borderRadius: 7,
                        padding: "40px 35px",
                        marginTop: 35,
                        minHeight: 210,
                    }}
                >
                    <img
                        src={SSD}
                        alt=""
                        style={{
                            textAlign: "left",
                            marginTop: 5,
                            height: 45,
                        }}
                    />
                    <div
                        style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            marginTop: 25,
                        }}
                    >
                        {"os" in this.props.value && this.props.value.main
                            ? this.props.value.os + " Disk"
                            : "Storage Disk " + this.props.index.toString()}
                    </div>
                    <div
                        style={{
                            marginTop: 3,
                        }}
                    >
                        {this.props.value["disk_size"].toString() + "GB"}
                    </div>
                </div>
            </Col>
        );
    }
}

export default DiskBox;
