import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { storePurchaseLocation } from "store/actions/dashboard/vm_setup_actions";

import { all_american_states } from "pages/PagePurchase/constants/american_states"

export class Autocomplete extends Component {
    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired,
    };
    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: this.props.default,
    };

    formatUserEntry = (userInput) => {
        var userEntry =
            userInput.charAt(0).toUpperCase() +
            userInput.slice(1).toLowerCase();

        if (userEntry.includes("New ") && userEntry.length > 4) {
            userEntry = userEntry.replace(
                userEntry.substring(0, 5),
                "New " + userEntry.charAt(4).toUpperCase()
            );
        } else if (userEntry.includes("North ") && userEntry.length > 6) {
            userEntry = userEntry.replace(
                userEntry.substring(0, 7),
                "North " + userEntry.charAt(6).toUpperCase()
            );
        } else if (userEntry.includes("South ") && userEntry.length > 6) {
            userEntry = userEntry.replace(
                userEntry.substring(0, 7),
                "South " + userEntry.charAt(6).toUpperCase()
            );
        } else if (userEntry.includes("West ") && userEntry.length > 5) {
            userEntry = userEntry.replace(
                userEntry.substring(0, 6),
                "West " + userEntry.charAt(5).toUpperCase()
            );
        } else if (userEntry.includes("Rhode ") && userEntry.length > 6) {
            userEntry = userEntry.replace(
                userEntry.substring(0, 7),
                "Rhode " + userEntry.charAt(6).toUpperCase()
            );
        }

        return userEntry;
    };

    onChange = (e) => {
        const userInput = this.formatUserEntry(e.currentTarget.value);

        this.props.dispatch(storePurchaseLocation(userInput));
        if (all_american_states.includes(userInput)) {
            const filteredOptions = [];
            this.setState({
                activeOption: 0,
                filteredOptions,
                showOptions: false,
                userInput: userInput,
            });
        } else {
            const filteredOptions = all_american_states.filter(
                (optionName) =>
                    optionName.toLowerCase().indexOf(userInput.toLowerCase()) >
                    -1
            );
            this.setState({
                activeOption: 0,
                filteredOptions,
                showOptions: true,
                userInput: userInput,
            });
        }
    };

    onClick = (e) => {
        var input = e.currentTarget.innerText;
        input = input.replace("Suggested: ", "");

        this.setState(
            {
                activeOption: 0,
                filteredOptions: [],
                showOptions: false,
                userInput: input,
            },
            function () {
                var userEntry = this.formatUserEntry(input);
                if (all_american_states.includes(userEntry)) {
                    this.props.dispatch(storePurchaseLocation(userEntry));
                }
            }
        );
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;

        if (e.keyCode === 13) {
            this.setState(
                {
                    activeOption: 0,
                    showOptions: false,
                    userInput: filteredOptions[activeOption],
                },
                function () {
                    var userEntry = filteredOptions[activeOption];
                    if (filteredOptions[activeOption]) {
                        userEntry = this.formatUserEntry(userEntry);
                    }
                    if (all_american_states.includes(userEntry)) {
                        this.props.dispatch(storePurchaseLocation(userEntry));
                    }
                }
            );
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }
            this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption === filteredOptions.length - 1) {
                return;
            }
            this.setState({ activeOption: activeOption + 1 });
        }
    };

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,

            state: { activeOption, filteredOptions, showOptions, userInput },
        } = this;
        let optionList;
        if (showOptions && userInput) {
            if (filteredOptions.length) {
                optionList = (
                    <div
                        className="options"
                        style={{ width: this.props.width > 500 ? 400 : "90%" }}
                    >
                        {filteredOptions.map((optionName, index) => {
                            let className;
                            if (index === activeOption) {
                                className = "option-active";
                                return (
                                    <div
                                        className={className}
                                        key={optionName}
                                        onClick={onClick}
                                        style={{
                                            zIndex: 100,
                                            position: "relative",
                                            bottom: 3,
                                            paddingTop: 5,
                                            fontSize: 12,
                                            color: "#555555",
                                            paddingBottom: 10,
                                            borderRadius: "0px 0px 3px 3px",
                                            backgroundColor: "#EFEFEF",
                                            width: "100%",
                                        }}
                                    >
                                        Suggested: {optionName}
                                    </div>
                                );
                            } else {
                                // else return empty div
                                return <div></div>;
                            }
                        })}
                    </div>
                );
            } else {
                optionList = <div></div>;
            }
        }
        return (
            <React.Fragment style={{ display: "inline" }}>
                <div className="search" style={{ display: "inline" }}>
                    <input
                        defaultValue={this.props.default}
                        type="text"
                        className="search-box"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={userInput}
                        placeholder="Alabama"
                        style={{
                            marginRight: 10,
                            display: "inline",
                            width: this.props.width > 500 ? 400 : "90%",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: 3,
                            backgroundColor: "#EFEFEF",
                            color: "#111111",
                        }}
                    />
                </div>
                {optionList}
            </React.Fragment>
        );
    }
}

export default connect()(Autocomplete);
