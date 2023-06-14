import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllUsers, DeleteUser } from "../network/endpoints/User";
import {
  allUsersRequest,
  allUsersRequestFailed,
} from "../store/Slices/AllUsers/AllUsersSlice";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import Loader from "../components/loader";
import { Table, Button, Alert, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import listProducts from "../store/Slices/Product/ProductFunctions";
import { getAllCategoriesList } from "../network/endpoints/Products";

const ProductListScreen = () => {
  const app = useSelector((state) => state.app);
  const [allCategories, setAllCategories] = useState([]);

  const [userDeleteMessage, setUserDeleteMessage] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Load = async () => {
    await getAllCategoriesList().then((response) =>
      setAllCategories(response.data)
    );
    await listProducts(dispatch, "All");
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 500);
  };

  const deleteHandler = (user) => {
    setUserDeleteMessage(`${user.name} was Deleted Successfully`);
    DeleteUser(userInfo.token, user._id);
  };

  const navigationHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (userInfo.isAdmin == false) {
      navigate("/");
    } else {
      Load();
    }
  }, []);

  return (
    <div className="page-screen my-5">
      <Row className="align-items-center">
        <Col md>Products</Col>
        <Col md className="d-flex align-content-center justify-content-end">
          <Button onClick={navigationHandler}>
            Add Product
            <i className="fas fa-plus mx-2" />
          </Button>
        </Col>
      </Row>
      {userDeleteMessage == "" ? (
        ""
      ) : (
        <Alert variant="success">{userDeleteMessage}</Alert>
      )}
      {app.isLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm my-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className="d-flex align-content-center justify-content-end">
                  <LinkContainer to={`/admin/users/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
