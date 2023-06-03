import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
  name: "UserUpdate",
  initialState: {},
  reducers: {
    userProfileUpdateRequest: (state, action) => {
      return {};
    },
    userProfileUpdateSuccess: (state, action) => {
      return { success: true, userInfo: action.payload };
    },
    userProfileUpdateFail: (state, action) => {
      return { error: action.payload };
    },
    userProfileUpdateReset: (state, action) => {
      return {};
    },
  },
});

export const {
  userProfileUpdateRequest,
  userProfileUpdateSuccess,
  userProfileUpdateFail,
  userProfileUpdateReset,
} = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
