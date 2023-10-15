import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "./initialState";
import { authReducers } from "./reducers";

const authSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: authReducers,
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
