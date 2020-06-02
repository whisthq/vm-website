import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class AppCard extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Card style={{ height: "16rem", maxWidth: "16rem" }}>
                <div
                    style={{
                        height: "8rem",
                        width: "8rem",
                        padding: "1rem",
                        margin: "auto",
                    }}
                >
                    <Card.Img
                        variant="top"
                        src={this.props.image}
                        style={{ width: "100%" }}
                    />
                </div>
                <Card.Body style={{ padding: "1rem" }}>
                    <Card.Title>{this.props.title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">{this.props.tag}</small>
                </Card.Footer>
            </Card>
        );
    }
}

export default AppCard;
