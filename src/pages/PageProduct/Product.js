import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "components/header";
import Footer from "components/footer";
import TopSection from "pages/PageProduct/sections/TopSection";
import MiddleSection from "pages/PageProduct/sections/MiddleSection";
// import PricingSection from "pages/PageLanding/sections/PricingSection";
// import BottomSection from "pages/PageLanding/sections/BottomSection";

class Product extends Component {
    render() {
        return (
            <div
                style={{ backgroundColor: "white", overflowX: "hidden" }}
                id="top"
            >
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#111111" button="#5ec3eb" homepage />
                </div>
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <TopSection />
                </div>
                <div>
                    <MiddleSection />
                </div>
                <div style={{ textAlign: "left" }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_page: state.GeneralReducer.current_page,
    };
}

export default connect(mapStateToProps)(Product);
