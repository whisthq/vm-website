import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "react-tabs/style/react-tabs.css";
import "static/PageDashboard.css";

import {
    retrieveCustomer,
    fetchUserReport,
} from "store/actions/dashboard/customer_actions";
import { dashboardLoaded } from "store/actions/dashboard/rendering_actions";
import {
    fetchDisks,
    fetchDiskAttachStatus,
} from "store/actions/dashboard/disk_actions";

import ReferralButton from "pages/PageDashboard/containers/referralButton";
import CreditsBox from "pages/PageDashboard/containers/creditsBox";

import LoadingSection from "pages/PageDashboard/sections/LoadingSection";
import TopSection from "pages/PageDashboard/sections/TopSection";
import BottomSection from "pages/PageDashboard/sections/BottomSection";

import { unixToDate } from "utils/date";

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            created: "",
            billStart: "",
            billEnd: "",
            trialEnd: "",
            cancelling: false,
            waitlist: false,
            loaded: false,
            total_storage: "120GB",
            hoursUsed: "",
        };
    }

    componentDidMount() {
        this.props.dispatch(dashboardLoaded(false));
        this.props.dispatch(fetchDisks(this.props.user));
        this.props.dispatch(retrieveCustomer());

        if (this.props.disk_attach_status_id && this.props.disk_is_creating) {
            this.props.dispatch(
                fetchDiskAttachStatus(this.props.disk_attach_status_id)
            );
        }

        if (this.props.disks && Object.keys(this.props.disks).length > 1) {
            var total_storage = 0;
            this.props.disks.forEach(function (disk) {
                total_storage = total_storage + Number(disk["disk_size"]);
            });
            this.setState({
                total_storage: total_storage.toString() + "GB",
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.payment && Object.keys(this.props.payment).length > 0) {
            if (this.state.created === "" && this.props.payment.created) {
                this.setState({
                    created: unixToDate(this.props.payment.created),
                });
            }
            if (
                this.state.billStart === "" &&
                this.props.payment.current_period_start
            ) {
                this.setState({
                    billStart: unixToDate(
                        this.props.payment.current_period_start
                    ),
                });
                this.props.dispatch(
                    fetchUserReport(this.props.payment.current_period_start)
                );
            }
            if (
                this.state.billEnd === "" &&
                this.props.payment.current_period_end
            ) {
                this.setState({
                    billEnd: unixToDate(this.props.payment.current_period_end),
                });
            }
            if (
                this.state.trialEnd === "" &&
                this.props.payment.trial_end &&
                this.props.payment.trial_end > 0
            ) {
                this.setState({
                    trialEnd: unixToDate(this.props.payment.trial_end),
                });
            }
        } else {
            if (this.state.created !== "") {
                this.setState({ created: "" });
            }
            if (this.state.billStart !== "") {
                this.setState({ billStart: "" });
            }
            if (this.state.billEnd !== "") {
                this.setState({ billEnd: "" });
            }
            if (
                this.state.trialEnd !== "" &&
                this.props.customer &&
                Object.keys(this.props.customer).length === 0
            ) {
                this.setState({ trialEnd: "" });
            }
        }

        if (
            this.state.trialEnd === "" &&
            this.props.customer &&
            this.props.customer.trial_end &&
            Object.keys(this.props.customer).length > 0
        ) {
            if (this.state.billStart === "") {
                this.props.dispatch(fetchUserReport(0));
            }
            this.setState({
                trialEnd: unixToDate(this.props.customer.trial_end),
            });
        }

        if (
            this.props.disks &&
            this.props.disks.length !== prevProps.disks.length &&
            this.state.cancelling
        ) {
            this.setState({ cancelling: false });
        }

        if (
            this.props.user_statistics &&
            this.props.user_statistics.user_report &&
            this.props.user_statistics.user_report.length > 0 &&
            this.state.hoursUsed === ""
        ) {
            var minutesUsed = this.props.user_statistics.user_report.reduce(
                function (total, currentValue) {
                    return total + currentValue.minutes;
                },
                0
            );

            var hoursUsed = (minutesUsed / 60).toFixed(1);
            this.setState({ hoursUsed: hoursUsed.toString() + " hours" });
        }
    }

    render() {
        if (!this.props.dashboard_loaded && this.props.user) {
            return <LoadingSection />;
        } else {
            return (
                <div>
                    <CreditsBox />
                    <ReferralButton />
                    <div className="title">MY CLOUD PC</div>
                    <TopSection
                        total_storage={this.state.total_storage}
                        trialEnd={this.state.trialEnd}
                    />
                    <BottomSection
                        username={this.props.username}
                        created={this.state.created}
                        hoursUsed={this.state.hoursUsed}
                        billEnd={this.state.billEnd}
                        trialEnd={this.state.trialEnd}
                    />
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        username: state.AuthReducer.username,
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        disk_is_creating: state.DashboardReducer.disk_is_creating,
        id: state.DashboardReducer.id,
        payment: state.DashboardReducer.payment,
        customer: state.DashboardReducer.customer,
        dashboard_loaded: state.DashboardReducer.dashboard_loaded,
        disk_attach_status_id: state.DashboardReducer.disk_attach_status_id
            ? state.DashboardReducer.disk_attach_status_id
            : null,
        disk_creation_message: state.DashboardReducer.disk_creation_message
            ? state.DashboardReducer.disk_creation_message
            : "Create Cloud PC command sent to server.",
        access_token: state.AuthReducer.access_token,
        user_statistics: state.DashboardReducer.user_statistics
            ? state.DashboardReducer.user_statistics
            : [],
    };
}

export default withRouter(connect(mapStateToProps)(MainView));
