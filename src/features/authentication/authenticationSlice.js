import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
};

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const { setToken } = authenticationSlice.actions;
export const selectUserToken = (state) => state.authentication.token;
export default authenticationSlice.reducer;
