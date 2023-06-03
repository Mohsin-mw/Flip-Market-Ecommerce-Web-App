import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserRegister } from "../store/Slices/UserRegister/UserRegisterFunction";
import whiteLogo from "../assets/logo.svg";
import { MdSupervisorAccount } from "react-icons/md";

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
    <div className="page-screen row d-flex justify-content-center align-items-center h-100">
      <Row className="shadow-lg p-3">
        <Col md className="d-flex justify-content-center bg-primary rounded">
          <img
            src={whiteLogo}
            className="img-fluid"
            width="60%"
            alt="Sample image"
          />
        </Col>
        <Col md>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="font-weight-bold" style={{ margin: "0" }}>
                Register
              </h2>
              <MdSupervisorAccount size={30} />
            </div>
            {message && <Alert>{message}</Alert>}
            {error && <Alert>{error}</Alert>}
            <Form
              className="login-form d-flex justify-content-center align-items-start flex-column"
              onSubmit={submitHandler}
            >
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
              <div className="py-3 text-center">
                Already a User?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Sign In
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterScreen;
