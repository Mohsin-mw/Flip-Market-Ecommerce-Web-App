import {
  Row,
  Col,
  Card,
  Form,
  ListGroup,
  ListGroupItem,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { CreateOrder } from "../store/Slices/Order/OrderFunction";
import { useEffect } from "react";
import {
  resetCartItems,
  resetShippingAddress,
} from "../store/Slices/Cart/CartSlice";

const OrderScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { shippingAddress } = useSelector((state) => state.cart);
  const { paymentMethod } = useSelector((state) => state.cart);
  const { error, success, order } = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { serverUrl } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.qty) * Number(item.price).toFixed(1),
    0
  );
  const shippingPrice = Number((itemsPrice > 100 ? 200 : 10).toFixed(2));
  const taxPrice = Number(0.082 * itemsPrice).toFixed(2);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
    if (success) {
      navigate(`/summary/id:${order._id}`);
    }
  });

  const OrderHandler = () => {
    CreateOrder(dispatch, userInfo.token, {
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: itemsPrice,
    });
  };
  return (
    <div className="">
      <CheckoutSteps step1 step2 step3 step4 />
      {error ? <Alert variant="danger">Order Faild</Alert> : ""}
      <Row>
        <Col md>
          <Card className="px-3 py-5 my-3">
            <Form.Label>Email</Form.Label>
            <Form.Control disabled type="email" placeholder={userInfo.email} />
          </Card>
          <Card className="px-3 py-5 my-3">
            <Row>
              <Col xs>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={shippingAddress.address}
                />
              </Col>
              <Col xs>
                <Form.Label>Postal</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={shippingAddress.postalCode}
                />
              </Col>
            </Row>
            <Row className="my-5">
              <Col xs>
                <Form.Label>City</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={shippingAddress.city}
                />
              </Col>
              <Col xs>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder={shippingAddress.country}
                />
              </Col>
            </Row>
          </Card>
          <Card className="px-3 py-5 my-3">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control disabled type="text" placeholder={paymentMethod} />
          </Card>
        </Col>
        <Col md>
          <Card className="px-3 py-5 my-3">
            <h5>Order Items</h5>
            {cartItems.map((item) => (
              <ListGroupItem key={item.name} className="my-3">
                <Row>
                  <Col md={2}>
                    <Image
                      src={serverUrl + item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3} className="d-flex align-items-center ">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    ${item.price}
                  </Col>
                  <Col md={3} className="d-flex align-items-center">
                    <Form.Control
                      disabled
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(dispatch, item.product, e.target.value)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </Card>
          <Card className="rounded my-3">
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4 className="my-5">
                  Order Info <i className="fa-solid fa-circle-info"></i>
                </h4>
                <Row>
                  <Col>
                    <p className="sub-text">Items:</p>
                  </Col>
                  <Col>
                    <p className="sub-text">
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="sub-text">Total Price:</p>
                  </Col>
                  <Col>
                    <p className="sub-text">
                      {cartItems.reduce(
                        (acc, item) =>
                          acc +
                          Number(item.qty) * Number(item.price).toFixed(1),
                        0
                      )}
                      $
                    </p>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block rounded"
                  disabled={cartItems.length === 0}
                  onClick={OrderHandler}
                >
                  Place Order
                  <i className="mx-3 fa-solid fa-bag-shopping"></i>
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
