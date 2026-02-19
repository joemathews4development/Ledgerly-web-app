import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import Logo from "../assets/Ledgerly.png"

function AboutPage() {
  return (
    <div className="bg-light">
      <div className="py-5 text-center bg-white shadow-sm">
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <img src={Logo} alt="Logo" className="img-fluid" />
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
              <Button as={Link} to="/accounts" variant="primary" size="lg" className="mt-3 px-4 mt-5">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-5">
        <Container className="text-center">
          <h3 className="fw-bold mb-3">Built With Modern Tools</h3>
          <p className="text-muted">
            React • React Bootstrap • Recharts • Context API • Vite • json-server
          </p>
        </Container>
      </div>
      <div className="py-5 bg-white">
        <Container>
          <Row className="align-items-center">

            {/* Creator Image */}
            <Col md={4} className="text-center mb-4 mb-md-0">
              <div
                className="rounded-circle bg-white shadow-sm d-inline-flex align-items-center justify-content-center"
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
                  href="#"
                >
                  🌐 LinkedIn
                </Button>

                <Button
                  variant="outline-dark"
                  href="#"
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