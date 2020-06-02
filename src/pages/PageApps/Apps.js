import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { connect } from "react-redux";
import "static/Shared.css";

import Header from "components/header.js";
import AppCard from "components/appcard.js";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { withRouter } from "react-router";

const apps = require("../../assets/data/apps.json");

class Apps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            loaded: true,
            apps: apps,
        };
        this.customWidth = React.createRef();
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    handleTabChange(key) {
        const filteredApps =
            key === "All" ? apps : apps.filter((app) => app.category === key);
        this.setState({ apps: filteredApps });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div
                    style={{
                        backgroundColor: "white",
                        minHeight: "100vh",
                        overflowX: "hidden !important",
                        textAlign: "center",
                    }}
                >
                    <Header color="#333333" button="#5ec3eb" />
                    <div
                        style={{
                            paddingTop: 250,
                            textAlign: "center",
                            maxWidth: 500,
                            margin: "auto",
                            marginBottom: 60,
                            fontSize: 50,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{ color: "#111111" }}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <Container>
                    <Tabs
                        defaultActiveKey="all"
                        className="mb-3"
                        onSelect={this.handleTabChange}
                    >
                        <Tab eventKey="All" title="All" />
                        <Tab eventKey="Productivity" title="Productivity" />
                        <Tab eventKey="Gaming" title="Gaming" />
                        <Tab eventKey="Creative" title="Creative" />
                        <Tab eventKey="Developer" title="Developer" />
                    </Tabs>
                    <Row>
                        {this.state.apps.map((app, i) => {
                            return (
                                <Col md="3" className="mb-3">
                                    <AppCard
                                        key={app.name}
                                        title={app.name}
                                        image={require("../../assets/apps/" +
                                            app.image)}
                                        tag={app.category}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.AuthReducer.logged_in,
        user: state.AuthReducer.username,
        id: state.DashboardReducer.id,
        email_verified: state.AuthReducer.email_verified,
        customer: state.DashboardReducer.customer,
    };
}

export default withRouter(connect(mapStateToProps)(Apps));
