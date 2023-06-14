import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Form, Alert, Image, Button } from "react-bootstrap";
import Loader from "../components/loader";
import { useParams, useNavigate } from "react-router-dom";
import { GetUser, UpdateUser } from "../network/endpoints/User";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import {
  resetCartItems,
  resetShippingAddress,
} from "../store/Slices/Cart/CartSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = useSelector((state) => state.app);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const token = userInfo.token;
  const { id } = useParams();

  const GetOrder = async () => {
    dispatch(toggleLoading(true));
    await GetUser(token, id).then((response) => {
      setName(response.data.name);
      setUserName(response.data.username);
      setAdmin(response.data.isAdmin);
      setEmail(response.data.email);
    });
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 1000);
  };

  const navigationHandler = () => {
    navigate(-1);
  };

  const updateHandler = () => {
    UpdateUser(token, id, {
      name: name,
      username: userName,
      email: email,
      isAdmin: admin,
    });
    navigate(-1);
  };

  useEffect(() => {
    GetOrder();
  }, []);
  return (
    <div className="page-screen my-5">
      <Button onClick={navigationHandler}>Go Back</Button>
      {app.isLoading ? (
        <Loader />
      ) : (
        <Card className="p-5 my-3">
          <h3 className="mb-5">User ID: #{id}</h3>
          <Row className="my-2">
            <Col md>
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col md>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Col>
            <Col md>
              <Form.Label>Admin</Form.Label>
              <Form.Control
                as="select"
                className="my-2 rounded"
                value={admin ? "True" : "False"}
                onChange={(e) => setAdmin(e.target.value)}
              >
                <option>False</option>
                <option>True</option>
              </Form.Control>
            </Col>
          </Row>
          <Row className="my-2">
            <Col md>
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="my-2 rounded"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
            <Button className="my-2" onClick={updateHandler}>
              Update
            </Button>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default User;
