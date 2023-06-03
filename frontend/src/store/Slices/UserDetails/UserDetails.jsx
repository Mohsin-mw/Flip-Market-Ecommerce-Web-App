import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "UserDetails",
  initialState: { user: {} },
  reducers: {
    userDetailsRequest: (state, action) => {
      return { ...state };
    },
    userDetailsSuccess: (state, action) => {
      return { user: action.payload };
    },
    userDetailsFail: (state, action) => {
      return { error: action.payload };
    },
  },
});

export const { userDetailsRequest, userDetailsSuccess, userDetailsFail } =
  userDetailsSlice.actions;
export default userDetailsSlice.reducer;
