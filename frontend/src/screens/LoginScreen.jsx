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
  const { userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo, redirect]);
  const submitHandler = async (e) => {
    e.preventDefault();
    UserLogin(dispatch, email, password);
  };
  return (
    <FormContainer>
      <h1>
        Sign In <i class="my-3 fa-solid fa-user"></i>
      </h1>
      {error && Toastify(error, "error")}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>
            <i className="mx-1 fa-solid fa-envelope"></i>Email Address
          </Form.Label>
          <Form.Control
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
            className="rounded"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button className="rounded" type="submit" variant="primary">
          Sign In
          <i class="mx-2 fa-solid fa-right-to-bracket"></i>
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
