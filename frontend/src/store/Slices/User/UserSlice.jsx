import { createSlice } from "@reduxjs/toolkit";

const loadUserItem = () => {
  const data = localStorage.getItem("user");
  const userItemFromStorage = data ? JSON.parse(data) : null;
  return userItemFromStorage;
};

const userSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: loadUserItem(),
  },
  reducers: {
    userLoginRequest: (state, action) => {
      return {};
    },
    userLoginSuccess: (state, action) => {
      return { userInfo: action.payload };
    },
    userLoginFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail } =
  userSlice.actions;
export default userSlice.reducer;
