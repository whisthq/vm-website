import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import LoadingSection from "pages/PageDashboard/sections/LoadingSection";
import DisksSection from "pages/PageDashboard/sections/settings/DisksSection";
import AccountSection from "pages/PageDashboard/sections/settings/AccountSection";
import HardwareSection from "pages/PageDashboard/sections/settings/HardwareSection";

import "react-tabs/style/react-tabs.css";
import "static/Shared.css";
import "static/PageSettings.css";

import { fetchDisks } from "store/actions/dashboard/disk_actions";

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
                <div className="settingsContainer">
                    <div
                        style={{
                            paddingTop: 40,
                            paddingBottom: 50,
                            width: "100%",
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
                        <DisksSection width={this.state.width} />
                        <Row style={{ marginTop: 60 }}>
                            <Col md={6} sm={12}>
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
                            <Col md={6} sm={12}>
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
                                <HardwareSection />
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
