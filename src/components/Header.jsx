import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logo.svg";

const Header = () => {
    return (
        <Navbar variant="light">
            <Navbar.Brand href="#home">
                <img
                    alt="logo"
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Todo List
            </Navbar.Brand>
        </Navbar>
    );
};

export default Header;