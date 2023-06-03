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
              <Col>
                <HomeProductCard
                  image="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/01/shop1_home_slider3.jpg"
                  heading="New Arrivals"
                  subtext="Get Yours"
                />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <HomeProductCard
                  image="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/01/shop1_home_ads1.jpg"
                  subtext="Watches"
                />
              </Col>
              <Col sm>
                <HomeProductCard
                  image="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/01/shop1_home_ads2.jpg"
                  subtext="Promos"
                />
              </Col>
              <Col sm>
                <HomeProductCard
                  image="https://www.portotheme.com/magento2/porto/pub/media/wysiwyg/smartwave/porto/homepage/01/shop1_home_ads3.jpg"
                  subtext="HandBags"
                />
              </Col>
            </Row>
            {/* SAVE IMAGE IN LOCAL STORAGE !!! */}
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
