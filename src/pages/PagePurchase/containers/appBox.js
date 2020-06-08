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
            <div style = {{paddingRight: 15, paddingBottom: 15}}>
                <div
                    style={{
                        backgroundColor: this.props.selected
                            ? "rgba(94, 195, 235, 0.1)"
                            : "#fff",
                        cursor: "pointer",
                        border: "none",
                        display: "flex",
                        padding: "15px 25px",
                        borderRadius: 4
                    }}
                    onClick={this.handleOnClick}
                >
                    <div
                        style={{
                            height: "1.8rem",
                            width: "1.8rem",
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
                                fontSize: 17,
                                fontWeight: "bold",
                            }}
                        >
                            {this.props.title}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppCard;
