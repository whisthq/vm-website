import React, { Component } from "react";
import ImageFadeIn from "react-image-fade-in";

class AppCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: require("assets/application_logos/" + this.props.image),
        };
    }

    handleOnClick = () => {
        this.props.handleSelect(this.props.title);
    };

    render() {
        return (
            <div
                style={{
                    backgroundColor: this.props.selected
                        ? "rgba(94, 195, 235, 0.1)"
                        : "#fff",
                    borderRadius: 5,
                    cursor: "pointer",
                    border: "none",
                    display: "flex",
                    padding: "20px 20px",
                    marginBottom: 8,
                }}
                onClick={this.handleOnClick}
            >
                <div
                    style={{
                        height: "1.6rem",
                        width: "1.6rem",
                        paddingTop: 2
                    }}
                >
                    <ImageFadeIn
                        src={this.state.imageUrl}
                        style={{ width: "100%" }}
                    />
                </div>
                <div style={{ paddingTop: 0, paddingLeft: 25 }}>
                    <div
                        style={{
                            color: "#111111",
                            fontSize: 18,
                            fontWeight: "bold",
                        }}
                    >
                        {this.props.title}
                    </div>
                    <div
                        className="mt-1"
                        style={{
                            fontSize: 14,
                            color: "#666666",
                        }}
                    >
                        {this.props.tag}
                    </div>
                </div>
            </div>
        );
    }
}

export default AppCard;
