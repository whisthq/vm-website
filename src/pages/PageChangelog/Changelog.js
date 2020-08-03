import React, { Component } from "react";
import Header from "components/header";
import Footer from "components/footer";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import { changelogData } from "pages/PageChangelog/changes.js";

class Changelog extends Component {
    render() {
        let groups = changelogData.map((group, index) => {
            let entries = group.logs.map((entry, i) => (
                <Row key={i} className="pb-3">
                    <Col sm={2}>
                        <div style={{ float: "right" }}>
                            <div
                                style={{
                                    color: "#1BA8E0",
                                    borderRadius: 5,
                                    borderColor: "#5EC3EB",
                                    borderStyle: "solid",
                                    padding: "0 10px",
                                    fontSize: 13,
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
                    <div style={{ fontSize: 18, paddingBottom: 25 }}>
                        {moment.unix(group.timestamp).format("MMMM YYYY")}
                    </div>
                    {entries}
                </div>
            );
        });
        return (
            <div>
                <Header color="#333333" button="#5ec3eb" homepage />
                <Container>
                    <div
                        style={{
                            fontSize: 40,
                            paddingTop: 30,
                            paddingBottom: 40,
                        }}
                    >
                        Changelog
                    </div>
                    {groups}
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Changelog;
