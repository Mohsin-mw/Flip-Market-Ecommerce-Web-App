import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserLogin } from "../store/Slices/User/UserFunction";
import FormContainer from "../components/FormContainer";
import blackLogo from "../assets/logo-with-title(black).svg";

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
    <div className="page-screen row d-flex justify-content-center align-items-center h-100">
      <div className="text-center col-md-9 col-lg-6 col-xl-5">
        <h1 className="font-weight-bold">Welcome Back!</h1>
        <img src={blackLogo} className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-4 col-lg-8 col-xl-7">
        <FormContainer>
          {error && <Alert variant="error">{error}</Alert>}
          <Form className="login-form" onSubmit={submitHandler}>
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
              <i className="mx-2 fa-solid fa-right-to-bracket"></i>
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  );
};

export default LoginScreen;
