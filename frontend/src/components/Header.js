import React from "react";
import { Container, Navbar } from "react-bootstrap";

const navBarStyle = {
    backgroundColor: '#0d6efd',

};

const navBarBrandStyle={
    color: 'white'
};

const Header = (props) => {
  const { title } = props;
  return (
    <Navbar style={navBarStyle}>
        <Container>
        <Navbar.Brand href="/" style={navBarBrandStyle}>{title}</Navbar.Brand>
        </Container>
    </Navbar>
  );
};

export default Header;
