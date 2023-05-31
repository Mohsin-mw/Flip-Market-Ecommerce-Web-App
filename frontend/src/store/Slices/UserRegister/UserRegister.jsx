import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "UserRegister",
  initialState: {},
  reducers: {
    userRegisterRequest: (state, action) => {
      return {};
    },
    userRegisterSuccess: (state, action) => {
      return { userInfo: action.payload };
    },
    userRegisterFail: (state, action) => {
      return { error: action.payload };
    },
    userRegisterRemove: (state, action) => {
      return {};
    },
  },
});

export const {
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFail,
  userRegisterRemove,
} = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
