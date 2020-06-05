import React, { Component } from "react";
import { connect } from "react-redux";

import "static/PageDashboard.css";


class CreditsBox extends Component {
    render() {
        return (
            <div>
                {this.props.credits &&
                this.props.credits > 0 ? (
                    <div className = "credits-box">
                        Someone redeemed your promo
                        code! Create a cloud PC to
                        redeem a free subscription
                        for {this.props.credits}{" "}
                        {this.props.credits > 1 ? "months" : "month"}.
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        credits: state.DashboardReducer.credits,
    };
}

export default connect(mapStateToProps)(CreditsBox);
