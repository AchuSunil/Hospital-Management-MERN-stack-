import React from "react";
import "./Header.css";
import { Container } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <nav className="nav-container">
                <Container>
                    <div className="navFirst"></div>
                    <div className="navSecond"></div>
                </Container>
            </nav>
        </>
    );
};

export default Header;
