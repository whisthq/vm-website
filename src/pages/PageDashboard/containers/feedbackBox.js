import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";

import "static/PageDashboard.css";

import {
    triggerSurvey,
} from "store/actions/dashboard/popup_actions"
import {
    submitPurchaseFeedback
} from "store/actions/dashboard/customer_actions"


class FeedbackBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            purchaseFeedback: ""
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
    }

    changePurchaseFeedback = (evt) => {
        this.setState({ purchaseFeedback: evt.target.value });
    };

    submitPurchaseFeedback = (evt) => {
        this.props.dispatch(triggerSurvey(false));
        this.props.dispatch(
            submitPurchaseFeedback(this.state.purchaseFeedback)
        );
    };

    render() {
        return (
            <div>
                {this.props.show_survey &&
                this.state.width > 700 ? (
                    <Popup
                        open={true}
                        contentStyle={{
                            width: 500,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            height: 275,
                            padding: "30px 50px",
                            textAlign: "center",
                        }}
                    >
                        <div className="exit-survey">
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 22,
                                    margin: "auto",
                                    width: "100%",
                                }}
                            >
                                <strong>
                                    Thank You For Creating a
                                    Cloud PC!
                                </strong>
                            </div>
                            <textarea
                                onChange={
                                    this.changePurchaseFeedback
                                }
                                rows="4"
                                cols="52"
                                placeholder="We hope you love it. Please take a minute to tell us what you plan on using Fractal for (i.e. creative work, gaming, etc)."
                                style={{
                                    outline: "none",
                                    resize: "none",
                                    background: "none",
                                    border: "none",
                                    marginTop: 20,
                                    fontSize: 14,
                                    padding: 0,
                                }}
                            ></textarea>
                            <button
                                onClick={
                                    this.submitPurchaseFeedback
                                }
                                style={{
                                    border: "none",
                                    fontWeight: "bold",
                                    marginTop: 25,
                                    outline: "none",
                                    width: "100%",
                                    fontSize: 14,
                                    borderRadius: 5,
                                    padding: "10px 10px",
                                    color: "#5ec3eb",
                                    background:
                                        "rgba(94, 195, 235,0.1)",
                                }}
                            >
                                SUBMIT FEEDBACK
                            </button>
                        </div>
                    </Popup>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        show_survey: state.DashboardReducer.show_survey,
    };
}

export default connect(mapStateToProps)(FeedbackBox);
