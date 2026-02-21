/**
 * AboutPage.jsx
 *
 * About page showcasing the application's purpose, features, technology stack,
 * and information about the creator. Includes marketing content, feature highlights,
 * and links to creator's social profiles.
 */

import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../context/theme.context"

/**
 * AboutPage - Marketing and information page about the Ledgerly application
 *
 * Features:
 * - Application overview and tagline
 * - Feature highlights with icons (Monthly Insights, Account Management, Smart Filtering)
 * - Technology stack showcase with logos
 * - Creator information with social links
 * - Theme-aware styling for dark/light mode support
 *
 * @component
 * @returns {React.ReactElement} About page with application info, features, and creator bio
 */
function AboutPage() {

  // Retrieve theme state and logo from context for dynamic UI styling
  const { theme, logo } = useContext(ThemeContext)

  /** Array of technologies used in the application with their icon URLs */
  const techStacks = [
    { tech: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { tech: "React Bootstrap", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"},
    { tech: "Bootstrap Icons", image: "https://icons.getbootstrap.com/assets/img/icons-hero.png"},    
    { tech: "Recharts", image: "https://avatars.githubusercontent.com/u/20414118?s=200&v=4" },
    { tech: "Vite", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { tech: "JSON Server", image: "https://cdn-icons-png.flaticon.com/512/136/136443.png" },
    { tech: "HTML5", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},
    { tech: "CSS3", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"},
     { tech: "Axios", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" }
  ]

  return (
    <div>
      {/* Hero Section - App tagline and logo with feature highlights */}
      <div className="py-5 text-center shadow-sm">
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <img src={logo} alt="Logo" className="img-fluid"/>
            </Col>
            <Col md={8}>
              <p className="text-muted fs-5 my-3">
                Take control of your finances with clarity, simplicity, and insight.
              </p>
              <Row className="g-4">
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <div style={{ fontSize: "3rem" }}>📊</div>
                      <h5 className="fw-bold mt-3">Monthly Insights</h5>
                      <p className="text-muted">
                        Visual charts and summaries help you understand spending patterns instantly.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <div style={{ fontSize: "3rem" }}>💳</div>
                      <h5 className="fw-bold mt-3">Account Management</h5>
                      <p className="text-muted">
                        Manage multiple accounts including bank, credit card, and savings.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body className="text-center">
                      <div style={{ fontSize: "3rem" }}>🔍</div>
                      <h5 className="fw-bold mt-3">Smart Filtering</h5>
                      <p className="text-muted">
                        Filter and search transactions easily to stay in control.
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Button as={Link} to="/accounts" variant="outline-primary" size="lg" className="mt-3 px-4 mt-5">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Technology Stack Section - Displays tools and libraries used */}
      <div className={`py-5 shadow-sm container-${theme}`}>
        <Container className="text-center">
          <h3 className="fw-bold mb-3">Built With Modern Tools</h3>
          <Row className="align-items-center justify-content-center">
            {techStacks.map((techStack) => {
              return (
                <Col md={2} className="mb-4" key={techStack.tech}>
                  <Card className="shadow-sm border-0">
                    <Card.Body>
                      <img src={techStack.image} alt="React" style={{ height: "60px", objectFit: "contain" }} />
                      <p className="pt-2">{techStack.tech}</p>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
      {/* Creator Section - Information about the developer and social links */}
      <div className="py-5">
        <Container>
          <Row className="align-items-center">

            {/* Creator Image */}
            <Col md={4} className="text-center mb-4 mb-md-0">
              <div
                className={`rounded-circle container-${theme} shadow-sm d-inline-flex align-items-center justify-content-center`}
                style={{ width: "150px", height: "150px", fontSize: "3rem" }}
              >
                👨‍💻
              </div>
              <div className="py-3 fs-3 fw-bold">
                Ben Joe Mathews
              </div>
            </Col>
            <Col md={8}>
              <h3 className="fw-bold">About the Creator</h3>

              <p className="text-muted mt-3">
                This application was built with a passion for clean design
                and practical financial tools. The goal is to simplify
                personal finance management and provide meaningful insights
                through intuitive UI and modern web technologies.
              </p>

              <p className="text-muted">
                Built using React, Bootstrap, and modern frontend practices,
                this project reflects a focus on performance, usability,
                and scalable architecture.
              </p>

              <div className="mt-3">
                <Button
                  variant="outline-primary"
                  className="me-2"
                  href="https://www.linkedin.com/in/benjoemathews"
                >
                  🌐 LinkedIn
                </Button>

                <Button
                  variant="outline-primary"
                  href="https://github.com/joemathews4development/Ledgerly-web-app.git"
                >
                  🐙 GitHub
                </Button>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  )
}

export default AboutPage