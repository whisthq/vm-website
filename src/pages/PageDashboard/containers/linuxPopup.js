import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { FaClone } from "react-icons/fa";

import "static/PageDashboard.css";

class DownloadBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            clipboardCopied: false,
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

    copyToClipboard = (e) => {
        this.setState({ clipboardCopied: true });
        navigator.clipboard.writeText(
            "sudo apt-get install libavcodec-dev libavdevice-dev libx11-dev libxtst-dev xclip x11-xserver-utils -y"
        );
    };

    render() {
        return (
            <Popup
                trigger={
                    <button
                        className="download-button"
                        onClick={() =>
                            this.setState({ clipboardCopied: false })
                        }
                    >
                        Download
                    </button>
                }
                modal
                contentStyle={{
                    color: "#111111",
                    width: this.state.width > 500 ? 500 : "95%",
                    borderRadius: 5,
                    backgroundColor: "white",
                    border: "none",
                    height: this.state.width > 700 ? 300 : 350,
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
                    <div>
                        Our Linux application relies on a few system libraries.
                        Before downloading our application, please run the
                        following command from your terminal.
                    </div>
                    <div
                        style={{
                            padding: 20,
                            background: "#0B172B",
                            borderRadius: 4,
                            textAlign: "left",
                            fontSize: 12,
                            marginTop: 25,
                            color: "white",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <div
                                style={{
                                    width: 310,
                                    marginRight: 25,
                                }}
                            >
                                sudo apt-get install libavcodec-dev
                                libavdevice-dev libx11-dev libxtst-dev xclip
                                x11-xserver-utils -y
                            </div>
                            <div
                                style={{
                                    width: 50,
                                    fontSize: 18,
                                    textAlign: "right",
                                }}
                            >
                                <FaClone
                                    className="pointerOnHover"
                                    onClick={this.copyToClipboard}
                                    style={{
                                        color: this.state.clipboardCopied
                                            ? "#5ec3eb"
                                            : "white",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <a
                        href={this.props.executable}
                        download={this.props.executableName}
                    >
                        <Button
                            disabled={
                                this.props.disks === undefined ||
                                this.props.disks.length === 0 ||
                                this.props.disk_is_creating
                                    ? "true"
                                    : "true"
                            }
                            style={{
                                border: "none",
                                fontWeight: "bold",
                                padding: 10,
                                marginTop: 20,
                                width: "100%",
                                background: "rgba(94, 195, 235,0.1)",
                                color: "#5ec3eb",
                            }}
                        >
                            Download
                        </Button>
                    </a>
                </div>
            </Popup>
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
