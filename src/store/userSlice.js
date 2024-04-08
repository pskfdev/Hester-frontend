import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "usersStore",
  initialState: initialState,
  reducers: {
    signin: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      localStorage.clear()
      state.user = [];
    },
  },
});

export const { signin, logout } = userSlice.actions;
export default userSlice.reducer;


