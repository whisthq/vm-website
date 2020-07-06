import React from "react";
import Header from "components/header";
import Footer from "components/footer";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";

import { jobData } from "utils/jobs.js";

function Careers() {
    let location = useLocation();

    let role = location.pathname
        .substring(location.pathname.indexOf("careers/") + "careers/".length)
        .split("-")
        .join(" ");

    let rolePos = jobData.map((job) => job.role).indexOf(role);

    return (
        <div>
            <Header color="#333333" button="#5ec3eb" homepage />
            <Container className="p-5">
                <div className="titleFont">{role}</div>
                <div>{jobData[rolePos].description}</div>
                <div>About us</div>
                <div>
                    At Fractal, we envision laptops that render 4K video at
                    lightning speeds. Chromebooks and Macs that easily run
                    Windows or Linux. PCs whose hardware can be upgraded at the
                    click of a button. We believe that a single cloud PC should
                    handle all your computing needs.
                </div>
                <div>
                    Fractal Computers is an equal opportunity employer. We aim
                    for every person at Fractal to feel like they matter,
                    belong, and can be their authentic selves so they can do
                    their best work. We do not discriminate on the basis of
                    race, religion, color, national origin, gender, sexual
                    orientation, age, marital status, veteran status, or
                    disability status.
                </div>
                <div>
                    Fractal Computers is committed to working with and providing
                    reasonable accommodations to applicants with physical and
                    mental disabilities. If you need assistance and/or a
                    reasonable accommodation in the application or recruiting
                    process due to a disability, please contact us at
                    accommodations@fractalcomputers.com. Please see the United
                    States Department of Labor's EEO poster and EEO poster
                    supplement for additional information.
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default Careers;
