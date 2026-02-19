import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import Logo from "../assets/Ledgerly.png"

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary position-relative">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/accounts'>Accounts</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* Center Logo => container position-relative and logo brand position absolute with top-50 and start-50, translate middle */}
        <Navbar.Brand as={Link} to={"/"} className="position-absolute top-50 start-50 translate-middle">
          <img src={Logo} alt="App Logo" height="100vh"/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar