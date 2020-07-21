import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import {
    FaUser,
    FaPlay,
    FaFastForward,
    FaPause,
    FaWindows,
    FaApple,
    FaUbuntu,
    FaAndroid,
    FaTag,
} from "react-icons/fa";

import "static/PageDashboard.css";

import WindowsBin from "bin/Fractal.exe";
import MacBin from "bin/Fractal.dmg";
import LinuxBin from "bin/Fractal.AppImage";

import DownloadBox from "pages/PageDashboard/containers/downloadBox";
import CancelPopup from "pages/PageDashboard/containers/cancelPopup";
import InfoRow from "pages/PageDashboard/containers/infoRow";

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

    render() {
        return (
            <Row style={{ marginTop: 40, paddingBottom: 40 }}>
                <Col lg={6} md={12}>
                    <div className="bottom-title">Downloads</div>
                    <div style={{ width: "100%" }}>
                        <div className="download-box">
                            <Row
                                style={{
                                    width: "100%",
                                    margin: 0,
                                }}
                            >
                                <DownloadBox
                                    icon={<FaWindows className="icon" />}
                                    text="Windows 64-Bit"
                                    executable={WindowsBin}
                                    executableName="Fractal.exe"
                                />
                                <DownloadBox
                                    icon={<FaApple className="icon" />}
                                    text="macOS 10.13+"
                                    executable={MacBin}
                                    executableName="Fractal.dmg"
                                />
                                <DownloadBox
                                    icon={<FaUbuntu className="icon" />}
                                    text="Linux Ubuntu"
                                    executable={LinuxBin}
                                    executableName="Fractal.AppImage"
                                    linux
                                />
                                <DownloadBox
                                    icon={<FaAndroid className="icon" />}
                                    text="Android"
                                    comingSoon={true}
                                />
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col
                    lg={6}
                    md={12}
                    style={{
                        marginTop: this.state.width > 992 ? 0 : 70,
                    }}
                >
                    <div>
                        <div className="bottom-title">My Info</div>
                        <CancelPopup
                            created={this.props.created}
                            customer={this.props.customer}
                        />
                    </div>
                    <div className="info-box">
                        <Row
                            style={{
                                width: "100%",
                                margin: 0,
                            }}
                        >
                            <InfoRow
                                icon={<FaUser className="icon" />}
                                name="Username"
                                text={this.props.username}
                            />
                            <InfoRow
                                icon={<FaFastForward className="icon" />}
                                name="Hours Used This Cycle"
                                text={this.props.hoursUsed}
                            />
                            <InfoRow
                                icon={<FaPause className="icon" />}
                                name="Current Period End"
                                text={this.props.billEnd}
                            />
                            <InfoRow
                                icon={<FaPlay className="icon" />}
                                name="Current Plan"
                                text={
                                    this.props.payment &&
                                    Object.keys(this.props.payment).length >
                                        0 &&
                                    this.props.payment.plan
                                        ? this.props.payment.plan.nickname
                                        : null
                                }
                            />
                            <InfoRow
                                icon={<FaTag className="icon" />}
                                name="Free Trial Ends"
                                text={this.props.trialEnd}
                            />
                        </Row>
                    </div>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        payment: state.DashboardReducer.payment,
        customer: state.DashboardReducer.customer,
    };
}

export default connect(mapStateToProps)(BottomSection);
