/**
 * NavigationBar.jsx
 *
 * Application navigation header component providing links to main pages,
 * theme toggle functionality, and responsive logo display across different screen sizes.
 * Uses Bootstrap's Navbar component with theme-aware styling.
 */

import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme.context'

/**
 * NavigationBar - Main application navigation header
 *
 * Features:
 * - Navigation links to Accounts and About pages
 * - Theme toggle button (light/dark mode)
 * - Responsive logo display (centered on desktop, mobile-friendly on smaller screens)
 * - Bootstrap theme-aware styling that adapts to light/dark modes
 * - Collapsible navigation menu for mobile devices
 *
 * @component
 * @returns {React.ReactElement} Navigation header with theme context integration
 *
 * @example
 * // Usage in App
 * <NavigationBar />
 */
function NavigationBar() {

  // Retrieve theme toggle function and logo from theme context
  const { handleToggleTheme, logo } = useContext(ThemeContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary position-relative">
      {/* bg-body-tertiary follows Bootstrap theme colors for light/dark mode compatibility */}
      <Container fluid>
        {/* Home Brand Link */}
        <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>

        {/* Mobile Logo - shown only on small screens */}
        <Navbar.Brand as={Link} to={"/"} className="d-lg-none p-0 m-0">
          <img src={logo} alt="App Logo" height="60"/>
        </Navbar.Brand>

        {/* Mobile Menu Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navigation Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/accounts'>Accounts</Nav.Link>
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            {/* Theme Toggle Button - Light/Dark Mode */}
            <Nav.Link onClick={handleToggleTheme}>☀️/🌑</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Desktop Centered Logo
            Uses position-relative on Navbar and position-absolute with
            top-50 start-50 translate-middle to center the logo.
            d-none d-lg-block ensures visibility only on large screens. */}
        <Navbar.Brand as={Link} to={"/"} className="d-none d-lg-block position-absolute top-50 start-50 translate-middle">
          <img src={logo} alt="App Logo" height="100"/>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar