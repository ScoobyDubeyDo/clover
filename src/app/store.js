import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer, profileReducer } from "./slices";

// import postReducer from "../pages/Home/postSlice";

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		profile: profileReducer,
		// post: postReducer,
	},
});
