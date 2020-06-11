import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";

import { googleLogin } from "store/actions/auth/login_actions";

import { GOOGLE_CLIENT_ID } from "utils/constants";

class GoogleBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
        };
    }
    responseGoogle = (res) => {
        this.props.dispatch(googleLogin(res.code));
    };

    render() {
        return (
            <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText={this.props.from + " with Google"}
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

export default connect()(GoogleBox);
