import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FaSpaceShuttle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import LoadingSection from "pages/PageDashboard/sections/LoadingSection";
import DisksSection from "pages/PageDashboard/sections/settings/DisksSection";
import AccountSection from "pages/PageDashboard/sections/settings/AccountSection";
import HardwareSection from "pages/PageDashboard/sections/settings/HardwareSection";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";

import { fetchDisks } from "store/actions/dashboard/disk_actions";

import SSD from "assets/icons/hard-drive-icon.svg";

class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            loaded: true,
        };
        this.customWidth = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(fetchDisks(this.props.user));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    componentDidUpdate(prevProps) {}

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        if (!this.state.loaded && this.props.user) {
            return <LoadingSection />;
        } else {
            return (
                <div
                    style={{
                        display: "flex",
                        overflowX: "hidden",
                        position: "relative",
                        bottom: 60,
                    }}
                >
                    <div
                        style={{
                            paddingTop: 40,
                            paddingBottom: 50,
                        }}
                    >
                        <div
                            style={{
                                fontSize: this.state.width > 900 ? 42 : 35,
                                fontWeight: "bold",
                                paddingTop: 20,
                            }}
                        >
                            SETTINGS
                        </div>
                        <DisksSection />
                        <Row style={{ marginTop: 60 }}>
                            <Col sm={6} xs={12}>
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                        display: "inline",
                                    }}
                                >
                                    Account
                                </div>
                                <AccountSection />
                            </Col>
                            <Col sm={6} xs={12}>
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                        display: "inline",
                                    }}
                                >
                                    Cloud PC Hardware
                                </div>
                                <div style={{ width: "100%" }}>
                                    <HardwareSection />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.AuthReducer.username,
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        id: state.DashboardReducer.id,
        customer: state.DashboardReducer.customer,
    };
}

export default withRouter(connect(mapStateToProps)(SettingsView));
