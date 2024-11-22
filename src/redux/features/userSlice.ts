// slice is a collection of reducer logic and actions for single feature for our app
import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: any;
  isAuthenticated: Boolean;
}
const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {},
});

export default userSlice.reducer;
export const {} = userSlice.actions;
