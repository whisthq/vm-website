import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "static/PageDashboard.css";

import ImageBox from "pages/PageDashboard/containers/imageBox";
import PaymentBox from "pages/PageDashboard/containers/paymentBox";

class TopSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            operating_systems: ["Windows", "Linux"],
            windows_disk: null,
            linux_disk: null,
            windows_stage: "notCreated",
            linux_stage: "notCreated",
            windows_storage: 120,
            linux_storage: 120,
            paid: false,
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        if (this.props.disk_is_creating.Linux) {
            this.setState({ linux_stage: "creating" });
        } else if (this.props.disk_is_creating.Windows) {
            this.setState({ windows_stage: "creating" });
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if (
            newProps.disks !== oldProps.disks ||
            newProps.disk_is_creating !== oldProps.disk_is_creating
        ) {
            const windows_disk = newProps.disks.find(
                (d) => d.os === "Windows" && d.main
            );
            if (windows_disk) {
                const windows_disks = newProps.disks.filter(
                    (d) => d.os === "Windows"
                );
                let windows_storage = 0;
                windows_disks.forEach(
                    (d) =>
                        (windows_storage =
                            windows_storage + Number(d["disk_size"]))
                );

                this.setState({
                    windows_stage: "created",
                    windows_disk,
                    windows_storage,
                });
            } else if (newProps.disk_is_creating.Windows) {
                this.setState({ windows_stage: "creating" });
            } else {
                this.setState({
                    windows_stage: "notCreated",
                    windows_disk: null,
                });
            }

            const linux_disk = newProps.disks.find(
                (d) => d.os === "Linux" && d.main
            );
            if (linux_disk) {
                const linux_disks = newProps.disks.filter(
                    (d) => d.os === "Linux"
                );
                let linux_storage = 0;
                linux_disks.forEach(
                    (d) =>
                        (linux_storage = linux_storage + Number(d["disk_size"]))
                );

                this.setState({
                    linux_stage: "created",
                    linux_disk,
                    linux_storage,
                });
            } else if (newProps.disk_is_creating.Linux) {
                this.setState({ linux_stage: "creating" });
            } else {
                this.setState({ linux_stage: "notCreated", linux_disk: null });
            }
        }

        if (newProps.customer !== oldProps.customer) {
            if (
                ((newProps.customer && newProps.customer.paid) ||
                    newProps.require_payment_oncreate) &&
                newProps.payment &&
                newProps.payment.plan
            ) {
                this.setState({ paid: true });
            } else {
                this.setState({ paid: false });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        let windowsBox;
        if (this.state.windows_stage === "notCreated") {
            windowsBox = (
                <Link
                    style={{
                        textDecoration: "none",
                    }}
                    to={{
                        pathname: "/purchase",
                        state: { operatingSystem: "Windows" },
                    }}
                    className="create-cloud-pc"
                >
                    <ImageBox
                        operatingSystem={"Windows"}
                        stage={"notCreated"}
                    />
                </Link>
            );
        } else if (this.state.windows_stage === "creating") {
            windowsBox = (
                <ImageBox operatingSystem={"Windows"} stage="creating" />
            );
        } else if (this.state.windows_stage === "created") {
            windowsBox = (
                <ImageBox
                    operatingSystem={"Windows"}
                    stage={"created"}
                    total_storage={this.state.windows_storage.toString() + "GB"}
                />
            );
        }

        let linuxBox;
        if (this.state.linux_stage === "notCreated") {
            linuxBox = (
                <Link
                    style={{
                        textDecoration: "none",
                    }}
                    to={{
                        pathname: "/purchase",
                        state: { operatingSystem: "Linux" },
                    }}
                    className="create-cloud-pc"
                >
                    <ImageBox operatingSystem={"Linux"} stage={"notCreated"} />
                </Link>
            );
        } else if (this.state.linux_stage === "creating") {
            linuxBox = <ImageBox operatingSystem={"Linux"} stage="creating" />;
        } else if (this.state.linux_stage === "created") {
            linuxBox = (
                <ImageBox
                    operatingSystem={"Linux"}
                    stage={"created"}
                    total_storage={this.state.linux_storage.toString() + "GB"}
                />
            );
        }

        let paymentBox = null;
        if (
            this.state.windows_stage !== "notCreated" ||
            this.state.linux_stage !== "notCreated"
        ) {
            if (
                this.state.paid &&
                this.props.payment &&
                this.props.payment.plan
            ) {
                paymentBox = (
                    <Col xs={12} md={12}>
                        <HashLink
                            to="/plan/#top"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <PaymentBox
                                icon={"Tag"}
                                title={"Change Plan"}
                                subtext={`You are subscribed to the
        ${this.props.payment.plan.nickname} plan. You can change your plan here.`}
                            />
                        </HashLink>
                    </Col>
                );
            } else {
                paymentBox = (
                    <Col xs={12} md={12}>
                        <Link
                            to="/card"
                            style={{
                                textDecoration: "none",
                            }}
                            className="pointerOnHover"
                        >
                            <PaymentBox
                                icon={"Credit Card"}
                                title={"Add Payment"}
                                subtext={`Your cloud PC is free until ${this.props.trialEnd}.`}
                            />
                        </Link>
                    </Col>
                );
            }
        }

        // not created
        return (
            <Row
                style={{
                    marginTop: 30,
                }}
            >
                {this.state.windows_stage === "notCreated" &&
                    this.state.linux_stage === "notCreated" && (
                        <Col xs={12}>
                            <div className={"create-text"}>
                                Transform your computer into a GPU-powered cloud
                                computer. Setup in less than a minute, no
                                payment required.
                            </div>
                        </Col>
                    )}
                {(this.state.windows_stage === "creating" ||
                    this.state.linux_stage === "creating") && (
                    <Col xs={12}>
                        <div className="disk-status-box">
                            <span
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Current Status:{" "}
                            </span>
                            {this.props.disk_creation_message}
                        </div>
                    </Col>
                )}
                {paymentBox}
                <Col lg={6} md={12}>
                    {windowsBox}
                </Col>
                <Col lg={6} md={12}>
                    {linuxBox}
                </Col>
            </Row>
        );

        //
        //   // creating, paid or require payment on create
        //   <Row
        //       style={{
        //           marginTop: 30,
        //       }}
        //   >
        //       <Col xs={12}>
        //           <div className="disk-status-box">
        //               <span
        //                   style={{
        //                       fontWeight: "bold",
        //                   }}
        //               >
        //                   Current Status:{" "}
        //               </span>
        //               {this.props.disk_creation_message}
        //           </div>
        //           <ImageBox stage="creating" />
        //       </Col>
        //   </Row>
        //
        //   // creating, not paid
        //   <Row style={{ marginTop: 30 }}>
        //       <Col
        //           xs={12}
        //           style={{
        //               paddingLeft: 15,
        //               paddingRight: 15,
        //           }}
        //       >
        //           <div className="disk-status-box">
        //               <span
        //                   style={{
        //                       fontWeight: "bold",
        //                   }}
        //               >
        //                   Current Status:{" "}
        //               </span>
        //               {this.props.disk_creation_message}
        //           </div>
        //       </Col>
        //       <Col xs={12} md={12}>
        //           <Link
        //               to="/card"
        //               style={{
        //                   textDecoration: "none",
        //               }}
        //               className="pointerOnHover"
        //           >
        //               <PaymentBox
        //                   icon={"Credit Card"}
        //                   title={"Add Payment"}
        //                   subtext={`Your cloud PC is free until ${this.props.trialEnd}.`}
        //               />
        //           </Link>
        //       </Col>
        //       {this.state.operating_systems.map((os) => (
        //           //TODO FIX THIS
        //           <Col xs={6} md={6}>
        //               <ImageBox
        //                   stage="creating"
        //                   operatingSystem={os}
        //               />
        //           </Col>
        //       ))}
        //   </Row>
        //
        //
        //   // created, paid and plan exists
        //
        //   <div>
        //       <Row style={{ marginTop: 30 }}>
        //           <Col md={6} xs={12}>
        //               <ImageBox
        //                   stage={"created"}
        //                   total_storage={this.props.total_storage}
        //               />
        //           </Col>
        //           <Col md={5} xs={12}>
        //               <HashLink
        //                   to="/plan/#top"
        //                   style={{
        //                       textDecoration: "none",
        //                   }}
        //               >
        //                   <PaymentBox
        //                       icon={"Tag"}
        //                       title={"Change Plan"}
        //                       subtext={`You are subscribed to the{" "}
        //                 ${this.props.payment.plan.nickname} plan. You can change your plan here.`}
        //                   />
        //               </HashLink>
        //           </Col>
        //       </Row>
        //   </div>
        //
        //   // created, not paid
        //   <Row style={{ marginTop: 30 }}>
        //       {this.props.disk_creation_message !==
        //       "Create Cloud PC command sent to server." ? (
        //           <Col
        //               xs={12}
        //               style={{
        //                   paddingLeft: 15,
        //                   paddingRight: 15,
        //               }}
        //           >
        //               <div className="disk-status-box">
        //                   Success! Your cloud PC is ready to use. Simply
        //                   download the appropriate desktop application
        //                   below.
        //               </div>
        //           </Col>
        //       ) : (
        //           <div></div>
        //       )}
        //       <Col xs={12} md={12}>
        //           <Link
        //               to="/card"
        //               style={{
        //                   textDecoration: "none",
        //               }}
        //               className="pointerOnHover"
        //           >
        //               <PaymentBox
        //                   icon={"Credit Card"}
        //                   title={"Add Payment"}
        //                   subtext={`Your cloud PC is free until ${this.props.trialEnd}.`}
        //               />
        //           </Link>
        //       </Col>
        //       <Col md={12} lg={6}>
        //           <ImageBox
        //               stage={"created"}
        //               total_storage={this.props.total_storage}
        //           />
        //       </Col>
        //   </Row>
        //
        //
        //     if (
        //         this.props.disks === undefined ||
        //         this.props.disks.length === 0 ||
        //         this.props.disk_is_creating.Linux ||
        //         this.props.disk_is_creating.Windows
        //     ) {
        //         if (
        //             this.props.disk_is_creating.Linux ||
        //             this.props.disk_is_creating.Windows
        //         ) {
        //             if (
        //                 (this.props.customer && this.props.customer.paid) ||
        //                 this.props.require_payment_oncreate
        //             ) {
        //                 return (
        //
        //                 );
        //             } else {
        //                 return (
        //
        //                 );
        //             }
        //         } else {
        //             return (
        //
        //             );
        //         }
        //     } else if (
        //         this.props.customer &&
        //         this.props.customer.paid &&
        //         this.props.payment &&
        //         Object.keys(this.props.payment).length > 0 &&
        //         this.props.payment.plan &&
        //         this.props.payment.plan.nickname
        //     ) {
        //         return (
        //
        //         );
        //     } else {
        //         return (
        //
        //         );
        //     }
        // }
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        disks:
            typeof state.DashboardReducer.disks === "undefined"
                ? []
                : state.DashboardReducer.disks,
        disk_is_creating: state.DashboardReducer.disk_is_creating,
        payment: state.DashboardReducer.payment,
        customer: state.DashboardReducer.customer,
        disk_creation_message: state.DashboardReducer.disk_creation_message
            ? state.DashboardReducer.disk_creation_message
            : "Create Cloud PC command sent to server.",
        require_payment_oncreate: state.DashboardReducer
            .require_payment_oncreate
            ? state.DashboardReducer.require_payment_oncreate
            : true,
    };
}

export default connect(mapStateToProps)(TopSection);
