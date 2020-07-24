import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

import { cancelPlan } from "store/actions/dashboard/stripe_actions";
import { diskCreating } from "store/actions/dashboard/disk_actions";

class CancelPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            showExitSurvey: false,
            cancelling: false,
            exitFeedback: "",
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

    showExitSurvey = (show) => {
        this.setState({ exitSurvey: show });
    };

    cancelPlan = () => {
        this.setState({ cancelling: true });
        this.props.dispatch(diskCreating(false));
        this.props.dispatch(cancelPlan(this.state.exitFeedback));
    };

    changeExitFeedback = (evt) => {
        this.setState({ exitFeedback: evt.target.value });
    };

    render() {
        if (
            this.props.created !== "" ||
            (this.props.customer && Object.keys(this.props.customer).length > 0)
        ) {
            if (!this.state.cancelling) {
                return (
                    <Popup
                        trigger={
                            <button
                                className="cancel-button"
                                style={{
                                    border: "none",
                                    outline: "none",
                                }}
                            >
                                Cancel Plan
                            </button>
                        }
                        modal
                        onClose={() => this.showExitSurvey(false)}
                        contentStyle={{
                            width: this.state.width > 500 ? 500 : "95%",
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            height: this.state.width > 700 ? 275 : 325,
                            padding: "30px 50px",
                            textAlign: "center",
                        }}
                    >
                        <div>
                            {!this.state.exitSurvey ? (
                                <div>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 22,
                                        }}
                                    >
                                        <strong>Are You Sure?</strong>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            color: "#333333",
                                            marginTop: 20,
                                        }}
                                    >
                                        If you cancel, all the data, files, and
                                        applications stored on your cloud PC
                                        will be <strong>permanently</strong>{" "}
                                        deleted. Please make sure that you have
                                        transferred everything you need from
                                        your cloud PC to another device before
                                        proceeding.
                                    </div>
                                    <button
                                        onClick={() =>
                                            this.showExitSurvey(true)
                                        }
                                        className="cancel-confirm-button"
                                    >
                                        I UNDERSTAND, PROCEED
                                    </button>
                                </div>
                            ) : (
                                <div className="exit-survey">
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 22,
                                        }}
                                    >
                                        <strong>Your Feedback</strong>
                                    </div>
                                    <textarea
                                        onChange={this.changeExitFeedback}
                                        rows="4"
                                        cols={
                                            this.state.width > 700 ? "52" : "30"
                                        }
                                        placeholder="Please give us some feedback on why you're cancelling, so we can improve Fractal. Be brutally honest!"
                                        style={{
                                            outline: "none",
                                            resize: "none",
                                            background: "none",
                                            border: "none",
                                            marginTop: 20,
                                            fontSize: 14,
                                            padding: 0,
                                        }}
                                    />
                                    <Button
                                        onClick={this.cancelPlan}
                                        style={{
                                            fontWeight: "bold",
                                            marginTop:
                                                this.state.width > 700
                                                    ? 19
                                                    : 65,
                                            outline: "none",
                                            width: "100%",
                                            fontSize: 12,
                                            borderRadius: 3,
                                            float: "right",
                                            display: "inline",
                                            padding: "10px 10px",
                                            border: "none",
                                            color: "#e34d4d",
                                            backgroundColor:
                                                "rgba(227, 77, 77, 0.05)",
                                        }}
                                        disabled={
                                            this.state.exitFeedback === ""
                                        }
                                    >
                                        CANCEL PLAN
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Popup>
                );
            } else {
                return (
                    <div
                        style={{
                            float: "right",
                            display: "inline",
                            fontSize: 13,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faCircleNotch}
                            spin
                            style={{
                                height: 12,
                                marginRight: 4,
                            }}
                        />{" "}
                        Cancelling
                    </div>
                );
            }
        } else {
            return <div></div>;
        }
    }
}

export default connect()(CancelPopup);
