import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class AppCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            imageUrl: require("../assets/apps/" + this.props.image),
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        this.setState({ selected: !this.state.selected });
        this.props.handleSelect(this.props.title);
    }

    render() {
        return (
            <Card
                style={{
                    height: "16rem",
                    maxWidth: "16rem",
                    backgroundColor: this.state.selected ? "#eee" : "#fff",
                }}
                onClick={this.handleOnClick}
            >
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
                        src={this.state.imageUrl}
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
