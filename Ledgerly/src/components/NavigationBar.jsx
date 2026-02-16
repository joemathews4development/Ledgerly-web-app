import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={ Link } to='/'>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
                <Nav.Link as={ Link } to='/accounts'>Accounts</Nav.Link>
              <Nav.Link as={ Link } to='/about'>About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
          
      </Navbar>
  )

  // return(
  //   <nav>

  //     <Link to="/">Home</Link>
  //     <Link to="/accounts">Accounts</Link>
  //     <Link to="/about">About</Link>

  //   </nav>
  // )
}

export default NavigationBar