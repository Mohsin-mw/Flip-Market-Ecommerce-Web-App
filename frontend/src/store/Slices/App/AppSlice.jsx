import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    serverUrl: "http://127.0.0.1:8000",
    apiUrl: "http://127.0.0.1:8000/api/",
    isLoading: false,
  },
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading, isLoggedIn } = app.actions;
export default app.reducer;
