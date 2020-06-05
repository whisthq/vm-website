import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleNotch,
    faPlus
} from "@fortawesome/free-solid-svg-icons";

import "static/PageDashboard.css";

import Mountain from "assets/mountain.jpg"

class ImageBox extends Component {
    render() {
        return (
            <div 
                className = "image-box"
                style = {{ backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255,255,255,0.9)), url(" + Mountain + ")"}}
            >
                {
                this.props.creating 
                ?
                <FontAwesomeIcon
                    icon={
                        faCircleNotch
                    }
                    spin
                    className = "icon"
                />
                :
                <FontAwesomeIcon
                    icon={
                        faPlus
                    }
                    className = "icon"
                />  
                }              
                <div className = "text">
                    {this.props.text}
                </div>
                <div className = "subtext">
                    {this.props.subtext}
                </div>
            </div>
        );
    }
}

export default ImageBox;
