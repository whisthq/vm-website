import React, { Component } from "react";
import { Redirect, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import history from "utils/history";

import Header from "components/header.js";
import LeftSection from "pages/PageDashboard/sections/LeftSection";
import OfflineSection from "pages/PageDashboard/sections/OfflineSection";
import FeedbackBox from "pages/PageDashboard/containers/feedbackBox";

import MainView from "pages/PageDashboard/views/MainView";
import SettingsView from "pages/PageDashboard/views/SettingsView";

import { monthConvert } from "utils/date";

import "static/PageDashboard.css";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            day: 0,
            month: 0,
            year: 0,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        var today = new Date();
        this.setState(
            {
                day: today.getDate(),
                month: monthConvert(today.getMonth()),
                year: today.getFullYear(),
            },
            function () {
                this.setState({ loaded: true });
            }
        );
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    render() {
        if (this.state.waitlist) {
            return (
                <OfflineSection
                    month={this.state.month}
                    day={this.state.day}
                    year={this.state.year}
                />
            );
        } else if (!this.props.logged_in || !this.props.email_verified) {
            return <Redirect to="/auth" />;
        } else {
            return (
                <div className="dashboard-container">
                    <div style={{ maxWidth: 1920, margin: "auto" }}>
                        <Header
                            color="#111111"
                            button="#5ec3eb"
                            dashboard={this.state.width <= 900}
                        />
                        <FeedbackBox />

                        <div className="dashboard-flex">
                            {this.state.width > 900 && <LeftSection />}
                            <div className="right-section">
                                <div className="date">
                                    {this.state.month} {this.state.day},{" "}
                                    {this.state.year}
                                </div>
                                <Router history={history}>
                                    <Route
                                        exact
                                        path="/dashboard"
                                        component={MainView}
                                    />
                                    <Route
                                        path="/dashboard/settings"
                                        component={SettingsView}
                                    />
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        logged_in: state.AuthReducer.logged_in,
        email_verified: state.AuthReducer.email_verified,
    };
}

export default connect(mapStateToProps)(Dashboard);
