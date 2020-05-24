import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { FaAngleUp, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

import Header from "../../shared_components/header.js";
import TypeformButton from "../../shared_components/typeformbutton.js";
import "../../static/App.css";
import Autocomplete from "./AutoComplete.js";
import { options } from "./Options.js";
import {
    addStorage,
    addStorageStatus
} from "../../actions/index.js";
import SpecBox from "./containers/specBox.js";
import PriceBox from "./containers/priceBox.js";

class Storage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            continue: false,
            exit: false,
            storage: 0,
            processing: false,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(addStorageStatus(0))
    }

    componentDidUpdate(prevProps) {
        if(prevProps.add_storage_status !== this.props.add_storage_status && this.state.processing) {
            this.setState({processing: false})
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    addStorage = () => {
        this.setState({processing: true})
        this.props.dispatch(addStorage(this.state.storage))
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }

        const renderLeftMenu = () => {
            if (this.state.width > 700) {
                return (
                    <div>
                        <div style={{ paddingBottom: 20 }}>
                            <div style={{ color: "#111111", fontWeight: "bold" }}>Additional Storage</div>
                            <div style={{ color: "#B9B9B9", fontSize: 12 }}>
                                {this.state.storage.toString()}GB
                            </div>
                        </div>
                    </div>
                );
            } else {
                return <div></div>;
            }
        };

        const renderSurvey = () => {
            return (
                <div
                    tabIndex="0"
                    onKeyDown={(e) => this.handleKeyPress4(e)}
                    style={{
                        outline: "none",
                        paddingTop: 100,
                        paddingLeft: 0,
                        width:
                            this.state.width > 700
                                ? "calc(100% - 400px)"
                                : "95%",
                        overflowX: "hidden !important",
                        paddingRight: this.state.width > 700 ? 0 : 40,
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: 22
                            }}
                        >
                            Add More Storage to Your Cloud PC
                        </span>
                        <div
                            style={{
                                marginTop: 5,
                                color: "#333333",
                                fontSize: 16,
                                maxWidth: 800,
                            }}
                        >
                            Any additional storage you attach to your cloud PC will be appear
                            as an additional hard drive. For instance, if you select the 256GB
                            option, a new, 256GB hard drive will appear on your cloud PC when you
                            launch it.
                        </div>
                        <Row
                            style={{
                                marginTop: 50,
                                paddingLeft:
                                    this.state.width > 700 ? 16 : 10,
                            }}
                        >
                            <Col
                                md={4}
                                style={{ paddingLeft: 0 }}
                                className = "pointerOnHover"
                                onClick={() =>
                                    this.setState({ storage: 256 })
                                }
                            >
                                <PriceBox
                                    color="white"
                                    name="Small Hard Drive"
                                    subText="Automatically added to cloud PC"
                                    price="12"
                                    details={
                                        <div>
                                            256GB extra storage
                                        </div>
                                    }
                                    color={
                                        this.state.storage === 256
                                            ? "rgba(94, 195, 235, 0.1)"
                                            : "white"
                                    }
                                    checked={
                                        this.state.storage === 256
                                    }
                                />
                            </Col>
                            <Col
                                md={4}
                                style={{ paddingLeft: 0 }}
                                className = "pointerOnHover"
                                onClick={() =>
                                    this.setState({ storage: 512 })
                                }
                            >
                                <PriceBox
                                    color="white"
                                    name="Medium Hard Drive"
                                    subText="Automatically added to cloud PC"
                                    price="24"
                                    details="512GB extra storage"
                                    color={
                                        this.state.storage === 512
                                            ? "rgba(94, 195, 235, 0.1)"
                                            : "white"
                                    }
                                    checked={
                                        this.state.storage === 512
                                    }
                                />
                            </Col>
                        </Row>
                        {this.state.processing ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: 355,
                                    marginTop: 40,
                                }}
                            >
                                <Button
                                    disabled="true"
                                    style={{
                                        background: "#111111",
                                        border: "none",
                                        padding: "10px 45px",
                                        display: "inline",
                                        width: 235,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircleNotch}
                                        spin
                                        style={{
                                            color: "white",
                                            height: 12,
                                            marginRight: 5,
                                            fontSize: 12,
                                        }}
                                    />
                                </Button>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: 300,
                                    marginTop: 40
                                }}
                            >
                                <Button
                                    disabled = {this.state.storage === 0}
                                    onClick={this.addStorage}
                                    style={{
                                        background: "#111111",
                                        border: "none",
                                        padding: "10px 45px",
                                        display: "inline",
                                        width: 235,
                                    }}
                                >
                                    Add Storage
                                </Button>
                            </div>
                        )}
                        {
                        this.props.add_storage_status !== 0 && this.props.add_storage_status !== 200
                        ?
                        <div style = {{marginTop: 10, fontSize: 12, color: "#e34d4d"}}>
                            An error occured while trying to increase your storage. Please contact support@fractalcomputers.com for assistance.
                        </div>
                        :
                        <div>
                        </div>
                        }
                        <div
                            style={{
                                float:
                                    this.state.width > 700
                                        ? "none"
                                        : "right",
                                marginTop: this.state.width > 700 ? 0 : 40,
                                position:
                                    this.state.width > 700
                                        ? "absolute"
                                        : "relative",
                                bottom: this.state.width > 700 ? 25 : 0,
                                right: this.state.width > 700 ? 40 : 0,
                                boxShadow:
                                    this.state.width > 700
                                        ? "0px 4px 20px rgba(0, 0, 0, 0.3)"
                                        : "none",
                                background: "none",
                            }}
                        >
                            <div
                                style={{
                                    display: "inline",
                                    borderRadius: "5px 0px 0px 5px",
                                    backgroundColor: "#5ec3eb",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRight: "solid 0.5px #0b172b",
                                    opacity: 0.5
                                }}
                            >
                                <FaAngleUp
                                    className="typeform-up"
                                    style={{
                                        height: 20,
                                        position: "relative",
                                        bottom: 2,
                                        color: "#0b172b",
                                    }}
                                />
                            </div>
                            <Link to="/settings">
                                <div
                                    style={{
                                        display: "inline",
                                        borderRadius: "0px 5px 5px 0px",
                                        backgroundColor: "#5ec3eb",
                                        color: "white",
                                        padding: "5px 10px",
                                    }}
                                >
                                    <FaTimes
                                        style={{
                                            height: 15,
                                            position: "relative",
                                            bottom: 2,
                                            color: "#0b172b",
                                        }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                style={{
                    minHeight: "100vh",
                    paddingBottom: 50,
                    background: "#F6F6F6",
                }}
                id = "top"
            >
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#333333" button="#5ec3eb" />
                    <div
                        style={{
                            display: "flex",
                            overflowX: "hidden",
                            position: "relative",
                            bottom: 60,
                        }}
                    >
                        <div
                            style={{
                                width: this.state.width > 700 ? 300 : 0,
                                paddingLeft: this.state.width > 700 ? 80 : 40,
                                paddingTop: 120,
                                backgroundColor: "none",
                                height: "100%",
                                minHeight: "100vh",
                                zIndex: 0,
                            }}
                        >
                            {renderLeftMenu()}
                        </div>
                        {renderSurvey()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        add_storage_status: state.AccountReducer.add_storage_status ? state.AccountReducer.add_storage_status : 0
    };
}

export default connect(mapStateToProps)(Storage);
