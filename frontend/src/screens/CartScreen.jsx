import { useEffect } from "react";
import {
  Row,
  Alert,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/Slices/Cart/CartFunctions";
import {
  addCartItemToLocalStorage,
  removeCartItem,
} from "../store/Slices/Cart/CartSlice";

const CartScreen = () => {
  const { serverUrl } = useSelector((state) => state.app);
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { cartItems } = useSelector((state) => state.cart);
  const qty = searchParams.get("qty");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      addToCart(dispatch, id, qty);
    }
  }, [dispatch, id, qty]);

  const removeItemHandler = (id) => {
    dispatch(removeCartItem(cartItems.find((x) => x.product === id)));
    dispatch(addCartItemToLocalStorage());
  };

  const checkoutHandler = () => {
    if (user.userInfo != null) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };
  return (
    <Row className="page-screen">
      <Col md={8}>
        <h1>
          Shopping Cart <i className="mx-2 fa-solid fa-cart-shopping"></i>
        </h1>
        {cartItems.length === 0 ? (
          <Alert variant="info">
            Your Cart is empty <Link to="/">Go Back</Link>{" "}
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
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
                  <Col md={1} className="d-flex align-items-center">
                    <Button
                      type="Button"
                      variant="dark"
                      className="d-flex align-items-center rounded"
                      onClick={() => removeItemHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className="d-flex align-items-start mt-5">
        <Card className="rounded">
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
                  <p className="sub-text">{cartItems.length}</p>
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
                        acc + Number(item.qty) * Number(item.price).toFixed(1),
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
                onClick={checkoutHandler}
              >
                Proceed To Checkout
                <i className="mx-3 fa-solid fa-bag-shopping"></i>
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
