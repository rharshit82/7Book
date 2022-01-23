import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">7Book</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="https://github.com/rharshit82/7Book" target="blank">
              Github
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
