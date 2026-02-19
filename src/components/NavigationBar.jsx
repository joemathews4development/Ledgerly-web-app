import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import { Button } from 'react-bootstrap';

function NavigationBar() {

  const { handleToggleTheme, logo } = useContext(ThemeContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary position-relative">
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
        <Navbar.Brand as={Link} to={"/"} className="d-lg-none p-0 m-0">
          <img src={logo} alt="App Logo" height="60"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/accounts'>Accounts</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <Nav.Link onClick={handleToggleTheme}>☀️/🌑</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* Center Logo => container position-relative and logo brand position absolute with top-50 and start-50, translate middle
            d-none => the element is completely hidden, d-lg-block => show on large screens only as display: block */}
        <Navbar.Brand as={Link} to={"/"} className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
          <img src={logo} alt="App Logo" height="100"/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar