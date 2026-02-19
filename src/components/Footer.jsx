import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <div className="bg-light py-2 text-center shadow-sm">
        <Container>
          <p className="text-muted mb-2">
            Designed to make personal finance simple and transparent.
          </p>
          <small className="text-muted">
            © {new Date().getFullYear()} Ledgerly
          </small>
        </Container>
      </div>
  )
}

export default Footer