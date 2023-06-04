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
              Developed by
              <span className="footer-developer">Mohsin</span>
            </p>
            <p>© Flip Market - All Rights Reserved</p>
          </Col>
          <Col className="text-center py-3 " md>
            <h6>Social Links</h6>
            <p className="mt-5">
              <a href="https://www.facebook.com" target="_blank">
                Facebook
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com" target="_blank">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://www.twitter.com" target="_blank">
                Twitter
              </a>
            </p>
          </Col>
          <Col className="text-center py-3" md>
            <h6>Help</h6>
            <p className="mt-5">
              <Link to="/profile">Profile</Link>
            </p>
            <p>
              <Link to="/register">Sign Up</Link>
            </p>
            <p>
              <Link to="/login">Sign In</Link>
            </p>
          </Col>
          <Col className="text-center py-3" md>
            <h6>Contanct Info</h6>
            <p className="mt-5">(800) 8001-8588</p>
            <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
