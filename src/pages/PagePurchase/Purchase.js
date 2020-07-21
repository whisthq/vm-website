import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "components/header.js";

import {
    resetSetupData,
    storeOperatingSystem,
} from "store/actions/dashboard/vm_setup_actions";

import LeftSection from "pages/PagePurchase/sections/LeftSection";
import CountrySection from "pages/PagePurchase/sections/CountrySection";
import StateSection from "pages/PagePurchase/sections/StateSection";
import WaitlistSection from "pages/PagePurchase/sections/WaitlistSection";
import SpecSection from "pages/PagePurchase/sections/SpecSection";
import AppSection from "pages/PagePurchase/sections/AppSection";
import PlanSection from "pages/PagePurchase/sections/PlanSection";
import PaymentSection from "pages/PagePurchase/sections/PaymentSection";

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            operatingSystem: "Windows",
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(resetSetupData());

        let operatingSystem = "Windows";

        if (
            this.props.location &&
            typeof this.props.location.state !== "undefined" &&
            "operatingSystem" in this.props.location.state
        ) {
            operatingSystem = this.props.location.state.operatingSystem;
        }
        this.props.dispatch(storeOperatingSystem(operatingSystem));
        this.setState({ operatingSystem });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        const RenderSurvey = () => {
            if (this.props.vm_setup_data.step === 1) {
                return (
                    <CountrySection
                        vm_setup_data={this.props.vm_setup_data}
                        step={1}
                    />
                );
            } else if (this.props.vm_setup_data.step === 2) {
                return (
                    <StateSection
                        vm_setup_data={this.props.vm_setup_data}
                        step={2}
                    />
                );
            } else if (this.props.vm_setup_data.step === 2.1) {
                return (
                    <WaitlistSection
                        vm_setup_data={this.props.vm_setup_data}
                        step={2}
                    />
                );
            } else if (this.props.vm_setup_data.step === 3) {
                return (
                    <SpecSection
                        vm_setup_data={this.props.vm_setup_data}
                        step={3}
                    />
                );
            } else if (this.props.vm_setup_data.step === 4) {
                return (
                    <AppSection
                        vm_setup_data={this.props.vm_setup_data}
                        step={4}
                    />
                );
            } else if (this.props.vm_setup_data.step === 5) {
                return (
                    <PlanSection
                        vm_setup_data={this.props.vm_setup_data}
                        credits={this.props.credits}
                        enableCreditCard={this.props.require_payment_oncreate}
                        step={5}
                    />
                );
            } else {
                return (
                    <PaymentSection
                        vm_setup_data={this.props.vm_setup_data}
                        step={6}
                    />
                );
            }
        };

        return (
            <div className="purchase">
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#333333" button="#5ec3eb" />
                    <div className="purchase-flex">
                        <LeftSection
                            vm_setup_data={this.props.vm_setup_data}
                            enableCreditCard={
                                this.props.require_payment_oncreate
                            }
                        />
                        <div className="right-section-wrapper">
                            {RenderSurvey()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        credits: state.DashboardReducer.credits,
        vm_setup_data: state.DashboardReducer.vm_setup_data,
        require_payment_oncreate: state.DashboardReducer
            .require_payment_oncreate
            ? state.DashboardReducer.require_payment_oncreate
            : true,
    };
}

export default connect(mapStateToProps)(Purchase);
