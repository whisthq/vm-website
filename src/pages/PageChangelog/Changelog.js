import React, { Component } from "react";
import Header from "components/header";
import Footer from "components/footer";
import { Container, Row, Col } from "react-bootstrap";

import { changelogData } from "pages/PageChangelog/constants/changes";

class Changelog extends Component {
    render() {
        let groups = changelogData.map((group, index) => {
            let entries = group.logs.map((entry, i) => (
                <Row key={i} className="pb-3">
                    <Col sm={2}>
                        <div style={{ float: "left" }}>
                            <div
                                style={{
                                    color: "white",
                                    background: "#384994",
                                    padding: "5px 10px",
                                    fontSize: 13,
                                    borderRadius: 3,
                                    marginBottom: 20,
                                }}
                            >
                                {entry.type.toUpperCase()}
                            </div>
                        </div>
                    </Col>
                    <Col sm={10}>{entry.msg}</Col>
                </Row>
            ));
            return (
                <div key={index} className="pb-4">
                    <div
                        style={{
                            fontSize: 20,
                            paddingBottom: 25,
                            display: "flex",
                        }}
                    >
                        <div
                            style={{
                                width: 13,
                                height: 13,
                                borderRadius: "50%",
                                background: "#FFFFFF",
                                border: "solid 2px #111111",
                                position: "relative",
                                top: 10,
                                right: 32,
                            }}
                        ></div>
                        <div style={{ position: "relative", right: 5 }}>
                            {group.time}
                        </div>
                    </div>
                    <div
                        style={{
                            background: "rgba(136, 138, 209, 0.07)",
                            padding: 35,
                            borderRadius: 5,
                        }}
                    >
                        {entries}
                    </div>
                </div>
            );
        });
        return (
            <div id="top">
                <Header color="#333333" button="#5ec3eb" homepage />
                <Container>
                    <div
                        style={{
                            fontSize: 40,
                            paddingTop: 30,
                            paddingBottom: 40,
                            fontWeight: "bold",
                        }}
                    >
                        Changelog
                    </div>
                    <div
                        style={{
                            borderLeft: "dotted 1px black",
                            paddingTop: 0,
                            paddingLeft: 25,
                        }}
                    >
                        {groups}
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Changelog;
