import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import logoWhite from "../assets/logo.svg";

const Footer = () => {
  return (
    <div className="footer py-5">
      <Container fluid="sm">
        <Row>
          <Col className="text-center py-3" md>
            <img src={logoWhite} width="100px" alt="" />
            <p className="mt-3" style={{ fontSize: "1vw" }}>
              We are creating High Quality Resources and tools to Aid developers
              during the developement of their projects
            </p>
          </Col>
          <Col className="text-center py-3 " md>
            <h6>Devwares</h6>
            <p className="mt-5">
              <Link>Resources</Link>
            </p>
            <p>
              <Link>About</Link>
            </p>
            <p>
              <Link>Contact</Link>
            </p>
            <p>
              <Link>Blog</Link>
            </p>
          </Col>
          <Col className="text-center py-3" md>
            <h6>Help</h6>
            <p className="mt-5">
              <Link>Support</Link>
            </p>
            <p>
              <Link>Sign Up</Link>
            </p>
            <p>
              <Link>Sign In</Link>
            </p>
          </Col>
          <Col className="text-center py-3" md>
            <h6>Products</h6>
            <p className="mt-5">
              <Link>Winframe</Link>
            </p>
            <p>
              <Link>Loop</Link>
            </p>
            <p>
              <Link>Contrast</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
