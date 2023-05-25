import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Product from "../components/Product";
import Loader from "../components/loader";
import Toastify from "../components/Toastify";
import listProducts from "../store/Slices/Product/ProductAction";

const HomeScreen = () => {
  const { products, error } = useSelector((state) => state.productList);
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const Load = async () => {
    dispatch(toggleLoading(true));
    listProducts(dispatch);
    dispatch(toggleLoading(false));
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <h3>Latest Products</h3>
      {app.isLoading ? (
        <Loader />
      ) : error ? (
        Toastify(error, "error")
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
