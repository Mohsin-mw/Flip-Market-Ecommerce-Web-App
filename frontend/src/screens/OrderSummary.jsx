import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Form, Alert, Image, Button } from "react-bootstrap";
import Loader from "../components/loader";
import { useParams, useNavigate } from "react-router-dom";
import { GetOrderDetails } from "../network/endpoints/Order";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import {
  resetCartItems,
  resetShippingAddress,
} from "../store/Slices/Cart/CartSlice";
const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = useSelector((state) => state.app);
  const [orderInfo, setOrderInfo] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isDelivered, setisDelivered] = useState("");
  const [deliveredTime, setDeliveredTime] = useState("");
  const [isPaid, setIsPaid] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [shippingPrice, setShippingPrice] = useState("");
  const [taxPrice, setTaxPrice] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const { id } = useParams();
  const urlId = id.split(":")[1];

  const GetOrder = async () => {
    await GetOrderDetails(token, urlId).then((response) => {
      console.log(response.data);
      setAddress(response.data.shippingAddress.address);
      setCity(response.data.shippingAddress.city);
      setPostalCode(response.data.shippingAddress.postalCode);
      setCountry(response.data.shippingAddress.country);
      setPaymentMethod(response.data.paymentMethod);
      setCreatedAt(response.data.createdAt);
      setisDelivered(response.data.isDelivered);
      setDeliveredTime(response.data.deliveredAt);
      setTotalPrice(response.data.totalPrice);
      setShippingPrice(response.data.shippingPrice);
      setTaxPrice(response.data.taxPrice);
      setOrderItems(response.data.orderItems);
      setIsPaid(response.data.isPaid);
    });
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 1000);
  };

  const navigationHandler = () => {
    dispatch(resetCartItems());
    dispatch(resetShippingAddress());
    navigate("/orders");
  };

  useEffect(() => {
    dispatch(toggleLoading(true));

    if (orderInfo == null) {
      GetOrder();
    }
  }, []);
  return (
    <div className="page-screen my-5">
      <h2>Order Summary</h2>
      <Button className="my-5" onClick={navigationHandler}>
        View All Orders
      </Button>
      {app.isLoading ? (
        <Loader />
      ) : (
        <Card className="p-5">
          <h3 className="mb-5">Order ID: #{urlId}</h3>

          <Row>
            <Col md>
              <Form.Label>Address</Form.Label>
              <Form.Control
                className="my-2 rounded"
                disabled
                type="text"
                placeholder={address}
              />
            </Col>
            <Col md>
              <Form.Label>City</Form.Label>
              <Form.Control disabled type="text" placeholder={city} />
            </Col>
            <Col md>
              <Form.Label>Postal</Form.Label>
              <Form.Control disabled type="text" placeholder={postalCode} />
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Label>Country</Form.Label>
              <Form.Control disabled type="text" placeholder={country} />
            </Col>
            <Col md>
              <Form.Label>Payment Method</Form.Label>
              <Form.Control disabled type="text" placeholder={paymentMethod} />
            </Col>
            <Col md>
              <Form.Label>Created At</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={`${new Date(createdAt).toUTCString()}`}
              />
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Label>Tax Price</Form.Label>
              <Form.Control disabled type="text" placeholder={taxPrice + "$"} />
            </Col>
            <Col md>
              <Form.Label>Shipping Price</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={shippingPrice + "$"}
              />
            </Col>
            <Col md>
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={totalPrice + "$"}
              />
            </Col>
          </Row>
          <Row>
            <Col md>
              <Form.Label>Delivered</Form.Label>
              <Alert variant={isDelivered ? "success" : "danger"}>
                {isDelivered ? "Delivered" : "Not Delivered"}
              </Alert>
            </Col>
            <Col md>
              <Form.Label>Paid</Form.Label>
              {console.log(isPaid)}
              <Alert variant={isPaid ? "success" : "danger"}>
                {isPaid ? "Paid" : "Not Paid Yet"}
              </Alert>
            </Col>
          </Row>
          <Row className="my-5">
            <h5 className="my-3">Order Items</h5>
            {orderItems.map((orderItem) => (
              <Row key={orderItem._id} className="my-3">
                <Col md>
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={orderItem.name}
                  />
                </Col>
                <Col md>
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={orderItem.price}
                  />
                </Col>
                <Col md>
                  <Image width="25%" src={app.serverUrl + orderItem.image} />
                </Col>
              </Row>
            ))}
          </Row>
        </Card>
      )}
    </div>
  );
};

export default OrderSummary;
