import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../../static/App.css";
import Cloud from "../../assets/cloud-computing.svg";
import Software from "../../assets/software.svg";
import Gaming from "../../assets/gaming.svg";
import Creative from "../../assets/creative.svg";
import Art from "../../assets/art.svg";
import Process from "../../assets/process.svg";
import RGBIcon from "../../assets/rgb-icon.svg";
import CPU from "../../assets/cpu.svg";
import GPU from "../../assets/gpu.svg";
import RAM from "../../assets/ram.svg";
import SSD from "../../assets/hard-drive-icon.svg";
import HardDriveIcon from "../../assets/hard-drive-icon.svg";
import FileIcon from "../../assets/file-icon.svg";
import Header from "../../shared_components/header.js";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ReactTypeformEmbed } from "react-typeform-embed";
import Footer from "../../shared_components/footer.js";
import { changeTab } from "../../actions/index.js";
import ImageFadeIn from "react-image-fade-in";

class PageHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            modalShow: false,
            showPopup: false,
            loaded: false,
            version: "Windows",
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.learnmore = this.learnmore.bind(this);
        this.joinbeta = this.joinbeta.bind(this);
    }

    learnmore() {
        this.refs.learnmore.scrollIntoView();
    }

    joinbeta() {
        this.refs.joinbeta.scrollIntoView();
    }

    openForm = () => {
        this.typeformEmbed.typeform.open();
    };

    changeVersion = (version) => {
        if (version === "Windows") {
            this.setState({ version: "Windows" });
        } else if (version === "Mac") {
            this.setState({ version: "Mac" });
        }
    };

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
        this.props.dispatch(changeTab("personal"));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        let modalClose = () => this.setState({ modalShow: false });
        if (this.state.width > 700 && this.state.modalShow) {
            modalClose();
        }
        return (
            <div className="App" style={{ backgroundColor: "white" }} id="top">
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#111111" button="#5ec3eb" homepage />
                    <ReactTypeformEmbed
                        popup
                        autoOpen={false}
                        url="https://fractalcomputers.typeform.com/to/kVelwx"
                        hideHeaders
                        hideFooter
                        buttonText="Request Access"
                        ref={(tf) => {
                            this.typeformEmbed = tf;
                        }}
                        style={{ zIndex: -100 }}
                    />
                    <div style={{ paddingTop: 50 }}>
                        <div
                            className="fractal-container"
                            style={{ paddingBottom: 25 }}
                        >
                            <Row>
                                <Col
                                    md={{ span: 5, order: 1 }}
                                    xs={{ order: 2, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingTop: 25,
                                    }}
                                >
                                    {this.state.width > 700 ? (
                                        <div
                                            style={{
                                                color: "#111111",
                                                fontSize: "calc(28px + 2.0vw)",
                                                lineHeight: 1.3,
                                                fontWeight: "bold",
                                                marginTop: 30,
                                            }}
                                        >
                                            Transform your laptop into a{" "}
                                            <span className="blue-gradient">
                                                supercomputer
                                            </span>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                color: "#111111",
                                                fontSize: 35,
                                                lineHeight: 1.3,
                                                fontWeight: "bold",
                                                marginTop: 30,
                                            }}
                                        >
                                            Transform your laptop into a{" "}
                                            <span className="blue-gradient">
                                                supercomputer
                                            </span>
                                        </div>
                                    )}
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 25,
                                            color: "#111111",
                                            marginBottom: 40,
                                            maxWidth: 650,
                                            fontSize: "calc(14px + 0.4vw)",
                                        }}
                                    >
                                        Fractal brings the power of a
                                        workstation to any Internet-connected
                                        device.
                                    </p>
                                    <Link to="/dashboard">
                                        <Button
                                            style={{
                                                fontSize: "calc(12px + 0.4vw)",
                                                boxShadow:
                                                    "0px 4px 30px rgba(0, 0, 0, 0.20)",
                                                display: "inline",
                                                float: "left",
                                                backgroundColor: "#111111",
                                                padding: "15px 30px",
                                                fontWeight: "bold",
                                                borderRadius: 5,
                                                border: "none",
                                                marginRight: 20,
                                                marginTop: 10,
                                            }}
                                        >
                                            GET STARTED{" "}
                                            <span
                                                style={{
                                                    color: "#D6D6D6",
                                                    fontWeight: "normal",
                                                }}
                                            >
                                                {" "}
                                                — it's free
                                            </span>
                                        </Button>
                                    </Link>
                                </Col>
                                <Col
                                    md={{ span: 7, order: 2 }}
                                    xs={{ order: 1, span: 12 }}
                                    style={{ textAlign: "right" }}
                                >
                                    {this.state.width > 700 ? (
                                        <ImageFadeIn
                                            src={Cloud}
                                            style={{
                                                width: "90%",
                                                position: "relative",
                                                maxWidth: 1200,
                                                paddingTop: 25,
                                            }}
                                        />
                                    ) : (
                                        <ImageFadeIn
                                            src={Cloud}
                                            style={{ width: "100%" }}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                {this.state.width > 700 ? (
                    <div></div>
                ) : (
                    <div style={{ height: 50, background: "white" }}></div>
                )}
                <div
                    style={{ background: "white", backgroundSize: "100% auto" }}
                >
                    <div className="fractal-container">
                        <Row>
                            <Col
                                md={6}
                                xs={{ order: 1 }}
                                style={{
                                    textAlign: "left",
                                    paddingTop: "10%",
                                    paddingBottom: "10%",
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        boxShadow:
                                            "0px 4px 25px rgba(0, 0, 0, 0.3)",
                                        borderRadius: 5,
                                        width: "95%",
                                        maxWidth: 750,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "100%",
                                            height: 50,
                                            backgroundColor: "#1F2635",
                                            borderRadius: "5px 5px 0px 0px",
                                            color: "white",
                                            padding: "13px 35px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        My Cloud PC
                                    </div>
                                    {this.state.width > 700 ? (
                                        <div
                                            style={{
                                                width: "100%",
                                                padding: 35,
                                                color: "#333333",
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            <Row>
                                                <Col xs={6}>
                                                    NVIDIA Tesla M60 GPU
                                                </Col>
                                                <Col
                                                    xs={6}
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <strong>16 GB+</strong> DDR4
                                                    RAM
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: 5 }}>
                                                <Col xs={6}>
                                                    <strong>6+</strong> CPU
                                                    cores
                                                </Col>
                                                <Col
                                                    xs={6}
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <strong>512 GB</strong> NVMe
                                                    SSD
                                                </Col>
                                            </Row>
                                            <Link to="/dashboard">
                                                <Button
                                                    style={{
                                                        width: "100%",
                                                        color: "#0980b0",
                                                        background:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        border: "none",
                                                        fontWeight: "bold",
                                                        padding: 12,
                                                        textAlign: "center",
                                                        borderRadius: 5,
                                                        marginTop: 50,
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    LAUNCH
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                width: "100%",
                                                padding: 35,
                                                color: "#333333",
                                                fontSize: 14,
                                            }}
                                        >
                                            <Row>
                                                <Col xs={6}>Tesla M60 GPU</Col>
                                                <Col
                                                    xs={6}
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <strong>16 GB+</strong> RAM
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop: 5 }}>
                                                <Col xs={6}>
                                                    <strong>6+</strong> CPU
                                                    cores
                                                </Col>
                                                <Col
                                                    xs={6}
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    <strong>512 GB</strong> SSD
                                                </Col>
                                            </Row>
                                            <Link to="/dashboard">
                                                <Button
                                                    style={{
                                                        width: "100%",
                                                        color: "#0980b0",
                                                        background:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        border: "none",
                                                        fontWeight: "bold",
                                                        padding: 12,
                                                        textAlign: "center",
                                                        borderRadius: 5,
                                                        marginTop: 50,
                                                        fontSize: 16,
                                                    }}
                                                >
                                                    LAUNCH
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </Col>
                            {this.state.width > 700 ? (
                                <Col
                                    md={{ span: 6, order: 2 }}
                                    xs={{ order: 1, span: 12 }}
                                    style={{
                                        paddingTop: "10%",
                                        paddingLeft: 50,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            color: "#111111",
                                            textAlign: "left",
                                            fontSize: "calc(30px + 1.1vw)",
                                        }}
                                    >
                                        Graphics power on
                                        <br /> any device
                                    </div>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 20,
                                            fontSize: "calc(12px + 0.4vw)",
                                            maxWidth: 700,
                                        }}
                                    >
                                        Edit, render, and play at insane speeds
                                        from any Windows, Apple, or Linux
                                        computer with cloud GPU, RAM, and CPUs.
                                    </p>
                                </Col>
                            ) : (
                                <Col
                                    md={{ span: 6, order: 2 }}
                                    xs={{ order: 1, span: 12 }}
                                    style={{ width: "100%", marginTop: 25 }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 35,
                                            color: "#111111",
                                            textAlign: "left",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        Graphics power on
                                        <br /> any device
                                    </div>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 20,
                                        }}
                                    >
                                        Edit, render, and play at insane speeds
                                        from any Windows, Apple, or Linux
                                        computer with cloud GPU, RAM, and CPUs.
                                    </p>
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
                {this.state.width > 700 ? (
                    <div></div>
                ) : (
                    <div style={{ height: 50, background: "white" }}></div>
                )}
                <div
                    style={{
                        width: "100vw",
                        minHeight: 390,
                        backgroundImage:
                            "linear-gradient(121.2deg, #D7F5F5 2.24%, #F2DEF8 100%)",
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{ paddingTop: 40, paddingBottom: 20 }}
                    >
                        <Row>
                            <Col
                                md={4}
                                style={{
                                    textAlign: "left",
                                    width: "100%",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: 260,
                                        border: "solid 10px white",
                                        borderRadius: 10,
                                        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.45)",
                                        background: "#F2DEF8"
                                    }}
                                >
                                    <ImageFadeIn
                                        src={Software}
                                        style = {{width: "100%", height: "100%"}}
                                    />
                                </div>
                                <div
                                    style={{
                                        color: "white",
                                        background: "rgba(0,0,0,0.9)",
                                        borderRadius: 15,
                                        height: 30,
                                        fontSize: 14,
                                        padding: "5px 4px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        width: 100,
                                        margin: "auto",
                                        marginTop: 25,
                                    }}
                                >
                                    Productivity
                                </div>
                            </Col>
                            <Col
                                md={4}
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "center",
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: 260,
                                        border: "solid 10px white",
                                        borderRadius: 10,
                                        boxShadow:
                                            "0px 4px 30px rgba(0, 0, 0, 0.45)",
                                        background: "#D7EAF5"
                                    }}
                                >
                                    <ImageFadeIn
                                        src={Gaming}
                                        style={{width: "100%", height: "100%"}}
                                    />
                                </div>
                                <div
                                    style={{
                                        color: "white",
                                        background: "rgba(0,0,0,0.9)",
                                        borderRadius: 15,
                                        height: 30,
                                        fontSize: 14,
                                        padding: "4px 4px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        width: 75,
                                        margin: "auto",
                                        marginTop: 25,
                                    }}
                                >
                                    Gaming
                                </div>
                            </Col>
                            <Col
                                md={4}
                                style={{
                                    textAlign: "right",
                                    width: "100%",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "right",
                                        width: "100%",
                                        height: "100%",
                                        maxHeight: 260,
                                        border: "solid 10px white",
                                        borderRadius: 10,
                                        boxShadow:
                                            "0px 4px 30px rgba(0, 0, 0, 0.45)",
                                        background: "#D7F5F5"
                                    }}
                                >
                                    <ImageFadeIn
                                        src={Creative}
                                        style={{
                                            height: "100%",
                                            float: "right"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        color: "white",
                                        background: "rgba(0,0,0,0.9)",
                                        borderRadius: 15,
                                        height: 30,
                                        fontSize: 14,
                                        padding: "4px",
                                        textAlign: "center",
                                        fontWeight: "bold",
                                        width: 75,
                                        margin: "auto",
                                        marginTop: 30,
                                    }}
                                >
                                    Graphics
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                {this.state.width > 700 ? (
                    <div
                        style={{
                            background: "#F9F9F9",
                            backgroundSize: "100% auto",
                            paddingTop: 75,
                        }}
                    >
                        <div className="fractal-container">
                            <Row style={{ marginBottom: 10, paddingTop: 30 }}>
                                <Col
                                    md={4}
                                    xs={{ order: 3, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingBottom: 100,
                                        paddingLeft: 20,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            minHeight: 250,
                                            background: "white",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Process}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                            }}
                                        >
                                            Sub-9ms Software Latency
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            Achieve an immersive, native desktop
                                            experience.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={4}
                                    xs={{ order: 2, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingBottom: 100,
                                        paddingLeft: 20,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            minHeight: 250,
                                            background: "white",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Art}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                            }}
                                        >
                                            60+ Frames per Second
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 10,
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            Scrub through videos or play games
                                            effortlessly.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={{ span: 4, order: 1 }}
                                    xs={{ order: 1, span: 12 }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            color: "#111111",
                                            textAlign: "left",
                                            fontSize: "calc(35px + 1.0vw)",
                                        }}
                                    >
                                        Fractal cloud computers are{" "}
                                        <span className="blue-gradient">
                                            fast
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            background: "white",
                            backgroundSize: "100% auto",
                        }}
                    >
                        <div
                            className="fractal-container"
                            style={{ paddingTop: 50, paddingBottom: 50 }}
                        >
                            <Row style={{ marginBottom: 30 }}>
                                <Col
                                    md={12}
                                    xs={{ order: 3, span: 12 }}
                                    style={{ textAlign: "left" }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            height: 250,
                                            background: "white",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Process}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: 20,
                                            }}
                                        >
                                            Sub-9ms Software Latency
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            Achieve an immersive, native desktop
                                            experience.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={12}
                                    xs={{ order: 2, span: 12 }}
                                    style={{
                                        textAlign: "left",
                                        paddingBottom: 20,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.20)",
                                            padding: 30,
                                            height: 250,
                                            background: "white",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={Art}
                                            style={{ width: 50 }}
                                        />
                                        <div
                                            style={{
                                                marginTop: 30,
                                                fontWeight: "bold",
                                                fontSize: 20,
                                            }}
                                        >
                                            60+ Frames per Second
                                        </div>
                                        <div style={{ marginTop: 10 }}>
                                            Scrub through videos or play games
                                            effortlessly.
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    md={{ span: 4, order: 1 }}
                                    xs={{ order: 1, span: 12 }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 35,
                                            lineHeight: 1.4,
                                            color: "#111111",
                                            textAlign: "left",
                                            marginBottom: 50,
                                        }}
                                    >
                                        Fractal cloud computers are <br />
                                        <span className="blue-gradient">
                                            fast
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )}
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, #F9F9F9 61.47%, #FFFFFF 100%)",
                        paddingTop: 40,
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 20 }}
                    >
                        {this.state.width > 700 ? (
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(30px + 1.1vw)",
                                    color: "#111111",
                                    textAlign: "center",
                                    marginBottom: 20,
                                }}
                            >
                                Access your desktop anywhere
                            </div>
                        ) : (
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 35,
                                    lineHeight: 1.4,
                                    color: "#111111",
                                    textAlign: "left",
                                    marginBottom: 20,
                                }}
                            >
                                Access your desktop anywhere
                            </div>
                        )}
                        {this.state.width > 700 ? (
                            <div style={{ margin: "auto" }}>
                                <p
                                    style={{
                                        fontSize: "calc(12px + 0.4vw)",
                                        textAlign: "center",
                                        maxWidth: 750,
                                        margin: "auto",
                                        marginTop: 20,
                                        marginBottom: 75,
                                    }}
                                >
                                    Need to work in more than one location?
                                    Forgot to upload a file to the cloud, or to
                                    commit a change? Your Fractal cloud PC is
                                    accessible from any Internet-connected
                                    device.
                                </p>
                            </div>
                        ) : (
                            <div style={{ margin: "auto" }}>
                                <p
                                    style={{
                                        textAlign: "left",
                                        marginTop: 20,
                                        marginBottom: 50,
                                    }}
                                >
                                    Need to work in more than one location?
                                    Forgot to upload a file to the cloud, or to
                                    commit a change? Your Fractal cloud PC is
                                    accessible from any Internet-connected
                                    device.
                                </p>
                            </div>
                        )}
                        <Row style={{ margin: "auto" }}>
                            {this.state.width > 700 ? (
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0, paddingRight: 40 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 270,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={RGBIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            Color Accuracy
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            Achieve visually lossless frames
                                            with our color-accurate streaming
                                            technology.
                                        </p>
                                    </div>
                                </Col>
                            ) : (
                                <Col md={4} style={{ padding: 0 }}>
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={RGBIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 20,
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            Color Accuracy
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: 15,
                                            }}
                                        >
                                            Achieve visually lossless frames
                                            with our color-accurate streaming
                                            technology.
                                        </p>
                                    </div>
                                </Col>
                            )}
                            {this.state.width > 700 ? (
                                <Col md={4}>
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 270,
                                            margin: "auto",
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={HardDriveIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            Hard Drive Upload
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            Clone your entire hard drive to your
                                            cloud PC at the click of a button.
                                        </p>
                                    </div>
                                </Col>
                            ) : (
                                <Col md={4} style={{ padding: 0 }}>
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 210,
                                            margin: "auto",
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={HardDriveIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 20,
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            Hard Drive Upload
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: 15,
                                            }}
                                        >
                                            Clone your entire hard drive to your
                                            cloud PC at the click of a button.
                                        </p>
                                    </div>
                                </Col>
                            )}
                            {this.state.width > 700 ? (
                                <Col
                                    md={4}
                                    style={{ paddingRight: 0, paddingLeft: 40 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 270,
                                            margin: "auto",
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={FileIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "calc(15px + 0.4vw)",
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            4K Resolution
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: "calc(12px + 0.4vw)",
                                            }}
                                        >
                                            Experience crisp, native images with
                                            support for up to 4K resolution.
                                        </p>
                                    </div>
                                </Col>
                            ) : (
                                <Col md={4} style={{ padding: 0 }}>
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundImage:
                                                "linear-gradient(121.2deg, #F2DEF8 2.24%, #D7F5F5 100%)",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundAttachment: "fixed",
                                            padding: 30,
                                            minHeight: 210,
                                            margin: "auto",
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={FileIcon}
                                            style={{ height: 50 }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: 20,
                                                color: "#333333",
                                                textAlign: "left",
                                                marginTop: 30,
                                            }}
                                        >
                                            4K Resolution
                                        </div>
                                        <p
                                            style={{
                                                textAlign: "left",
                                                marginTop: 10,
                                                fontSize: 15,
                                            }}
                                        >
                                            Experience crisp, native images with
                                            support for up to 4K resolution.
                                        </p>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
                <div style={{ backgroundColor: "white" }}>
                    <div
                        className="fractal-container"
                        style={{ marginTop: 100 }}
                    >
                        <Row>
                            {this.state.width > 700 ? (
                                <Col
                                    md={6}
                                    xs={{ order: 2 }}
                                    style={{
                                        textAlign: "left",
                                        paddingBottom: 100,
                                        marginLeft: 0,
                                        marginBottom: 25,
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            boxShadow:
                                                "0px 4px 25px rgba(0, 0, 0, 0.3)",
                                            borderRadius: 5,
                                            width: "95%",
                                            maxWidth: 750,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 50,
                                                backgroundColor: "#1F2635",
                                                borderRadius: "5px 5px 0px 0px",
                                                color: "white",
                                                padding: "13px 40px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Your Info
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                padding: 20,
                                                color: "#333333",
                                                fontSize: 16,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    marginTop: 10,
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: "25%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        borderRadius: 5,
                                                        marginLeft: "5%",
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "25%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        borderRadius: 5,
                                                        marginRight: "5%",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{ padding: "8px 20px" }}
                                            >
                                                <Link to="/dashboard">
                                                    <Button
                                                        style={{
                                                            padding: 15,
                                                            width: "100%",
                                                            margin: "auto",
                                                            color: "#0980b0",
                                                            background:
                                                                "rgba(94, 195, 235, 0.2)",
                                                            border: "none",
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            borderRadius: 5,
                                                            marginTop: 20,
                                                            fontSize: 16,
                                                        }}
                                                    >
                                                        + NEW CLOUD PC
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ) : (
                                <Col
                                    md={6}
                                    xs={{ order: 2 }}
                                    style={{
                                        textAlign: "left",
                                        paddingBottom: 75,
                                        marginTop: 40,
                                        marginLeft: 0,
                                        marginBottom: 25,
                                    }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: "white",
                                            boxShadow:
                                                "0px 4px 25px rgba(0, 0, 0, 0.3)",
                                            borderRadius: 5,
                                            width: "100%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                height: 50,
                                                backgroundColor: "#1F2635",
                                                borderRadius: "5px 5px 0px 0px",
                                                color: "white",
                                                padding: "13px 40px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Your Info
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                padding: 20,
                                                color: "#333333",
                                                fontSize: 16,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    marginTop: 10,
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: "25%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        borderRadius: 5,
                                                        marginLeft: "5%",
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "100%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{
                                                    padding: "8px 20px",
                                                    display: "flex",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: "25%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "rgba(94, 195, 235, 0.2)",
                                                        borderRadius: 5,
                                                        marginRight: "5%",
                                                    }}
                                                ></div>
                                                <div
                                                    style={{
                                                        width: "70%",
                                                        height: 10,
                                                        backgroundColor:
                                                            "#e3e3e3",
                                                        borderRadius: 5,
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                style={{ padding: "8px 20px" }}
                                            >
                                                <Link to="/dashboard">
                                                    <Button
                                                        style={{
                                                            padding: 15,
                                                            width: "100%",
                                                            margin: "auto",
                                                            color: "#0980b0",
                                                            background:
                                                                "rgba(94, 195, 235, 0.2)",
                                                            border: "none",
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            borderRadius: 5,
                                                            marginTop: 20,
                                                            fontSize: 16,
                                                        }}
                                                    >
                                                        + NEW CLOUD PC
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            )}
                            {this.state.width > 700 ? (
                                <Col
                                    md={{ span: 6, order: 2 }}
                                    xs={{ order: 1, span: 12 }}
                                    style={{ paddingLeft: 50 }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "calc(30px + 1.1vw)",
                                            color: "#111111",
                                            textAlign: "left",
                                        }}
                                    >
                                        Setup in less than <br />
                                        one minute
                                    </div>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 20,
                                            fontSize: "calc(12px + 0.4vw)",
                                        }}
                                    >
                                        Sign up, choose a cloud PC, and download
                                        the Fractal desktop app. Your first week
                                        is free, no credit card required.
                                    </p>
                                </Col>
                            ) : (
                                <Col
                                    md={{ span: 6, order: 1 }}
                                    xs={{ order: 1, span: 12 }}
                                    style={{ paddingTop: 50, width: "100%" }}
                                >
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 35,
                                            lineHeight: 1.4,
                                            color: "#111111",
                                            textAlign: "left",
                                        }}
                                    >
                                        Setup in less than <br />
                                        one minute
                                    </div>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 20,
                                        }}
                                    >
                                        Sign up, choose a cloud PC, and download
                                        the Fractal desktop app. Your first week
                                        is free, no credit card required.
                                    </p>
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        width: "100vw",
                        minHeight: 390,
                        backgroundColor: "#F9F9F9",
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{
                            paddingTop: 75,
                            paddingBottom: 75,
                            textAlign: "center",
                        }}
                    >
                        {this.state.width > 700 ? (
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: 30,
                                        fontWeight: "bold",
                                        color: "#111111",
                                    }}
                                >
                                    Try Fractal free for seven days.
                                    <br />
                                    Start your trial now, pick a plan later.
                                </div>
                                <div
                                    style={{
                                        marginTop: 20,
                                        color: "#333333",
                                        fontSize: "calc(12px + 0.4vw)",
                                    }}
                                >
                                    No credit card required.
                                </div>
                                <Link to="/dashboard">
                                    <Button
                                        style={{
                                            boxShadow:
                                                "0px 4px 30px rgba(0, 0, 0, 0.20)",
                                            backgroundColor: "#111111",
                                            padding: "15px 30px",
                                            fontWeight: "bold",
                                            borderRadius: 5,
                                            border: "none",
                                            marginTop: 50,
                                        }}
                                    >
                                        GET STARTED{" "}
                                        <span
                                            style={{
                                                color: "#D6D6D6",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {" "}
                                            — it's free
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div style={{ textAlign: "left" }}>
                                <div
                                    style={{
                                        fontSize: 25,
                                        lineHeight: 1.4,
                                        fontWeight: "bold",
                                        color: "#111111",
                                        textAlign: "left",
                                    }}
                                >
                                    Try Fractal free for seven days. Start your
                                    trial now, pick a plan later.
                                </div>
                                <div
                                    style={{ marginTop: 20, color: "#333333" }}
                                >
                                    No credit card required.
                                </div>
                                <Link to="/dashboard">
                                    <Button
                                        style={{
                                            boxShadow:
                                                "0px 4px 30px rgba(0, 0, 0, 0.20)",
                                            backgroundColor: "#111111",
                                            padding: "15px 30px",
                                            fontWeight: "bold",
                                            borderRadius: 5,
                                            border: "none",
                                            marginRight: 20,
                                            marginTop: 50,
                                        }}
                                    >
                                        GET STARTED{" "}
                                        <span
                                            style={{
                                                color: "#D6D6D6",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            {" "}
                                            — it's free
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        )}
                        <Row style={{ margin: "auto", marginTop: 75 }}>
                            {this.state.width > 700 ? (
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0, paddingRight: 40 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            background: "white",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Hourly
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                5
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            +$0.70 per hour usage
                                        </div>
                                    </div>
                                </Col>
                            ) : (
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            background: "white",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Hourly
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                5
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            +$0.70 per hour usage
                                        </div>
                                    </div>
                                </Col>
                            )}
                            {this.state.width > 700 ? (
                                <Col
                                    md={4}
                                    style={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        textAlign: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            backgroundColor:
                                                "rgba(94, 195, 235, 0.1)",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Monthly
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                39
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            6 hr / day + $0.50 per extra hr
                                        </div>
                                    </div>
                                </Col>
                            ) : (
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            background: "white",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Monthly
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                39
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            6 hr / day + $0.50 per extra hr
                                        </div>
                                    </div>
                                </Col>
                            )}
                            {this.state.width > 700 ? (
                                <Col
                                    md={4}
                                    style={{
                                        paddingLeft: 40,
                                        paddingRight: 0,
                                        textAlign: "right",
                                    }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            background: "white",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Unlimited
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                99
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            Unlimited monthly usage
                                        </div>
                                    </div>
                                </Col>
                            ) : (
                                <Col
                                    md={4}
                                    style={{ paddingLeft: 0, paddingRight: 0 }}
                                >
                                    <div
                                        style={{
                                            borderRadius: 5,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                            textAlign: "left",
                                            background: "white",
                                            padding: 30,
                                            minHeight: 210,
                                            width: "100%",
                                            marginBottom: 20,
                                        }}
                                    >
                                        <div style={{ fontWeight: "bold" }}>
                                            Unlimited
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 5,
                                                display: "block",
                                                height: 110,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginRight: 5,
                                                    top: 25,
                                                }}
                                            >
                                                $
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    fontSize: 70,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                99
                                            </div>
                                            <div
                                                style={{
                                                    display: "inline",
                                                    float: "left",
                                                    position: "relative",
                                                    marginLeft: 8,
                                                    top: 60,
                                                }}
                                            >
                                                / mo
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                color: "#555555",
                                                display: "block",
                                                position: "relative",
                                                bottom: 5,
                                            }}
                                        >
                                            Unlimited monthly usage
                                        </div>
                                    </div>
                                </Col>
                            )}
                        </Row>
                        {this.state.width > 700 ? (
                            <Row style={{ marginTop: 50 }}>
                                <Col sm={6} md={3}>
                                    <ImageFadeIn
                                        src={CPU}
                                        style={{
                                            display: "inline",
                                            marginRight: 30,
                                            height: 30,
                                            float: "left",
                                            marginTop: 10,
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            textAlign: "left",
                                        }}
                                    >
                                        <div style={{ display: "inline" }}>
                                            CPU
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 16,
                                                color: "#333333",
                                            }}
                                        >
                                            Intel Xeon E5-2690
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={3}>
                                    <ImageFadeIn
                                        src={GPU}
                                        style={{
                                            display: "inline",
                                            marginRight: 30,
                                            height: 30,
                                            float: "left",
                                            marginTop: 10,
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            textAlign: "left",
                                        }}
                                    >
                                        <div style={{ display: "inline" }}>
                                            GPU
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 16,
                                                color: "#333333",
                                            }}
                                        >
                                            NVIDIA Tesla M60
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={3}>
                                    <ImageFadeIn
                                        src={RAM}
                                        style={{
                                            display: "inline",
                                            marginRight: 30,
                                            height: 30,
                                            float: "left",
                                            marginTop: 10,
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            textAlign: "left",
                                        }}
                                    >
                                        <div style={{ display: "inline" }}>
                                            RAM
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 16,
                                                color: "#333333",
                                            }}
                                        >
                                            56GB DDR4 RAM
                                        </div>
                                    </div>
                                </Col>
                                <Col sm={6} md={3}>
                                    <ImageFadeIn
                                        src={SSD}
                                        style={{
                                            display: "inline",
                                            marginRight: 30,
                                            height: 30,
                                            float: "left",
                                            marginTop: 10,
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "inline",
                                            float: "left",
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            textAlign: "left",
                                        }}
                                    >
                                        <div style={{ display: "inline" }}>
                                            SSD
                                        </div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 16,
                                                color: "#333333",
                                            }}
                                        >
                                            120GB SSD
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        ) : (
                            <Row style={{ marginTop: 30 }}>
                                <Col xs={6} md={3} style={{ marginBottom: 10 }}>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            textAlign: "left",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={CPU}
                                            style={{
                                                height: 20,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        />
                                        <div>CPU</div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 14,
                                                color: "#333333",
                                            }}
                                        >
                                            Six Core Xeon
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} md={3} style={{ marginBottom: 10 }}>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            textAlign: "left",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={GPU}
                                            style={{
                                                height: 20,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        />
                                        <div>GPU</div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 14,
                                                color: "#333333",
                                            }}
                                        >
                                            NVIDIA Tesla M60
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} md={3} style={{ marginBottom: 10 }}>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            textAlign: "left",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={RAM}
                                            style={{
                                                height: 20,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        />
                                        <div>RAM</div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 14,
                                                color: "#333333",
                                            }}
                                        >
                                            56 GB RAM
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={6} md={3} style={{ marginBottom: 10 }}>
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            textAlign: "left",
                                        }}
                                    >
                                        <ImageFadeIn
                                            src={SSD}
                                            style={{
                                                height: 20,
                                                marginTop: 10,
                                                marginBottom: 10,
                                            }}
                                        />
                                        <div>SSD</div>
                                        <div
                                            style={{
                                                fontWeight: "normal",
                                                fontSize: 14,
                                                color: "#333333",
                                            }}
                                        >
                                            120 GB SSD
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </div>
                </div>
                <div
                    style={{
                        background: "white",
                        paddingLeft: 40,
                        paddingRight: 40,
                    }}
                    id="beta"
                >
                    <Container style={{ paddingTop: 75, paddingBottom: 150 }}>
                        {this.state.width > 700 ? (
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "calc(30px + 1.1vw)",
                                    color: "#111111",
                                    textAlign: "center",
                                }}
                            >
                                Fractal is{" "}
                                <span className="blue-gradient">expanding</span>
                            </div>
                        ) : (
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 35,
                                    lineHeight: 1.4,
                                    color: "#111111",
                                    textAlign: "left",
                                }}
                            >
                                Fractal is{" "}
                                <span className="blue-gradient">Expanding</span>
                            </div>
                        )}
                        {this.state.width > 700 ? (
                            <div>
                                <div style={{ margin: "auto", maxWidth: 750 }}>
                                    <p
                                        style={{
                                            textAlign: "center",
                                            marginTop: 20,
                                            color: "#333333",
                                            fontSize: "calc(12px + 0.4vw)",
                                        }}
                                    >
                                        We currently have servers across the
                                        Eastern and Midwestern United States. If
                                        you live outside the US, you can request
                                        access below.
                                    </p>
                                </div>
                                <Button
                                    onClick={this.openForm}
                                    style={{
                                        marginTop: 30,
                                        backgroundColor: "#111111",
                                        padding: "15px 30px",
                                        fontWeight: "bold",
                                        borderRadius: 5,
                                        border: "none",
                                    }}
                                >
                                    REQUEST ACCESS
                                </Button>
                            </div>
                        ) : (
                            <div style={{ textAlign: "left" }}>
                                <div>
                                    <p
                                        style={{
                                            textAlign: "left",
                                            marginTop: 20,
                                            color: "#333333",
                                        }}
                                    >
                                        We currently have servers across the
                                        Eastern and Midwestern United States. If
                                        you live outside the US, you can request
                                        access below.
                                    </p>
                                </div>
                                <Button
                                    onClick={this.openForm}
                                    style={{
                                        marginTop: 30,
                                        backgroundColor: "#111111",
                                        padding: "15px 30px",
                                        fontWeight: "bold",
                                        borderRadius: 5,
                                        border: "none",
                                    }}
                                >
                                    REQUEST ACCESS
                                </Button>
                            </div>
                        )}
                    </Container>
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
        currentPage: state.AccountReducer.currentPage,
    };
}

export default connect(mapStateToProps)(PageHome);
