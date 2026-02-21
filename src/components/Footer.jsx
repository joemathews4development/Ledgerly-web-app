/**
 * Footer.jsx
 *
 * Application footer component displaying tagline, copyright notice,
 * and year information. Uses theme-aware Bootstrap styling for light/dark mode support.
 */

import React from 'react'
import { Container } from 'react-bootstrap'

/**
 * Footer - Application footer with tagline and copyright
 *
 * Features:
 * - Static footer content with application tagline
 * - Dynamic copyright year that updates annually
 * - Bootstrap theme-aware styling for light/dark mode compatibility
 * - Subtle shadow for visual separation
 * - Responsive container for content alignment
 *
 * @component
 * @returns {React.ReactElement} Footer section with copyright and tagline
 *
 * @example
 * // Usage in App layout
 * <Footer />
 */
function Footer() {
  return (
    /**
     * bg-body-tertiary to follow the theme colors from Bootstrap
     */
    <footer className="bg-body-tertiary py-2 text-center shadow-sm">
      <Container>
        {/* Tagline */}
        <p className="text-muted mb-2">
          Designed to make personal finance simple and transparent.
        </p>
        
        {/* Copyright with Dynamic Year */}
        <small className="text-muted">
          © {new Date().getFullYear()} Ledgerly
        </small>
      </Container>
    </footer>
  )
}

export default Footer