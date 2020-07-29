import React, { Component } from "react";
import Header from "components/header";
import Footer from "components/footer";
import { Container } from "react-bootstrap";

import Logo from "assets/logo_grey.svg";
import Software from "assets/large_graphics/software_nobg.svg";

class NotFound extends Component {
    render() {
        return (
            <div>
                <Header color="#333333" button="#5ec3eb" homepage />
                <Container className="text-center">
                    <div
                        style={{
                            height: "60vh",
                            marginTop: 50,
                            backgroundImage: `url(${Logo})`,
                            backgroundPosition: "center center",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                            paddingTop: "15vh",
                        }}
                    >
                        <img src={Software} alt="software img" />
                        <div style={{ fontSize: 48 }}>Page not found</div>
                        <div style={{ fontSize: 18 }}>
                            Whoops! We can’t seem to find the page you’re
                            looking for.
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default NotFound;
