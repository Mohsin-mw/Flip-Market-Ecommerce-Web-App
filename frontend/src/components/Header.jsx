import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, NavDropdown, Container, Row, Col } from "react-bootstrap";
import { userLogout } from "../store/Slices/User/UserSlice";
import {
  resetCartItems,
  resetShippingAddress,
} from "../store/Slices/Cart/CartSlice";
import { useDispatch } from "react-redux";
import { toggleLoading } from "../store/Slices/App/AppSlice";
import { userRegisterRemove } from "../store/Slices/UserRegister/UserRegister";
import { BsInfoCircle } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(toggleLoading(true));
    dispatch(userLogout());
    dispatch(userRegisterRemove());
    dispatch(resetCartItems());
    dispatch(resetShippingAddress());
    setTimeout(() => dispatch(toggleLoading(false)), 2000);
  };
  return (
    <header className="header">
      <Container>
        <Row>
          <Col md>
            <div className="d-flex justify-content-center align-items-center text-center mt-2 ">
              <BsInfoCircle color="white" className="mx-2" />
              Get Up to 40% OFF New-Season Style
            </div>
          </Col>
          <Col md>
            {userInfo ? (
              <div className="d-flex justify-content-center align-items-center mt-2">
                <NavDropdown
                  title={<BsPersonCircle />}
                  id="navbarScrollingDropdown"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              <></>
            )}
          </Col>
          <Col
            md
            className="d-flex justify-content-center align-items-center mt-2"
          >
            {userInfo ? (
              <Link className="link-color-white" to="/profile">
                Signed in as: {userInfo.name}
              </Link>
            ) : (
              <Link className="link-color-white" to="/login">
                Login/Register
              </Link>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
