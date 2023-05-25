import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
  name: "app",
  initialState: {
    apiUrl: "http://127.0.0.1:8000/api/",
    isLoading: false,
  },
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleLoading } = app.actions;
export default app.reducer;
