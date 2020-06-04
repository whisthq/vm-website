import React, { Component } from "react";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import "static/Shared.css";

import Header from "components/header.js";
import AppCard from "components/appcard.js";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const apps = require("../../assets/data/apps.json");

export default class Apps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apps: apps,
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    handleTabChange = (key) => {
        const filteredApps =
            key === "All" ? apps : apps.filter((app) => app.category === key);
        this.setState({ apps: filteredApps });
    };

    render() {
        return (
            <Container style={{ flex: "1 1 auto", overflowY: "auto" }}>
                <Tabs
                    defaultActiveKey="All"
                    className="mb-3"
                    onSelect={this.handleTabChange}
                >
                    <Tab eventKey="All" title="All" />
                    <Tab eventKey="Productivity" title="Productivity" />
                    <Tab eventKey="Communication" title="Communication" />
                    <Tab eventKey="Gaming" title="Gaming" />
                    <Tab eventKey="Creative" title="Creative" />
                    <Tab eventKey="Developer" title="Developer" />
                </Tabs>
                <Row>
                    {this.state.apps.map((app, i) => {
                        return (
                            <Col md="3" className="mb-3" key={app.name}>
                                <AppCard
                                    title={app.name}
                                    image={app.image}
                                    tag={app.category}
                                    selected={this.props.selectedApps.includes(
                                        app.name
                                    )}
                                    handleSelect={this.props.handleSelectApp}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    }
}
