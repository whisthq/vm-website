import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "components/header";
import Footer from "components/footer";
import TopSection from "pages/PageLanding/sections/TopSection";
import MiddleSection from "pages/PageLanding/sections/MiddleSection";
import PricingSection from "pages/PageLanding/sections/PricingSection";
import BottomSection from "pages/PageLanding/sections/BottomSection";

import { changeTab } from "store/actions/general/homepage_actions";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(changeTab("personal"));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

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
                <div>
                    <PricingSection />
                </div>
                <BottomSection />
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

export default connect(mapStateToProps)(Landing);
