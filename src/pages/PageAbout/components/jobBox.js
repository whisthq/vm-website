import React from "react";
import Col from "react-bootstrap/Col";
import ImageFadeIn from "react-image-fade-in";
import engineering from "assets/icons/engineering.svg";
import sales from "assets/icons/sales.svg";
import { Link } from "react-router-dom";

function JobBox(props) {
    let iconImg = null;
    if (props.job.department === "engineering") {
        iconImg = engineering;
    } else if (props.job.department === "sales") {
        iconImg = sales;
    }

    let jobUrl = "/careers/" + props.job.role.split(" ").join("-");

    return (
        <Col md={4} style={{ marginBottom: 20 }}>
            <Link to={jobUrl} style={{ textDecoration: "none" }}>
                <div
                    className="expandOnHover"
                    style={{
                        background: "white",
                        borderRadius: 10,
                        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                        padding: 30,
                    }}
                >
                    <ImageFadeIn
                        src={iconImg}
                        style={{
                            width: 40,
                            marginBottom: 25,
                        }}
                    />
                    <h4 style={{ color: "black" }}>{props.job.role}</h4>
                    <div>Read more</div>
                </div>
            </Link>
        </Col>
    );
}

export default JobBox;
