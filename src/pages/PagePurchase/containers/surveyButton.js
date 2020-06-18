import React, { Component } from 'react'
import { connect } from "react-redux"
import { FaAngleLeft, FaTimes } from "react-icons/fa";

import 'static/PagePurchase.css';
import 'static/Shared.css'

import {
    storeSetupStep
} from "store/actions/dashboard/vm_setup_actions"

import history from "utils/history";


class SurveyButton extends Component {
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
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    goBack = () => {
        if(this.props.currentStep > 1) {
            this.props.dispatch(storeSetupStep(this.props.currentStep - 1));
        } else {
            history.push("/dashboard");
        }
    }

    exitSurvey = () => {
        history.push("/dashboard");
    }

    render() {
        return(
            <div style = {{height: this.state.width > 700 ? 50 : 80}}>
                <div
                    style={{
                        display: "inline",
                        padding: "2px 10px",
                        float: "right",
                        background: "rgba(227, 77, 77, 0.05)",
                        marginLeft: 5,
                        borderRadius: 2,
                    }}
                    onClick = {this.exitSurvey}
                    className = "pointerOnHover"
                >
                    <FaTimes
                        style={{
                            fontSize: 15,
                            position: "relative",
                            bottom: 2,
                            color: "#e34d4d",
                        }}
                    />
                </div>
                <div
                    style={{
                        display: "inline",
                        float: "right",
                        background: "rgba(94, 195, 235, 0.2)",
                        padding: "2px 8px",
                        borderRadius: 2
                    }}
                    onClick = {this.goBack}
                    className = "pointerOnHover"
                >
                    <FaAngleLeft
                        style={{
                            fontSize: 18,
                            position: "relative",
                            bottom: 2,
                            color: "#111111",
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default connect()(SurveyButton);
