import { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from "../store/Slices/User/UserFunction";
import Toastify from "../components/Toastify";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirect = searchParams.get("redirect");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user);
  const app = useSelector((state) => state.app);
  const { userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(-1);
    }
  }, [userInfo, email, password]);
  const submitHandler = (e) => {
    e.preventDefault();
    UserLogin(dispatch, email, password);
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && Toastify(error, "error")}
      {app.isLoading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
