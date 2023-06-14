import CheckoutSteps from "../components/CheckoutSteps";
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../store/Slices/Cart/CartSlice";
import whiteLogo from "../assets/logo.svg";
import { MdOutlinePayment } from "react-icons/md";

const PaymentScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("Paypal");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    navigate("/placeorder");
  };

  return (
    <div className="vh-100">
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
                <h2 className="my-3 font-weight-bold">Payment Method</h2>
                <MdOutlinePayment size={30} />
              </div>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Col>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                      <Form.Check
                        required
                        type="radio"
                        label="Paypal or Credit Card"
                        id="paypal"
                        value="Paypal"
                        name="paymentMethod"
                        onClick={(e) => setPayment(e.target.value)}
                      ></Form.Check>
                    </Col>
                    <Col>
                      <Form.Check
                        required
                        type="radio"
                        label="Stripe"
                        id="stripe"
                        value="Stripe"
                        name="paymentMethod"
                        onClick={(e) => setPayment(e.target.value)}
                      ></Form.Check>
                    </Col>
                  </Col>
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
    </div>
  );
};

export default PaymentScreen;
