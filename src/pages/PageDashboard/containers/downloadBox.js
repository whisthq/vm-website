import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Popup from "reactjs-popup";

import "static/PageDashboard.css";

import LinuxPopup from "pages/PageDashboard/containers/linuxPopup"


class DownloadBox extends Component {
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
    }

    render() {
        return (
           <Col
                xs={12}
                style={{
                    padding: "0px 20px",
                    marginBottom: 15,
                }}
            >
                <div
                    style={{
                        float:
                            "left",
                        color:
                            "white",
                        display:
                            "inline",
                        fontSize: 13,
                    }}
                >
                    {this.props.icon}
                    {" "}
                    {this.props.text}
                </div>
                <div
                    style={{
                        float:
                            "right",
                        display:
                            "inline",
                        color:
                            "white",
                    }}
                >
                    {this.props.disks === undefined ||
                    this.props.disks.length === 0 ||
                    this.props.disk_is_creating ? (
                        <Popup
                            trigger={
                                <Button className = "download-button" disabled = {this.props.comingSoon}>
                                    Download
                                </Button>
                            }
                            modal
                            contentStyle={{
                                color:
                                    "#111111",
                                width: this.state.width > 500 ? 500 : "95%",
                                borderRadius: 5,
                                backgroundColor: "white",
                                border: "none",
                                height: this.state.width > 700 ? 150 : 200,
                                padding: "30px 50px",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 16,
                                    textAlign: "left",
                                }}
                            >
                                Once your cloud PC is finished creating,
                                you will be able to download our desktop applications
                                to access your cloud PC.
                            </div>
                        </Popup>
                    ) : (
                    this.props.linux 
                    ?
                    <LinuxPopup
                        executable = {this.props.executable}
                        executableName = {this.props.executableName}
                    />
                    :
                    <a
                        href={this.props.executable}
                        download={this.props.executableName}
                    >
                        <Button className = "download-button" disabled = {this.props.comingSoon}>
                            Download
                        </Button>
                    </a>
                    )}
                </div>
            </Col>
        );
    }
}

function mapStateToProps(state) {
    return {
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        disk_is_creating: state.DashboardReducer.disk_is_creating,
    };
}

export default connect(mapStateToProps)(DownloadBox);
