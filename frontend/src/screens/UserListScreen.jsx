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
import { Table, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const UserListScreen = () => {
  const app = useSelector((state) => state.app);
  const [userDeleteMessage, setUserDeleteMessage] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const GetUsers = async () => {
    dispatch(toggleLoading(true));

    await GetAllUsers(userInfo.token)
      .then((response) => dispatch(allUsersRequest(response.data)))
      .catch((error) => dispatch(allUsersRequestFailed(error)));
    setTimeout(() => {
      dispatch(toggleLoading(false));
    }, 3000);
  };

  const deleteHandler = (user) => {
    setUserDeleteMessage(`${user.name} was Deleted Successfully`);
    DeleteUser(userInfo.token, user._id);
  };

  useEffect(() => {
    if (userInfo.isAdmin == false) {
      navigate("/");
    } else {
      GetUsers();
    }
  }, [dispatch, userDeleteMessage]);

  return (
    <div className="page-screen my-5">
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-check" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user)}
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

export default UserListScreen;
