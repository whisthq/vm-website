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
                    height: "14rem",
                    maxWidth: "16rem",
                    backgroundColor: this.state.selected
                        ? "rgba(94, 195, 235, 0.1)"
                        : "#fff",
                    borderRadius: 5,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
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
                    <div
                        style={{
                            color: "#111111",
                            fontSize: 22,
                            fontWeight: "bold",
                        }}
                    >
                        {this.props.title}
                    </div>
                    <div
                        className="mt-1"
                        style={{
                            fontSize: 12,
                            color: "#999",
                        }}
                    >
                        {this.props.tag}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default AppCard;