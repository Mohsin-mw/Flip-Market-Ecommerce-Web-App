import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShippingAddress } from "../store/Slices/Cart/CartSlice";
import whiteLogo from "../assets/logo.svg";
import { MdSupervisorAccount } from "react-icons/md";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const shippingAddress = cart.shippingAddress ? cart.shippingAddress : "";
  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress.country ? shippingAddress.country : ""
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <div className="page-screen row d-flex justify-content-center align-items-center h-100">
      <CheckoutSteps step1 step2 />
      <Row className="shadow-lg p-3">
        <Col
          md
          className="py-5 d-flex justify-content-center bg-primary rounded"
        >
          <img
            src={whiteLogo}
            className="img-fluid"
            width="60%"
            alt="Sample image"
          />
        </Col>
        <Col md>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="my-3 font-weight-bold">Details</h2>
              <MdSupervisorAccount size={30} />
            </div>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="address">
                <Form.Label>
                  <i className="fa-solid fa-address-book"></i> Address
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="text"
                  placeholder="Address"
                  value={address ? address : ""}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>
                  <i className="fa-solid fa-city"></i> City
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="text"
                  placeholder="City"
                  value={city ? city : ""}
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="postalCode">
                <Form.Label>
                  <i className="fa-solid fa-usps"></i> Postal
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode ? postalCode : ""}
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>
                  <i className="fa-solid fa-earth-americas"></i> Country
                </Form.Label>
                <Form.Control
                  required
                  className="rounded"
                  type="text"
                  placeholder="Country"
                  value={country ? country : ""}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className="rounded" type="submit" variant="primary">
                Continue
                <i className="mx-2 fa-solid fa-truck"></i>
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShippingScreen;
