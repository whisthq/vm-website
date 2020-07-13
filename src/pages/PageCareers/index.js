import React from "react";
import Header from "components/header";
import Footer from "components/footer";
import { useLocation, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import engineering from "assets/icons/engineering.svg";
import sales from "assets/icons/sales.svg";

import { jobData } from "utils/jobs.js";

function Careers() {
    let location = useLocation();

    let role = location.pathname
        .substring(location.pathname.indexOf("careers/") + "careers/".length)
        .split("-")
        .join(" ");

    let rolePos = jobData.map((job) => job.role).indexOf(role);

    let requirements = null;
    let responsibilities = null;
    let niceToHaves = null;
    let jobImg = null;
    if (rolePos !== -1) {
        responsibilities = jobData[rolePos].responsibilities.map((item) => (
            <li className="customBullet">{item}</li>
        ));
        niceToHaves = jobData[rolePos].niceToHaves.map((item) => (
            <li className="customBullet">{item}</li>
        ));
        requirements = jobData[rolePos].requirements.map((item) => (
            <li className="customBullet">{item}</li>
        ));
        if (jobData[rolePos].department === "engineering") {
            jobImg = engineering;
        } else if (jobData[rolePos].department === "sales") {
            jobImg = sales;
        }
    }

    if (rolePos === -1) {
        return <Redirect to="/about" />;
    }

    return (
        <div>
            <Header color="#333333" button="#5ec3eb" homepage />
            <Container className="pt-5" style={{ lineHeight: 2.2 }}>
                <div>
                    <img src={jobImg} style={{ width: 50 }} alt="" />
                    <div className="d-flex justify-content-between">
                        <div className="titleFont mt-3">{role}</div>
                        <a
                            className="black-button-small mt-3 mb-5"
                            href={
                                "mailto:careers@fractalcomputers.com?subject=Application for " +
                                role +
                                " position"
                            }
                        >
                            Apply Now
                        </a>
                    </div>

                    <div
                        className="d-flex align-items-center subHeadingFont pb-4"
                        style={{ color: "#555555" }}
                    >
                        <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            className="mr-3"
                        />
                        <span className="mr-5">
                            {jobData[rolePos].location}
                        </span>

                        <FontAwesomeIcon icon={faClock} className="mr-3" />
                        <span className="mr-5">{jobData[rolePos].hours}</span>
                    </div>
                </div>

                <div style={{ whiteSpace: "pre-line" }}>
                    {jobData[rolePos].description}
                </div>
                <br />

                <div
                    className="subHeadingBoldFont"
                    style={{ color: "#636e7d" }}
                >
                    Responsibilities
                </div>
                <ul className="noBulletUl">{responsibilities}</ul>
                <br />

                <div
                    className="subHeadingBoldFont"
                    style={{ color: "#636e7d" }}
                >
                    Requirements
                </div>
                <ul className="noBulletUl">{requirements}</ul>
                <br />

                <div
                    className="subHeadingBoldFont"
                    style={{ color: "#636e7d" }}
                >
                    Nice-to-haves
                </div>
                <ul className="noBulletUl">{niceToHaves}</ul>
                <br />

                <div
                    className="subHeadingBoldFont"
                    style={{ color: "#636e7d" }}
                >
                    How to apply
                </div>
                <div>
                    Please send your resume and anything else you'd like to
                    share to{" "}
                    <a href="mailto:careers@fractalcomputers.com">
                        careers@fractalcomputers.com
                    </a>{" "}
                    along with your associated university and class year (if
                    applicable). We will get back to
                    you as soon as we can. Thanks for your interest!
                </div>
                <a
                    className="black-button-small mt-3 mb-5"
                    href={
                        "mailto:careers@fractalcomputers.com?subject=Application for " +
                        role +
                        " position"
                    }
                >
                    Apply Now
                </a>

                <div
                    className="subHeadingBoldFont"
                    style={{ color: "#636e7d" }}
                >
                    About us
                </div>
                <div>
                    Fractal is building the future of personal computing. At
                    Fractal, we dream of a world where people are not restricted
                    by their hardware or operating system; a world where they
                    can play video games on a Chromebook or code on an iPad.{" "}
                </div>
                <div>
                    We're a team of 9 working diligently to realize this vision.
                    We're committed to fostering an inclusive and fun work
                    environment, and maintain a flat company structure. We're
                    looking for candidates who aren't afraid of technical
                    challenges and will come in and help us all be better and
                    learn from each other.
                </div>
                <div>Also, we work in a dog-friendly office!</div>
                <br />
                <div className="italicFont">
                    Fractal Computers is an equal opportunity employer. We aim
                    for every person at Fractal to feel like they matter,
                    belong, and can be their authentic selves so they can do
                    their best work. We do not discriminate on the basis of
                    race, religion, color, national origin, gender, sexual
                    orientation, age, marital status, veteran status, or
                    disability status.
                </div>
                <br />
                <div className="italicFont">
                    Fractal Computers is committed to working with and providing
                    reasonable accommodations to applicants with physical and
                    mental disabilities. If you need assistance and/or a
                    reasonable accommodation in the application or recruiting
                    process due to a disability, please contact us at
                    accommodations@fractalcomputers.com. Please see the United
                    States Department of Labor's{" "}
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
            </Container>
            <Footer />
        </div>
    );
}

export default Careers;
