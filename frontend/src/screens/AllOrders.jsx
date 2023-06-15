import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../store/Slices/User/UserSlice";
import { GetAllOrders } from "../network/endpoints/Order";
import { orderDetailsAll } from "../store/Slices/AllOrders/AllOrdersSlice";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import { Row, Col, Card, Form, Alert, Image, Button } from "react-bootstrap";
import Loader from "../components/loader";
import noDataImage from "../assets/no-data.svg";
const AllOrders = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const app = useSelector((state) => state.app);
  const navigate = useNavigate();
  const GetOrders = async () => {
    dispatch(toggleLoading(true));
    await GetAllOrders(user.userInfo.token, user.userInfo)
      .then((response) => {
        console.log(response.status);
        dispatch(orderDetailsAll(response.data));
        setAllOrders(response.data);
      })
      .catch((error) => {
        if ((error.response.status = 401)) {
          const response = JSON.parse(error.response.request.response);
          if ((response.code = "user_not_found")) {
            dispatch(userLogout());
            navigate("");
          }
        }
      });

    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 1000);
  };
  const printHandler = () => {
    print();
  };
  useEffect(() => {
    if (user.userInfo == null) {
      navigate("/");
    } else {
      GetOrders();
    }
  }, []);
  return (
    <div className="page-screen my-1">
      <h2 className="my-3">Orders</h2>
      <Button onClick={printHandler}>Print Orders</Button>
      {app.isLoading ? (
        <Loader />
      ) : allOrders.length == 0 ? (
        <>
          <Alert variant="info">
            <i className="mx-2 fa-solid fa-circle-info"></i>
            No Orders Yet <Link to="/">Go Back</Link>{" "}
          </Alert>
          <div className="d-flex align-items-center justify-content-center my-5">
            <Image src={noDataImage} />
          </div>
        </>
      ) : (
        <div className="my-5">
          {allOrders.map((element) => (
            <Card key={element._id} className="p-5 my-3">
              <h3 className="mb-5">Order ID: #{element._id}</h3>
              <Row>
                <Col md>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className="my-2 rounded"
                    disabled
                    type="text"
                    placeholder={element.shippingAddress.address}
                  />
                </Col>
                <Col md>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.shippingAddress.city}
                  />
                </Col>
                <Col md>
                  <Form.Label>Postal</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.shippingAddress.postalCode}
                  />
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.shippingAddress.country}
                  />
                </Col>
                <Col md>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.paymentMethod}
                  />
                </Col>
                <Col md>
                  <Form.Label>Created At</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={`${new Date(element.createdAt).toUTCString()}`}
                  />
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Label>Tax Price</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.taxPrice + "$"}
                  />
                </Col>
                <Col md>
                  <Form.Label>Shipping Price</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.shippingPrice + "$"}
                  />
                </Col>
                <Col md>
                  <Form.Label>Total Price</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder={element.totalPrice + "$"}
                  />
                </Col>
              </Row>
              <Row>
                <Col md>
                  <Form.Label>Delivered</Form.Label>
                  <Alert variant={element.isDelivered ? "success" : "danger"}>
                    {element.isDelivered ? "Delivered" : "Not Delivered"}
                  </Alert>
                </Col>
                <Col md>
                  <Form.Label>Paid</Form.Label>
                  <Alert variant={element.isPaid ? "success" : "danger"}>
                    {element.isPaid ? "Paid" : "Not Paid Yet"}
                  </Alert>
                </Col>
              </Row>
              <Row className="my-5">
                <h5 className="my-3">Order Items</h5>
                {element.orderItems.map((orderItem) => (
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
                      <Image
                        width="25%"
                        src={app.serverUrl + orderItem.image}
                      />
                    </Col>
                  </Row>
                ))}
              </Row>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
