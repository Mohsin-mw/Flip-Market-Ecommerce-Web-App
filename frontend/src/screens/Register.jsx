import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserRegister } from "../store/Slices/UserRegister/UserRegisterFunction";
import { UserLogin } from "../store/Slices/User/UserFunction";

import Toastify from "../components/Toastify";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Password does not match!");
    } else {
      UserRegister(dispatch, name, email, password);
      navigate("/login");
    }
  };
  return (
    <div>
      <FormContainer>
        <h1>
          Register New Account <i className="my-3 fa-solid fa-user"></i>
        </h1>
        {message && Toastify(message, "error")}
        {error && Toastify(error, "error")}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="username">
            <Form.Label>
              <i className="fa-solid fa-user"></i> Username
            </Form.Label>
            <Form.Control
              required
              className="rounded"
              type="name"
              placeholder="Enter Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>
              <i className="mx-1 fa-solid fa-envelope"></i>Email Address
            </Form.Label>
            <Form.Control
              required
              className="rounded"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              <i className="mx-1 fa-solid fa-lock"></i> Password
            </Form.Label>
            <Form.Control
              required
              className="rounded"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirm-password">
            <Form.Label>
              <i className="mx-1 fa-solid fa-lock"></i> Confirm Password
            </Form.Label>
            <Form.Control
              required
              className="rounded"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="rounded" type="submit" variant="primary">
            Register
            <i className="mx-2 fa-solid fa-check-double"></i>
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already a User?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;
