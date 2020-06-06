import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Popup from "reactjs-popup";

import Brian from "assets/investor_photos/brian.png";
import BSV from "assets/investor_photos/bsv.png";
import DC from "assets/investor_photos/dc.jpg";
import DRF from "assets/investor_photos/drf.jpg";
import Michael from "assets/investor_photos/michael.jpg";
import Vijay from "assets/investor_photos/vijay.jpg";
import Pankaj from "assets/investor_photos/pankaj.jpg";
import Neo from "assets/investor_photos/neo.png";
import RDV from "assets/investor_photos/rdv.png";

class InvestorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
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
        window.addEventListener("resize", this.updateWindowDimensions);

        return (
            <Row>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <a
                        href="https://techcrunch.com/2018/08/21/ali-partovi-neo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", outline: "none" }}
                    >
                        <div
                            style={{
                                background: "white",
                                borderRadius: 10,
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                padding: 30,
                                textAlign: "center",
                                height: 125,
                            }}
                        >
                            <img
                                src={Neo}
                                alt=""
                                style={{
                                    maxWidth: 75,
                                    maxHeight: 75,
                                    paddingTop: 20,
                                }}
                            />
                        </div>
                    </a>
                </Col>
                {this.state.width > 700 ? (
                    <Col xs={6} md={4} style={{ marginTop: 20 }}>
                        <a
                            href="https://www.basisset.ventures/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", outline: "none" }}
                        >
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 10,
                                    boxShadow:
                                        "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                    padding: 30,
                                    textAlign: "center",
                                    height: 125,
                                }}
                            >
                                <img
                                    src={BSV}
                                    alt=""
                                    style={{ width: 115, height: 75 }}
                                />
                            </div>
                        </a>
                    </Col>
                ) : (
                    <Col xs={6} md={4} style={{ marginTop: 20 }}>
                        <a
                            href="https://www.basisset.ventures/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", outline: "none" }}
                        >
                            <div
                                style={{
                                    background: "white",
                                    borderRadius: 10,
                                    boxShadow:
                                        "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                    padding: "30px 20px",
                                    textAlign: "center",
                                    height: 125,
                                }}
                            >
                                <img
                                    src={BSV}
                                    alt=""
                                    style={{ width: 100, height: 70 }}
                                />
                            </div>
                        </a>
                    </Col>
                )}
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <a
                        href="https://www.dormroomfund.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", outline: "none" }}
                    >
                        <div
                            style={{
                                background: "white",
                                borderRadius: 10,
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                padding: 30,
                                textAlign: "center",
                                height: 125,
                            }}
                        >
                            <img
                                src={DRF}
                                alt=""
                                style={{ maxWidth: 65, maxHeight: 65 }}
                            />
                        </div>
                    </a>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <a
                        href="https://www.roughdraft.vc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", outline: "none" }}
                    >
                        <div
                            style={{
                                background: "white",
                                borderRadius: 10,
                                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                padding: 30,
                                textAlign: "center",
                                height: 125,
                            }}
                        >
                            <img
                                src={RDV}
                                alt=""
                                style={{ maxWidth: 70, maxHeight: 70 }}
                            />
                        </div>
                    </a>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <Popup
                        modal
                        trigger={
                            <div
                                className="pointerOnHover"
                                style={{
                                    background: "rgba(215, 245, 245, 0.4)",
                                    borderRadius: 10,
                                    boxShadow:
                                        "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                    padding: 30,
                                    textAlign: "center",
                                    height: 125,
                                }}
                            >
                                <img
                                    src={Pankaj}
                                    alt=""
                                    style={{
                                        maxWidth: 70,
                                        maxHeight: 70,
                                        borderRadius: 35,
                                        filter: "grayscale(100%)",
                                    }}
                                />
                            </div>
                        }
                        contentStyle={{
                            width: 500,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            minHeight: 325,
                            padding: "30px 50px",
                        }}
                    >
                        <div>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={Pankaj}
                                    alt=""
                                    style={{
                                        maxWidth: 75,
                                        maxHeight: 75,
                                        borderRadius: 37.5,
                                    }}
                                />
                                <div style={{ paddingLeft: 50 }}>
                                    <div
                                        style={{
                                            fontSize: 30,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Pankaj Patel
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 20,
                                            color: "#555555",
                                            maxHeight: 200,
                                            overflowY: "scroll",
                                        }}
                                    >
                                        <p>
                                            Pankaj Patel was Executive Vice
                                            President and Chief Development
                                            Officer at Cisco Systems, Inc. Mr.
                                            Patel reported into the CEO as the
                                            Engineering head of the company’s
                                            $38 billion product and solution
                                            portfolio. He drove the business and
                                            technology strategy across Cisco’s
                                            Routing, Switching, Wireless,
                                            Security, Mobility, Video,
                                            Collaboration, Data Center and Cloud
                                            offerings delivered by a global team
                                            of over 29,000 engineers.
                                        </p>
                                        <p>
                                            Mr. Patel is a proven
                                            results-oriented and seasoned
                                            technology leader with 35+ years of
                                            experience developing highly
                                            scalable products and services by
                                            building and leading large,
                                            high-performance global engineering
                                            organizations, setting clear vision,
                                            directing strategy and delivering
                                            against goals. He is passionate
                                            about translating strategy to
                                            execution, and delivering the best
                                            experience for the customer.
                                        </p>
                                        <p>
                                            Mr. Patel retired from Cisco in
                                            October of 2016 and now serves on
                                            the Board of Directors of several
                                            startups. He is focused on
                                            incubating, investing, and advising
                                            startups with their strategy,
                                            product development, and
                                            go-to-market as well as helping them
                                            scale. Patel is also a mentor and
                                            sponsor to numerous employees
                                            throughout the industry.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <Popup
                        modal
                        trigger={
                            <div
                                className="pointerOnHover"
                                style={{
                                    background: "rgba(215, 245, 245, 0.4)",
                                    borderRadius: 10,
                                    boxShadow:
                                        "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                    padding: 30,
                                    textAlign: "center",
                                    height: 125,
                                }}
                            >
                                <img
                                    src={Michael}
                                    alt=""
                                    style={{
                                        maxWidth: 70,
                                        maxHeight: 70,
                                        borderRadius: 35,
                                        filter: "grayscale(100%)",
                                    }}
                                />
                            </div>
                        }
                        contentStyle={{
                            width: 500,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            minHeight: 325,
                            padding: "30px 50px",
                        }}
                    >
                        <div>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={Michael}
                                    alt=""
                                    style={{
                                        maxWidth: 75,
                                        maxHeight: 75,
                                        borderRadius: 37.5,
                                    }}
                                />
                                <div style={{ paddingLeft: 50 }}>
                                    <div
                                        style={{
                                            fontSize: 30,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Michael Stoppelman
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 20,
                                            color: "#555555",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        Michael Stoppelman was a former exec at
                                        Yelp and is now a full-time early stage
                                        investor who has backed companies like
                                        Wish, Lyft, Flexport, Benchling and
                                        Confluent. Prior to investing he was SVP
                                        of Engineering of Yelp (2007-2017) and a
                                        software engineer at Google (2003-2007).
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <div
                        style={{
                            background: "rgba(215, 245, 245, 0.4)",
                            borderRadius: 10,
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.20)",
                            padding: 30,
                            textAlign: "center",
                            height: 125,
                        }}
                    >
                        <img
                            src={Vijay}
                            alt=""
                            style={{
                                maxWidth: 70,
                                maxHeight: 70,
                                borderRadius: 35,
                                filter: "grayscale(100%)",
                            }}
                        />
                    </div>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <Popup
                        modal
                        trigger={
                            <div
                                className="pointerOnHover"
                                style={{
                                    background: "rgba(215, 245, 245, 0.4)",
                                    borderRadius: 10,
                                    boxShadow:
                                        "0px 4px 15px rgba(0, 0, 0, 0.20)",
                                    padding: 30,
                                    textAlign: "center",
                                    height: 125,
                                }}
                            >
                                <img
                                    src={DC}
                                    alt=""
                                    style={{
                                        maxWidth: 70,
                                        maxHeight: 70,
                                        borderRadius: 35,
                                        filter: "grayscale(100%)",
                                    }}
                                />
                            </div>
                        }
                        contentStyle={{
                            width: 500,
                            borderRadius: 5,
                            backgroundColor: "#EBEBEB",
                            border: "none",
                            minHeight: 325,
                            padding: "30px 50px",
                        }}
                    >
                        <div>
                            <div style={{ display: "flex" }}>
                                <img
                                    src={DC}
                                    alt=""
                                    style={{
                                        maxWidth: 75,
                                        maxHeight: 75,
                                        borderRadius: 37.5,
                                    }}
                                />
                                <div style={{ paddingLeft: 50 }}>
                                    <div
                                        style={{
                                            fontSize: 30,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Dan (DC) Posch
                                    </div>
                                    <div
                                        style={{
                                            marginTop: 20,
                                            color: "#555555",
                                            overflowY: "scroll",
                                        }}
                                    >
                                        DC Posch currently serves as the
                                        Directory of Technology at AppFolio.
                                        Previously, he was the CTO of
                                        Dynasty.com, which was acquired by
                                        AppFolio. DC graduated from Stanford
                                        University with a degree in Computer
                                        Science in 2013.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popup>
                </Col>
                <Col xs={6} md={4} style={{ marginTop: 20 }}>
                    <div
                        style={{
                            background: "rgba(215, 245, 245, 0.4)",
                            borderRadius: 10,
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.20)",
                            padding: 30,
                            textAlign: "center",
                            height: 125,
                        }}
                    >
                        <img
                            src={Brian}
                            alt=""
                            style={{
                                maxWidth: 70,
                                maxHeight: 70,
                                borderRadius: 35,
                                filter: "grayscale(100%)",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        );
    }
}

export default InvestorBox;
