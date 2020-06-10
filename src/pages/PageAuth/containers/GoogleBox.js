import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

import { GOOGLE_CLIENT_ID } from "utils/constants";

class GoogleBox extends Component {
    constructor(props) {
        super(props);
    }
    responseGoogle = (res) => {
        console.log(res);
    };

    render() {
        return (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText={this.props.from}
                responseType={"code"}
                accessType={"offline"}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                redirectUri={"postmessage"}
                prompt={"consent"}
            />
        );
    }
}

export default GoogleBox;
