import React, { Component } from "react";
import Header from "components/header";
import Footer from "components/footer";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import engineering from "assets/icons/cloud-computing.svg";
import sales from "assets/icons/newtons-cradle.svg";
import systems from "assets/icons/gyroscope.svg";

import { jobData } from "pages/PageAbout/constants/jobs.js";

import "static/Shared.css";

class Careers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            requirements: null,
            responsibiliites: null,
            niceToHaves: null,
            jobImg: null,
            rolePos: 0,
            role: "",
        };
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        var role = this.props.location.search;
        role = role.substring(1, role.length);

        role = role.split("-").join(" ");

        let rolePos = jobData.map((job) => job.role).indexOf(role);
        console.log(rolePos);
        this.setState({ rolePos: rolePos });

        let requirements = null;
        let responsibilities = null;
        let niceToHaves = null;

        if (rolePos !== -1) {
            responsibilities = jobData[rolePos].responsibilities.map((item) => (
                <li style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                            marginRight: 15,
                            fontSize: 13,
                            position: "relative",
                            top: 10,
                        }}
                    />
                    <div>{item}</div>
                </li>
            ));
            niceToHaves = jobData[rolePos].niceToHaves.map((item) => (
                <li style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                            marginRight: 15,
                            fontSize: 13,
                            position: "relative",
                            top: 10,
                        }}
                    />
                    <div>{item}</div>
                </li>
            ));
            requirements = jobData[rolePos].requirements.map((item) => (
                <li style={{ display: "flex" }}>
                    <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                            marginRight: 15,
                            fontSize: 13,
                            position: "relative",
                            top: 10,
                        }}
                    />
                    <div>{item}</div>
                </li>
            ));

            if (jobData[rolePos].department === "engineering") {
                this.setState({ jobImg: engineering });
            } else if (jobData[rolePos].department === "sales") {
                this.setState({ jobImg: sales });
            } else if (jobData[rolePos].department === "systems") {
                this.setState({ jobImg: systems });
            }
        }

        this.setState({
            responsibilities: responsibilities,
            niceToHaves: niceToHaves,
            requirements: requirements,
            role: role,
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    render() {
        if (this.state.rolePos === -1) {
            return <Redirect to="/about" />;
        }

        return (
            <div id="top">
                <Header color="#333333" button="#5ec3eb" homepage />
                <Container className="pt-5" style={{ lineHeight: 2.2 }}>
                    <div>
                        <img
                            src={this.state.jobImg}
                            style={{ width: 75 }}
                            alt=""
                        />
                        <div
                            className="d-flex justify-content-between"
                            style={{ marginTop: 15 }}
                        >
                            <div
                                style={{
                                    fontSize:
                                        this.state.width > 700
                                            ? "calc(30px + 1.1vw)"
                                            : 30,
                                }}
                            >
                                {this.state.role}
                            </div>
                        </div>
                    </div>

                    <div style={{ whiteSpace: "pre-line" }}>
                        {jobData[this.state.rolePos].description}
                    </div>
                    <br />

                    <div className="subHeadingBoldFont">Responsibilities</div>
                    <ul className="noBulletUl">
                        {[this.state.responsibilities]}
                    </ul>
                    <br />

                    <div className="subHeadingBoldFont">Requirements</div>
                    <ul className="noBulletUl">{this.state.requirements}</ul>
                    <br />

                    <div className="subHeadingBoldFont">Nice-to-haves</div>
                    <ul className="noBulletUl">{this.state.niceToHaves}</ul>
                    <br />

                    <div className="subHeadingBoldFont">How to Apply</div>
                    <div style={{ marginBottom: 20 }}>
                        Shoot an email to{" "}
                        <a href="mailto:careers@fractalcomputers.com">
                            careers@fractalcomputers.com
                        </a>{" "}
                        regarding the position you are interested in. Please
                        include the position you are interested in, your resume,
                        and anything else you'd like to share! Our team will get
                        back to you as soon as we can. Thanks for your interest!
                    </div>
                    <a
                        className="black-button-small mt-3 mb-5"
                        href={
                            "mailto:careers@fractalcomputers.com?subject=Application for " +
                            this.state.role +
                            " position"
                        }
                    >
                        Apply Now
                    </a>

                    <div style={{ marginTop: 25 }}>
                        <div className="italicFont">
                            Fractal Computers is an equal opportunity employer.
                            We aim for every person at Fractal to feel like they
                            matter, belong, and can be their authentic selves so
                            they can do their best work. We do not discriminate
                            on the basis of race, religion, color, national
                            origin, gender, sexual orientation, age, marital
                            status, veteran status, or disability status.
                        </div>
                        <br />
                        <div className="italicFont">
                            Fractal Computers is committed to working with and
                            providing reasonable accommodations to applicants
                            with physical and mental disabilities. If you need
                            assistance and/or a reasonable accommodation in the
                            application or recruiting process due to a
                            disability, please contact us at
                            accommodations@fractalcomputers.com. Please see the
                            United States Department of Labor's{" "}
                            <a
                                href="https://www.dol.gov/ofccp/regs/compliance/posters/pdf/eeopost.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                EEO poster
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://www.dol.gov/ofccp/regs/compliance/posters/pdf/OFCCP_EEO_Supplement_Final_JRF_QA_508c.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                EEO poster supplement
                            </a>{" "}
                            for additional information.
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Careers;
