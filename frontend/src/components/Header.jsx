import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { userLogout } from "../store/Slices/User/UserSlice";
import { resetCartItems } from "../store/Slices/Cart/CartSlice";
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
    setTimeout(() => dispatch(toggleLoading(false)), 2000);
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="d-flex justify-content-center align-items-center text-center ">
              <BsInfoCircle color="white" className="mx-2" />
              Get Up to 40% OFF New-Season Style
            </div>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-center">
            {userInfo ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="d-flex justify-content-center align-items-center text-center">
              {userInfo ? (
                <Link to="/profile">Signed in as: {userInfo.name}</Link>
              ) : (
                <Link to="/login">Login/Register</Link>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
