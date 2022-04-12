import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
const navBarStyle = {
  backgroundColor: '#eee',
};

const navBarBrandStyle = {
  color: 'white',
};

const Header = (props) => {
  const { title } = props;
  return (
    <Navbar style={navBarStyle}>
      <Container>
        <Navbar.Brand href="/" style={navBarBrandStyle}>
          <Logo style={{ maxWidth: '20rem', maxHeight: '3rem' }} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
