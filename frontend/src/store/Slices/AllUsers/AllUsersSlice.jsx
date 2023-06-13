import { createSlice } from "@reduxjs/toolkit";

const AllUsers = createSlice({
  name: "AllUsers",
  initialState: {
    users: [],
  },
  reducers: {
    allUsersRequest: (state, action) => {
      return { users: action.payload };
    },
    allUsersRequestFailed: (state, action) => {
      return { ...state, error: action.payload };
    },
    allUsersReset: (state, action) => {
      return { users: [] };
    },
  },
});

export const { allUsersRequest, allUsersRequestFailed, allUsersReset } =
  AllUsers.actions;
export default AllUsers.reducer;
