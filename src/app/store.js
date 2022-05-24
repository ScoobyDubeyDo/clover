import { configureStore } from "@reduxjs/toolkit";
import { authenticationReducer, profileReducer, usersReducer } from "./slices";

// import postReducer from "../pages/Home/postSlice";

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		profile: profileReducer,
		users: usersReducer,
		// post: postReducer,
	},
});
