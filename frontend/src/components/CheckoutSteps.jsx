import { Nav, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center my-4">
      <Row className="justify-content-center">
        <Col md>
          <div className="checkout-step-number d-flex justify-content-center">
            <span>1</span>
          </div>
          <Nav.Item>
            {step1 ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Item disabled>Login</Nav.Item>
            )}
          </Nav.Item>
        </Col>
        <Col md>
          <div className="checkout-step-number d-flex justify-content-center">
            <span>2</span>
          </div>
          <Nav.Item>
            {step2 ? (
              <LinkContainer to="/shipping">
                <Nav.Link>Shipping</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Item disabled>Shipping</Nav.Item>
            )}
          </Nav.Item>
        </Col>
        <Col md>
          <div className="checkout-step-number d-flex justify-content-center">
            <span>3</span>
          </div>
          <Nav.Item>
            {step3 ? (
              <LinkContainer to="/payment">
                <Nav.Link>Payment</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Item disabled>Payment</Nav.Item>
            )}
          </Nav.Item>
        </Col>
        <Col md>
          <div className="checkout-step-number d-flex justify-content-center">
            <span>4</span>
          </div>
          <Nav.Item>
            {step4 ? (
              <LinkContainer to="/placeorder">
                <Nav.Link>Place Order</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Item disabled className="text-nowrap">
                Place Order
              </Nav.Item>
            )}
          </Nav.Item>
        </Col>
      </Row>
    </Nav>
  );
};

export default CheckoutSteps;
