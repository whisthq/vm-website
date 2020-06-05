import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import ImageFadeIn from "react-image-fade-in";

import Datacenter from "assets/datacenter.svg";
import Ming from "assets/ming.svg";
import Phil from "assets/phil.svg";
import Nick from "assets/nick.svg";
import Roshan from "assets/roshan.svg";
import Hamish from "assets/hamish.svg";
import Matt from "assets/matt.svg";
import Jonathan from "assets/jonathan.svg";
import Sean from "assets/sean.svg";
import Isabelle from "assets/isabelle.svg";

import InvestorBox from "pages/PageAbout/components/InvestorBox";
import EmployeeBox from "pages/PageAbout/components/employeeBox";
import Header from "components/header";
import Footer from "components/footer";


class About extends Component {
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
            <div style={{ overflowX: "hidden" }} id="top" className="App">
                <div style={{ maxWidth: 1920, margin: "auto" }}>
                    <Header color="#333333" button="#5ec3eb" homepage />
                    {this.state.width > 700 ? (
                        <div
                            className="fractal-container"
                            style={{ paddingTop: 125, paddingBottom: 150 }}
                        >
                            <Row>
                                <Col md={7} style={{ paddingRight: 60 }}>
                                    <ImageFadeIn
                                        src={Datacenter}
                                        style={{
                                            width: "95%",
                                            border: "solid 10px white",
                                            borderRadius: 10,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                        }}
                                    />
                                </Col>
                                <Col md={5} style={{ textAlign: "left" }}>
                                    <div
                                        style={{
                                            color: "#5ec3eb",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Our Mission
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "calc(30px + 1.1vw)",
                                            marginTop: 10,
                                            lineHeight: 1.3,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        To Democratize Computing
                                        <br /> Power
                                    </div>
                                    <div
                                        style={{
                                            color: "#555555",
                                            marginTop: 40,
                                            lineHeight: 1.7,
                                            fontSize: "calc(12px + 0.4vw)",
                                            maxWidth: 550,
                                        }}
                                    >
                                        At Fractal, we envision laptops that
                                        render 4K video at lightning speeds.
                                        Chromebooks and Macs that easily run
                                        Windows or Linux. PCs whose hardware can
                                        be upgraded at the click of a button.
                                    </div>
                                    <div
                                        style={{
                                            color: "#555555",
                                            marginTop: 15,
                                            lineHeight: 1.7,
                                            fontSize: "calc(12px + 0.4vw)",
                                            maxWidth: 550,
                                        }}
                                    >
                                        We believe that a single cloud PC should
                                        handle all your computing needs.
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div
                            className="fractal-container"
                            style={{
                                minHeight: "100vh",
                                paddingTop: 100,
                                paddingBottom: 50,
                            }}
                        >
                            <Row>
                                <Col md={7} style={{ marginBottom: 40 }}>
                                    <ImageFadeIn
                                        src={Datacenter}
                                        style={{
                                            width: "100%",
                                            border: "solid 5px white",
                                            borderRadius: 10,
                                            boxShadow:
                                                "0px 4px 20px rgba(0, 0, 0, 0.2)",
                                        }}
                                    />
                                </Col>
                                <Col md={5} style={{ textAlign: "left" }}>
                                    <div
                                        style={{
                                            color: "#5ec3eb",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Our Mission
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 30,
                                            marginTop: 10,
                                            lineHeight: 1.4,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        To Democratize Computing Power
                                    </div>
                                    <div
                                        style={{
                                            color: "#555555",
                                            marginTop: 30,
                                            lineHeight: 1.7,
                                            fontSize: 16,
                                        }}
                                    >
                                        At Fractal, we envision laptops that
                                        render 4K video at lightning speeds.
                                        Chromebooks and Macs that easily run
                                        Windows or Linux. PCs whose hardware can
                                        be upgraded at the click of a button.
                                    </div>
                                    <div
                                        style={{
                                            color: "#555555",
                                            marginTop: 15,
                                            lineHeight: 1.7,
                                            fontSize: 16,
                                        }}
                                    >
                                        We believe that a single cloud PC should
                                        handle all your computing needs.
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, #F9F9F9 61.47%, #FFFFFF 100%)",
                        paddingTop: 75,
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{ paddingBottom: 50 }}
                    >
                        <Row>
                            <Col md={12} style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        fontSize: 40,
                                        marginTop: 10,
                                        lineHeight: 1.4,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Our Stories
                                </div>
                                <div
                                    style={{
                                        color: "#555555",
                                        lineHeight: 1.7,
                                        maxWidth: 600,
                                        margin: "auto",
                                        marginTop: 20,
                                        fontSize: 18,
                                    }}
                                >
                                    We’re computer scientists passionate about
                                    the future of personal computing. Here are a
                                    few of our stories.
                                </div>
                            </Col>
                            <Col
                                md={12}
                                style={{ marginTop: 50, textAlign: "left" }}
                            >
                                <Carousel controls={false}>
                                    <Carousel.Item style={{ padding: 20 }}>
                                        <Row>
                                            <EmployeeBox 
                                                image = {Ming}
                                                name = "Ming Ying"
                                                text = "Ming
                                                        was a software
                                                        engineer at Fidelity
                                                        and quant researcher
                                                        at AQR Capital
                                                        Management.
                                                        His previous
                                                        research
                                                        interests
                                                        include
                                                        linear
                                                        optimization
                                                        algorithms
                                                        in the
                                                        context of
                                                        daily
                                                        fantasy
                                                        baseball
                                                        betting and
                                                        Bayesian
                                                        modelling.
                                                        He studied Statistics and Computer
                                                        Science at Harvard."
                                            />
                                            <EmployeeBox 
                                                image = {Phil}
                                                name = "Phil Noel"
                                                text = "Prior to
                                                        Phil was a
                                                        product
                                                        manager at
                                                        Microsoft
                                                        Azure,
                                                        machine
                                                        learning
                                                        researcher
                                                        at Premier
                                                        Tech, and
                                                        speaker at
                                                        TedX Harvard
                                                        and TedX
                                                        Quebec. Phil
                                                        graduated
                                                        from Harvard
                                                        University,
                                                        where he
                                                        studied
                                                        Computer
                                                        Science and
                                                        Neuroscience."
                                            />
                                            <EmployeeBox 
                                                image = {Nick}
                                                name = "Nick Pipitone"
                                                text = "Nick has an
                                                        affinity for
                                                        graphics
                                                        shaders,
                                                        circuits,
                                                        and
                                                        cryptocurrencies,
                                                        with
                                                        particular
                                                        experience
                                                        in
                                                        cybersecurity
                                                        and
                                                        penetration
                                                        testing. He
                                                        studied
                                                        Information
                                                        Systems at
                                                        Carnegie
                                                        Mellon."
                                            />
                                        </Row>
                                    </Carousel.Item>
                                    <Carousel.Item style={{ padding: 20 }}>
                                        <Row>
                                            <EmployeeBox 
                                                image = {Roshan}
                                                name = "Roshan Padaki"
                                                text = "Prior to
                                                        Fractal,
                                                        Roshan
                                                        researched
                                                        performance
                                                        lower bounds
                                                        for matching
                                                        algorithms
                                                        in dynamic
                                                        matching
                                                        markets and
                                                        developed
                                                        methods for
                                                        reducing
                                                        dimensionality
                                                        and sampling
                                                        parameters
                                                        in Bayesian
                                                        deep
                                                        learning. He
                                                        studied
                                                        mathematics
                                                        at Harvard."
                                            />
                                            <EmployeeBox 
                                                image = {Hamish}
                                                name = "Hamish Nicholson"
                                                text = "Hamish has worked
                                                        as a data
                                                        scientist at
                                                        NASA's Jet
                                                        Propulsion
                                                        Laboratory,
                                                        as a deep
                                                        learning
                                                        researcher
                                                        at
                                                        Perceptive
                                                        Automata,
                                                        and as a
                                                        research
                                                        partner at
                                                        the
                                                        Radcliffe
                                                        Institute,
                                                        where he
                                                        studied the
                                                        formation of
                                                        molecular
                                                        clouds in
                                                        young stars.
                                                        He studied
                                                        Computer
                                                        Science and
                                                        Statistics
                                                        at Harvard
                                                        University."
                                            />
                                            <EmployeeBox 
                                                image = {Matt}
                                                name = "Mathieu Lochet"
                                                text = "Mathieu
                                                        studied
                                                        Computer
                                                        Science and
                                                        engineering
                                                        at INSA in
                                                        France. He
                                                        has worked
                                                        in software
                                                        architecture,
                                                        framework
                                                        design,
                                                        optimization
                                                        and game
                                                        engines for
                                                        the last 10
                                                        years."
                                            />
                                        </Row>
                                    </Carousel.Item>
                                    <Carousel.Item style={{ padding: 20 }}>
                                        <Row>
                                            <EmployeeBox 
                                                image = {Jonathan}
                                                name = "Jonathan Xu"
                                                text = "Jonathan is
                                                        an avid
                                                        hackathon-goer,
                                                        and loves to
                                                        build
                                                        creative
                                                        projects
                                                        from the
                                                        ground up.
                                                        Prior to
                                                        Fractal, he
                                                        did full
                                                        stack
                                                        development
                                                        for
                                                        startups. He
                                                        is studying
                                                        software
                                                        engineering
                                                        at the
                                                        University
                                                        of Waterloo."
                                            />
                                            <EmployeeBox 
                                                image = {Isabelle}
                                                name = "Isabelle Zheng"
                                                text = "Isabelle studies Computer Science at Harvard 
                                                        University. Prior to working with Fractal, she did 
                                                        mobile and full-stack development with Facebook and 
                                                        other startups. On campus, she works to connect student 
                                                        founders with potential investors."
                                            />
                                            <EmployeeBox 
                                                image = {Sean}
                                                name = "Sean Hackett"
                                                text = "Sean has milled around quantum physics labs, 
                                                        hackathons, and nonprofits. He studied 
                                                        tiny trampolines that transmute quantum 
                                                        information and built robots that make 
                                                        sense of the 'hmms' and 'uh huhs' of 
                                                        everyday conversation. Sean studied 
                                                        Computer Science and Physics at 
                                                        Yale, and will enroll 
                                                        in the University of Southern California 
                                                        for a Ph.D in Computer Science."
                                            />
                                        </Row>
                                    </Carousel.Item>
                                </Carousel>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        width: "100vw",
                        background: "white",
                        marginTop: 75,
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{
                            paddingTop: 50,
                            paddingBottom: 100,
                            textAlign: "left",
                        }}
                    >
                        <Row>
                            <Col md={5}>
                                <div
                                    style={{
                                        color: "#5ec3eb",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Support
                                </div>
                                <div
                                    style={{
                                        fontSize: 40,
                                        marginTop: 10,
                                        lineHeight: 1.4,
                                        fontWeight: "bold",
                                    }}
                                >
                                    Our Investors
                                </div>
                                <div
                                    style={{
                                        color: "#555555",
                                        marginTop: 30,
                                        lineHeight: 1.7,
                                        fontSize: 18,
                                        marginBottom: 20,
                                    }}
                                >
                                    We’re fortunate to be backed by amazing
                                    institutional and individual investors. We'd
                                    also like to give special thanks to
                                    <a
                                        target="__blank"
                                        href="https://hacklodge.org/"
                                        style={{
                                            textDecoration: "none",
                                            fontWeight: "bold",
                                            color: "#555555",
                                        }}
                                    >
                                        &nbsp;Hack Lodge
                                    </a>
                                    , which connected us with some of our best
                                    advisors and engineers.
                                </div>
                            </Col>
                            {this.state.width > 700 ? (
                                <Col md={7} style={{ paddingLeft: 60 }}>
                                    <InvestorBox />
                                </Col>
                            ) : (
                                <Col md={7} style={{ paddingLeft: 0 }}>
                                    <InvestorBox />
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, #F9F9F9 61.47%, #FFFFFF 100%)",
                    }}
                >
                    <div
                        className="fractal-container"
                        style={{
                            paddingTop: 50,
                            paddingBottom: 100,
                            textAlign: "center",
                        }}
                    >
                        {this.state.width > 700 ? (
                            <div style={{ fontSize: 40 }}>
                                <span className="blue-gradient">
                                    Create My Cloud PC
                                </span>
                            </div>
                        ) : (
                            <div style={{ fontSize: 40 }}>
                                Create My Cloud PC
                            </div>
                        )}
                        <div
                            style={{
                                color: "#555555",
                                lineHeight: 1.7,
                                fontSize: 18,
                                maxWidth: 600,
                                margin: "auto",
                                marginTop: 10,
                            }}
                        >
                            Experience the next generation of personal computing
                            today.
                        </div>
                        <Link
                            to="/dashboard"
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                style={{
                                    marginTop: 30,
                                    backgroundColor: "#111111",
                                    fontWeight: "bold",
                                    borderRadius: 5,
                                    border: "none",
                                    padding: "15px 30px",
                                }}
                            >
                                GET STARTED
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default About;
