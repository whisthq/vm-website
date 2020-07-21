import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";

import "static/PagePurchase.css";

import {
    storeSetupStep,
    storeSelectedApps,
} from "store/actions/dashboard/vm_setup_actions";

import AppCard from "pages/PagePurchase/containers/appBox";
import SurveyButton from "pages/PagePurchase/containers/surveyButton";
import { apps } from "pages/PagePurchase/constants/installable_apps";

class AppSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            apps: apps,
            selectedApps: [],
            totalStorage: 0,
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

    nextStepKeyPress = (event) => {
        if (event.key === "Enter") {
            this.nextStep();
        }
    };

    nextStep = () => {
        this.props.dispatch(storeSetupStep(5));
        if (this.state.selectedApps && this.state.selectedApps.length > 0) {
            this.props.dispatch(storeSelectedApps(this.state.selectedApps));
        }
    };

    handleTabChange = (key) => {
        const filteredApps =
            key === "All" ? apps : apps.filter((app) => app.category === key);
        this.setState({ apps: filteredApps });
    };

    handleSelectApp = (app_name, app_size) => {
        if (this.state.selectedApps.includes(app_name)) {
            this.setState({
                selectedApps: this.state.selectedApps.filter(
                    (a) => a !== app_name
                ),
                totalStorage: this.state.totalStorage - app_size,
            });
        } else {
            if (this.state.totalStorage + app_size < 75000) {
                this.setState({
                    selectedApps: [...this.state.selectedApps, app_name],
                    totalStorage: this.state.totalStorage + app_size,
                });
            }
        }
    };

    render() {
        return (
            <div onKeyPress={this.nextStepKeyPress}>
                <SurveyButton currentStep={this.props.step} />
                <div
                    className="apps-select"
                    style={{
                        height:
                            this.state.width > 700
                                ? "calc(100vh - 300px)"
                                : "50%",
                        minHeight: 600,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div>
                        {this.state.width > 700 ? (
                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    bottom: 2,
                                    width: 39,
                                }}
                            >
                                4{" "}
                                <FaArrowRight
                                    style={{
                                        height: 10,
                                        position: "relative",
                                        bottom: 2,
                                    }}
                                />
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div
                            style={{
                                fontSize: 22,
                                display: "inline-block",
                            }}
                        >
                            Pre-install your applications
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: 5,
                            marginBottom: 12,
                            color: "#333333",
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                            fontSize: 16,
                            flex: "0 0 auto",
                            lineHeight: 1.6,
                            maxWidth: 800,
                        }}
                    >
                        We can pre-install certain apps on your cloud PC (as
                        long as it's not behind a license, like Adobe). If the
                        app you want is not listed below, you can always install
                        it once your cloud PC is created. Please note that
                        installing many apps can significantly increase the
                        amount of time it takes to set up your cloud PC.
                    </div>
                    <Tabs
                        defaultActiveKey="All"
                        className="mb-3 app-tabs"
                        onSelect={this.handleTabChange}
                        variant="pills"
                        style={{
                            borderBottom: "none",
                            paddingBottom: 10,
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                            marginTop: 30,
                        }}
                    >
                        <Tab eventKey="All" title="All Apps" />
                        <Tab eventKey="Productivity" title="Productivity" />
                        <Tab eventKey="Communication" title="Communication" />
                        <Tab eventKey="Gaming" title="Gaming" />
                        <Tab eventKey="Creative" title="Creative" />
                        <Tab eventKey="Developer" title="Developer" />
                    </Tabs>
                    <div
                        style={{
                            overflowY: "auto",
                            overflowX: "hidden",
                            width: "100%",
                            paddingRight: 20,
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                            marginTop: 10,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                            }}
                        >
                            {this.state.apps
                                .sort(function (x, y) {
                                    x = x.name.toLowerCase();
                                    y = y.name.toLowerCase();
                                    return x < y ? -1 : x > y ? 1 : 0;
                                })
                                .map((app, i) => {
                                    return (
                                        <div
                                            key={app.name}
                                            style={{
                                                flex: "1 0 auto",
                                                minWidth:
                                                    this.state.width > 700
                                                        ? "33%"
                                                        : "100%",
                                                maxWidth: 400,
                                            }}
                                        >
                                            <AppCard
                                                title={app.name}
                                                image={app.image}
                                                tag={app.category}
                                                selected={this.state.selectedApps.includes(
                                                    app.name
                                                )}
                                                handleSelect={() =>
                                                    this.handleSelectApp(
                                                        app.name,
                                                        app.size
                                                    )
                                                }
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            marginTop: 40,
                            paddingLeft: this.state.width > 700 ? 39 : 0,
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Button
                            onClick={this.nextStep}
                            style={{
                                background: "#111111",
                                border: "none",
                                padding: "10px 45px",
                                display: "inline-block",
                                maxHeight: "44px",
                            }}
                        >
                            Install {this.state.selectedApps.length.toString()}{" "}
                            selected{" "}
                            {this.state.selectedApps.length === 1 ? (
                                <span>app</span>
                            ) : (
                                <span>apps</span>
                            )}
                        </Button>
                        <span
                            style={{
                                color: "#555555",
                                fontSize: 14,
                                fontWeight: "bold",
                                paddingRight: 40,
                            }}
                        >
                            {(this.state.totalStorage / 1000)
                                .toFixed(2)
                                .toString()}{" "}
                            GB / 75 GB
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(AppSection);
