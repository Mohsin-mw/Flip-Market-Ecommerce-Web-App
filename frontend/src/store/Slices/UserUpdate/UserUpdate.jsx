import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
  name: "UserUpdate",
  initialState: { user: {} },
  reducers: {
    userUpdateRequest: (state, action) => {
      return { ...state };
    },
    userUpdateSuccess: (state, action) => {
      return { user: action.payload };
    },
    userUpdateFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { userUpdateRequest, userUpdateSuccess, userUpdateFail } =
  userUpdateSlice.actions;
export default userUpdateSlice.reducer;
