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
  Alert,
} from "react-bootstrap";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Rating from "../components/Rating";
import Loader from "../components/loader";
import productDetail from "../store/Slices/SingleProduct/SingleProductFunctions";
import { AddReview } from "../network/endpoints/Products";
import Toastify from "../components/Toastify";
import ErrorImage from "../assets/ErrorBadRequest.svg";

const ProductScreen = () => {
  const { serverUrl } = useSelector((state) => state.app);
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  const [qty, setqty] = useState(1);
  const productDetails = useSelector((state) => state.singleProduct);
  const { error, product } = productDetails;
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const Load = async () => {
    await productDetail(dispatch, id);
    setRating(product.rating);
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  const addCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    AddReview(userInfo.token, id, {
      rating: Number(rating),
      comment: comment,
    }).catch((error) => {
      setUserMessage(JSON.parse(error.request.response).details);
    });
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    Load();
  }, [dispatch, userMessage]);

  return (
    <div className="page-screen">
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
        <>
          <Row>
            <Col md={6} className="my-2">
              <Image
                src={serverUrl + product.image}
                alt={product.name}
                fluid
                rounded
              />
            </Col>
            <Col>
              <Col className="my-2">
                <Card className="rounded py-3">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h4 className="my-4">Rating and Reviews</h4>
                      <div className="">
                        <h3 style={{ display: "block" }}>{product.rating}</h3>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                          color={"#f8e825"}
                          width={"25"}
                        />
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      <h4 className="my-4">Overview</h4>
                      {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col className="my-4">
                <Card className="py-3">
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
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
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
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
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
                        disabled={product.countInStock <= 0}
                      >
                        Add to Cart
                        <i className="mx-3 fa-solid fa-cart-shopping"></i>
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Col>
          </Row>
          <Row>
            <Card className="py-5 my-2">
              <h3>Reviews</h3>
              <Row className="p-3">
                {product.reviews.length == 0 ? (
                  <Alert variant="info">No Reviews Yet</Alert>
                ) : (
                  product.reviews.map((review) => (
                    <Col key={review._id} md={5} className="my-2 p-4">
                      <Card className="p-4">
                        <Row>
                          <Col>
                            <h5>{review.name}</h5>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <h5>{review.createdAt.substring(0, 10)}</h5>
                          </Col>
                        </Row>
                        <h6 className="my-3">{review.comment}</h6>
                      </Card>
                    </Col>
                  ))
                )}
                {/* {product.reviews.map((review) => (
                  <Col key={review._id} md={5} className="my-2 p-4">
                    <Card className="p-4">
                      <Row>
                        <Col>
                          <h5>{review.name}</h5>
                        </Col>
                        <Col className="d-flex justify-content-end">
                          <h5>{review.createdAt.substring(0, 10)}</h5>
                        </Col>
                      </Row>
                      <h6 className="my-3">{review.comment}</h6>
                    </Card>
                  </Col>
                ))} */}
              </Row>
            </Card>
            {userMessage ? (
              <Alert className="my-3" variant="danger">
                {userMessage}
              </Alert>
            ) : (
              ""
            )}
            <Card className="py-5 my-2">
              <h3 className="my-3">Write a Review</h3>
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <Alert variant="info">
                  <Link to="/login">Log In </Link>
                  to write a Review
                </Alert>
              )}
            </Card>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
