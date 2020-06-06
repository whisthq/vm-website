import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "components/header.js";

import {
    resetSetupData
} from "store/actions/dashboard/vm_setup_actions";

import LeftSection from "pages/PagePurchase/sections/LeftSection";
import CountrySection from "pages/PagePurchase/sections/CountrySection";
import StateSection from "pages/PagePurchase/sections/StateSection";
import WaitlistSection from "pages/PagePurchase/sections/WaitlistSection";
import SpecSection from "pages/PagePurchase/sections/SpecSection";
import PlanSection from "pages/PagePurchase/sections/PlanSection";
import AppSection from "pages/PagePurchase/sections/AppSection";

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(resetSetupData())
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const RenderSurvey = () => {
            if (this.props.vm_setup_data.step === 1) {
                return (
                    <CountrySection
                        vm_setup_data = {this.props.vm_setup_data}
                        step = {1}
                    />
                )
            } else if (this.props.vm_setup_data.step === 2) {
                return (
                    <StateSection
                        vm_setup_data = {this.props.vm_setup_data}
                        step = {2}
                    />
                );
            } else if (this.props.vm_setup_data.step === 2.1) {
                return (
                    <WaitlistSection
                        vm_setup_data = {this.props.vm_setup_data}
                        step = {2}
                    />
                );
            } else if (this.props.vm_setup_data.step === 3) {
                return (
                    <SpecSection
                        vm_setup_data = {this.props.vm_setup_data}
                        step = {3}
                    />
                );
            } else if (this.props.vm_setup_data.step === 4) {
                return (
                    <AppSection
                        vm_setup_data = {this.props.vm_setup_data}
                        step = {4}
                    />
                );
            } else {
                return (
                    <PlanSection
                        vm_setup_data = {this.props.vm_setup_data}
                        credits = {this.props.credits}
                        step = {5}
                    />
                );
            }
        };

        return (
            <div className = "purchase">
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#333333" button="#5ec3eb" />
                    <div className = "purchase-flex">
                        <LeftSection
                            vm_setup_data = {this.props.vm_setup_data}
                        />
                        {RenderSurvey()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        credits: state.DashboardReducer.credits,
        vm_setup_data: state.DashboardReducer.vm_setup_data
    };
}

export default connect(mapStateToProps)(Purchase);
