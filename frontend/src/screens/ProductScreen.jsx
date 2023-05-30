import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Rating from "../components/Rating";
import Loader from "../components/loader";
import productDetail from "../store/Slices/SingleProduct/SingleProductFunctions";
import Toastify from "../components/Toastify";
import ErrorImage from "../assets/ErrorBadRequest.svg";

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setqty] = useState(1);
  const productDetails = useSelector((state) => state.singleProduct);
  const { error, product } = productDetails;
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Load = async () => {
    await productDetail(dispatch, id);
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    Load();
  }, []);

  const addCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      <Button className="btn  rounded my-3" onClick={() => navigate(-1)}>
        <i className="mx-2 fa-solid fa-arrow-left"></i>
        Go Back
      </Button>
      {app.isLoading ? (
        <Loader />
      ) : error ? (
        <>
          {Toastify(error, "error")}
          <img className="error-image" src={ErrorImage} alt="" />
        </>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid rounded />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col>Quantity</Col>
                      <Col xm="auto">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setqty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item className="my-4">
                  <Button
                    className="btn-block rounded"
                    type="button"
                    onClick={addCartHandler}
                    disabled={product.countInStock == 0}
                  >
                    Add to Cart
                    <i className="mx-3 fa-solid fa-cart-shopping"></i>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
