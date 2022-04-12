import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header = (props) => {
    const {title} = props;
    return (
        <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">{title}</Navbar.Brand>
        </Navbar>
    )
};

export default Header;


