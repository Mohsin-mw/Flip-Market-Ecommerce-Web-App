import { useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Product from "../components/Product";
import Loader from "../components/loader";
import Toastify from "../components/Toastify";
import listProducts from "../store/Slices/Product/ProductFunctions";
import ErrorImage from "../assets/ErrorBadRequest.svg";
import { AiFillCar } from "react-icons/ai";
import { RiMoneyDollarCircleLine, Ri24HoursFill } from "react-icons/ri";
import HomeProductCard from "../components/HomeProductCard";
const HomeScreen = () => {
  const { products, error } = useSelector((state) => state.productList);
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const Load = async () => {
    await listProducts(dispatch);
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  useEffect(() => {
    dispatch(toggleLoading(true));
    Load();
  }, []);

  return (
    <div className="page-screen">
      {app.isLoading ? (
        <Loader />
      ) : error ? (
        <>
          {Toastify(error, "error")}
          <img className="error-image" src={ErrorImage} alt="" />
        </>
      ) : (
        <Row>
          <Row className="mt-4 mb-4">
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2"
            >
              <AiFillCar size={60} className="mx-3" />
              <div>
                <h4>FREE SHIPPING</h4>
                <p className="subtext">Free shipping on all orders over $99</p>
              </div>
            </Col>
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2"
            >
              <RiMoneyDollarCircleLine size={60} className="mx-3" />
              <div>
                <h4>MONEY BACK GUARANTEE</h4>
                <p className="subtext">100% money back guarantee</p>
              </div>
            </Col>
            <Col
              md
              className=" d-flex justify-content-center align-items-center mt-2"
            >
              <Ri24HoursFill size={60} className="mx-3" />
              <div>
                <h4>ONLINE SUPPORT 24/7</h4>
                <p className="subtext">We are here for you 24/7</p>
              </div>
            </Col>
          </Row>
          <Container fluid>
            <Row>
              <Col className="h-100">
                <HomeProductCard
                  image="https://cdn.shopify.com/s/files/1/0265/3493/6627/files/image-slide-1.png?v=1649835414&width=520"
                  heading="The New Standerd"
                  subtext="Start Buying"
                  off="30"
                  startingPrice="99"
                />
              </Col>
            </Row>
            <Row>
              <Col sm className="remove-padding">
                <Image
                  fluid
                  src="https://cdn.shopify.com/s/files/1/0265/3493/6627/files/tab-1-h4-1.jpg?v=1650007949"
                  className="img-responsive"
                />
              </Col>
              <Col sm className="remove-padding">
                <Image
                  fluid
                  src="https://cdn.shopify.com/s/files/1/0265/3493/6627/files/tab-1-h4-2.jpg?v=1650008256"
                  className="img-responsive"
                />
              </Col>
              <Col sm className="remove-padding">
                <Image
                  fluid
                  src="https://cdn.shopify.com/s/files/1/0265/3493/6627/files/product-tab-h7-1.jpg?v=1650256014"
                  className="img-responsive"
                />
              </Col>
            </Row>
          </Container>
          <h3 className="mt-5 mb-4">Featured Products</h3>
          <Row className="mt-4 mb-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
